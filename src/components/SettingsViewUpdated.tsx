import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { AvatarSelectionModal } from './AvatarSelectionModal';
import { EnhancedThemeSystem } from './EnhancedThemeSystem';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Palette, 
  Volume2, 
  Smartphone, 
  Shield, 
  Clock, 
  Eye, 
  Bell,
  Save,
  RotateCcw,
  User,
  Camera,
  Brush,
  CreditCard,
  Globe,
  DollarSign,
  Lock,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  AlertTriangle,
  Accessibility,
  History,
  Settings,
  CheckCircle,
  MessageSquare,
  BookOpen,
  Users,
  Info,
  Headphones
} from 'lucide-react';

interface SettingsViewProps {
  userType: 'driver' | 'fleet_manager' | 'admin';
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    country?: string;
  };
}

export function SettingsView({ userType, user }: SettingsViewProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [showAvatarSelectionModal, setShowAvatarSelectionModal] = useState(false);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Theme state
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

  // Load saved avatar from localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setCurrentAvatarUrl(savedAvatar);
    }
  }, []);

  // Profile settings state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    displayName: `${user?.firstName || 'John'} ${user?.lastName || 'Doe'}`,
    bio: 'Professional driver committed to road safety and drowsiness prevention.',
    location: 'Manila, Philippines',
    company: user?.company || ''
  });

  // Camera settings state - restored from image
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [detectionSensitivity, setDetectionSensitivity] = useState([75]);
  const [nightMode, setNightMode] = useState(true);
  const [highQualityRecording, setHighQualityRecording] = useState(true);
  const [eyeTracking, setEyeTracking] = useState(true);
  const [headPositionTracking, setHeadPositionTracking] = useState(true);
  const [blinkRateMonitoring, setBlinkRateMonitoring] = useState(true);
  
  // Alert settings - restored from image  
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [vibrationAlerts, setVibrationAlerts] = useState(true);
  const [progressiveAlerts, setProgressiveAlerts] = useState(true);

  // Password settings state
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Email settings state
  const [emailData, setEmailData] = useState({
    newEmail: '',
    confirmPassword: ''
  });

  const settingSections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'camera', name: 'Camera & Detection', icon: Camera },
    { id: 'themes', name: 'Themes', icon: Palette },
    { id: 'notifications', name: 'Alerts & Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'password', name: 'Change Password', icon: Lock },
    { id: 'email', name: 'Change Email', icon: Mail },
    { id: 'help', name: 'Help', icon: HelpCircle },
    { id: 'accessibility', name: 'Accessibility', icon: Accessibility },
  ];

  const handleAvatarSave = (selectedImageUrl: string) => {
    setCurrentAvatarUrl(selectedImageUrl);
    localStorage.setItem('userAvatar', selectedImageUrl);
    setShowAvatarSelectionModal(false);
    
    // Dispatch custom event to update avatar in navbar
    const event = new CustomEvent('avatarUpdated', { 
      detail: { avatarUrl: selectedImageUrl } 
    });
    document.dispatchEvent(event);
    
    alert('Profile picture updated successfully! Your new avatar is now visible across the A.M.A.T.S. system.');
  };

  const handleThemeChange = (themeId: string, customColors?: any) => {
    if (themeId === 'custom' && customColors) {
      // Apply custom theme colors
      const root = document.documentElement;
      root.style.setProperty('--primary', customColors.primary);
      root.style.setProperty('--secondary', customColors.secondary);
      root.style.setProperty('--accent', customColors.accent);
      root.style.setProperty('--background', customColors.background);
      root.style.setProperty('--card', customColors.card);
      setCurrentTheme(customColors);
    } else {
      // Apply predefined theme (you'd implement this based on your theme system)
      console.log('Applying theme:', themeId);
    }
  };

  const renderProfileSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and account details
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            {currentAvatarUrl ? (
              <AvatarImage src={currentAvatarUrl} alt="Profile picture" />
            ) : (
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg">
                {(user?.firstName?.[0] || 'J')}{(user?.lastName?.[0] || 'D')}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAvatarSelectionModal(true)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Change Avatar
            </Button>
            <p className="text-sm text-muted-foreground">
              Select from professional avatars and customize
            </p>
            {currentAvatarUrl && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setCurrentAvatarUrl(null);
                  localStorage.removeItem('userAvatar');
                  const event = new CustomEvent('avatarUpdated', { 
                    detail: { avatarUrl: null } 
                  });
                  document.dispatchEvent(event);
                  alert('Profile picture removed successfully!');
                }}
              >
                Remove Current Avatar
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input 
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input 
              value={profileData.lastName}
              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input value={user?.email || 'john.doe@example.com'} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed here. Use "Change Email" section instead.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell others about yourself..."
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={() => alert('Profile updated successfully!')}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderThemeSettings = () => (
    <EnhancedThemeSystem
      currentTheme="dark-default"
      onThemeChange={handleThemeChange}
      isDarkMode={isDarkMode}
      onDarkModeToggle={() => setIsDarkMode(prev => !prev)}
    />
  );

  const renderCameraSettings = () => (
    <Card className="font-inter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera & Detection Settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure camera permissions and drowsiness detection parameters
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera Permissions Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <h4 className="font-medium">Camera Permissions</h4>
          </div>
          <div className="space-y-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Enable Camera Access</Label>
                <p className="text-sm text-muted-foreground">Allow the system to access your camera for monitoring</p>
              </div>
              <Switch checked={cameraEnabled} onCheckedChange={setCameraEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Night Vision Mode</Label>
                <p className="text-sm text-muted-foreground">Enhanced detection in low-light conditions</p>
              </div>
              <Switch checked={nightMode} onCheckedChange={setNightMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">High Quality Recording</Label>
                <p className="text-sm text-muted-foreground">Record in higher resolution for better analysis</p>
              </div>
              <Switch checked={highQualityRecording} onCheckedChange={setHighQualityRecording} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Detection Settings Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <h4 className="font-medium">Detection Settings</h4>
          </div>
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label className="font-normal">Detection Sensitivity: {detectionSensitivity[0]}%</Label>
              <p className="text-xs text-muted-foreground">Higher values increase detection accuracy but may cause false positives</p>
              <Slider
                value={detectionSensitivity}
                onValueChange={setDetectionSensitivity}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Eye Tracking</Label>
                <p className="text-sm text-muted-foreground">Monitor eye movement and blink patterns</p>
              </div>
              <Switch checked={eyeTracking} onCheckedChange={setEyeTracking} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Head Position Tracking</Label>
                <p className="text-sm text-muted-foreground">Detect head tilting and position changes</p>
              </div>
              <Switch checked={headPositionTracking} onCheckedChange={setHeadPositionTracking} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Blink Rate Monitoring</Label>
                <p className="text-sm text-muted-foreground">Analyze blinking patterns for drowsiness detection</p>
              </div>
              <Switch checked={blinkRateMonitoring} onCheckedChange={setBlinkRateMonitoring} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Alert Settings Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <h4 className="font-medium">Alert Settings</h4>
          </div>
          <div className="space-y-4 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Audio Alerts</Label>
                <p className="text-sm text-muted-foreground">Play sound notifications when drowsiness detected</p>
              </div>
              <Switch checked={audioAlerts} onCheckedChange={setAudioAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Vibration Alerts</Label>
                <p className="text-sm text-muted-foreground">Device vibration for subtle notifications</p>
              </div>
              <Switch checked={vibrationAlerts} onCheckedChange={setVibrationAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="font-normal">Progressive Alerts</Label>
                <p className="text-sm text-muted-foreground">Gradually increase alert intensity</p>
              </div>
              <Switch checked={progressiveAlerts} onCheckedChange={setProgressiveAlerts} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Camera Privacy Notice */}
        <div className="space-y-2">
          <h4 className="font-medium">Camera Privacy Notice</h4>
          <p className="text-sm text-muted-foreground">
            Your camera data is processed locally on your device for drowsiness detection. No video data is stored or transmitted to external servers without your explicit consent.
          </p>
        </div>

        <Button className="w-full" onClick={() => alert('Camera settings saved successfully!')}>
          <Save className="h-4 w-4 mr-2" />
          Save Camera Settings
        </Button>
      </CardContent>
    </Card>
  );

  const renderNotificationSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Audio Alerts</Label>
          <Switch checked={audioAlerts} onCheckedChange={setAudioAlerts} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Push Notifications</Label>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );

  const renderPasswordSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Current Password</Label>
          <Input 
            type="password" 
            placeholder="Enter current password"
            value={passwordData.current}
            onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>New Password</Label>
          <Input 
            type="password" 
            placeholder="Enter new password"
            value={passwordData.new}
            onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm New Password</Label>
          <Input 
            type="password" 
            placeholder="Confirm new password"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
          />
        </div>
        <Button className="w-full" onClick={() => alert('Password updated successfully!')}>
          <Save className="h-4 w-4 mr-2" />
          Update Password
        </Button>
      </CardContent>
    </Card>
  );

  const renderEmailSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Change Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>New Email Address</Label>
          <Input 
            type="email"
            placeholder="Enter new email address"
            value={emailData.newEmail}
            onChange={(e) => setEmailData(prev => ({ ...prev, newEmail: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input 
            type="password"
            placeholder="Enter your password to confirm"
            value={emailData.confirmPassword}
            onChange={(e) => setEmailData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </div>
        <Button className="w-full" onClick={() => alert('Email change request submitted!')}>
          <Save className="h-4 w-4 mr-2" />
          Change Email
        </Button>
      </CardContent>
    </Card>
  );

  const renderHelpSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Help & Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <BookOpen className="h-4 w-4 mr-2" />
            User Guide
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Info className="h-4 w-4 mr-2" />
            FAQ
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAccessibilitySettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="h-5 w-5" />
          Accessibility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>High Contrast Mode</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <Label>Large Text</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <Label>Reduced Motion</Label>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );

  const renderPrivacySettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Two-Factor Authentication</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <Label>Data Analytics</Label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label>Location Tracking</Label>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSettings();
      case 'themes': return renderThemeSettings();
      case 'camera': return renderCameraSettings();
      case 'notifications': return renderNotificationSettings();
      case 'password': return renderPasswordSettings();
      case 'email': return renderEmailSettings();
      case 'help': return renderHelpSettings();
      case 'accessibility': return renderAccessibilitySettings();
      case 'privacy': return renderPrivacySettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-6 font-inter">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                        activeSection === section.id ? 'bg-muted text-primary' : ''
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          {renderContent()}
        </div>
      </div>

      {/* Avatar Selection Modal */}
      <AvatarSelectionModal
        isOpen={showAvatarSelectionModal}
        onClose={() => setShowAvatarSelectionModal(false)}
        onSave={handleAvatarSave}
        currentAvatar={currentAvatarUrl || undefined}
        userCountry={user?.country}
      />
    </div>
  );
}