import { VpnServer, TransportProto, flagFromCountryCode } from '../constants/servers';

// VPN Gate is a volunteer-run relay network (University of Tsukuba).
// The "iphone" endpoint returns a CSV list with base64 OpenVPN configs.
const API_URLS = ['https://www.vpngate.net/api/iphone/'];
const FETCH_TIMEOUT_MS = 20000;

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function decodeBase64(input: string): string {
  const clean = input.replace(/[^A-Za-z0-9+/]/g, '');
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i++) {
    value = (value << 6) | B64.indexOf(clean[i]);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >> bits) & 0xff);
    }
  }
  // Configs are ASCII; build the string in chunks to avoid call-stack limits.
  let out = '';
  for (let i = 0; i < bytes.length; i += 4096) {
    out += String.fromCharCode(...bytes.slice(i, i + 4096));
  }
  return out;
}

function parseRemote(config: string): { proto: TransportProto; port: number } | null {
  const protoMatch = config.match(/^\s*proto\s+(tcp|udp)/im);
  const remoteMatch = config.match(/^\s*remote\s+\S+\s+(\d+)/im);
  if (!protoMatch || !remoteMatch) return null;
  return { proto: protoMatch[1].toLowerCase() as TransportProto, port: Number(remoteMatch[1]) };
}

export function parseVpnGateCsv(csv: string): VpnServer[] {
  const servers: VpnServer[] = [];
  for (const raw of csv.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('*') || line.startsWith('#')) continue;
    const cols = line.split(',');
    if (cols.length < 15) continue;
    const [hostName, ip, score, , speed, country, countryCode, sessions] = cols;
    const configB64 = cols[cols.length - 1];
    if (!configB64) continue;

    const config = decodeBase64(configB64);
    const remote = parseRemote(config);
    if (!remote) continue;

    servers.push({
      id: `${hostName}-${ip}`,
      hostName,
      ip,
      country,
      countryCode,
      flagEmoji: flagFromCountryCode(countryCode),
      score: Number(score) || 0,
      speedMbps: Math.round((Number(speed) || 0) / 1e6),
      sessions: Number(sessions) || 0,
      proto: remote.proto,
      port: remote.port,
      config,
    });
  }
  return servers.sort((a, b) => b.score - a.score);
}

async function fetchWithTimeout(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchVpnGateServers(): Promise<VpnServer[]> {
  let lastError: unknown;
  for (const url of API_URLS) {
    try {
      const servers = parseVpnGateCsv(await fetchWithTimeout(url));
      if (servers.length > 0) return servers;
      lastError = new Error('Server list was empty');
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Could not load servers');
}
