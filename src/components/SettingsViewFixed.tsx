import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { AvatarSelectionModal } from './AvatarSelectionModal';
import { EnhancedThemeSystem } from './EnhancedThemeSystemFixed';
import { ShopView } from './ShopViewFixed';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Palette, 
  Shield, 
  Eye, 
  Bell,
  Save,
  User,
  Camera,
  Lock,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  AlertTriangle,
  Accessibility,
  Settings,
  CheckCircle,
  MessageSquare,
  BookOpen,
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
  const [currentTheme, setCurrentTheme] = useState('dark-default');

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

  // Camera settings state
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [detectionSensitivity, setDetectionSensitivity] = useState([75]);
  const [nightMode, setNightMode] = useState(true);
  const [highQualityRecording, setHighQualityRecording] = useState(true);
  const [eyeTracking, setEyeTracking] = useState(true);
  const [headPositionTracking, setHeadPositionTracking] = useState(true);
  const [blinkRateMonitoring, setBlinkRateMonitoring] = useState(true);
  
  // Alert settings
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

  // Privacy & Security settings - matching image exactly
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [shareActivityStatus, setShareActivityStatus] = useState(false);
  const [allowDirectMessages, setAllowDirectMessages] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [dataDownload, setDataDownload] = useState(false);

  // Accessibility settings
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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
    setCurrentTheme(themeId);
    console.log('Theme changed to:', themeId);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information and account details
        </p>
      </div>

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

      <Button onClick={() => alert('Profile updated successfully!')}>
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );

  const renderThemeSettings = () => (
    <EnhancedThemeSystem
      currentTheme={currentTheme}
      onThemeChange={handleThemeChange}
      isDarkMode={isDarkMode}
      onDarkModeToggle={() => setIsDarkMode(prev => !prev)}
    />
  );

  const renderCameraSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Camera & Detection</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure camera permissions and drowsiness detection parameters
        </p>
      </div>

      {/* Camera Permissions Section */}
      <div className="space-y-4">
        <h3 className="font-medium">Camera Permissions</h3>
        <div className="space-y-4">
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
        <h3 className="font-medium">Detection Settings</h3>
        <div className="space-y-4">
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

      <Button onClick={() => alert('Camera settings saved successfully!')}>
        <Save className="h-4 w-4 mr-2" />
        Save Camera Settings
      </Button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Alerts & Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure alert preferences and notification settings
        </p>
      </div>

      {/* Drowsiness Alerts */}
      <div className="space-y-4">
        <h3 className="font-medium">Drowsiness Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Immediate Alerts</Label>
              <p className="text-sm text-muted-foreground">Instant notification when drowsiness detected</p>
            </div>
            <Switch checked={audioAlerts} onCheckedChange={setAudioAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Progressive Warnings</Label>
              <p className="text-sm text-muted-foreground">Escalating alerts for prolonged drowsiness</p>
            </div>
            <Switch checked={progressiveAlerts} onCheckedChange={setProgressiveAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Break Reminders</Label>
              <p className="text-sm text-muted-foreground">Suggest breaks during long drives</p>
            </div>
            <Switch checked={vibrationAlerts} onCheckedChange={setVibrationAlerts} />
          </div>
        </div>
      </div>

      <Separator />

      {/* System Notifications */}
      <div className="space-y-4">
        <h3 className="font-medium">System Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">System Updates</Label>
              <p className="text-sm text-muted-foreground">Notifications about software updates</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Maintenance Reminders</Label>
              <p className="text-sm text-muted-foreground">Device maintenance and calibration alerts</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Performance Reports</Label>
              <p className="text-sm text-muted-foreground">Weekly safety and performance summaries</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <Button onClick={() => alert('Notification settings saved successfully!')}>
        <Save className="h-4 w-4 mr-2" />
        Save Notification Settings
      </Button>
    </div>
  );

  // Privacy & Security - matching the exact layout from the image
  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Privacy & Security</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Control your privacy and data security preferences
        </p>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-4">
        <h3 className="font-medium">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
            </div>
            <Switch checked={profileVisibility} onCheckedChange={setProfileVisibility} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Share Activity Status</Label>
              <p className="text-sm text-muted-foreground">Share your online status with others</p>
            </div>
            <Switch checked={shareActivityStatus} onCheckedChange={setShareActivityStatus} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Allow Direct Messages</Label>
              <p className="text-sm text-muted-foreground">Let other users message you directly</p>
            </div>
            <Switch checked={allowDirectMessages} onCheckedChange={setAllowDirectMessages} />
          </div>
        </div>
      </div>

      <Separator />

      {/* Security Settings */}
      <div className="space-y-4">
        <h3 className="font-medium">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Enable 2FA</span>
              <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Login Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified of login attempts</p>
            </div>
            <Switch checked={loginNotifications} onCheckedChange={setLoginNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal">Data Download</Label>
              <p className="text-sm text-muted-foreground">Download a copy of your data</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Request Data</span>
              <Switch checked={dataDownload} onCheckedChange={setDataDownload} />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Data Usage */}
      <div className="space-y-4">
        <h3 className="font-medium">Data Usage</h3>
        <div className="space-y-2">
          <h4 className="font-medium">Analytics Data</h4>
          <p className="text-sm text-muted-foreground">Anonymous usage data helps improve our services</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Crash Reports</h4>
          <p className="text-sm text-muted-foreground">Help us identify and fix issues</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Usage Statistics</h4>
          <p className="text-sm text-muted-foreground">Track feature usage for improvements</p>
        </div>
      </div>

      <Button onClick={() => alert('Privacy settings saved successfully!')}>
        <Save className="h-4 w-4 mr-2" />
        Save Privacy Settings
      </Button>
    </div>
  );

  // Password Settings - matching the exact layout from the image
  const renderPasswordSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Change Password</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update your account password for enhanced security
        </p>
      </div>

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

      <Separator />

      {/* Password Requirements */}
      <div className="space-y-2">
        <h3 className="font-medium">Password Requirements</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Minimum 8 characters long</p>
          <p>• At least one uppercase letter</p>
          <p>• At least one lowercase letter</p>
          <p>• At least one number</p>
          <p>• At least one special character</p>
        </div>
      </div>

      <Button onClick={() => alert('Password updated successfully!')}>
        <Save className="h-4 w-4 mr-2" />
        Update Password
      </Button>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Change Email</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update your account email address
        </p>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4" />
          <span className="font-medium">Current Email</span>
        </div>
        <p className="text-sm">{user?.email || 'john.doe@example.com'}</p>
      </div>

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

      <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center gap-2 mb-2 text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">Important Notice</span>
        </div>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          After changing your email, you'll need to verify the new address before you can use it to sign in. 
          Please check your new email for a verification link.
        </p>
      </div>

      <Button onClick={() => alert('Email change request submitted!')}>
        <Save className="h-4 w-4 mr-2" />
        Change Email
      </Button>
    </div>
  );

  const renderHelpSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Help & Support</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Get help and access support resources
        </p>
      </div>

      {/* Documentation */}
      <div className="space-y-4">
        <h3 className="font-medium">Documentation</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            User Manual
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Setup Guide
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Troubleshooting
          </Button>
        </div>
      </div>

      <Separator />

      {/* Support */}
      <div className="space-y-4">
        <h3 className="font-medium">Support</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Phone className="h-4 w-4 mr-2" />
            Live Chat
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            Email Support
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your experience for better accessibility
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-normal">High Contrast Mode</Label>
            <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
          </div>
          <Switch checked={highContrastMode} onCheckedChange={setHighContrastMode} />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-normal">Large Text</Label>
            <p className="text-sm text-muted-foreground">Increase font size for easier reading</p>
          </div>
          <Switch checked={largeText} onCheckedChange={setLargeText} />
        </div>  
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-normal">Reduce Motion</Label>
            <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
          </div>
          <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
        </div>
      </div>

      <Button onClick={() => alert('Accessibility settings saved successfully!')}>
        <Save className="h-4 w-4 mr-2" />
        Save Accessibility Settings
      </Button>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'themes':
        return renderThemeSettings();
      case 'camera':
        return renderCameraSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'password':
        return renderPasswordSettings();
      case 'email':
        return renderEmailSettings();
      case 'help':
        return renderHelpSettings();
      case 'accessibility':
        return renderAccessibilitySettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your A.M.A.T.S. preferences and account settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Menu Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Settings Menu</h3>
              {settingSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{section.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-card rounded-lg border p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAvatarSelectionModal && (
        <AvatarSelectionModal
          onClose={() => setShowAvatarSelectionModal(false)}
          onSave={handleAvatarSave}
        />
      )}
    </div>
  );
}