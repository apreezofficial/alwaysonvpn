import { Platform } from 'react-native';

export const colors = {
  bg: '#07080c',
  bgLanding: '#08090c',
  surface: '#0c0e14',
  surfaceElevated: '#12151d',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  text: '#ffffff',
  textMuted: '#a1a1aa',
  textDim: '#71717a',
  textFaint: '#52525b',
  success: '#34d399',
  danger: '#f87171',
  warning: '#fbbf24',
  info: '#60a5fa',
  accent: '#ffffff',
  surfaceSoft: 'rgba(255,255,255,0.03)',
  surfaceMed: 'rgba(255,255,255,0.05)',
  surfaceHigh: 'rgba(255,255,255,0.08)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
};

export const font = {
  mono: (Platform.select({
    ios: 'Courier New',
    android: 'monospace',
    default: 'monospace',
  }) as unknown) as string,
  sans: undefined,
};

export const fontSize = {
  xs: 10,
  sm: 11,
  md: 12,
  base: 14,
  lg: 16,
  xl: 20,
  '2xl': 24,
};
