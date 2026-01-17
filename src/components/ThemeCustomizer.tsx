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
  Upload
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
}

interface ThemeCustomizerProps {
  currentTheme: string;
  onThemeChange: (themeId: string, customColors?: any) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const predefinedThemes: Theme[] = [
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
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)'
  },
  {
    id: 'retro-raincloud',
    name: 'Retro Raincloud',
    description: 'Cool grays with purple undertones',
    colors: {
      primary: '#6B7280',
      secondary: '#9CA3AF',
      background: '#F9FAFB',
      card: '#FFFFFF',
      accent: '#D1D5DB'
    },
    gradient: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)'
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
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)'
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    description: 'Warm oranges and golden yellows',
    colors: {
      primary: '#EA580C',
      secondary: '#FB923C',
      background: '#FFF7ED',
      card: '#FFFFFF',
      accent: '#FED7AA'
    },
    gradient: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)'
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    description: 'Soft pastels and dreamy hues',
    colors: {
      primary: '#A855F7',
      secondary: '#C084FC',
      background: '#FAF5FF',
      card: '#FFFFFF',
      accent: '#E9D5FF'
    },
    gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)'
  },
  {
    id: 'lofi-vibes',
    name: 'LoFi Vibes',
    description: 'Muted browns and warm neutrals',
    colors: {
      primary: '#92400E',
      secondary: '#B45309',
      background: '#FEF3C7',
      card: '#FFFFFF',
      accent: '#FDE68A'
    },
    gradient: 'linear-gradient(135deg, #92400E 0%, #B45309 100%)'
  },
  {
    id: 'desert-khaki',
    name: 'Desert Khaki',
    description: 'Earth tones and sandy beiges',
    colors: {
      primary: '#A16207',
      secondary: '#CA8A04',
      background: '#FFFBEB',
      card: '#FFFFFF',
      accent: '#FEF3C7'
    },
    gradient: 'linear-gradient(135deg, #A16207 0%, #CA8A04 100%)'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Deep oranges and warm reds',
    colors: {
      primary: '#DC2626',
      secondary: '#F87171',
      background: '#FEF2F2',
      card: '#FFFFFF',
      accent: '#FECACA'
    },
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F87171 100%)'
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
    gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)'
  },
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
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
  },
  {
    id: 'crimson-moon',
    name: 'Crimson Moon',
    description: 'Deep reds with dark undertones',
    colors: {
      primary: '#B91C1C',
      secondary: '#DC2626',
      background: '#1F1F1F',
      card: '#262626',
      accent: '#7F1D1D'
    },
    gradient: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)'
  },
  {
    id: 'midnight-blurple',
    name: 'Midnight Blurple',
    description: 'Discord-inspired dark theme',
    colors: {
      primary: '#5865F2',
      secondary: '#7289DA',
      background: '#2F3136',
      card: '#36393F',
      accent: '#4F545C'
    },
    gradient: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)'
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'Rusty reds and martian landscape',
    colors: {
      primary: '#C2410C',
      secondary: '#EA580C',
      background: '#1C1917',
      card: '#292524',
      accent: '#7C2D12'
    },
    gradient: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)'
  },
  {
    id: 'dusk',
    name: 'Dusk',
    description: 'Purple twilight hues',
    colors: {
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      background: '#1E1B4B',
      card: '#312E81',
      accent: '#6366F1'
    },
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)'
  },
  {
    id: 'under-the-sea',
    name: 'Under the Sea',
    description: 'Ocean blues and aqua tones',
    colors: {
      primary: '#0891B2',
      secondary: '#06B6D4',
      background: '#164E63',
      card: '#155E75',
      accent: '#0E7490'
    },
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)'
  },
  {
    id: 'retro-storm',
    name: 'Retro Storm',
    description: 'Stormy grays with electric accents',
    colors: {
      primary: '#374151',
      secondary: '#6B7280',
      background: '#111827',
      card: '#1F2937',
      accent: '#4B5563'
    },
    gradient: 'linear-gradient(135deg, #374151 0%, #6B7280 100%)'
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
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
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
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)'
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Northern lights inspired colors',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      background: '#064E3B',
      card: '#065F46',
      accent: '#047857'
    },
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 50%, #3B82F6 100%)'
  }
];

export function ThemeCustomizer({ 
  currentTheme, 
  onThemeChange, 
  isDarkMode, 
  onDarkModeToggle 
}: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState('presets');
  const [customColor, setCustomColor] = useState('#4C1D95');
  const [colorIntensity, setColorIntensity] = useState([74]);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);

  // Color picker state
  const [hue, setHue] = useState([270]);
  const [saturation, setSaturation] = useState([65]);
  const [lightness, setLightness] = useState([50]);

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    generateThemeFromColor(color);
  };

  const generateThemeFromColor = (baseColor: string) => {
    // Convert hex to HSL and generate complementary colors
    const customTheme = generateColorPalette(baseColor, colorIntensity[0]);
    onThemeChange('custom', customTheme);
  };

  const generateColorPalette = (baseColor: string, intensity: number) => {
    // This is a simplified color palette generator
    // In a real app, you'd use a more sophisticated color theory algorithm
    const intensityFactor = intensity / 100;
    
    return {
      primary: baseColor,
      secondary: adjustColorBrightness(baseColor, 20),
      background: isDarkMode ? '#0F0F0F' : '#FFFFFF',
      card: isDarkMode ? '#1A1A1A' : '#FFFFFF',
      accent: adjustColorBrightness(baseColor, isDarkMode ? -20 : 40)
    };
  };

  const adjustColorBrightness = (hex: string, percent: number) => {
    // Simple brightness adjustment
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const B = (num >> 8 & 0x00FF) + amt;
    const G = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
      (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + 
      (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
  };

  const handleHslChange = () => {
    const h = hue[0];
    const s = saturation[0];
    const l = lightness[0];
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

  useEffect(() => {
    handleHslChange();
  }, [hue, saturation, lightness]);

  const exportTheme = () => {
    const themeData = {
      id: 'custom-export',
      name: 'My Custom Theme',
      colors: generateColorPalette(customColor, colorIntensity[0]),
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(themeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'amats-custom-theme.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Theme Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
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
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
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
                    onClick={() => onThemeChange(theme.id)}
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
                          <h3 className="font-medium">{theme.name}</h3>
                          <p className="text-sm text-muted-foreground">{theme.description}</p>
                        </div>

                        {/* Preview Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTheme(theme.id);
                            setTimeout(() => setPreviewTheme(null), 3000);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-2" />
                          Preview
                        </Button>
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
                  <CardHeader>
                    <CardTitle className="text-lg">Color Picker</CardTitle>
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
                          placeholder="#4C1D95"
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
                        <Label>Lightness: {lightness[0]}%</Label>
                        <Slider
                          value={lightness}
                          onValueChange={setLightness}
                          max={100}
                          step={1}
                          className="w-full"
                        />
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
                        Apply Theme
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setCustomColor('#4C1D95');
                          setColorIntensity([74]);
                          setHue([270]);
                          setSaturation([65]);
                          setLightness([50]);
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={exportTheme}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Theme
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