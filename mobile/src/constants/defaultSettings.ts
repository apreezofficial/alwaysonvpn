export type Protocol = 'any' | 'udp' | 'tcp';

export interface Settings {
  autoReconnect: boolean;
  protocol: Protocol;
}

export const defaultSettings: Settings = {
  autoReconnect: true,
  protocol: 'any',
};

export const protocolLabels: Record<Protocol, string> = {
  any: 'OpenVPN (Any)',
  udp: 'OpenVPN UDP',
  tcp: 'OpenVPN TCP',
};
