import React, { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPageFixed";
import { AppContainer } from "./components/AppContainer";
import { FleetMonitoringView } from "./components/FleetMonitoringView";
import { AdminDashboard } from "./components/AdminDashboardFixed";
import { LogoutConfirmDialog } from "./components/LogoutConfirmDialog";

type AppState =
  | "loading"
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "admin";

type UserType = "driver" | "fleet_manager" | "admin";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  userType: UserType;
  country?: string;
  phoneNumber?: string;
  registrationDate?: string;
  isFirstLogin?: boolean;
  isActive?: boolean;
  suspendedBy?: string;
  suspensionDuration?: number; // in minutes
  suspensionStartTime?: string; // ISO string
}

// Filipino names for realistic mock data (currently used for hard-coded analytics data)
// const filipinoNames = [
//   "Maria Fernandez", "Juan Hernandez", "Anna Villanueva", "Carlos Mercado", "Jose Aquino",
//   "Luz Mendoza", "Roberto Pereira", "Carmen Delgado", "Miguel Santos", "Sofia Gutierrez",
//   "Antonio Valdez", "Elena Francisco", "Patrick Herrera", "Isabella Cruz", "Diego Navarro",
//   "Camila Ramirez", "Gabriel Moreno", "Valentina Jimenez", "Alejandro Vargas", "Natalia Torres",
//   "Rafael Aguilar", "Carmen Castillo", "Daniel Morales", "Bianca Rodriguez", "Adrian Lopez",
//   "Cristina Flores", "Emmanuel Reyes", "Katrina Silva", "Lorenzo Garcia", "Jasmine Dela Rosa"
// ];

// Comprehensive fake user data that can be deleted
export const GLOBAL_FAKE_USER_DATA = {
  'maria.santos@fleet.ph': {
    id: 1,
    name: 'Maria Santos',
    type: 'driver',
    email: 'maria.santos@fleet.ph',
    status: 'active',
    joinDate: '2024-01-15',
    alerts: 3,
    safetyScore: 96,
    country: 'Philippines',
    profileImage: 'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    company: 'Manila Transit Corp',
    phone: '+63 912 345 6789',
    isRealTime: false
  },
  'j.reyes@transport.co': {
    id: 2,
    name: 'Juan Dela Cruz',
    type: 'fleet_manager',
    email: 'j.reyes@transport.co',
    status: 'active',
    joinDate: '2024-01-20',
    vehicles: 25,
    safetyScore: 89,
    country: 'Philippines',
    profileImage: 'https://images.unsplash.com/photo-1648448942225-7aa06c7e8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMGJ1c2luZXNzJTIwbWFuYWdlcnxlbnwxfHx8fDE3NTg0NTMxNjd8MA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    company: 'Logistics Solutions Inc.',
    phone: '+63 917 888 9999',
    isRealTime: false
  },
  'anna.reyes@logistics.ph': {
    id: 3,
    name: 'Anna Reyes',
    type: 'driver',
    email: 'anna.reyes@logistics.ph',
    status: 'active',
    joinDate: '2024-02-01',
    alerts: 8,
    safetyScore: 88,
    country: 'Philippines',
    profileImage: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NDUzMTczfDA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    company: 'FastDelivery Services',
    phone: '+63 905 123 4567',
    isRealTime: false
  },
  'carlos@delivery.net': {
    id: 4,
    name: 'Carlos Mendoza',
    type: 'driver',
    email: 'carlos@delivery.net',
    status: 'active',
    joinDate: '2024-01-10',
    alerts: 2,
    safetyScore: 92,
    country: 'Philippines',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    company: 'Cargo Masters Philippines',
    phone: '+63 928 777 8888',
    isRealTime: false
  },
  'sofia@safedriv.ph': {
    id: 5,
    name: 'Sofia Morales',
    type: 'fleet_manager',
    email: 'sofia@safedriv.ph',
    status: 'active',
    joinDate: '2024-01-25',
    alerts: 1,
    vehicles: 35,
    safetyScore: 93,
    country: 'Philippines',
    profileImage: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NDUzMTYwfDA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    company: 'FastTrack Courier Services',
    phone: '+63 916 555 7777',
    isRealTime: false
  },
  'eltonthanksG@uc.edu.ph': {
    id: 6,
    name: 'Elton Geromo',
    type: 'fleet_manager',
    email: 'eltonthanksG@uc.edu.ph',
    status: 'active',
    joinDate: '2024-01-05',
    alerts: 0,
    vehicles: 12,
    safetyScore: 95,
    country: 'Philippines',
    profileImage: 'https://ui-avatars.com/api/?name=Elton+Geromo&background=6366f1&color=fff&size=200',
    company: 'UC Transportation',
    phone: '+63 939 111 2222',
    isRealTime: false
  }
};

