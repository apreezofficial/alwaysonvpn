export type TransportProto = 'udp' | 'tcp';

export interface VpnServer {
  id: string;
  hostName: string;
  ip: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  score: number;
  speedMbps: number;
  sessions: number;
  proto: TransportProto;
  port: number;
  config: string;
}

export function flagFromCountryCode(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return '🌐';
  const base = 0x1f1e6;
  const upper = code.toUpperCase();
  return String.fromCodePoint(base + upper.charCodeAt(0) - 65, base + upper.charCodeAt(1) - 65);
}
