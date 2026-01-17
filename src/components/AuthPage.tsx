import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Palette, 
  EyeOff, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  Shield,
  Zap,
  Eye,
  Brush,
  Users,
  Crown,
  AlertTriangle
} from 'lucide-react';
import { CountrySelector, countries, Country } from './CountrySelector';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';

interface AuthPageProps {
  mode: 'login' | 'register';
  onBack: () => void;
  onSuccess: (userData: any) => void;
  onModeChange: (mode: 'login' | 'register') => void;
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

// Bot users with predefined credentials and stats
const BOT_USERS = {
  'mariasantos@gmail.com': {
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'mariasantos@gmail.com',
    password: '123',
    userType: 'driver' as const,
    company: 'SafeTransport Inc.',
    profileImage: 'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    stats: {
      totalDrives: 156,
      safetyScore: 94,
      alertsToday: 2,
      hoursThisWeek: 38.5
    }
  },
  'juancruz@gmail.com': {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juancruz@gmail.com',
    password: '123',
    userType: 'fleet_manager' as const,
    company: 'Metro Fleet Solutions',
    profileImage: 'https://images.unsplash.com/photo-1649186019834-18ee06d7d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGRyaXZlcnxlbnwxfHx8fDE3NTg0NTMxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    stats: {
      totalDrivers: 24,
      activeVehicles: 18,
      safetyIncidents: 3,
      fleetEfficiency: 87
    }
  }
};

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

