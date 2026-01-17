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
  Sliders,
  Zap,
  Download,
  Upload,
  RotateCcw
} from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    accent: string;
  };
  gradient?: string;
  isDark?: boolean;
}

interface ThemeCustomizerProps {
  currentTheme: string;
  onThemeChange: (themeId: string, customColors?: any) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const predefinedThemes: Theme[] = [
  // Dark Themes
  {
    id: 'dark-default',
    name: 'Dark Default',
    description: 'Default dark theme with purple accents',
    colors: {
      primary: '#6366f1',
      secondary: '#1e1b4b',
      background: '#000000',
      card: '#111111',
      accent: '#1f2937'
    },
    isDark: true,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #1e1b4b 100%)'
  },
  {
    id: 'crimson-moon',
    name: 'Crimson Moon',
    description: 'Deep reds with dark undertones',
    colors: {
      primary: '#B91C1C',
      secondary: '#DC2626',
      background: '#0F0F0F',
      card: '#1A1A1A',
      accent: '#7F1D1D'
    },
    isDark: true,
    gradient: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)'
  },
  {
    id: 'midnight-blurple',
    name: 'Midnight Blurple',
    description: 'Discord-inspired dark theme',
    colors: {
      primary: '#5865F2',
      secondary: '#7289DA',
      background: '#0F0F0F',
      card: '#1A1A1A',
      accent: '#4F545C'
    },
    isDark: true,
    gradient: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)'
  },
  {
    id: 'under-the-sea',
    name: 'Under the Sea',
    description: 'Ocean blues and aqua tones',
    colors: {
      primary: '#0891B2',
      secondary: '#06B6D4',
      background: '#0F0F0F',
      card: '#1A1A1A',
      accent: '#0E7490'
    },
    isDark: true,
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)'
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    description: 'Cyberpunk neon and dark backgrounds',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      background: '#0F0F0F',
      card: '#1A1A1A',
      accent: '#7C3AED'
    },
    isDark: true,
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
  },
  // Light Themes
  {
    id: 'mint-apple',
    name: 'Mint Apple',
    description: 'Fresh green with crisp highlights',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      background: '#F0FDF4',
      card: '#FFFFFF',
      accent: '#6EE7B7'
    },
    isDark: false,
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
  },
  {
    id: 'citrus-sherbert',
    name: 'Citrus Sherbert',
    description: 'Vibrant orange and yellow blend',
    colors: {
      primary: '#F59E0B',
      secondary: '#FCD34D',
      background: '#FFFBEB',
      card: '#FFFFFF',
      accent: '#FDE68A'
    },
    isDark: false,
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)'
  },
  {
    id: 'hanami',
    name: 'Hanami',
    description: 'Cherry blossom pink and soft whites',
    colors: {
      primary: '#EC4899',
      secondary: '#F472B6',
      background: '#FDF2F8',
      card: '#FFFFFF',
      accent: '#FBCFE8'
    },
    isDark: false,
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)'
  },
  {
    id: 'strawberry-lemonade',
    name: 'Strawberry Lemonade',
    description: 'Sweet pinks and citrus yellows',
    colors: {
      primary: '#F43F5E',
      secondary: '#FB7185',
      background: '#FFF1F2',
      card: '#FFFFFF',
      accent: '#FECDD3'
    },
    isDark: false,
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)'
  },
  // Additional themes...
  {
    id: 'forest',
    name: 'Forest',
    description: 'Deep greens and nature tones',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      background: '#ECFDF5',
      card: '#FFFFFF',
      accent: '#A7F3D0'
    },
    isDark: false,
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
  },
  {
    id: 'chroma-glow',
    name: 'Chroma Glow',
    description: 'Electric blues and neon accents',
    colors: {
      primary: '#2563EB',
      secondary: '#60A5FA',
      background: '#EFF6FF',
      card: '#FFFFFF',
      accent: '#DBEAFE'
    },
    isDark: false,
    gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)'
  }
];

