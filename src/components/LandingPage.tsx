import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ColorThemePicker } from './ColorThemePicker';
import { 
  Eye, 
  Car, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Shield,
  AlertTriangle,
  Activity,
  Camera,
  Clock,
  Settings,
  BarChart3
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [showThemePicker, setShowThemePicker] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden transition-all duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  A.M.A.T.S.
                </h1>
                <p className="text-sm text-muted-foreground">Driver Drowsiness Detection System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="hover:scale-105 transition-transform"
              >
                <Settings className="h-4 w-4 mr-2" />
                Themes
              </Button>
            </div>
          </header>

          {/* Theme Picker */}
          {showThemePicker && (
            <div className="mb-8 animate-slide-down">
              <ColorThemePicker 
                currentTheme={{
                  primary: '#4c1d95',
                  secondary: '#2d1b69',
                  accent: '#374151',
                  background: '#0f0f0f',
                  surface: '#1a1a1a',
                  success: '#10b981',
                  warning: '#f59e0b',
                  error: '#dc2626'
                }}
                onThemeChange={() => {}}
              />
            </div>
          )}

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 border-indigo-300 animate-pulse">
                  🚗 Driver Safety Platform
                </Badge>
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Advanced Driver{' '}
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Safety System
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  AI-powered drowsiness detection that monitors driver alertness in real-time. 
                  Protect your drivers, fleet, and passengers with cutting-edge safety technology.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-card/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-sm sm:text-base">Real-time Monitoring</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-card/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-sm sm:text-base">Instant Alerts</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-card/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-sm sm:text-base">Fleet Management</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-card/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-sm sm:text-base">Analytics Dashboard</span>
                </div>
              </div>

              {/* Centered Buttons */}
              <div className="flex flex-col items-center space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="lg" 
                    onClick={onGetStarted}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-lg px-8 py-6 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline" 
                    onClick={onLogin} 
                    className="w-full sm:w-auto hover:scale-105 transition-transform px-8 py-6"
                  >
                    Sign In
                  </Button>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Trusted by 3,000+ drivers</div>
                    <div className="text-muted-foreground">across 150+ fleets</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-card/10 backdrop-blur-lg rounded-2xl p-8 border border-border shadow-2xl transform hover:scale-[1.02] transition-transform">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Live System Status</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-card/20 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Car className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium">Active Drivers</span>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">2,847</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-indigo-500 h-2 rounded-full w-[92%] animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="bg-card/20 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Safety Score</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">94.2%</div>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-600">Excellent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Recent Activity</span>
                      <Activity className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Alert processed</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver safety check</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>System monitoring</span>
                        <span className="text-green-600 animate-pulse">●</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Advanced Safety Technology</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system provides comprehensive driver monitoring and fleet management 
              solutions to prevent accidents and save lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <CardTitle>For Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time drowsiness detection, fatigue alerts, and safety coaching 
                  to help you stay alert and drive safely on every journey.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>For Fleet Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor your entire fleet, track safety metrics, manage driver performance, 
                  and receive comprehensive reports on driver behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure data processing, compliance reporting, system monitoring, 
                  and enterprise-grade infrastructure for maximum reliability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">3,000+</div>
              <div className="text-muted-foreground">Active Drivers</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">96%</div>
              <div className="text-muted-foreground">Accident Reduction</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Monitoring</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-muted-foreground">Alerts Processed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Enhance Driver Safety?
            </h3>
            <p className="text-xl text-indigo-100 mb-8">
              Join A.M.A.T.S. and become part of the next generation of driver safety technology.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Start Monitoring Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-indigo-200 mt-4">Easy setup • Immediate protection</p>
          </div>
        </div>
      </section>
    </div>
  );
}