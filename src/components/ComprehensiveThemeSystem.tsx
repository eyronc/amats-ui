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
  Leaf
} from 'lucide-react';

interface ComprehensiveTheme {
  id: string;
  name: string;
  description: string;
  icon: any;
  colors: {
    // Main colors
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    
    // Primary colors
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    
    // Accent and muted
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    
    // Interactive elements
    border: string;
    input: string;
    ring: string;
    
    // Sidebar
    sidebar: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarAccent: string;
    sidebarBorder: string;
    
    // Status colors
    destructive: string;
    destructiveForeground: string;
    success: string;
    warning: string;
    info: string;
  };
  gradient?: string;
  isLight: boolean;
}

interface ComprehensiveThemeSystemProps {
  currentTheme: string;
  onThemeChange: (themeId: string, customColors?: any) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const comprehensiveThemes: ComprehensiveTheme[] = [
  // Dark Themes
  {
    id: 'dark-default',
    name: 'Dark Default',
    description: 'Professional dark theme with indigo accents',
    icon: Moon,
    isLight: false,
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
      border: 'rgba(255, 255, 255, 0.1)',
      input: '#1f1f1f',
      ring: '#6366f1',
      sidebar: '#111111',
      sidebarForeground: '#ffffff',
      sidebarPrimary: '#6366f1',
      sidebarAccent: '#1f1f1f',
      sidebarBorder: 'rgba(255, 255, 255, 0.1)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    gradient: 'linear-gradient(135deg, #6366f1 0%, #1e1b4b 100%)'
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Mystical aurora colors with cosmic gradients',
    icon: Sparkles,
    isLight: false,
    colors: {
      background: '#0a0118',
      foreground: '#e0f2fe',
      card: '#1a0b2e',
      cardForeground: '#e0f2fe',
      primary: '#00d4ff',
      primaryForeground: '#0a0118',
      secondary: '#9333ea',
      secondaryForeground: '#ffffff',
      accent: '#16213e',
      accentForeground: '#e0f2fe',
      muted: '#2a1a3e',
      mutedForeground: '#94a3b8',
      border: 'rgba(0, 212, 255, 0.2)',
      input: '#2a1a3e',
      ring: '#00d4ff',
      sidebar: '#1a0b2e',
      sidebarForeground: '#e0f2fe',
      sidebarPrimary: '#00d4ff',
      sidebarAccent: '#2a1a3e',
      sidebarBorder: 'rgba(0, 212, 255, 0.2)',
      destructive: '#ff4081',
      destructiveForeground: '#ffffff',
      success: '#4ade80',
      warning: '#fbbf24',
      info: '#00d4ff'
    },
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #4ade80 100%)'
  },
  {
    id: 'crimson-moon',
    name: 'Crimson Moon',
    description: 'Deep crimson reds with dark mystique',
    icon: Flame,
    isLight: false,
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
      mutedForeground: '#a78bfa',
      border: 'rgba(220, 38, 38, 0.2)',
      input: '#2f1010',
      ring: '#dc2626',
      sidebar: '#1f0000',
      sidebarForeground: '#fee2e2',
      sidebarPrimary: '#dc2626',
      sidebarAccent: '#2f1010',
      sidebarBorder: 'rgba(220, 38, 38, 0.2)',
      destructive: '#f87171',
      destructiveForeground: '#ffffff',
      success: '#34d399',
      warning: '#fbbf24',
      info: '#60a5fa'
    },
    gradient: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)'
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Deep ocean blues with aquatic vibes',
    icon: Waves,
    isLight: false,
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
      mutedForeground: '#94a3b8',
      border: 'rgba(8, 145, 178, 0.2)',
      input: '#083344',
      ring: '#0891b2',
      sidebar: '#002244',
      sidebarForeground: '#cffafe',
      sidebarPrimary: '#0891b2',
      sidebarAccent: '#083344',
      sidebarBorder: 'rgba(8, 145, 178, 0.2)',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#10b981',
      warning: '#f59e0b',
      info: '#06b6d4'
    },
    gradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)'
  },
  
  // Light Themes
  {
    id: 'light-default',
    name: 'Light Default',
    description: 'Clean light theme with blue accents',
    icon: Sun,
    isLight: true,
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff',
      cardForeground: '#0f172a',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0f172a',
      accent: '#f8fafc',
      accentForeground: '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      input: '#ffffff',
      ring: '#3b82f6',
      sidebar: '#ffffff',
      sidebarForeground: '#0f172a',
      sidebarPrimary: '#3b82f6',
      sidebarAccent: '#f8fafc',
      sidebarBorder: '#e2e8f0',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
  },
  {
    id: 'forest-light',
    name: 'Forest Light',
    description: 'Natural green theme with forest vibes',
    icon: Leaf,
    isLight: true,
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
      mutedForeground: '#4b5563',
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
    },
    gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
  },
  {
    id: 'sunset-light',
    name: 'Sunset Light',
    description: 'Warm sunset oranges and yellows',
    icon: Sun,
    isLight: true,
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
      mutedForeground: '#4b5563',
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
    },
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    description: 'Soft pink cherry blossom theme',
    icon: Sparkles,
    isLight: true,
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
      mutedForeground: '#4b5563',
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
    },
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
  }
];

