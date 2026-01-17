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
    name: 'Dark',
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
    gradientDesign: 'linear-gradient(135deg, #0c1445 0%, #1a237e 20%, #283593 40%, #3949ab 60%, #5c6bc0 80%, #7986cb 100%)',
    colors: {
      background: '#0c1445',
      foreground: '#e8eaf6',
      card: '#1a237e',
      cardForeground: '#e8eaf6',
      primary: '#5c6bc0',
      primaryForeground: '#ffffff',
      secondary: '#3949ab',
      secondaryForeground: '#ffffff',
      accent: '#283593',
      accentForeground: '#e8eaf6',
      muted: '#1e293b',
      mutedForeground: '#c5cae9',
      border: 'rgba(92, 107, 192, 0.3)',
      input: '#1e293b',
      ring: '#5c6bc0',
      sidebar: '#1a237e',
      sidebarForeground: '#e8eaf6',
      sidebarPrimary: '#5c6bc0',
      sidebarAccent: '#1e293b',
      sidebarBorder: 'rgba(92, 107, 192, 0.3)',
      destructive: '#f48fb1',
      destructiveForeground: '#ffffff',
      success: '#81c784',
      warning: '#ffb74d',
      info: '#64b5f6'
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
  const [currentlyAppliedTheme, setCurrentlyAppliedTheme] = useState(currentTheme || 'dark-default');
  const [hue, setHue] = useState([234]);
  const [saturation, setSaturation] = useState([79]);
  const [lightness, setLightness] = useState([67]);

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

  const handleThemeApply = (themeId: string) => {
    const theme = enhancedThemes.find(t => t.id === themeId);
    if (!theme) return;

    applyComprehensiveTheme(theme);
    setCurrentlyAppliedTheme(themeId);
    onThemeChange(themeId, theme);
  };

  const resetToDefault = () => {
    const defaultTheme = enhancedThemes.find(t => t.id === 'dark-default');
    if (defaultTheme) {
      handleThemeApply('dark-default');
    }
  };

  const generateCustomTheme = () => {
    const h = hue[0];
    const s = saturation[0];
    const l = lightness[0];
    
    const primary = `hsl(${h}, ${s}%, ${l}%)`;
    const secondary = `hsl(${h}, ${s - 20}%, ${l - 20}%)`;
    const accent = `hsl(${h}, ${s - 30}%, ${l - 30}%)`;
    
    const customTheme: EnhancedTheme = {
      id: 'custom',
      name: 'Custom',
      description: 'Your custom theme',
      icon: Paintbrush,
      isLight: false,
      gradientDesign: `linear-gradient(135deg, hsl(${h}, ${s}%, ${l - 40}%) 0%, hsl(${h}, ${s}%, ${l - 20}%) 50%, hsl(${h}, ${s}%, ${l}%) 100%)`,
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        card: '#111111',
        cardForeground: '#ffffff',
        primary: primary,
        primaryForeground: '#ffffff',
        secondary: secondary,
        secondaryForeground: '#ffffff',
        accent: accent,
        accentForeground: '#ffffff',
        muted: '#1f1f1f',
        mutedForeground: '#9ca3af',
        border: `${primary}33`,
        input: '#1f1f1f',
        ring: primary,
        sidebar: '#111111',
        sidebarForeground: '#ffffff',
        sidebarPrimary: primary,
        sidebarAccent: '#1f1f1f',
        sidebarBorder: `${primary}33`,
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        success: '#22c55e',
        warning: '#f59e0b',
        info: '#3b82f6'
      }
    };

    applyComprehensiveTheme(customTheme);
    setCurrentlyAppliedTheme('custom');
    onThemeChange('custom', customTheme);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Themes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the appearance of your A.M.A.T.S. interface
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="presets">Theme Presets</TabsTrigger>
          <TabsTrigger value="custom">Custom Theme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="presets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enhancedThemes.map((theme) => {
              const Icon = theme.icon;
              const isActive = currentlyAppliedTheme === theme.id;
              
              return (
                <Card 
                  key={theme.id} 
                  className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                    isActive ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">{theme.name}</CardTitle>
                        {isActive && (
                          <Badge variant="default" className="text-xs px-2 py-0.5">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {theme.isLight ? 'Light' : 'Dark'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Theme Preview */}
                    <div 
                      className="h-16 rounded-md border overflow-hidden"
                      style={{ background: theme.gradientDesign }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <div className="text-xs text-white font-medium bg-black/20 px-2 py-1 rounded">
                          Preview
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {theme.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      className="w-full" 
                      onClick={() => handleThemeApply(theme.id)}
                      variant={isActive ? "secondary" : "default"}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5" />
                Custom Theme Builder
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Create your own theme using HSL color controls
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Hue: {hue[0]}°</Label>
                  <Slider
                    value={hue}
                    onValueChange={setHue}
                    max={360}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Saturation: {saturation[0]}%</Label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Lightness: {lightness[0]}%</Label>
                  <Slider
                    value={lightness}
                    onValueChange={setLightness}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Primary Color Preview</Label>
                  <div 
                    className="w-full h-12 rounded-md border"
                    style={{ backgroundColor: `hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={generateCustomTheme} className="flex-1">
                  <Paintbrush className="h-4 w-4 mr-2" />
                  Apply Custom Theme
                </Button>
                <Button variant="outline" onClick={resetToDefault}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}