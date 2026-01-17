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
import { ColorThemePicker } from './ColorThemePicker';
import { AvatarSelectionModal } from './AvatarSelectionModal';
import { ThemeCustomizer } from './ThemeCustomizer';
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

  // Camera settings state
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [detectionSensitivity, setDetectionSensitivity] = useState([75]);
  const [nightMode, setNightMode] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [showCameraDialog, setShowCameraDialog] = useState(false);

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

  // Help settings state
  const [activeHelpSection, setActiveHelpSection] = useState('guide');

  // Report settings state
  const [reportData, setReportData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium',
    includeSystemInfo: true
  });

  // Listen for camera settings selection
  useEffect(() => {
    const handleCameraSettingsSelect = () => {
      setActiveSection('camera');
    };

    document.addEventListener('select-camera-settings', handleCameraSettingsSelect);

    return () => {
      document.removeEventListener('select-camera-settings', handleCameraSettingsSelect);
    };
  }, []);



  const settingSections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'camera', name: 'Camera & Detection', icon: Camera },
    { id: 'themes', name: 'Themes', icon: Palette },
    { id: 'notifications', name: 'Alerts & Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'password', name: 'Change Password', icon: Lock },
    { id: 'email', name: 'Change Email', icon: Mail },
    { id: 'help', name: 'Help', icon: HelpCircle },
    { id: 'report', name: 'Report a Problem', icon: AlertTriangle },
    { id: 'accessibility', name: 'Accessibility', icon: Accessibility },
  ];

  // Password validation function
  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(requirements).filter(Boolean).length;
    let strength = 'Weak';
    if (score >= 4) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';

    return { requirements, strength, score };
  };

  const passwordValidation = validatePassword(passwordData.new);

  const getPasswordStrengthColor = () => {
    switch (passwordValidation.strength) {
      case 'Strong': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  // Handler functions
  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleResetProfile = () => {
    setProfileData({
      firstName: user?.firstName || 'John',
      lastName: user?.lastName || 'Doe',
      displayName: `${user?.firstName || 'John'} ${user?.lastName || 'Doe'}`,
      bio: 'Professional driver committed to road safety and drowsiness prevention.',
      location: 'Manila, Philippines',
      company: user?.company || ''
    });
  };

  const handleCameraToggle = (checked: boolean) => {
    if (checked) {
      setShowCameraDialog(true);
    } else {
      setCameraEnabled(false);
      alert('Camera access disabled.');
    }
  };

  const confirmCameraAccess = () => {
    setCameraEnabled(true);
    setShowCameraDialog(false);
    alert('Camera access enabled! You can now use live monitoring features.');
  };

  const handleUpdatePassword = () => {
    if (!passwordData.current) {
      alert('Please enter your current password');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      alert('New password and confirmation do not match');
      return;
    }
    if (passwordValidation.score < 4) {
      alert('Password does not meet all requirements');
      return;
    }
    alert('Password updated successfully!');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleChangeEmail = () => {
    if (!emailData.newEmail) {
      alert('Please enter a new email address');
      return;
    }
    if (!emailData.confirmPassword) {
      alert('Please enter your password to confirm');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailData.newEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    alert('Email change request submitted! Please check your new email for verification instructions.');
    setEmailData({ newEmail: '', confirmPassword: '' });
  };

  const handleSubmitReport = () => {
    if (!reportData.category || !reportData.subject || !reportData.description) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Problem report submitted successfully! Our team will investigate and respond within 24-48 hours.');
    setReportData({
      category: '',
      subject: '',
      description: '',
      priority: 'medium',
      includeSystemInfo: true
    });
  };

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
      // Theme application logic would go here
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
              Upload & resize a profile picture (JPG, PNG, max 5MB)
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

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input value={user?.email || 'john.doe@example.com'} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed here. Use "Change Email" section instead.
          </p>
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
          <Label>Display Name</Label>
          <Input 
            value={profileData.displayName}
            onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
          />
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

        <div className="space-y-2">
          <Label>Location</Label>
          <Input 
            value={profileData.location}
            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Company/Fleet (if applicable)</Label>
          <Input 
            value={profileData.company}
            onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Your company or fleet name" 
          />
        </div>

        <div className="space-y-2">
          <Label>User Type</Label>
          <Badge variant="outline" className="capitalize">
            {userType.replace('_', ' ')}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSaveProfile}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleResetProfile}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCameraSettings = () => (
    <Card>
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
        <div className="space-y-4">
          <h4 className="font-medium">Camera Permissions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Camera Access</Label>
                <p className="text-sm text-muted-foreground">Allow the system to access your camera for monitoring</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={cameraEnabled}
                  onCheckedChange={handleCameraToggle}
                />
                <Badge variant={cameraEnabled ? 'default' : 'secondary'}>
                  {cameraEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Night Vision Mode</Label>
                <p className="text-sm text-muted-foreground">Enhanced detection in low-light conditions</p>
              </div>
              <Switch checked={nightMode} onCheckedChange={setNightMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>High Quality Recording</Label>
                <p className="text-sm text-muted-foreground">Use HD resolution for better detection accuracy</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Detection Settings</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Detection Sensitivity: {detectionSensitivity[0]}%</Label>
              <Slider
                value={detectionSensitivity}
                onValueChange={setDetectionSensitivity}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Higher values increase alert sensitivity but may cause false positives
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Eye Tracking</Label>
                <p className="text-sm text-muted-foreground">Monitor eye movement and closure</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Head Position Tracking</Label>
                <p className="text-sm text-muted-foreground">Detect head nodding and position changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Blink Rate Monitoring</Label>
                <p className="text-sm text-muted-foreground">Analyze blinking patterns for fatigue detection</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Alert Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Audio Alerts</Label>
                <p className="text-sm text-muted-foreground">Play sound when drowsiness is detected</p>
              </div>
              <Switch checked={audioAlerts} onCheckedChange={setAudioAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Vibration Alerts</Label>
                <p className="text-sm text-muted-foreground">Vibrate device when drowsiness is detected</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Progressive Alerts</Label>
                <p className="text-sm text-muted-foreground">Increase alert intensity over time</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <h5 className="font-medium mb-2">Camera Privacy Notice</h5>
          <p className="text-sm text-muted-foreground">
            Your camera feed is processed locally on your device for drowsiness detection. 
            No video data is stored or transmitted to external servers without your explicit consent.
          </p>
        </div>

        <Button className="w-full" onClick={() => alert('Camera settings saved successfully!')}>
          <Save className="h-4 w-4 mr-2" />
          Save Camera Settings
        </Button>

        {/* Camera Confirmation Dialog */}
        {showCameraDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Enable Camera Access</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to enable camera access for drowsiness detection? 
                This will allow the system to monitor your face and eye movements for safety.
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowCameraDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmCameraAccess}>
                  Enable Camera
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderThemeSettings = () => (
    <ThemeCustomizer
      currentTheme="default"
      onThemeChange={handleThemeChange}
      isDarkMode={isDarkMode}
      onDarkModeToggle={() => setIsDarkMode(prev => !prev)}
    />
  );

  const renderPasswordSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your account password for enhanced security
        </p>
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
          {passwordData.new && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Password Strength:</span>
                <span className={`text-sm font-medium ${getPasswordStrengthColor()}`}>
                  {passwordValidation.strength}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>Confirm New Password</Label>
          <Input 
            type="password" 
            placeholder="Confirm new password"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
          />
          {passwordData.confirm && passwordData.new !== passwordData.confirm && (
            <p className="text-sm text-red-600">Passwords do not match</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Password Requirements</Label>
          <div className="text-sm space-y-1">
            <div className={`flex items-center gap-2 ${passwordValidation.requirements.length ? 'text-green-600' : 'text-red-600'}`}>
              {passwordValidation.requirements.length ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              At least 8 characters long
            </div>
            <div className={`flex items-center gap-2 ${passwordValidation.requirements.uppercase ? 'text-green-600' : 'text-red-600'}`}>
              {passwordValidation.requirements.uppercase ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              Contains uppercase letter
            </div>
            <div className={`flex items-center gap-2 ${passwordValidation.requirements.lowercase ? 'text-green-600' : 'text-red-600'}`}>
              {passwordValidation.requirements.lowercase ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              Contains lowercase letter
            </div>
            <div className={`flex items-center gap-2 ${passwordValidation.requirements.number ? 'text-green-600' : 'text-red-600'}`}>
              {passwordValidation.requirements.number ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              Contains number
            </div>
            <div className={`flex items-center gap-2 ${passwordValidation.requirements.special ? 'text-green-600' : 'text-red-600'}`}>
              {passwordValidation.requirements.special ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              Contains special character
            </div>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleUpdatePassword}
          disabled={!passwordData.current || !passwordData.new || !passwordData.confirm}
        >
          <Save className="h-4 w-4 mr-2" />
          Update Password
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
        <p className="text-sm text-muted-foreground">
          Configure how you receive drowsiness alerts and system notifications
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Drowsiness Alerts</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Immediate Alerts</Label>
                <p className="text-sm text-muted-foreground">Instant notifications when drowsiness is detected</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Progressive Warnings</Label>
                <p className="text-sm text-muted-foreground">Escalating alerts for persistent drowsiness</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Break Reminders</Label>
                <p className="text-sm text-muted-foreground">Suggest rest breaks based on driving duration</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">System Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>System Updates</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Maintenance Reminders</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Performance Reports</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Safety Tips</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Communication Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>SMS Alerts</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>In-App Sounds</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Alert Volume</Label>
          <Slider defaultValue={[80]} max={100} min={0} step={10} />
          <p className="text-sm text-muted-foreground">
            Adjust the volume level for audio alerts
          </p>
        </div>

        <Button className="w-full" onClick={() => alert('Notification settings saved successfully!')}>
          <Save className="h-4 w-4 mr-2" />
          Save Notification Settings
        </Button>
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
        <p className="text-sm text-muted-foreground">
          Control your privacy settings and data security preferences
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Privacy Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Activity Status</Label>
                <p className="text-sm text-muted-foreground">Let others see when you're online</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Allow Direct Messages</Label>
                <p className="text-sm text-muted-foreground">Let other users message you directly</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Security Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => alert('2FA setup initiated! Check your email for instructions.')}>
                Enable 2FA
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Login Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Data Download</Label>
                <p className="text-sm text-muted-foreground">Download a copy of your data</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => alert('Data export request submitted! You will receive an email with download link.')}>
                Request Data
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Data Usage</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Analytics Data</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Crash Reports</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Usage Statistics</Label>
              <Switch />
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={() => alert('Privacy settings saved successfully!')}>
          <Save className="h-4 w-4 mr-2" />
          Save Privacy Settings
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
        <p className="text-sm text-muted-foreground">
          Update your email address for account communications
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Current Email</Label>
          <Input value={user?.email || 'john.doe@example.com'} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>New Email</Label>
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
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            After changing your email, you'll need to verify the new address before you can log in with it.
          </p>
        </div>
        <Button 
          className="w-full" 
          onClick={handleChangeEmail}
          disabled={!emailData.newEmail || !emailData.confirmPassword}
        >
          <Save className="h-4 w-4 mr-2" />
          Change Email
        </Button>
      </CardContent>
    </Card>
  );

  const helpSections = {
    guide: {
      title: 'User Guide',
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <h4 className="font-medium">Getting Started with A.M.A.T.S.</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">1. Setting Up Your Camera</h5>
              <p className="text-sm text-muted-foreground">
                Enable camera access in the Camera & Detection settings to start monitoring your drowsiness levels.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">2. Understanding Alerts</h5>
              <p className="text-sm text-muted-foreground">
                The system will alert you when drowsiness is detected. Configure alert preferences in Notifications settings.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">3. Viewing Analytics</h5>
              <p className="text-sm text-muted-foreground">
                Check your safety dashboard for detailed analytics on your driving patterns and safety scores.
              </p>
            </div>
          </div>
        </div>
      )
    },
    faq: {
      title: 'Frequently Asked Questions',
      icon: HelpCircle,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">How accurate is the drowsiness detection?</h5>
              <p className="text-sm text-muted-foreground">
                Our AI-powered system achieves 95%+ accuracy in detecting drowsiness patterns through facial recognition and eye tracking.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">Does the camera record video?</h5>
              <p className="text-sm text-muted-foreground">
                No, the system only processes real-time video for detection. No video data is stored unless explicitly enabled.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">Can I use this on mobile devices?</h5>
              <p className="text-sm text-muted-foreground">
                Yes, A.M.A.T.S. is fully responsive and works on smartphones, tablets, and desktop computers.
              </p>
            </div>
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contact Support',
      icon: Headphones,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Support
              </h5>
              <p className="text-sm text-muted-foreground mb-2">support@amats.com</p>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Support
              </h5>
              <p className="text-sm text-muted-foreground mb-2">+63 (02) 123-4567</p>
              <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM PHT</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Live Chat</h5>
            <p className="text-sm text-muted-foreground mb-3">
              Get instant help from our support team
            </p>
            <Button onClick={() => alert('Live chat feature will be available soon!')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </div>
        </div>
      )
    },
    community: {
      title: 'Community',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Driver Safety Forum
              </h5>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with other drivers and share safety tips
              </p>
              <Button variant="outline" onClick={() => alert('Forum will open in a new tab')}>
                Visit Forum
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">Safety Best Practices</h5>
              <p className="text-sm text-muted-foreground mb-3">
                Learn from experienced drivers and safety experts
              </p>
              <Button variant="outline" onClick={() => alert('Best practices guide will be displayed')}>
                View Guide
              </Button>
            </div>
          </div>
        </div>
      )
    }
  };

  const renderHelpSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Help & Support
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get help with A.M.A.T.S. and access support resources
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(helpSections).map(([key, section]) => (
            <Button
              key={key}
              variant={activeHelpSection === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveHelpSection(key)}
              className="flex items-center gap-2"
            >
              <section.icon className="h-4 w-4" />
              {section.title}
            </Button>
          ))}
        </div>
        
        <div className="min-h-[300px]">
          {helpSections[activeHelpSection as keyof typeof helpSections].content}
        </div>
      </CardContent>
    </Card>
  );

  const renderReportSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Report a Problem
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help us improve A.M.A.T.S. by reporting issues or bugs
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Problem Category *</Label>
          <Select value={reportData.category} onValueChange={(value) => setReportData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="camera">Camera & Detection Issues</SelectItem>
              <SelectItem value="alerts">Alert System Problems</SelectItem>
              <SelectItem value="ui">User Interface Bugs</SelectItem>
              <SelectItem value="performance">Performance Issues</SelectItem>
              <SelectItem value="account">Account & Login Problems</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Subject *</Label>
          <Input 
            placeholder="Brief description of the problem"
            value={reportData.subject}
            onChange={(e) => setReportData(prev => ({ ...prev, subject: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Priority Level</Label>
          <Select value={reportData.priority} onValueChange={(value) => setReportData(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Minor inconvenience</SelectItem>
              <SelectItem value="medium">Medium - Affects functionality</SelectItem>
              <SelectItem value="high">High - Blocks important features</SelectItem>
              <SelectItem value="critical">Critical - Safety or security issue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Detailed Description *</Label>
          <Textarea
            placeholder="Describe the problem in detail, including steps to reproduce..."
            rows={4}
            value={reportData.description}
            onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="systemInfo"
            checked={reportData.includeSystemInfo}
            onChange={(e) => setReportData(prev => ({ ...prev, includeSystemInfo: e.target.checked }))}
            className="rounded"
          />
          <Label htmlFor="systemInfo" className="text-sm">
            Include system information to help with troubleshooting
          </Label>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Privacy Notice</p>
              <p>Your report will be reviewed by our technical team. No personal or sensitive data will be shared externally.</p>
            </div>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSubmitReport}
          disabled={!reportData.category || !reportData.subject || !reportData.description}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Submit Problem Report
        </Button>
      </CardContent>
    </Card>
  );

  const renderAccessibilitySettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Customize A.M.A.T.S. to meet your accessibility needs
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Visual Accessibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Large Text</Label>
                <p className="text-sm text-muted-foreground">Increase text size for better readability</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Color Blind Support</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Color Blind Support</SelectItem>
                  <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                  <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                  <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Audio Accessibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Screen Reader Support</Label>
                <p className="text-sm text-muted-foreground">Enhanced compatibility with screen readers</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Audio Descriptions</Label>
                <p className="text-sm text-muted-foreground">Verbal descriptions of visual elements</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Alert Sound Volume</Label>
              <Slider defaultValue={[70]} max={100} min={0} step={10} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Motor Accessibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Keyboard Navigation</Label>
                <p className="text-sm text-muted-foreground">Full keyboard accessibility support</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Extended Click Targets</Label>
                <p className="text-sm text-muted-foreground">Larger click areas for buttons and links</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Click Delay</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Delay</SelectItem>
                  <SelectItem value="short">Short (0.5s)</SelectItem>
                  <SelectItem value="normal">Normal (1s)</SelectItem>
                  <SelectItem value="long">Long (2s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={() => alert('Accessibility settings saved successfully!')}>
          <Save className="h-4 w-4 mr-2" />
          Save Accessibility Settings
        </Button>
      </CardContent>
    </Card>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSettings();
      case 'camera': return renderCameraSettings();
      case 'themes': return renderThemeSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'password': return renderPasswordSettings();
      case 'email': return renderEmailSettings();
      case 'help': return renderHelpSettings();
      case 'report': return renderReportSettings();
      case 'accessibility': return renderAccessibilitySettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your A.M.A.T.S. preferences and account settings
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings Menu</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {settingSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'default' : 'ghost'}
                      className="w-full justify-start p-3 h-auto"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <span className="text-left">{section.name}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
}