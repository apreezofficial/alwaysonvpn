export interface ServerLocation {
  id: string;
  city: string;
  country: string;
  flagEmoji: string;
  pingMs: number;
  loadPercent: number;
}

export const servers: ServerLocation[] = [
  { id: 'hnd-01', city: 'Tokyo',       country: 'Japan',          flagEmoji: '🇯🇵', pingMs: 12,  loadPercent: 32 },
  { id: 'sin-02', city: 'Singapore',   country: 'Singapore',      flagEmoji: '🇸🇬', pingMs: 38,  loadPercent: 47 },
  { id: 'syd-03', city: 'Sydney',      country: 'Australia',      flagEmoji: '🇦🇺', pingMs: 128, loadPercent: 61 },
  { id: 'lax-04', city: 'Los Angeles', country: 'United States',  flagEmoji: '🇺🇸', pingMs: 92,  loadPercent: 24 },
  { id: 'nyc-05', city: 'New York',    country: 'United States',  flagEmoji: '🇺🇸', pingMs: 142, loadPercent: 53 },
  { id: 'lon-06', city: 'London',      country: 'United Kingdom', flagEmoji: '🇬🇧', pingMs: 18,  loadPercent: 40 },
  { id: 'fra-07', city: 'Frankfurt',   country: 'Germany',        flagEmoji: '🇩🇪', pingMs: 22,  loadPercent: 68 },
  { id: 'cdg-08', city: 'Paris',       country: 'France',         flagEmoji: '🇫🇷', pingMs: 26,  loadPercent: 35 },
  { id: 'blr-09', city: 'Bangalore',   country: 'India',          flagEmoji: '🇮🇳', pingMs: 57,  loadPercent: 72 },
  { id: 'yyz-10', city: 'Toronto',     country: 'Canada',         flagEmoji: '🇨🇦', pingMs: 118, loadPercent: 29 },
  { id: 'gru-11', city: 'São Paulo',   country: 'Brazil',         flagEmoji: '🇧🇷', pingMs: 164, loadPercent: 58 },
  { id: 'jnb-12', city: 'Johannesburg',country: 'South Africa',   flagEmoji: '🇿🇦', pingMs: 205, loadPercent: 44 },
];
