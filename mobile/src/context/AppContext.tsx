import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from 'react';
import { VpnServer } from '../constants/servers';
import { Settings, defaultSettings } from '../constants/defaultSettings';
import { fetchVpnGateServers } from '../services/vpngate';
import { NativeVpnState, currentNativeState, startTunnel, stopTunnel, subscribe } from '../services/vpn';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

const CONNECT_TIMEOUT_MS = 30000;
const MAX_FAILOVER_ATTEMPTS = 4;

interface AppState {
  status: ConnectionStatus;
  isConnected: boolean;
  connecting: boolean;
  statusMessage: string;
  error: string | null;
  connectedAt: number | null;
  activeServer: VpnServer | null;
  servers: VpnServer[];
  serversLoading: boolean;
  serversError: string | null;
  selectedId: string;
  selectedServer: VpnServer | null;
  settings: Settings;
}

interface AppActions {
  refreshServers: () => Promise<void>;
  selectServer: (id: string) => void;
  toggleConnection: () => Promise<void>;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

type AppContextValue = AppState & AppActions;

export const AUTO_SERVER_ID = 'auto';

const AppContext = createContext<AppContextValue | undefined>(undefined);

function errorMessage(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (/prepare vpn failed/i.test(msg)) return 'VPN permission was denied.';
  return msg;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [connectedAt, setConnectedAt] = useState<number | null>(null);
  const [activeServer, setActiveServer] = useState<VpnServer | null>(null);
  const [servers, setServers] = useState<VpnServer[]>([]);
  const [serversLoading, setServersLoading] = useState(false);
  const [serversError, setServersError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(AUTO_SERVER_ID);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const filteredServers = useMemo(
    () => (settings.protocol === 'any' ? servers : servers.filter((s) => s.proto === settings.protocol)),
    [servers, settings.protocol],
  );

  const selectedServer = useMemo(() => {
    if (selectedId === AUTO_SERVER_ID) return filteredServers[0] ?? null;
    return servers.find((s) => s.id === selectedId) ?? null;
  }, [selectedId, servers, filteredServers]);

  // Refs let the native event listener see current values without re-subscribing.
  const wantConnected = useRef(false);
  const wasConnected = useRef(false);
  const tried = useRef<Set<string>>(new Set());
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef({ settings, filteredServers, status });
  latest.current = { settings, filteredServers, status };

  const clearConnectTimeout = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
  };

  const refreshServers = useCallback(async () => {
    setServersLoading(true);
    setServersError(null);
    try {
      setServers(await fetchVpnGateServers());
    } catch (e) {
      setServersError(`Couldn't load servers: ${errorMessage(e)}`);
    } finally {
      setServersLoading(false);
    }
  }, []);

  const giveUp = useCallback(async (reason: string) => {
    clearConnectTimeout();
    wantConnected.current = false;
    wasConnected.current = false;
    setError(reason);
    setStatus('disconnecting');
    try {
      await stopTunnel();
    } catch {
      // Already stopped.
    }
    setStatus('disconnected');
    setActiveServer(null);
    setConnectedAt(null);
  }, []);

  const connectTo = useCallback(
    async (server: VpnServer) => {
      clearConnectTimeout();
      tried.current.add(server.id);
      wasConnected.current = false;
      setActiveServer(server);
      setConnectedAt(null);
      setStatus('connecting');
      setStatusMessage('Starting tunnel');
      setError(null);
      timeout.current = setTimeout(() => {
        failoverRef.current(`${server.country} (${server.ip}) did not respond.`);
      }, CONNECT_TIMEOUT_MS);
      try {
        await startTunnel(server);
      } catch (e) {
        await giveUp(errorMessage(e));
      }
    },
    [giveUp],
  );

  const failover = useCallback(
    (reason: string) => {
      clearConnectTimeout();
      if (!wantConnected.current) return;
      const { settings: s, filteredServers: list } = latest.current;
      if (s.autoReconnect && tried.current.size < MAX_FAILOVER_ATTEMPTS) {
        const next = list.find((srv) => !tried.current.has(srv.id));
        if (next) {
          setStatusMessage(`${reason} Trying ${next.country}…`);
          void connectTo(next);
          return;
        }
      }
      void giveUp(`${reason} Pick another location and try again.`);
    },
    [connectTo, giveUp],
  );
  const failoverRef = useRef(failover);
  failoverRef.current = failover;

  useEffect(() => {
    void refreshServers();

    // Pick up a tunnel that is still running from a previous app session.
    currentNativeState()
      .then((state) => {
        if (state === NativeVpnState.CONNECTED) {
          wantConnected.current = true;
          wasConnected.current = true;
          setStatus('connected');
          setConnectedAt(Date.now());
        }
      })
      .catch(() => {});

    return subscribe((e) => {
      if (e.message) setStatusMessage(e.message.replace(/_/g, ' ').toLowerCase());

      switch (Number(e.state)) {
        case NativeVpnState.CONNECTED:
          clearConnectTimeout();
          wantConnected.current = true;
          wasConnected.current = true;
          tried.current.clear();
          setError(null);
          setStatus('connected');
          setConnectedAt((prev) => prev ?? Date.now());
          break;
        case NativeVpnState.CONNECTING:
          if (wantConnected.current) setStatus('connecting');
          break;
        case NativeVpnState.DISCONNECTED:
          if (!wantConnected.current) {
            setStatus('disconnected');
            setActiveServer(null);
            setConnectedAt(null);
          } else if (wasConnected.current) {
            failoverRef.current('Connection lost.');
          }
          // While connecting, transient "not connected" events are expected; the timeout handles real failures.
          break;
        default:
          if (e.level === 'LEVEL_AUTH_FAILED') failoverRef.current('Server rejected the connection.');
          else if (e.level === 'LEVEL_NONETWORK') setStatusMessage('waiting for network');
          break;
      }
    });
  }, [refreshServers]);

  const toggleConnection = useCallback(async () => {
    const current = latest.current.status;
    if (current === 'connected' || current === 'connecting') {
      clearConnectTimeout();
      wantConnected.current = false;
      wasConnected.current = false;
      setStatus('disconnecting');
      try {
        await stopTunnel();
      } catch (e) {
        setError(errorMessage(e));
      }
      setStatus('disconnected');
      setActiveServer(null);
      setConnectedAt(null);
      setStatusMessage('');
      return;
    }
    if (current === 'disconnecting') return;

    if (!selectedServer) {
      setError(serversLoading ? 'Still loading servers…' : 'No servers available. Pull to refresh on Locations.');
      return;
    }
    wantConnected.current = true;
    tried.current = new Set();
    await connectTo(selectedServer);
  }, [selectedServer, serversLoading, connectTo]);

  const selectServer = useCallback(
    (id: string) => {
      setSelectedId(id);
      // Switching location while connected moves the tunnel to the new server.
      const { status: s, filteredServers: list } = latest.current;
      if (s === 'connected' || s === 'connecting') {
        const target = id === AUTO_SERVER_ID ? list[0] : servers.find((srv) => srv.id === id);
        if (target) {
          wantConnected.current = true;
          tried.current = new Set();
          void connectTo(target);
        }
      }
    },
    [servers, connectTo],
  );

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => clearConnectTimeout, []);

  const value: AppContextValue = {
    status,
    isConnected: status === 'connected',
    connecting: status === 'connecting' || status === 'disconnecting',
    statusMessage,
    error,
    connectedAt,
    activeServer,
    servers: filteredServers,
    serversLoading,
    serversError,
    selectedId,
    selectedServer,
    settings,
    refreshServers,
    selectServer,
    toggleConnection,
    updateSetting,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