// Dynamic analytics data that updates with new registrations
const createMockAnalytics = (registeredUsers: UserData[], deletedFakeAccounts: string[]) => {
  // Convert fake user data to analytics format and filter out deleted accounts
  const activeFakeAccounts = Object.values(GLOBAL_FAKE_USER_DATA)
    .filter(account => !deletedFakeAccounts.includes(account.email))
    .map((account) => ({
      id: account.id,
      name: account.name,
      email: account.email,
      type: account.type,
      time: account.id === 6 ? "1 hr ago" : `${15 + (account.id * 3)} min ago`,
      country: account.country,
      isActive: true
    }));

  return {
    totalUsers: 2847 + registeredUsers.length,
    recentRegistrations: [
      ...registeredUsers.slice(-10).reverse().map((user, index) => ({
        id: registeredUsers.length - index + 1000,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        type: user.userType,
        time: `${index * 3 + 2} min ago`,
        country: user.country || 'Philippines',
        isActive: user.isActive !== false,
        suspendedBy: user.suspendedBy
      })),
      ...activeFakeAccounts
    ].slice(0, 15)
  };
};

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("loading");
  const [user, setUser] = useState<UserData | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<UserData[]>([]);
  const [deletedAccounts, setDeletedAccounts] = useState<string[]>([]);
  const [deletedFakeAccounts, setDeletedFakeAccounts] = useState<string[]>([]);
  const [userLoginHistory, setUserLoginHistory] = useState<{[email: string]: number}>({});
  const [showSuspensionDialogState, setShowSuspensionDialogState] = useState(false);
  const [suspensionData, setSuspensionData] = useState<{minutes: number, seconds: number, suspendedBy: string} | null>(null);

  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLoadingComplete = () => {
    setCurrentState("login"); // Changed from "landing" to "login"
  };

  const handleGetStarted = () => {
    setCurrentState("register");
  };

  const handleLogin = () => {
    setCurrentState("login");
  };

  const handleAuthSuccess = (userData: UserData) => {
    // Check if account was deleted
    if (deletedAccounts.includes(userData.email)) {
      alert("This account has been deleted. Please register again.");
      return;
    }

    // Check login history for welcome message
    const loginCount = userLoginHistory[userData.email] || 0;
    const isFirstLogin = loginCount === 0;
    
    // Update login history
    setUserLoginHistory(prev => ({
      ...prev,
      [userData.email]: loginCount + 1
    }));

    // Add user to registered users list for validation
    if (currentState === "register") {
      const newUserData = {
        ...userData,
        registrationDate: new Date().toISOString(),
        isFirstLogin: true,
        isActive: true
      };
      setRegisteredUsers(prev => [...prev, newUserData]);
      setUser(newUserData);
    } else {
      // For existing users, check if they exist in our system
      const existingUser = registeredUsers.find(u => u.email === userData.email);
      if (existingUser) {
        // Check if account is suspended and if suspension has expired
        if (existingUser.isActive === false && existingUser.suspensionStartTime && existingUser.suspensionDuration) {
          const suspensionStart = new Date(existingUser.suspensionStartTime);
          const suspensionEnd = new Date(suspensionStart.getTime() + (existingUser.suspensionDuration * 60 * 1000));
          const now = new Date();
          
          if (now < suspensionEnd) {
            const remainingMs = suspensionEnd.getTime() - now.getTime();
            const remainingMinutes = Math.floor(remainingMs / (60 * 1000));
            const remainingSeconds = Math.floor((remainingMs % (60 * 1000)) / 1000);
            
            // Show suspension dialog with real-time countdown
            showSuspensionDialog(remainingMinutes, remainingSeconds, existingUser.suspendedBy || 'Administrator');
            return;
          } else {
            // Suspension has expired, auto-activate user
            handleUserManagement('activate', userData.email, 'system');
            setUser({...existingUser, isFirstLogin, isActive: true, suspendedBy: undefined, suspensionDuration: undefined, suspensionStartTime: undefined});
          }
        } else if (existingUser.isActive === false) {
          alert(`This account has been suspended by ${existingUser.suspendedBy || 'Administrator'}.`);
          return;
        } else {
          setUser({...existingUser, isFirstLogin});
        }
      } else {
        setUser({...userData, isFirstLogin});
      }
    }
    
    // Route to admin dashboard if admin, otherwise regular dashboard
    if (userData.userType === "admin") {
      setCurrentState("admin");
    } else {
      setCurrentState("dashboard");
    }
  };

  const handleAuthModeChange = (mode: "login" | "register") => {
    setCurrentState(mode);
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setCurrentState("login"); // Changed from "landing" to "login"
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const showSuspensionDialog = (minutes: number, seconds: number, suspendedBy: string) => {
    setSuspensionData({ minutes, seconds, suspendedBy });
    setShowSuspensionDialogState(true);
    
    // Start countdown timer
    const interval = setInterval(() => {
      setSuspensionData(prev => {
        if (!prev) return null;
        
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes = newMinutes - 1;
        }
        
        if (newMinutes < 0) {
          clearInterval(interval);
          setShowSuspensionDialogState(false);
          setSuspensionData(null);
          alert('Your suspension has expired. You can now try logging in again.');
          return null;
        }
        
        return { ...prev, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
  };

  if (currentState === "loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (currentState === "landing") {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onLogin={handleLogin}
      />
    );
  }

  if (currentState === "login" || currentState === "register") {
    return (
      <>
        <AuthPage
          mode={currentState}
          onBack={handleBackToLanding}
          onSuccess={handleAuthSuccess}
          onModeChange={handleAuthModeChange}
          registeredUsers={registeredUsers}
          analytics={createMockAnalytics(registeredUsers, deletedFakeAccounts)}
        />
        {showLogoutConfirm && (
          <LogoutConfirmDialog
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
      </>
    );
  }

  const handleUserManagement = (action: string, targetEmail: string, adminEmail: string, duration?: number) => {
    // Check if this is a fake account (not in registeredUsers)
    const isRegisteredUser = registeredUsers.some(user => user.email === targetEmail);
    
    if (!isRegisteredUser) {
      // Handle fake account management
      if (action === 'delete') {
        setDeletedFakeAccounts(prev => [...prev, targetEmail]);
      }
      // For fake accounts, other actions are handled in AdminDashboard component
      return;
    }

    // Handle real registered users
    setRegisteredUsers(prev => {
      const updatedUsers = prev.map(user => {
        if (user.email === targetEmail) {
          if (action === 'suspend') {
            return { 
              ...user, 
              isActive: false, 
              suspendedBy: adminEmail,
              suspensionDuration: duration || 60, // default 60 minutes
              suspensionStartTime: new Date().toISOString()
            };
          } else if (action === 'activate') {
            return { 
              ...user, 
              isActive: true, 
              suspendedBy: undefined,
              suspensionDuration: undefined,
              suspensionStartTime: undefined
            };
          } else if (action === 'delete') {
            // Add to deleted accounts for permanent removal
            setDeletedAccounts(prev => [...prev, targetEmail]);
            return null; // Mark for removal
          }
        }
        return user;
      }).filter(user => user !== null); // Remove null entries (deleted users)
      
      return updatedUsers;
    });
  };

  if (currentState === "dashboard" && user) {
    return (
      <>
        <AppContainer 
          user={user} 
          onLogout={handleLogout}
          registeredUsers={registeredUsers}
          analytics={createMockAnalytics(registeredUsers, deletedFakeAccounts)}
        />
        {showLogoutConfirm && (
          <LogoutConfirmDialog
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
      </>
    );
  }

  if (currentState === "admin" && user && user.userType === "admin") {
    return (
      <>
        <AdminDashboard 
          user={user} 
          onLogout={handleLogout}
          registeredUsers={registeredUsers}
          analytics={createMockAnalytics(registeredUsers, deletedFakeAccounts)}
          onUserManagement={handleUserManagement}
          deletedFakeAccounts={deletedFakeAccounts}
        />
        {showLogoutConfirm && (
          <LogoutConfirmDialog
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
      </>
    );
  }

  return (
    <>
      {showSuspensionDialogState && suspensionData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md mx-4 border">
            <div className="text-center space-y-4">
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Account Suspended</h3>
                <p className="text-muted-foreground mt-2">
                  Your account has been suspended by {suspensionData.suspendedBy}.
                </p>
                <p className="text-muted-foreground">
                  Please try again in:
                </p>
                <div className="text-2xl font-bold text-red-600 mt-3">
                  {String(suspensionData.minutes).padStart(2, '0')}:{String(suspensionData.seconds).padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Minutes : Seconds remaining
                </p>
              </div>
              <button
                onClick={() => {
                  setShowSuspensionDialogState(false);
                  setSuspensionData(null);
                }}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}