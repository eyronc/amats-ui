import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Palette, 
  Sun, 
  Moon, 
  Paintbrush, 
  RefreshCw, 
  Check, 
  Eye,
  RotateCcw,
  Sparkles,
  Waves,
  Flame,
  Leaf,
  Sunset,
  CloudRain,
  Mountain,
  Coffee,
  Zap,
  Cherry,
  Heart
} from 'lucide-react';

interface EnhancedTheme {
  id: string;
  name: string;
  description: string;
  icon: any;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    sidebar: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarAccent: string;
    sidebarBorder: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    warning: string;
    info: string;
  };
  gradientDesign: string;
  isLight: boolean;
}

interface EnhancedThemeSystemProps {
  currentTheme: string;
  onThemeChange: (themeId: string, customColors?: any) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const enhancedThemes: EnhancedTheme[] = [
  // Dark Themes
  {
    id: 'dark-default',
    name: 'Dark Default',
    description: 'Professional dark theme with indigo accents',
    icon: Moon,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #4338ca 75%, #6366f1 100%)',
    colors: {
      background: '#000000',
      foreground: '#ffffff',
      card: '#111111',
      cardForeground: '#ffffff',
      primary: '#6366f1',
      primaryForeground: '#ffffff',
      secondary: '#1e1b4b',
      secondaryForeground: '#ffffff',
      accent: '#1f2937',
      accentForeground: '#ffffff',
      muted: '#1f1f1f',
      mutedForeground: '#9ca3af',
      border: 'rgba(99, 102, 241, 0.2)',
      input: '#1f1f1f',
      ring: '#6366f1',
      sidebar: '#111111',
      sidebarForeground: '#ffffff',
      sidebarPrimary: '#6366f1',
      sidebarAccent: '#1f1f1f',
      sidebarBorder: 'rgba(99, 102, 241, 0.2)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Mystical aurora with softer cosmic gradients',
    icon: Sparkles,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #0a0118 0%, #1a0b2e 20%, #2a1a3e 40%, #16213e 60%, #0f3460 80%, #1e40af 100%)',
    colors: {
      background: '#0a0118',
      foreground: '#e0f2fe',
      card: '#1a0b2e',
      cardForeground: '#e0f2fe',
      primary: '#1e40af',
      primaryForeground: '#ffffff',
      secondary: '#4c1d95',
      secondaryForeground: '#ffffff',
      accent: '#16213e',
      accentForeground: '#e0f2fe',
      muted: '#2a1a3e',
      mutedForeground: '#94a3b8',
      border: 'rgba(30, 64, 175, 0.3)',
      input: '#2a1a3e',
      ring: '#1e40af',
      sidebar: '#1a0b2e',
      sidebarForeground: '#e0f2fe',
      sidebarPrimary: '#1e40af',
      sidebarAccent: '#2a1a3e',
      sidebarBorder: 'rgba(30, 64, 175, 0.3)',
      destructive: '#f472b6',
      destructiveForeground: '#ffffff',
      success: '#34d399',
      warning: '#fbbf24',
      info: '#60a5fa'
    }
  },
  {
    id: 'crimson-moon',
    name: 'Crimson Moon',
    description: 'Deep crimson reds with elegant dark mystique',
    icon: Flame,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 25%, #991b1b 50%, #dc2626 75%, #ef4444 100%)',
    colors: {
      background: '#0f0000',
      foreground: '#fee2e2',
      card: '#1f0000',
      cardForeground: '#fee2e2',
      primary: '#dc2626',
      primaryForeground: '#ffffff',
      secondary: '#7f1d1d',
      secondaryForeground: '#fee2e2',
      accent: '#451a03',
      accentForeground: '#fee2e2',
      muted: '#2f1010',
      mutedForeground: '#fca5a5',
      border: 'rgba(220, 38, 38, 0.3)',
      input: '#2f1010',
      ring: '#dc2626',
      sidebar: '#1f0000',
      sidebarForeground: '#fee2e2',
      sidebarPrimary: '#dc2626',
      sidebarAccent: '#2f1010',
      sidebarBorder: 'rgba(220, 38, 38, 0.3)',
      destructive: '#f87171',
      destructiveForeground: '#ffffff',
      success: '#34d399',
      warning: '#fbbf24',
      info: '#60a5fa'
    }
  },
  {
    id: 'under-the-sea',
    name: 'Under the Sea',
    description: 'Deep ocean blues with aquatic tranquility',
    icon: Waves,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #0c4a6e 0%, #0e7490 25%, #0891b2 50%, #06b6d4 75%, #22d3ee 100%)',
    colors: {
      background: '#001122',
      foreground: '#cffafe',
      card: '#002244',
      cardForeground: '#cffafe',
      primary: '#0891b2',
      primaryForeground: '#ffffff',
      secondary: '#0e7490',
      secondaryForeground: '#ffffff',
      accent: '#164e63',
      accentForeground: '#cffafe',
      muted: '#083344',
      mutedForeground: '#67e8f9',
      border: 'rgba(8, 145, 178, 0.3)',
      input: '#083344',
      ring: '#0891b2',
      sidebar: '#002244',
      sidebarForeground: '#cffafe',
      sidebarPrimary: '#0891b2',
      sidebarAccent: '#083344',
      sidebarBorder: 'rgba(8, 145, 178, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#10b981',
      warning: '#f59e0b',
      info: '#06b6d4'
    }
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    description: 'Cyberpunk neon with electric purple vibes',
    icon: Zap,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #3b0764 0%, #581c87 25%, #7c3aed 50%, #8b5cf6 75%, #a78bfa 100%)',
    colors: {
      background: '#0f0f23',
      foreground: '#f3e8ff',
      card: '#1a1a2e',
      cardForeground: '#f3e8ff',
      primary: '#8b5cf6',
      primaryForeground: '#ffffff',
      secondary: '#581c87',
      secondaryForeground: '#ffffff',
      accent: '#3b0764',
      accentForeground: '#f3e8ff',
      muted: '#2d1b69',
      mutedForeground: '#c4b5fd',
      border: 'rgba(139, 92, 246, 0.3)',
      input: '#2d1b69',
      ring: '#8b5cf6',
      sidebar: '#1a1a2e',
      sidebarForeground: '#f3e8ff',
      sidebarPrimary: '#8b5cf6',
      sidebarAccent: '#2d1b69',
      sidebarBorder: 'rgba(139, 92, 246, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'midnight-blurple',
    name: 'Midnight Blurple',
    description: 'Discord-inspired dark theme with deep blue-purple',
    icon: Moon,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #2c2f33 0%, #36393f 25%, #5865f2 50%, #7289da 75%, #99aab5 100%)',
    colors: {
      background: '#0f0f0f',
      foreground: '#ffffff',
      card: '#1a1a1a',
      cardForeground: '#ffffff',
      primary: '#5865f2',
      primaryForeground: '#ffffff',
      secondary: '#7289da',
      secondaryForeground: '#ffffff',
      accent: '#4f545c',
      accentForeground: '#ffffff',
      muted: '#36393f',
      mutedForeground: '#99aab5',
      border: 'rgba(88, 101, 242, 0.3)',
      input: '#36393f',
      ring: '#5865f2',
      sidebar: '#1a1a1a',
      sidebarForeground: '#ffffff',
      sidebarPrimary: '#5865f2',
      sidebarAccent: '#36393f',
      sidebarBorder: 'rgba(88, 101, 242, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'retro-raincloud',
    name: 'Retro Raincloud',
    description: 'Nostalgic grey theme with subtle purple accents',
    icon: CloudRain,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #1f2937 0%, #374151 25%, #4b5563 50%, #6b7280 75%, #9ca3af 100%)',
    colors: {
      background: '#0f172a',
      foreground: '#f8fafc',
      card: '#1e293b',
      cardForeground: '#f8fafc',
      primary: '#6366f1',
      primaryForeground: '#ffffff',
      secondary: '#475569',
      secondaryForeground: '#ffffff',
      accent: '#334155',
      accentForeground: '#f8fafc',
      muted: '#374151',
      mutedForeground: '#cbd5e1',
      border: 'rgba(99, 102, 241, 0.2)',
      input: '#374151',
      ring: '#6366f1',
      sidebar: '#1e293b',
      sidebarForeground: '#f8fafc',
      sidebarPrimary: '#6366f1',
      sidebarAccent: '#374151',
      sidebarBorder: 'rgba(99, 102, 241, 0.2)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'Martian red-orange landscape theme',
    icon: Mountain,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 25%, #ea580c 50%, #f97316 75%, #fb923c 100%)',
    colors: {
      background: '#1c0a00',
      foreground: '#fff7ed',
      card: '#2c1810',
      cardForeground: '#fff7ed',
      primary: '#ea580c',
      primaryForeground: '#ffffff',
      secondary: '#9a3412',
      secondaryForeground: '#ffffff',
      accent: '#7c2d12',
      accentForeground: '#fff7ed',
      muted: '#451a03',
      mutedForeground: '#fdba74',
      border: 'rgba(234, 88, 12, 0.3)',
      input: '#451a03',
      ring: '#ea580c',
      sidebar: '#2c1810',
      sidebarForeground: '#fff7ed',
      sidebarPrimary: '#ea580c',
      sidebarAccent: '#451a03',
      sidebarBorder: 'rgba(234, 88, 12, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'dusk',
    name: 'Dusk',
    description: 'Twilight purple-pink evening theme',
    icon: Sunset,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #581c87 0%, #7c3aed 25%, #a855f7 50%, #c084fc 75%, #ddd6fe 100%)',
    colors: {
      background: '#1a0b2e',
      foreground: '#f3e8ff',
      card: '#2d1b69',
      cardForeground: '#f3e8ff',
      primary: '#a855f7',
      primaryForeground: '#ffffff',
      secondary: '#7c3aed',
      secondaryForeground: '#ffffff',
      accent: '#581c87',
      accentForeground: '#f3e8ff',
      muted: '#3b0764',
      mutedForeground: '#ddd6fe',
      border: 'rgba(168, 85, 247, 0.3)',
      input: '#3b0764',
      ring: '#a855f7',
      sidebar: '#2d1b69',
      sidebarForeground: '#f3e8ff',
      sidebarPrimary: '#a855f7',
      sidebarAccent: '#3b0764',
      sidebarBorder: 'rgba(168, 85, 247, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'retro-storm',
    name: 'Retro Storm',
    description: 'Stormy grey-blue with electric accents',
    icon: CloudRain,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
    colors: {
      background: '#020617',
      foreground: '#f1f5f9',
      card: '#0f172a',
      cardForeground: '#f1f5f9',
      primary: '#0ea5e9',
      primaryForeground: '#ffffff',
      secondary: '#1e293b',
      secondaryForeground: '#ffffff',
      accent: '#334155',
      accentForeground: '#f1f5f9',
      muted: '#475569',
      mutedForeground: '#94a3b8',
      border: 'rgba(14, 165, 233, 0.3)',
      input: '#475569',
      ring: '#0ea5e9',
      sidebar: '#0f172a',
      sidebarForeground: '#f1f5f9',
      sidebarPrimary: '#0ea5e9',
      sidebarAccent: '#475569',
      sidebarBorder: 'rgba(14, 165, 233, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#0ea5e9'
    }
  },
  {
    id: 'desert-khaki',
    name: 'Desert Khaki',
    description: 'Warm desert sand with earthy brown tones',
    icon: Mountain,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #451a03 0%, #78350f 25%, #a16207 50%, #ca8a04 75%, #eab308 100%)',
    colors: {
      background: '#1c1000',
      foreground: '#fefce8',
      card: '#292000',
      cardForeground: '#fefce8',
      primary: '#ca8a04',
      primaryForeground: '#ffffff',
      secondary: '#a16207',
      secondaryForeground: '#ffffff',
      accent: '#78350f',
      accentForeground: '#fefce8',
      muted: '#451a03',
      mutedForeground: '#fde047',
      border: 'rgba(202, 138, 4, 0.3)',
      input: '#451a03',
      ring: '#ca8a04',
      sidebar: '#292000',
      sidebarForeground: '#fefce8',
      sidebarPrimary: '#ca8a04',
      sidebarAccent: '#451a03',
      sidebarBorder: 'rgba(202, 138, 4, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'lofi-vibes',
    name: 'LoFi Vibes',
    description: 'Chill purple-pink aesthetic with muted tones',
    icon: Coffee,
    isLight: false,
    gradientDesign: 'linear-gradient(135deg, #312e81 0%, #4c1d95 25%, #7c3aed 50%, #a855f7 75%, #c084fc 100%)',
    colors: {
      background: '#1a103a',
      foreground: '#f3e8ff',
      card: '#2a1a5e',
      cardForeground: '#f3e8ff',
      primary: '#7c3aed',
      primaryForeground: '#ffffff',
      secondary: '#4c1d95',
      secondaryForeground: '#ffffff',
      accent: '#312e81',
      accentForeground: '#f3e8ff',
      muted: '#1e1b4b',
      mutedForeground: '#c4b5fd',
      border: 'rgba(124, 58, 237, 0.3)',
      input: '#1e1b4b',
      ring: '#7c3aed',
      sidebar: '#2a1a5e',
      sidebarForeground: '#f3e8ff',
      sidebarPrimary: '#7c3aed',
      sidebarAccent: '#1e1b4b',
      sidebarBorder: 'rgba(124, 58, 237, 0.3)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },

  // Light Themes
  {
    id: 'mint-apple',
    name: 'Mint Apple',
    description: 'Fresh green with crisp highlights',
    icon: Leaf,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 25%, #86efac 50%, #4ade80 75%, #22c55e 100%)',
    colors: {
      background: '#f0fdf4',
      foreground: '#14532d',
      card: '#ffffff',
      cardForeground: '#14532d',
      primary: '#16a34a',
      primaryForeground: '#ffffff',
      secondary: '#dcfce7',
      secondaryForeground: '#14532d',
      accent: '#f0fdf4',
      accentForeground: '#14532d',
      muted: '#dcfce7',
      mutedForeground: '#166534',
      border: '#bbf7d0',
      input: '#ffffff',
      ring: '#16a34a',
      sidebar: '#ffffff',
      sidebarForeground: '#14532d',
      sidebarPrimary: '#16a34a',
      sidebarAccent: '#f0fdf4',
      sidebarBorder: '#bbf7d0',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'citrus-sherbert',
    name: 'Citrus Sherbert',
    description: 'Vibrant orange and yellow blend',
    icon: Sun,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #facc15 50%, #f59e0b 75%, #d97706 100%)',
    colors: {
      background: '#fffbeb',
      foreground: '#92400e',
      card: '#ffffff',
      cardForeground: '#92400e',
      primary: '#f59e0b',
      primaryForeground: '#ffffff',
      secondary: '#fef3c7',
      secondaryForeground: '#92400e',
      accent: '#fffbeb',
      accentForeground: '#92400e',
      muted: '#fef3c7',
      mutedForeground: '#a16207',
      border: '#fed7aa',
      input: '#ffffff',
      ring: '#f59e0b',
      sidebar: '#ffffff',
      sidebarForeground: '#92400e',
      sidebarPrimary: '#f59e0b',
      sidebarAccent: '#fffbeb',
      sidebarBorder: '#fed7aa',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'hanami',
    name: 'Hanami',
    description: 'Cherry blossom pink and soft whites',
    icon: Cherry,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 50%, #f9a8d4 75%, #ec4899 100%)',
    colors: {
      background: '#fdf2f8',
      foreground: '#831843',
      card: '#ffffff',
      cardForeground: '#831843',
      primary: '#ec4899',
      primaryForeground: '#ffffff',
      secondary: '#fce7f3',
      secondaryForeground: '#831843',
      accent: '#fdf2f8',
      accentForeground: '#831843',
      muted: '#fce7f3',
      mutedForeground: '#be185d',
      border: '#f9a8d4',
      input: '#ffffff',
      ring: '#ec4899',
      sidebar: '#ffffff',
      sidebarForeground: '#831843',
      sidebarPrimary: '#ec4899',
      sidebarAccent: '#fdf2f8',
      sidebarBorder: '#f9a8d4',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    description: 'Warm morning light with golden tones',
    icon: Sunset,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 25%, #fca5a5 50%, #f87171 75%, #ef4444 100%)',
    colors: {
      background: '#fff5f5',
      foreground: '#7f1d1d',
      card: '#ffffff',
      cardForeground: '#7f1d1d',
      primary: '#ef4444',
      primaryForeground: '#ffffff',
      secondary: '#fee2e2',
      secondaryForeground: '#7f1d1d',
      accent: '#fff5f5',
      accentForeground: '#7f1d1d',
      muted: '#fee2e2',
      mutedForeground: '#991b1b',
      border: '#fca5a5',
      input: '#ffffff',
      ring: '#ef4444',
      sidebar: '#ffffff',
      sidebarForeground: '#7f1d1d',
      sidebarPrimary: '#ef4444',
      sidebarAccent: '#fff5f5',
      sidebarBorder: '#fca5a5',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    description: 'Sweet pastel pink and blue combination',
    icon: Heart,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 25%, #f3e8ff 50%, #e9d5ff 75%, #d8b4fe 100%)',
    colors: {
      background: '#fdf4ff',
      foreground: '#581c87',
      card: '#ffffff',
      cardForeground: '#581c87',
      primary: '#a855f7',
      primaryForeground: '#ffffff',
      secondary: '#fae8ff',
      secondaryForeground: '#581c87',
      accent: '#fdf4ff',
      accentForeground: '#581c87',
      muted: '#fae8ff',
      mutedForeground: '#7c3aed',
      border: '#e9d5ff',
      input: '#ffffff',
      ring: '#a855f7',
      sidebar: '#ffffff',
      sidebarForeground: '#581c87',
      sidebarPrimary: '#a855f7',
      sidebarAccent: '#fdf4ff',
      sidebarBorder: '#e9d5ff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm sunset oranges and yellows',
    icon: Sunset,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 25%, #fb923c 50%, #f97316 75%, #ea580c 100%)',
    colors: {
      background: '#fff7ed',
      foreground: '#9a3412',
      card: '#ffffff',
      cardForeground: '#9a3412',
      primary: '#f97316',
      primaryForeground: '#ffffff',
      secondary: '#fed7aa',
      secondaryForeground: '#9a3412',
      accent: '#fff7ed',
      accentForeground: '#9a3412',
      muted: '#fed7aa',
      mutedForeground: '#c2410c',
      border: '#fdba74',
      input: '#ffffff',
      ring: '#f97316',
      sidebar: '#ffffff',
      sidebarForeground: '#9a3412',
      sidebarPrimary: '#f97316',
      sidebarAccent: '#fff7ed',
      sidebarBorder: '#fdba74',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'chroma-glow',
    name: 'Chroma Glow',
    description: 'Electric blues and neon accents',
    icon: Zap,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 25%, #bfdbfe 50%, #93c5fd 75%, #3b82f6 100%)',
    colors: {
      background: '#eff6ff',
      foreground: '#1e3a8a',
      card: '#ffffff',
      cardForeground: '#1e3a8a',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#dbeafe',
      secondaryForeground: '#1e3a8a',
      accent: '#eff6ff',
      accentForeground: '#1e3a8a',
      muted: '#dbeafe',
      mutedForeground: '#1d4ed8',
      border: '#bfdbfe',
      input: '#ffffff',
      ring: '#3b82f6',
      sidebar: '#ffffff',
      sidebarForeground: '#1e3a8a',
      sidebarPrimary: '#3b82f6',
      sidebarAccent: '#eff6ff',
      sidebarBorder: '#bfdbfe',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Deep greens and nature tones',
    icon: Leaf,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 25%, #a7f3d0 50%, #6ee7b7 75%, #10b981 100%)',
    colors: {
      background: '#ecfdf5',
      foreground: '#064e3b',
      card: '#ffffff',
      cardForeground: '#064e3b',
      primary: '#059669',
      primaryForeground: '#ffffff',
      secondary: '#d1fae5',
      secondaryForeground: '#064e3b',
      accent: '#ecfdf5',
      accentForeground: '#064e3b',
      muted: '#d1fae5',
      mutedForeground: '#047857',
      border: '#a7f3d0',
      input: '#ffffff',
      ring: '#059669',
      sidebar: '#ffffff',
      sidebarForeground: '#064e3b',
      sidebarPrimary: '#059669',
      sidebarAccent: '#ecfdf5',
      sidebarBorder: '#a7f3d0',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  },
  {
    id: 'strawberry-lemonade',
    name: 'Strawberry Lemonade',
    description: 'Sweet pinks and citrus yellows',
    icon: Cherry,
    isLight: true,
    gradientDesign: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 25%, #fda4af 50%, #fb7185 75%, #f43f5e 100%)',
    colors: {
      background: '#fff1f2',
      foreground: '#881337',
      card: '#ffffff',
      cardForeground: '#881337',
      primary: '#f43f5e',
      primaryForeground: '#ffffff',
      secondary: '#fecdd3',
      secondaryForeground: '#881337',
      accent: '#fff1f2',
      accentForeground: '#881337',
      muted: '#fecdd3',
      mutedForeground: '#be123c',
      border: '#fda4af',
      input: '#ffffff',
      ring: '#f43f5e',
      sidebar: '#ffffff',
      sidebarForeground: '#881337',
      sidebarPrimary: '#f43f5e',
      sidebarAccent: '#fff1f2',
      sidebarBorder: '#fda4af',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    }
  }
];

export function EnhancedThemeSystem({ 
  currentTheme, 
  onThemeChange, 
  isDarkMode, 
  onDarkModeToggle 
}: EnhancedThemeSystemProps) {
  const [activeTab, setActiveTab] = useState('presets');
  const [customColor, setCustomColor] = useState('#6366f1');
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [originalTheme, setOriginalTheme] = useState<any>(null);
  const [currentlyAppliedTheme, setCurrentlyAppliedTheme] = useState<string | null>(null);
  const [hue, setHue] = useState([234]);
  const [saturation, setSaturation] = useState([79]);
  const [lightness, setLightness] = useState([67]);

  // Save original theme state when preview starts
  const saveOriginalTheme = () => {
    if (!originalTheme && currentlyAppliedTheme) {
      const appliedTheme = enhancedThemes.find(t => t.id === currentlyAppliedTheme);
      if (appliedTheme) {
        setOriginalTheme({
          themeId: currentlyAppliedTheme,
          colors: { ...appliedTheme.colors },
          isLight: appliedTheme.isLight
        });
      }
    }
  };

  const applyComprehensiveTheme = (theme: EnhancedTheme) => {
    const root = document.documentElement;
    
    // Apply all theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });

    // Update dark/light mode class
    if (theme.isLight) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  };

  const handleThemePreview = (themeId: string) => {
    const theme = enhancedThemes.find(t => t.id === themeId);
    if (!theme) return;

    // Save original theme before preview
    saveOriginalTheme();
    
    setPreviewTheme(themeId);
    applyComprehensiveTheme(theme);

    // Auto-revert after 5 seconds if not applied
    setTimeout(() => {
      if (previewTheme === themeId) {
        handleRevertPreview();
      }
    }, 5000);
  };

  const handleThemeApply = (themeId: string) => {
    const theme = enhancedThemes.find(t => t.id === themeId);
    if (!theme) return;

    applyComprehensiveTheme(theme);
    setCurrentlyAppliedTheme(themeId);
    onThemeChange(themeId, theme);
    setPreviewTheme(null);
    setOriginalTheme(null); // Clear saved state since we're applying
  };

  const handleRevertPreview = () => {
    if (originalTheme && previewTheme) {
      const originalThemeData = enhancedThemes.find(t => t.id === originalTheme.themeId);
      if (originalThemeData) {
        applyComprehensiveTheme(originalThemeData);
      }
    }
    
    setPreviewTheme(null);
    setOriginalTheme(null);
  };

  const resetToDefault = () => {
    const defaultTheme = enhancedThemes.find(t => t.id === 'dark-default');
    if (defaultTheme) {
      handleThemeApply('dark-default');
    }
    
    setCustomColor('#6366f1');
    setHue([234]);
    setSaturation([79]);
    setLightness([67]);
    setPreviewTheme(null);
    setOriginalTheme(null);
  };

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  useEffect(() => {
    const newColor = hslToHex(hue[0], saturation[0], lightness[0]);
    setCustomColor(newColor);
  }, [hue, saturation, lightness]);

  // Initialize the currently applied theme
  useEffect(() => {
    setCurrentlyAppliedTheme(currentTheme);
  }, [currentTheme]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-blue-400" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
                <p className="text-sm text-muted-foreground">
                  Current interface mode
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onDarkModeToggle}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Enhanced Theme Collection</CardTitle>
          <div className="flex gap-2">
            {previewTheme && (
              <Button variant="outline" onClick={handleRevertPreview} size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Cancel Preview
              </Button>
            )}
            <Button variant="outline" onClick={resetToDefault} size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="presets">Theme Collection</TabsTrigger>
              <TabsTrigger value="custom">Custom Builder</TabsTrigger>
            </TabsList>

            <TabsContent value="presets" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {enhancedThemes.map((theme) => {
                  const IconComponent = theme.icon;
                  const isCurrentTheme = currentlyAppliedTheme === theme.id;
                  const isPreviewingThis = previewTheme === theme.id;
                  
                  return (
                    <Card
                      key={theme.id}
                      className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                        isCurrentTheme ? 'ring-2 ring-primary' : ''
                      } ${isPreviewingThis ? 'ring-2 ring-yellow-500' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Gradient Design Preview */}
                          <div 
                            className="h-24 rounded-lg relative overflow-hidden border-2"
                            style={{ 
                              background: theme.gradientDesign,
                              borderColor: theme.colors.border
                            }}
                          >
                            {/* Theme UI Pattern */}
                            <div className="absolute inset-2 flex flex-col gap-1 opacity-90">
                              {/* Top bar */}
                              <div 
                                className="h-2 rounded-full"
                                style={{ backgroundColor: theme.colors.card, opacity: 0.8 }}
                              />
                              {/* Content rows */}
                              <div className="flex gap-1">
                                <div 
                                  className="h-3 w-8 rounded"
                                  style={{ backgroundColor: theme.colors.primary }}
                                />
                                <div 
                                  className="h-3 w-6 rounded"
                                  style={{ backgroundColor: theme.colors.secondary }}
                                />
                                <div 
                                  className="h-3 w-4 rounded"
                                  style={{ backgroundColor: theme.colors.accent }}
                                />
                              </div>
                              {/* Bottom element */}
                              <div 
                                className="h-2 w-12 rounded mt-auto"
                                style={{ backgroundColor: theme.colors.muted }}
                              />
                            </div>
                            
                            {/* Status indicators */}
                            <div className="absolute top-2 right-2 flex gap-1">
                              {isCurrentTheme && (
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <Check className="h-2 w-2 text-white" />
                                </div>
                              )}
                              {isPreviewingThis && (
                                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                                  <Eye className="h-2 w-2 text-white" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Theme Info */}
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <h3 className="font-medium text-sm">{theme.name}</h3>
                              </div>
                              <Badge variant={theme.isLight ? 'outline' : 'secondary'} className="text-xs">
                                {theme.isLight ? 'Light' : 'Dark'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{theme.description}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isPreviewingThis) {
                                  handleRevertPreview();
                                } else {
                                  handleThemePreview(theme.id);
                                }
                              }}
                            >
                              {isPreviewingThis ? (
                                <>
                                  <RotateCcw className="h-3 w-3 mr-1" />
                                  Cancel
                                </>
                              ) : (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </>
                              )}
                            </Button>
                            <Button
                              variant={isCurrentTheme ? "secondary" : "default"}
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleThemeApply(theme.id);
                              }}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              {isCurrentTheme ? 'Active' : 'Apply'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Custom Color Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-20 h-20 rounded-lg border-4 border-white shadow-lg"
                        style={{ backgroundColor: customColor }}
                      />
                      <div className="flex-1">
                        <Label htmlFor="hex-input">Hex Color</Label>
                        <Input
                          id="hex-input"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          placeholder="#6366f1"
                          className="font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Hue: {hue[0]}°</Label>
                        <Slider
                          value={hue}
                          onValueChange={setHue}
                          max={360}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label>Saturation: {saturation[0]}%</Label>
                        <Slider
                          value={saturation}
                          onValueChange={setSaturation}
                          max={100}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label>Lightness: {lightness[0]}%</Label>
                        <Slider
                          value={lightness}
                          onValueChange={setLightness}
                          max={80}
                          min={20}
                          step={1}
                        />
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        // Custom theme application logic here
                        console.log('Apply custom theme:', customColor);
                      }}
                    >
                      <Paintbrush className="h-4 w-4 mr-2" />
                      Create Custom Theme
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Preview Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 border-2 border-dashed rounded-lg space-y-4">
                      <p className="text-sm font-medium">Custom Theme Preview:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div 
                          className="h-12 rounded flex items-center justify-center text-xs font-medium text-white"
                          style={{ backgroundColor: customColor }}
                        >
                          Primary Color
                        </div>
                        <div 
                          className="h-12 rounded flex items-center justify-center text-xs font-medium border"
                          style={{ borderColor: customColor }}
                        >
                          Accent
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Preview Status */}
      {previewTheme && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <CardContent className="p-4 flex items-center gap-3">
              <Eye className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Previewing Theme</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {enhancedThemes.find(t => t.id === previewTheme)?.name}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleRevertPreview}
                  className="border-yellow-600 text-yellow-800 hover:bg-yellow-100"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleThemeApply(previewTheme)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}