import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// Removed dropdown menu imports - using custom implementation
import { DashboardView } from './DashboardView';
import { StatisticsView } from './StatisticsView';
import { SettingsView } from './SettingsViewFixed';
import { CameraFeed } from './CameraFeed';
import { ThemeSelector } from './ThemeSelector';
import { ShopView } from './ShopViewFixed';
import { AvatarSelectionModal } from './AvatarSelectionModalFixed';
import { 
  Eye, 
  BarChart3, 
  Settings, 
  Camera,
  User,
  LogOut,
  Bell,
  Car,
  Users,
  Shield,
  ArrowLeft,
  AlertTriangle,
  Zap,
  ShoppingBag,
  Check,
  X
} from 'lucide-react';

interface AppContainerProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    userType: 'driver' | 'fleet_manager' | 'admin';
    country?: string;
    phoneNumber?: string;
    registrationDate?: string;
    isFirstLogin?: boolean;
    isActive?: boolean;
  };
  onLogout: () => void;
  registeredUsers: any[];
  analytics: {
    totalUsers: number;
    recentRegistrations: Array<{
      id: number;
      name: string;
      email: string;
      type: string;
      time: string;
    }>;
  };
}

export function AppContainer({ user, onLogout, registeredUsers, analytics }: AppContainerProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Drowsiness detected at 14:32", type: "warning", time: "2 min ago", read: false },
    { id: 2, message: "Weekly safety report available", type: "info", time: "1 hour ago", read: false },
    { id: 3, message: "Camera calibration completed", type: "success", time: "3 hours ago", read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({
    primary: '#4c1d95',
    secondary: '#2d1b69',
    accent: '#374151',
    background: '#0f0f0f',
    surface: '#1a1a1a',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#dc2626'
  });

  const handleThemeChange = (newTheme: typeof currentTheme) => {
    setCurrentTheme(newTheme);
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', newTheme.primary);
    root.style.setProperty('--secondary', newTheme.secondary);
    root.style.setProperty('--accent', newTheme.accent);
  };

  const handleBackToDashboard = () => {
    setActiveTab('dashboard');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getUserIcon = () => {
    switch (user.userType) {
      case 'driver':
        return <Car className="h-3 w-3 mr-1" />;
      case 'fleet_manager':
        return <Users className="h-3 w-3 mr-1" />;
      case 'admin':
        return <Shield className="h-3 w-3 mr-1" />;
      default:
        return <User className="h-3 w-3 mr-1" />;
    }
  };

  const getUserDescription = () => {
    switch (user.userType) {
      case 'driver':
        return 'Monitor your driving safety and drowsiness alerts';
      case 'fleet_manager':
        return 'Manage fleet safety and monitor driver performance';
      case 'admin':
        return 'System administration and analytics';
      default:
        return 'Driver safety monitoring system';
    }
  };

  useEffect(() => {
    // Load saved avatar on mount - user-specific
    const savedAvatar = localStorage.getItem(`userAvatar_${user.email}`);
    if (savedAvatar) {
      setCurrentAvatarUrl(savedAvatar);
    }

    const handleNavigateToCamera = () => {
      setActiveTab('camera');
    };

    const handleNavigateToSettings = () => {
      setActiveTab('settings');
    };

    const handleNavigateToCameraSettings = () => {
      setActiveTab('settings');
      // Trigger camera settings section
      setTimeout(() => {
        const event = new CustomEvent('select-camera-settings');
        document.dispatchEvent(event);
      }, 100);
    };

    const handleNavigateToShop = () => {
      setActiveTab('shop');
    };

    const handleNavigateToStatistics = () => {
      setActiveTab('statistics');
    };

    const handleAvatarUpdate = (event: CustomEvent) => {
      // Only update if it's for the current user
      if (event.detail.userEmail === user.email) {
        setCurrentAvatarUrl(event.detail.avatarUrl);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Close notifications dropdown if clicking outside
      if (showNotifications && !target.closest('[data-notifications-dropdown]') && !target.closest('[data-notifications-button]')) {
        setShowNotifications(false);
      }
      
      // Close profile menu dropdown if clicking outside
      if (showProfileMenu && !target.closest('[data-profile-dropdown]') && !target.closest('[data-profile-button]')) {
        setShowProfileMenu(false);
      }
    };

    const appContainer = document.querySelector('[data-app-container]');
    if (appContainer) {
      appContainer.addEventListener('navigate-to-camera', handleNavigateToCamera);
      appContainer.addEventListener('navigate-to-settings', handleNavigateToSettings);
      appContainer.addEventListener('navigate-to-camera-settings', handleNavigateToCameraSettings);
      appContainer.addEventListener('navigate-to-shop', handleNavigateToShop);
      appContainer.addEventListener('navigate-to-statistics', handleNavigateToStatistics);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('avatarUpdated', handleAvatarUpdate as any);

    return () => {
      if (appContainer) {
        appContainer.removeEventListener('navigate-to-camera', handleNavigateToCamera);
        appContainer.removeEventListener('navigate-to-settings', handleNavigateToSettings);
        appContainer.removeEventListener('navigate-to-camera-settings', handleNavigateToCameraSettings);
        appContainer.removeEventListener('navigate-to-shop', handleNavigateToShop);
        appContainer.removeEventListener('navigate-to-statistics', handleNavigateToStatistics);
      }
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('avatarUpdated', handleAvatarUpdate as any);
    };
  }, [showNotifications, showProfileMenu]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden transition-all duration-500" data-app-container>
      {/* Enhanced Header */}
      <header className="border-b bg-card/80 backdrop-blur-lg shadow-sm relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  A.M.A.T.S.
                </h1>
                <p className="text-sm text-muted-foreground">Driver Drowsiness Detection System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Add Back Button when not on dashboard */}
              {activeTab !== 'dashboard' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="hover:scale-105 transition-transform hidden md:flex"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              {/* User Type Badge - Hidden on small screens */}
              <Badge 
                variant={user.userType === 'driver' ? 'default' : 'secondary'}
                className="capitalize hidden sm:flex"
              >
                {getUserIcon()}
                {user.userType.replace('_', ' ')}
              </Badge>

              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative hover:scale-105 transition-transform h-10 w-10"
                  onClick={handleNotificationClick}
                  data-notifications-button
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </div>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="fixed right-2 md:right-4 top-16 md:top-20 w-72 md:w-80 bg-card border rounded-lg shadow-xl z-[100] animate-slide-down"
                       style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
                       data-notifications-dropdown>
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-3 border-b last:border-b-0 hover:bg-muted/50 ${
                          notification.read ? 'opacity-60' : ''
                        }`}>
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'warning' ? 'bg-orange-500' :
                              notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markNotificationAsRead(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNotification(notification.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setShowNotifications(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu - Custom Implementation */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 md:h-12 md:w-12 rounded-full hover:scale-105 transition-transform min-w-[40px] md:min-w-[48px]"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  data-profile-button
                >
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 ring-2 ring-indigo-500/20">
                    <AvatarImage src={currentAvatarUrl || ""} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm md:text-base">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>

                {/* Profile Menu Dropdown */}
                {showProfileMenu && (
                  <div className="fixed right-2 md:right-4 top-16 md:top-20 w-56 md:w-64 bg-card border rounded-lg shadow-xl z-[100] animate-slide-down"
                       style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
                       data-profile-dropdown>
                    <div className="p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="w-fit capitalize">
                          {user.userType.replace('_', ' ')}
                        </Badge>
                        {user.company && (
                          <p className="text-xs text-muted-foreground">{user.company}</p>
                        )}
                      </div>
                    </div>
                    <div className="border-t border-border"></div>
                    
                    <div className="p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 cursor-pointer"
                        onClick={() => {
                          setActiveTab('camera');
                          setShowProfileMenu(false);
                        }}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Camera Monitor
                      </Button>
                      
                      {user.userType === 'fleet_manager' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start p-3 cursor-pointer"
                          onClick={() => {
                            setActiveTab('statistics');
                            setShowProfileMenu(false);
                          }}
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 cursor-pointer"
                        onClick={() => {
                          setActiveTab('shop');
                          setShowProfileMenu(false);
                        }}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Safety Shop
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 cursor-pointer"
                        onClick={() => {
                          setActiveTab('themes');
                          setShowProfileMenu(false);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Themes
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 cursor-pointer"
                        onClick={() => {
                          setActiveTab('settings');
                          setShowProfileMenu(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      
                      <div className="border-t border-border my-1"></div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50/10 hover:bg-red-900/20"
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                    
                    <div className="p-3 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 py-6 relative">
        <div className="mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold">
                {user.isFirstLogin ? `Welcome, ${user.firstName}!` : `Welcome back, ${user.firstName}!`} 👁️
              </h2>
              <p className="text-sm text-muted-foreground">
                {getUserDescription()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-indigo-900/30 text-indigo-300 border-indigo-700/50">
                <Zap className="h-3 w-3 mr-1" />
                {user.userType === 'driver' ? 'Driver Safety' : 
                 user.userType === 'fleet_manager' ? 'Fleet Management' : 'System Admin'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6 animate-slide-in">
          {activeTab === 'dashboard' && <DashboardView userType={user.userType} user={user} />}
          {activeTab === 'camera' && <CameraFeed />}
          {activeTab === 'statistics' && <StatisticsView userType={user.userType} user={user} analytics={analytics} />}
          {activeTab === 'shop' && <ShopView userType={user.userType} user={user} />}
          {activeTab === 'themes' && (
            <ThemeSelector 
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          )}
          {activeTab === 'settings' && <SettingsView userType={user.userType} user={user} />}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 A.M.A.T.S.</span>
              <span>•</span>
              <span>Driver Drowsiness Detection System</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Safety monitoring active</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <AvatarSelectionModal
          onClose={() => setShowAvatarModal(false)}
          onSave={(avatarUrl) => {
            setCurrentAvatarUrl(avatarUrl);
            setShowAvatarModal(false);
          }}
          currentAvatar={currentAvatarUrl || undefined}
          userCountry={user.country}
          userEmail={user.email}
        />
      )}
    </div>
  );
}