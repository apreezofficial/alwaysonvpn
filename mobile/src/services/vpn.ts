import RNSimpleOpenvpn, {
  addVpnStateListener,
  removeVpnStateListener,
  VpnEventParams,
} from 'react-native-simple-openvpn';
import { VpnServer } from '../constants/servers';

// Numeric values emitted by the native module (see RNSimpleOpenvpnModule.VpnState).
export const NativeVpnState = {
  DISCONNECTED: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  DISCONNECTING: 3,
  OTHER: 4,
} as const;

// CompatMode.OVPN_TWO_FOUR_PEER: VPN Gate (SoftEther) servers behave like OpenVPN 2.4 peers.
const COMPAT_OVPN_TWO_FOUR_PEER = 2;

export async function startTunnel(server: VpnServer): Promise<void> {
  await RNSimpleOpenvpn.connect({
    ovpnString: server.config,
    // VPN Gate accepts any credentials; "vpn"/"vpn" is the documented default.
    username: 'vpn',
    password: 'vpn',
    notificationTitle: `AlwaysOnVPN · ${server.country}`,
    compatMode: COMPAT_OVPN_TWO_FOUR_PEER as unknown as RNSimpleOpenvpn.CompatMode,
    providerBundleIdentifier: 'com.alwaysonvpn.mobile.tunnel',
    localizedDescription: 'AlwaysOnVPN',
  });
}

export async function stopTunnel(): Promise<void> {
  await RNSimpleOpenvpn.disconnect();
}

export async function currentNativeState(): Promise<number> {
  return Number(await RNSimpleOpenvpn.getCurrentState());
}

export function subscribe(listener: (e: VpnEventParams) => void): () => void {
  addVpnStateListener(listener);
  return () => removeVpnStateListener();
}