export function AuthPage({ mode, onBack, onSuccess, onModeChange, registeredUsers, analytics }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [authError, setAuthError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    userType: 'driver' as 'driver' | 'fleet_manager' | 'admin',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === 'PH') || countries[0]);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setPasswordError(false);
    
    if (mode === 'register') {
      // Show confirmation dialog for registration
      setShowRegisterDialog(true);
      return;
    }

    setIsLoading(true);
    
    // Check for admin login (hidden from UI)
    if (mode === 'login' && formData.email === 'admin@amats.com') {
      if (formData.password === 'admin') {
        setTimeout(() => {
          setIsLoading(false);
          onSuccess({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@amats.com',
            company: 'A.M.A.T.S. System',
            userType: 'admin'
          });
        }, 1000);
        return;
      } else {
        // Incorrect password for admin
        setTimeout(() => {
          setIsLoading(false);
          setPasswordError(true);
          setAuthError('Incorrect password. Please try again.');
        }, 1000);
        return;
      }
    }

    // Check for bot users with proper password validation
    if (mode === 'login' && BOT_USERS[formData.email as keyof typeof BOT_USERS]) {
      const botUser = BOT_USERS[formData.email as keyof typeof BOT_USERS];
      if (formData.password === botUser.password) {
        setTimeout(() => {
          setIsLoading(false);
          onSuccess({
            firstName: botUser.firstName,
            lastName: botUser.lastName,
            email: botUser.email,
            company: botUser.company,
            userType: botUser.userType,
            stats: botUser.stats
          });
        }, 1000);
        return;
      } else {
        // Incorrect password for bot user
        setTimeout(() => {
          setIsLoading(false);
          setPasswordError(true);
          setAuthError('Incorrect password. Please try again.');
        }, 1000);
        return;
      }
    }

    // For login mode, check if user is registered and validate password properly
    if (mode === 'login') {
      const registeredUser = registeredUsers.find(user => user.email === formData.email);
      
      if (!registeredUser && formData.email !== 'admin@amats.com' && !BOT_USERS[formData.email as keyof typeof BOT_USERS]) {
        setTimeout(() => {
          setIsLoading(false);
          setAuthError('User not registered. Please sign up first.');
        }, 1000);
        return;
      }
      
      if (registeredUser) {
        // For demo purposes, we'll validate against a stored password
        // In real app, this would be hashed and validated on backend
        const storedPassword = registeredUser.password || 'defaultPassword123';
        if (formData.password !== storedPassword) {
          setTimeout(() => {
            setIsLoading(false);
            setPasswordError(true);
            setAuthError('Incorrect password. Please try again.');
          }, 1000);
          return;
        }
        
        if (formData.password.length < 1) {
          setTimeout(() => {
            setIsLoading(false);
            setAuthError('Please enter a password.');
          }, 1000);
          return;
        }
      }
    }
    
    // Regular user login - only after proper validation
    if (mode === 'login') {
      const registeredUser = registeredUsers.find(user => user.email === formData.email);
      if (registeredUser) {
        setTimeout(() => {
          setIsLoading(false);
          onSuccess({
            firstName: registeredUser.firstName || 'John',
            lastName: registeredUser.lastName || 'Doe',
            email: registeredUser.email,
            company: registeredUser.company || 'Demo Company',
            userType: registeredUser.userType,
            stats: registeredUser.stats || {
              totalDrives: 0,
              safetyScore: 100,
              alertsToday: 0,
              hoursThisWeek: 0
            }
          });
        }, 2000);
      }
    }
  };

  const handleRegisterConfirm = () => {
    setShowRegisterDialog(false);
    setIsLoading(true);
    
    // Simulate API call for registration - store password for validation
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // Store password for future login validation
        company: formData.company || 'Demo Company',
        userType: formData.userType,
        country: selectedCountry.name,
        phoneNumber: formData.phone,
        registrationDate: new Date().toISOString(),
        isFirstLogin: true,
        isActive: true,
        stats: {
          totalDrives: 0,
          safetyScore: 100,
          alertsToday: 0,
          hoursThisWeek: 0
        }
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (field === 'password') {
      setPasswordError(false);
      setAuthError('');
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordValidation.strength) {
      case 'Strong': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-x-hidden transition-all duration-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Analytics Panel */}
          <div className="hidden lg:block space-y-6 animate-slide-in">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  A.M.A.T.S.
                </h1>
                <p className="text-muted-foreground">Driver Drowsiness Detection System</p>
              </div>
            </div>

            {/* Real-time Analytics */}
            <Card className="bg-card/50 backdrop-blur-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Live Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg">
                <span className="font-medium text-black">Total Active Users</span>
                <span className="text-xl font-bold text-black">{analytics.totalUsers}</span>
              </div>

                
                <div>
                  <h4 className="font-medium mb-3">Recent Registrations</h4>
                  <div className="space-y-2">
                    {analytics.recentRegistrations.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <div>
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.type}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{user.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in">
            {/* Mobile Back Button */}
            <div className="lg:hidden mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="hover:scale-105 transition-transform"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-lg">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex items-center space-x-3 lg:hidden">
                  <div className="p-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      A.M.A.T.S.
                    </div>
                  </div>
                </div>
                
                <div>
                  <CardTitle className="text-2xl">
                    {mode === 'register' ? 'Create Account' : 'Sign In'}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    {mode === 'register' 
                      ? 'Join the safety network today' 
                      : 'Access your safety dashboard'}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="userType">Account Type</Label>
                        <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="driver">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-indigo-600" />
                                <span>Driver - Personal Safety Monitor</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="fleet_manager">
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-blue-600" />
                                <span>Fleet Manager - Manage Driver Safety</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              placeholder="John"
                              className="pl-10"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              className="pl-10"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {mode === 'register' && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Contact Number</Label>
                          <CountrySelector
                            value={selectedCountry}
                            onSelect={setSelectedCountry}
                            phoneNumber={formData.phone}
                            onPhoneNumberChange={(phone) => handleInputChange('phone', phone)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company">Company (Optional)</Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="company"
                              placeholder="Your Company"
                              className="pl-10"
                              value={formData.company}
                              onChange={(e) => handleInputChange('company', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-3 h-4 w-4 ${passwordError ? 'text-red-500' : 'text-muted-foreground'}`} />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      {passwordError && (
                        <AlertTriangle className="absolute right-10 top-3 h-4 w-4 text-red-500" />
                      )}
                    </div>
                    {authError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{authError}</span>
                      </div>
                    )}
                    
                    {/* Password Strength Indicator for Registration */}
                    {mode === 'register' && formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Password Strength:</span>
                          <span className={`text-sm font-medium ${getPasswordStrengthColor()}`}>
                            {passwordValidation.strength}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.length ? 'text-green-600' : 'text-red-600'}`}>
                            {passwordValidation.requirements.length ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                            At least 8 characters
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                            {passwordValidation.requirements.uppercase ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                            Contains uppercase letter
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                            {passwordValidation.requirements.lowercase ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                            Contains lowercase letter
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.number ? 'text-green-600' : 'text-red-600'}`}>
                            {passwordValidation.requirements.number ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                            Contains number
                          </div>
                          <div className={`flex items-center gap-2 ${passwordValidation.requirements.special ? 'text-green-600' : 'text-red-600'}`}>
                            {passwordValidation.requirements.special ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                            Contains special character
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {mode === 'register' && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-sm text-red-600">Passwords do not match</p>
                      )}
                    </div>
                  )}

                  {mode === 'register' && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          I agree to the <button type="button" onClick={() => setShowTermsModal(true)} className="text-indigo-600 hover:underline font-medium">Terms of Service</button> and <button type="button" onClick={() => setShowTermsModal(true)} className="text-indigo-600 hover:underline font-medium">Privacy Policy</button>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.subscribeNewsletter}
                          onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Subscribe to safety updates and platform news
                        </Label>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all"
                    disabled={isLoading || (mode === 'register' && (!formData.agreeToTerms || formData.password !== formData.confirmPassword))}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{mode === 'register' ? 'Creating Account...' : 'Signing In...'}</span>
                      </div>
                    ) : (
                      mode === 'register' ? 'Create Account' : 'Sign In'
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="hover:scale-[1.02] transition-transform">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="hover:scale-[1.02] transition-transform">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-indigo-600 hover:text-indigo-700"
                      onClick={() => onModeChange(mode === 'register' ? 'login' : 'register')}
                    >
                      {mode === 'register' ? 'Sign in' : 'Sign up'}
                    </Button>
                  </p>
                </div>

                {mode === 'login' && (
                  <div className="text-center">
                    <Button variant="link" className="p-0 text-sm text-muted-foreground hover:text-indigo-600">
                      Forgot your password?
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {mode === 'register' && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-indigo-900">Free Account Includes:</div>
                    <ul className="text-indigo-700 mt-1 space-y-1">
                      <li>• Real-time drowsiness monitoring</li>
                      <li>• Safety alert notifications</li>
                      <li>• Basic analytics dashboard</li>
                      <li>• 24/7 technical support</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Confirmation Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Confirm Registration
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to create your account and login now? 
              This will initialize your safety monitoring profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegisterDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRegisterConfirm}>
              Yes, Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}