export function ThemeCustomizer({ 
  currentTheme, 
  onThemeChange, 
  isDarkMode, 
  onDarkModeToggle 
}: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState('presets');
  const [customColor, setCustomColor] = useState('#6366f1');
  const [colorIntensity, setColorIntensity] = useState([74]);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [originalTheme, setOriginalTheme] = useState<any>(null);

  // Color picker state with safe defaults
  const [hue, setHue] = useState([234]);
  const [saturation, setSaturation] = useState([79]);
  const [lightness, setLightness] = useState([67]);

  // Save original theme on mount
  useEffect(() => {
    if (!originalTheme) {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      setOriginalTheme({
        primary: computedStyle.getPropertyValue('--primary').trim(),
        secondary: computedStyle.getPropertyValue('--secondary').trim(),
        background: computedStyle.getPropertyValue('--background').trim(),
        card: computedStyle.getPropertyValue('--card').trim(),
        accent: computedStyle.getPropertyValue('--accent').trim()
      });
    }
  }, [originalTheme]);

  const handleCustomColorChange = (color: string) => {
    // Validate hex color
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
      return; // Don't update if invalid
    }
    setCustomColor(color);
    updateHslFromHex(color);
  };

  const updateHslFromHex = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return;

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    setHue([Math.round(h * 360)]);
    setSaturation([Math.round(s * 100)]);
    setLightness([Math.round(l * 100)]);
  };

  const generateThemeFromColor = (baseColor: string) => {
    const customTheme = generateColorPalette(baseColor, colorIntensity[0]);
    applyTheme(customTheme);
    onThemeChange('custom', customTheme);
  };

  const generateColorPalette = (baseColor: string, intensity: number) => {
    const intensityFactor = Math.max(0.3, Math.min(1, intensity / 100));
    
    return {
      primary: baseColor,
      secondary: adjustColorBrightness(baseColor, isDarkMode ? -15 : 25),
      background: isDarkMode ? '#0F0F0F' : '#FFFFFF',
      card: isDarkMode ? '#1A1A1A' : '#FFFFFF',
      accent: adjustColorBrightness(baseColor, isDarkMode ? -30 : 50),
      foreground: isDarkMode ? '#F5F5F5' : '#0F0F0F',
      muted: isDarkMode ? '#262626' : '#F1F5F9',
      border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    };
  };

  const adjustColorBrightness = (hex: string, percent: number) => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse r, g, b values
    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const B = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const G = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    
    return '#' + (0x1000000 + (R << 16) + (B << 8) + G).toString(16).slice(1);
  };

  const handleHslChange = () => {
    const h = Math.max(0, Math.min(360, hue[0]));
    const s = Math.max(0, Math.min(100, saturation[0]));
    const l = Math.max(20, Math.min(80, lightness[0])); // Prevent pure white/black
    
    const hex = hslToHex(h, s, l);
    setCustomColor(hex);
    generateThemeFromColor(hex);
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

  const applyTheme = (theme: any) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value as string);
    });
  };

  const handleThemePreview = (themeId: string) => {
    const theme = predefinedThemes.find(t => t.id === themeId);
    if (!theme) return;

    setPreviewTheme(themeId);
    
    // Apply theme immediately
    applyTheme({
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      background: theme.colors.background,
      card: theme.colors.card,
      accent: theme.colors.accent,
      foreground: theme.isDark ? '#F5F5F5' : '#0F0F0F',
      muted: theme.isDark ? '#262626' : '#F1F5F9',
      border: theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    });

    // Auto-dismiss preview after 3 seconds
    setTimeout(() => {
      setPreviewTheme(null);
    }, 3000);
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = predefinedThemes.find(t => t.id === themeId);
    if (!theme) return;

    const themeColors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      background: theme.colors.background,
      card: theme.colors.card,
      accent: theme.colors.accent,
      foreground: theme.isDark ? '#F5F5F5' : '#0F0F0F',
      muted: theme.isDark ? '#262626' : '#F1F5F9',
      border: theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    };

    applyTheme(themeColors);
    onThemeChange(themeId, themeColors);
    setPreviewTheme(null);
  };

  const resetToDefault = () => {
    const defaultTheme = predefinedThemes.find(t => t.id === 'dark-default');
    if (defaultTheme) {
      handleThemeSelect('dark-default');
    }
    
    // Reset custom color picker
    setCustomColor('#6366f1');
    setHue([234]);
    setSaturation([79]);
    setLightness([67]);
    setColorIntensity([74]);
  };

  const resetColorPicker = () => {
    setCustomColor('#6366f1');
    setHue([234]);
    setSaturation([79]);
    setLightness([67]);
    setColorIntensity([74]);
    
    // Apply default custom theme
    const defaultColors = generateColorPalette('#6366f1', 74);
    applyTheme(defaultColors);
    onThemeChange('custom', defaultColors);
  };

  useEffect(() => {
    handleHslChange();
  }, [hue, saturation, lightness]);

  return (
    <div className="space-y-6">
      {/* Theme Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance Settings
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
                  {isDarkMode ? 'Easy on the eyes in low light' : 'Bright and clear interface'}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onDarkModeToggle}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Customizer */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Theme Customization</CardTitle>
          <Button variant="outline" onClick={resetToDefault} size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="presets">Theme Presets</TabsTrigger>
              <TabsTrigger value="custom">Custom Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="presets" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedThemes.map((theme) => (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                      currentTheme === theme.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Color Preview */}
                        <div 
                          className="h-16 rounded-lg relative overflow-hidden"
                          style={{ background: theme.gradient || theme.colors.primary }}
                        >
                          <div className="absolute inset-0 flex items-end p-2">
                            <div className="flex space-x-1">
                              <div 
                                className="w-3 h-3 rounded-full border border-white/50"
                                style={{ backgroundColor: theme.colors.primary }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border border-white/50"
                                style={{ backgroundColor: theme.colors.secondary }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border border-white/50"
                                style={{ backgroundColor: theme.colors.accent }}
                              />
                            </div>
                          </div>
                          {currentTheme === theme.id && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Theme Info */}
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{theme.name}</h3>
                            <Badge variant={theme.isDark ? 'secondary' : 'outline'} className="text-xs">
                              {theme.isDark ? 'Dark' : 'Light'}
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
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              {/* Color Picker Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Color Picker */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Color Picker</CardTitle>
                    <Button variant="outline" size="sm" onClick={resetColorPicker}>
                      <RotateCcw className="h-3 w-3 mr-2" />
                      Reset
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Color Preview */}
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
                          onChange={(e) => handleCustomColorChange(e.target.value)}
                          placeholder="#6366f1"
                          className="font-mono"
                        />
                      </div>
                    </div>

                    {/* HSL Sliders */}
                    <div className="space-y-4">
                      <div>
                        <Label>Hue: {hue[0]}°</Label>
                        <Slider
                          value={hue}
                          onValueChange={setHue}
                          max={360}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label>Saturation: {saturation[0]}%</Label>
                        <Slider
                          value={saturation}
                          onValueChange={setSaturation}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label>Lightness: {lightness[0]}% (Safe Range: 20-80%)</Label>
                        <Slider
                          value={lightness}
                          onValueChange={setLightness}
                          max={80}
                          min={20}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Restricted to prevent pure white/black colors
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Theme Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Color Intensity */}
                    <div>
                      <Label>Color Intensity: {colorIntensity[0]}%</Label>
                      <Slider
                        value={colorIntensity}
                        onValueChange={(value) => {
                          setColorIntensity(value);
                          generateThemeFromColor(customColor);
                        }}
                        max={100}
                        min={30}
                        step={5}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Adjusts the overall vibrancy of your theme
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => generateThemeFromColor(customColor)}
                      >
                        <Paintbrush className="h-4 w-4 mr-2" />
                        Apply Custom Theme
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={resetColorPicker}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset Colors
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 border-2 border-dashed rounded-lg space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card style={{ backgroundColor: generateColorPalette(customColor, colorIntensity[0]).card }}>
                        <CardContent className="p-4 text-center">
                          <div 
                            className="w-8 h-8 rounded-full mx-auto mb-2"
                            style={{ backgroundColor: generateColorPalette(customColor, colorIntensity[0]).primary }}
                          />
                          <p className="text-sm font-medium">Primary</p>
                        </CardContent>
                      </Card>
                      <Card style={{ backgroundColor: generateColorPalette(customColor, colorIntensity[0]).card }}>
                        <CardContent className="p-4 text-center">
                          <div 
                            className="w-8 h-8 rounded-full mx-auto mb-2"
                            style={{ backgroundColor: generateColorPalette(customColor, colorIntensity[0]).secondary }}
                          />
                          <p className="text-sm font-medium">Secondary</p>
                        </CardContent>
                      </Card>
                      <Card style={{ backgroundColor: generateColorPalette(customColor, colorIntensity[0]).card }}>
                        <CardContent className="p-4 text-center">
                          <div 
                            className="w-8 h-8 rounded-full mx-auto mb-2"
                            style={{ backgroundColor: generateColorPalette(customColor, colorIntensity[0]).accent }}
                          />
                          <p className="text-sm font-medium">Accent</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  {predefinedThemes.find(t => t.id === previewTheme)?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}