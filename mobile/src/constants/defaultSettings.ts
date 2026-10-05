export type Protocol = 'wireguard' | 'openvpn-udp' | 'openvpn-tcp';
export type ThemePref = 'dark' | 'system';

export interface Settings {
  alwaysOn: boolean;
  autoReconnect: boolean;
  killSwitch: boolean;
  protocol: Protocol;
  theme: ThemePref;
}

export const defaultSettings: Settings = {
  alwaysOn: false,
  autoReconnect: true,
  killSwitch: false,
  protocol: 'wireguard',
  theme: 'dark',
};

export const protocolLabels: Record<Protocol, string> = {
  'wireguard': 'WireGuard',
  'openvpn-udp': 'OpenVPN UDP',
  'openvpn-tcp': 'OpenVPN TCP',
};

export const themeLabels: Record<ThemePref, string> = {
  'dark': 'Dark',
  'system': 'System',
};
