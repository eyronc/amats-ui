import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { 
  Palette,
  RotateCcw,
  Eye,
  Sparkles,
  Download,
  Upload
} from 'lucide-react';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  success: string;
  warning: string;
  error: string;
}

interface ColorThemePickerProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export function ColorThemePicker({ currentTheme, onThemeChange }: ColorThemePickerProps) {
  const [activeColor, setActiveColor] = useState<keyof ColorTheme>('primary');
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(70);
  const [lightness, setLightness] = useState(50);

  const presetThemes = [
    {
      name: 'Dark Purple',
      theme: {
        primary: '#4c1d95',
        secondary: '#2d1b69',
        accent: '#374151',
        background: '#0f0f0f',
        surface: '#1a1a1a',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#dc2626'
      }
    },
    {
      name: 'Deep Blue',
      theme: {
        primary: '#1e3a8a',
        secondary: '#1e40af',
        accent: '#1f2937',
        background: '#111827',
        surface: '#1f2937',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    },
    {
      name: 'Dark Green',
      theme: {
        primary: '#14532d',
        secondary: '#166534',
        accent: '#1f2937',
        background: '#0f172a',
        surface: '#1e293b',
        success: '#22c55e',
        warning: '#eab308',
        error: '#dc2626'
      }
    },
    {
      name: 'Midnight',
      theme: {
        primary: '#374151',
        secondary: '#4b5563',
        accent: '#1f2937',
        background: '#000000',
        surface: '#111111',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    },
    {
      name: 'Dark Red',
      theme: {
        primary: '#991b1b',
        secondary: '#dc2626',
        accent: '#1f2937',
        background: '#1a1a1a',
        surface: '#262626',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#b91c1c'
      }
    }
  ];

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
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

  const updateColorFromSliders = (newHue?: number, newSat?: number, newLight?: number) => {
    const finalHue = newHue !== undefined ? newHue : hue;
    const finalSat = newSat !== undefined ? newSat : saturation;
    const finalLight = newLight !== undefined ? newLight : lightness;
    
    const newHex = hslToHex(finalHue, finalSat, finalLight);
    const newTheme = { ...currentTheme, [activeColor]: newHex };
    onThemeChange(newTheme);
  };

  const handleColorSelect = (colorKey: keyof ColorTheme) => {
    setActiveColor(colorKey);
    const hsl = hexToHsl(currentTheme[colorKey]);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
  };

  const handleHexInput = (hex: string, colorKey: keyof ColorTheme) => {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      const newTheme = { ...currentTheme, [colorKey]: hex };
      onThemeChange(newTheme);
    }
  };

  const applyPresetTheme = (preset: ColorTheme) => {
    onThemeChange(preset);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Theme Designer
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize your A.M.A.T.S. interface colors with precision control
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preset Themes */}
          <div className="space-y-3">
            <Label>Quick Presets</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {presetThemes.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 p-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => applyPresetTheme(preset.theme)}
                >
                  <div className="w-full space-y-1">
                    <div className="flex space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.theme.primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.theme.secondary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.theme.accent }}
                      />
                    </div>
                    <div className="text-xs font-medium">{preset.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-3">
            <Label>Current Palette</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(currentTheme).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Button
                    variant={activeColor === key ? "default" : "outline"}
                    className="w-full h-16 p-2 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleColorSelect(key as keyof ColorTheme)}
                  >
                    <div className="w-full space-y-1">
                      <div 
                        className="w-full h-8 rounded border-2 border-white shadow-sm" 
                        style={{ backgroundColor: value }}
                      />
                      <div className="text-xs font-medium capitalize">{key}</div>
                    </div>
                  </Button>
                  
                  <Input
                    value={value}
                    onChange={(e) => handleHexInput(e.target.value, key as keyof ColorTheme)}
                    className="text-xs text-center font-mono"
                    placeholder="#000000"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Color Grading Sliders */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <Label>Fine-tune: {activeColor}</Label>
              <Input
                value={currentTheme[activeColor]}
                onChange={(e) => handleHexInput(e.target.value, activeColor)}
                className="ml-auto w-24 text-xs text-center font-mono"
                placeholder="#000000"
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Hue</Label>
                  <span className="text-sm text-muted-foreground">{hue}°</span>
                </div>
                <Slider
                  value={[hue]}
                  onValueChange={(value) => {
                    setHue(value[0]);
                    updateColorFromSliders();
                  }}
                  max={360}
                  min={0}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Saturation</Label>
                  <span className="text-sm text-muted-foreground">{saturation}%</span>
                </div>
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => {
                    setSaturation(value[0]);
                    updateColorFromSliders();
                  }}
                  max={100}
                  min={0}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Lightness</Label>
                  <span className="text-sm text-muted-foreground">{lightness}%</span>
                </div>
                <Slider
                  value={[lightness]}
                  onValueChange={(value) => {
                    setLightness(value[0]);
                    updateColorFromSliders();
                  }}
                  max={100}
                  min={0}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-4 p-3 rounded border-2" style={{ backgroundColor: hslToHex(hue, saturation, lightness) }}>
              <div className="text-center text-white font-medium drop-shadow">
                Live Preview
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => applyPresetTheme(presetThemes[0].theme)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            
            <Button 
              size="sm" 
              className="cursor-pointer hover:scale-105 transition-transform ml-auto"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Apply Theme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}