export function ComprehensiveThemeSystem({ 
  currentTheme, 
  onThemeChange, 
  isDarkMode, 
  onDarkModeToggle 
}: ComprehensiveThemeSystemProps) {
  const [activeTab, setActiveTab] = useState('presets');
  const [customColor, setCustomColor] = useState('#6366f1');
  const [colorIntensity, setColorIntensity] = useState([74]);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [hue, setHue] = useState([234]);
  const [saturation, setSaturation] = useState([79]);
  const [lightness, setLightness] = useState([67]);

  const applyComprehensiveTheme = (theme: ComprehensiveTheme) => {
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

  const generateCustomTheme = (baseColor: string, isLight: boolean = false): ComprehensiveTheme => {
    const adjustColor = (hex: string, lightness: number, saturation?: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      // Convert to HSL
      const max = Math.max(r, g, b) / 255;
      const min = Math.min(r, g, b) / 255;
      const diff = max - min;
      
      let h = 0;
      if (diff !== 0) {
        if (max === r/255) h = (60 * ((g/255 - b/255) / diff) + 360) % 360;
        else if (max === g/255) h = (60 * ((b/255 - r/255) / diff) + 120) % 360;
        else h = (60 * ((r/255 - g/255) / diff) + 240) % 360;
      }
      
      const l = lightness / 100;
      const s = (saturation || saturation === 0) ? saturation / 100 : (diff === 0 ? 0 : diff / (1 - Math.abs(2 * ((max + min) / 2) - 1)));
      
      // Convert back to RGB
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      
      let rNew, gNew, bNew;
      if (h >= 0 && h < 60) { rNew = c; gNew = x; bNew = 0; }
      else if (h >= 60 && h < 120) { rNew = x; gNew = c; bNew = 0; }
      else if (h >= 120 && h < 180) { rNew = 0; gNew = c; bNew = x; }
      else if (h >= 180 && h < 240) { rNew = 0; gNew = x; bNew = c; }
      else if (h >= 240 && h < 300) { rNew = x; gNew = 0; bNew = c; }
      else { rNew = c; gNew = 0; bNew = x; }
      
      const finalR = Math.round((rNew + m) * 255);
      const finalG = Math.round((gNew + m) * 255);
      const finalB = Math.round((bNew + m) * 255);
      
      return `#${finalR.toString(16).padStart(2, '0')}${finalG.toString(16).padStart(2, '0')}${finalB.toString(16).padStart(2, '0')}`;
    };

    if (isLight) {
      return {
        id: 'custom-light',
        name: 'Custom Light',
        description: 'Your custom light theme',
        icon: Sun,
        isLight: true,
        colors: {
          background: '#ffffff',
          foreground: '#0f172a',
          card: '#ffffff',
          cardForeground: '#0f172a',
          primary: baseColor,
          primaryForeground: '#ffffff',
          secondary: adjustColor(baseColor, 90, 20),
          secondaryForeground: '#0f172a',
          accent: adjustColor(baseColor, 95, 10),
          accentForeground: '#0f172a',
          muted: adjustColor(baseColor, 92, 15),
          mutedForeground: '#64748b',
          border: adjustColor(baseColor, 85, 25),
          input: '#ffffff',
          ring: baseColor,
          sidebar: '#ffffff',
          sidebarForeground: '#0f172a',
          sidebarPrimary: baseColor,
          sidebarAccent: adjustColor(baseColor, 95, 10),
          sidebarBorder: adjustColor(baseColor, 85, 25),
          destructive: '#ef4444',
          destructiveForeground: '#ffffff',
          success: '#22c55e',
          warning: '#f59e0b',
          info: '#3b82f6'
        }
      };
    } else {
      return {
        id: 'custom-dark',
        name: 'Custom Dark',
        description: 'Your custom dark theme',
        icon: Moon,
        isLight: false,
        colors: {
          background: '#000000',
          foreground: '#ffffff',
          card: '#111111',
          cardForeground: '#ffffff',
          primary: baseColor,
          primaryForeground: '#ffffff',
          secondary: adjustColor(baseColor, 15, 80),
          secondaryForeground: '#ffffff',
          accent: adjustColor(baseColor, 10, 40),
          accentForeground: '#ffffff',
          muted: '#1f1f1f',
          mutedForeground: '#9ca3af',
          border: `${baseColor}33`,
          input: '#1f1f1f',
          ring: baseColor,
          sidebar: '#111111',
          sidebarForeground: '#ffffff',
          sidebarPrimary: baseColor,
          sidebarAccent: '#1f1f1f',
          sidebarBorder: `${baseColor}33`,
          destructive: '#ef4444',
          destructiveForeground: '#ffffff',
          success: '#22c55e',
          warning: '#f59e0b',
          info: '#3b82f6'
        }
      };
    }
  };

  const handleThemePreview = (themeId: string) => {
    const theme = comprehensiveThemes.find(t => t.id === themeId);
    if (!theme) return;

    setPreviewTheme(themeId);
    applyComprehensiveTheme(theme);

    setTimeout(() => {
      setPreviewTheme(null);
    }, 3000);
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = comprehensiveThemes.find(t => t.id === themeId);
    if (!theme) return;

    applyComprehensiveTheme(theme);
    onThemeChange(themeId, theme);
    setPreviewTheme(null);
  };

  const handleCustomColorApply = () => {
    const customTheme = generateCustomTheme(customColor, !isDarkMode);
    applyComprehensiveTheme(customTheme);
    onThemeChange('custom', customTheme);
  };

  const resetToDefault = () => {
    const defaultTheme = comprehensiveThemes.find(t => t.id === 'dark-default');
    if (defaultTheme) {
      handleThemeSelect('dark-default');
    }
    
    setCustomColor('#6366f1');
    setHue([234]);
    setSaturation([79]);
    setLightness([67]);
    setColorIntensity([74]);
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
          <CardTitle>Comprehensive Themes</CardTitle>
          <Button variant="outline" onClick={resetToDefault} size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="presets">Theme Presets</TabsTrigger>
              <TabsTrigger value="custom">Custom Theme</TabsTrigger>
            </TabsList>

            <TabsContent value="presets" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {comprehensiveThemes.map((theme) => {
                  const IconComponent = theme.icon;
                  return (
                    <Card
                      key={theme.id}
                      className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                        currentTheme === theme.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Theme Preview */}
                          <div 
                            className="h-20 rounded-lg relative overflow-hidden border"
                            style={{ 
                              background: theme.gradient || theme.colors.primary,
                              backgroundColor: theme.colors.background
                            }}
                          >
                            {/* Preview UI Elements */}
                            <div className="absolute inset-2 flex flex-col gap-1">
                              <div 
                                className="h-2 rounded"
                                style={{ backgroundColor: theme.colors.card }}
                              />
                              <div className="flex gap-1">
                                <div 
                                  className="h-2 w-8 rounded"
                                  style={{ backgroundColor: theme.colors.primary }}
                                />
                                <div 
                                  className="h-2 w-6 rounded"
                                  style={{ backgroundColor: theme.colors.secondary }}
                                />
                                <div 
                                  className="h-2 w-4 rounded"
                                  style={{ backgroundColor: theme.colors.accent }}
                                />
                              </div>
                            </div>
                            
                            {currentTheme === theme.id && (
                              <div className="absolute top-2 right-2">
                                <Check className="h-4 w-4 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </div>

                          {/* Theme Info */}
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <h3 className="font-medium">{theme.name}</h3>
                              </div>
                              <Badge variant={theme.isLight ? 'outline' : 'secondary'} className="text-xs">
                                {theme.isLight ? 'Light' : 'Dark'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{theme.description}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleThemePreview(theme.id);
                              }}
                            >
                              <Eye className="h-3 w-3 mr-2" />
                              Preview
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleThemeSelect(theme.id);
                              }}
                            >
                              <Check className="h-3 w-3 mr-2" />
                              Apply
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
                    <CardTitle className="text-lg">Color Builder</CardTitle>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Theme Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button
                        className="w-full"
                        onClick={handleCustomColorApply}
                      >
                        <Paintbrush className="h-4 w-4 mr-2" />
                        Apply Custom Theme
                      </Button>
                      
                      <div className="p-4 border rounded-lg space-y-3">
                        <p className="text-sm font-medium">Preview:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div 
                            className="h-8 rounded flex items-center justify-center text-xs"
                            style={{ 
                              backgroundColor: customColor,
                              color: '#ffffff'
                            }}
                          >
                            Primary
                          </div>
                          <div 
                            className="h-8 rounded flex items-center justify-center text-xs border"
                            style={{ 
                              backgroundColor: isDarkMode ? '#111111' : '#ffffff',
                              borderColor: customColor
                            }}
                          >
                            Card
                          </div>
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

      {/* Preview Notification */}
      {previewTheme && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <Card className="border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <Eye className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Previewing Theme</p>
                <p className="text-sm text-muted-foreground">
                  {comprehensiveThemes.find(t => t.id === previewTheme)?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}