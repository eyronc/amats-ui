import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Palette, Eye } from 'lucide-react';

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

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const presetThemes = [
    {
      name: 'Dark Purple (Default)',
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
      name: 'Midnight Black',
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
    },
    {
      name: 'Dark Cyan',
      theme: {
        primary: '#0e7490',
        secondary: '#0891b2',
        accent: '#1f2937',
        background: '#0c1117',
        surface: '#1e293b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#dc2626'
      }
    }
  ];

  const applyTheme = (theme: ColorTheme) => {
    onThemeChange(theme);
    
    // Apply to CSS custom properties for immediate visual feedback
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--card', theme.surface);
    root.style.setProperty('--surface', theme.surface);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Selector
          </CardTitle>
          <p className="text-muted-foreground">
            Choose a color theme for your A.M.A.T.S. interface
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Theme Display */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Current Theme
            </h3>
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-muted/30">
              <div className="flex space-x-1">
                <div 
                  className="w-4 h-4 rounded-full border border-white/20" 
                  style={{ backgroundColor: currentTheme.primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20" 
                  style={{ backgroundColor: currentTheme.secondary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20" 
                  style={{ backgroundColor: currentTheme.accent }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Active Theme</p>
                <p className="text-xs text-muted-foreground">Primary: {currentTheme.primary}</p>
              </div>
            </div>
          </div>

          {/* Theme Presets */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Available Themes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presetThemes.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-start hover:scale-[1.02] transition-transform"
                  onClick={() => applyTheme(preset.theme)}
                >
                  <div className="w-full space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white/20" 
                          style={{ backgroundColor: preset.theme.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white/20" 
                          style={{ backgroundColor: preset.theme.secondary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white/20" 
                          style={{ backgroundColor: preset.theme.accent }}
                        />
                      </div>
                      <span className="text-sm font-medium">{preset.name}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Primary: {preset.theme.primary}</span>
                      {currentTheme.primary === preset.theme.primary && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Info */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Eye className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium text-blue-900">Theme Changes</div>
                <p className="text-blue-700 mt-1">
                  Theme changes are applied immediately across the entire application. 
                  The selected theme will persist during your session.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}