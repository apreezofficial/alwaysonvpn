import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ServerLocation, servers } from '../constants/servers';
import { Settings, defaultSettings } from '../constants/defaultSettings';

interface AppState {
  isConnected: boolean;
  connecting: boolean;
  selectedServer: ServerLocation;
  settings: Settings;
}

interface AppActions {
  setSelectedServer: (server: ServerLocation) => void;
  toggleConnection: () => Promise<void>;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

type AppContextValue = AppState & AppActions;

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerLocation>(servers[0]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleConnection = useCallback(async () => {
    if (connecting) return;
    setConnecting(true);
    const delay = 350 + Math.random() * 350;
    await new Promise<void>((r) => setTimeout(r, delay));
    setIsConnected((prev) => !prev);
    setConnecting(false);
  }, [connecting]);

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value: AppContextValue = {
    isConnected,
    connecting,
    selectedServer,
    settings,
    setSelectedServer,
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
