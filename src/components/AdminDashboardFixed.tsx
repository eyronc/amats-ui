import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { GLOBAL_FAKE_USER_DATA } from '../App';
import { 
  Eye,
  Users,
  Camera,
  Filter,
  FileText,
  LogOut,
  TrendingUp,
  Activity,
  UserCheck,
  UserX,
  Settings,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  Car,
  Truck,
  Clock,
  X,
  Download,
  CreditCard,
  DollarSign,
  ShoppingCart,
  Package,
  Trash2,
  Ban,
  AlertCircle,
  Calendar,
  Star,
  Zap,
  Lock,
  RefreshCw,
  Plus,
  ChevronDown,
  MessageSquare,
  Send,
  Monitor
} from 'lucide-react';
import { FleetMonitoringView } from './FleetMonitoringViewUpdated';

interface AdminDashboardProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
  };
  onLogout: () => void;
  registeredUsers: Array<{
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    isActive?: boolean;
    suspendedBy?: string;
    suspensionDuration?: number;
    suspensionStartTime?: string;
  }>;
  analytics: {
    totalUsers: number;
    recentRegistrations: Array<{
      id: number;
      name: string;
      email: string;
      type: string;
      time: string;
      country: string;
      isActive: boolean;
      suspendedBy?: string;
    }>;
  };
  onUserManagement: (action: string, targetEmail: string, adminEmail: string, duration?: number) => void;
  deletedFakeAccounts: string[];
}

// Use the global fake user data from App.tsx

export function AdminDashboard({ user, onLogout, registeredUsers, analytics, onUserManagement, deletedFakeAccounts }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [userFilter, setUserFilter] = useState('all');
  const [purchaseFilter, setPurchaseFilter] = useState('all');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{email: string; userData: any} | null>(null);
  const [showActionNotification, setShowActionNotification] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [showSuspensionModal, setShowSuspensionModal] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState<{email: string; userData: any; name: string} | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [fakeUserStatuses, setFakeUserStatuses] = useState<{[key: string]: {
    status: string;
    suspendedBy?: string;
    suspensionDuration?: number;
  }}>({});
  const [deletedReports, setDeletedReports] = useState<number[]>([]);
  const [showGenerateDropdown, setShowGenerateDropdown] = useState(false);
  const [showMonitoring, setShowMonitoring] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [selectedUserForMessage, setSelectedUserForMessage] = useState<{name: string; email: string} | null>(null);
  
  // Report generation state
  const [showReportInput, setShowReportInput] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [reportPrompt, setReportPrompt] = useState('');
  const [reports, setReports] = useState([
    { 
      id: 1, 
      title: 'Monthly Safety Report', 
      date: '2024-02-15', 
      type: 'Safety', 
      status: 'Generated',
      summary: 'Complete overview of safety metrics for February 2024. 89% improvement in drowsiness detection accuracy.',
      content: 'Detailed safety analysis with comprehensive metrics and recommendations.',
      fileSize: '2.4 MB'
    }
  ]);

  // Additional purchase history data
  const additionalPurchases = [
    {
      id: 2,
      userEmail: 'j.reyes@transport.co',
      userName: 'Juan Dela Cruz',
      userType: 'Fleet Manager',
      userCountry: 'Philippines',
      productName: 'Fleet Management Dashboard Pro',
      productPrice: 1299.99,
      quantity: 2,
      totalAmount: 2599.98,
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-002',
      purchaseDate: '2024-02-14',
      status: 'Completed',
      shippingAddress: 'Quezon City, Philippines'
    },
    {
      id: 3,
      userEmail: 'anna.reyes@logistics.ph',
      userName: 'Anna Reyes',
      userType: 'Driver',
      userCountry: 'Philippines',
      productName: 'Smart Drowsiness Alert System',
      productPrice: 459.99,
      quantity: 1,
      totalAmount: 459.99,
      paymentMethod: 'PayPal',
      transactionId: 'TXN-2024-003',
      purchaseDate: '2024-02-13',
      status: 'Processing',
      shippingAddress: 'Makati City, Philippines'
    },
    {
      id: 4,
      userEmail: 'carlos@delivery.net',
      userName: 'Carlos Mendoza',
      userType: 'Driver',
      userCountry: 'Philippines',
      productName: 'Professional Driver Camera Kit',
      productPrice: 789.99,
      quantity: 1,
      totalAmount: 789.99,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-2024-004',
      purchaseDate: '2024-02-12',
      status: 'Completed',
      shippingAddress: 'Cebu City, Philippines'
    },
    {
      id: 5,
      userEmail: 'sofia@safedriv.ph',
      userName: 'Sofia Morales',
      userType: 'Fleet Manager',
      userCountry: 'Philippines',
      productName: 'Advanced Safety Analytics Package',
      productPrice: 1899.99,
      quantity: 3,
      totalAmount: 5699.97,
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-005',
      purchaseDate: '2024-02-11',
      status: 'Completed',
      shippingAddress: 'Davao City, Philippines'
    },
    {
      id: 6,
      userEmail: 'pedro.garcia@transpo.ph',
      userName: 'Pedro Garcia',
      userType: 'Driver',
      userCountry: 'Philippines',
      productName: 'Emergency Response Kit',
      productPrice: 199.99,
      quantity: 2,
      totalAmount: 399.98,
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-006',
      purchaseDate: '2024-02-10',
      status: 'Shipped',
      shippingAddress: 'Iloilo City, Philippines'
    },
    {
      id: 7,
      userEmail: 'lisa.cruz@logistics.com',
      userName: 'Lisa Cruz',
      userType: 'Fleet Manager',
      userCountry: 'Philippines',
      productName: 'Real-time GPS Tracking System',
      productPrice: 2299.99,
      quantity: 5,
      totalAmount: 11499.95,
      paymentMethod: 'Corporate Account',
      transactionId: 'TXN-2024-007',
      purchaseDate: '2024-02-09',
      status: 'Completed',
      shippingAddress: 'Baguio City, Philippines'
    },
    {
      id: 8,
      userEmail: 'mike.santos@delivery.net',
      userName: 'Mike Santos',
      userType: 'Driver',
      userCountry: 'Philippines',
      productName: 'Fatigue Detection Wearable',
      productPrice: 349.99,
      quantity: 1,
      totalAmount: 349.99,
      paymentMethod: 'PayPal',
      transactionId: 'TXN-2024-008',
      purchaseDate: '2024-02-08',
      status: 'Completed',
      shippingAddress: 'Zamboanga City, Philippines'
    }
  ];

  // Purchase history state - combine original with additional data
  const [globalPurchaseHistory, setGlobalPurchaseHistory] = useState([
    {
      id: 1,
      userEmail: 'maria.santos@fleet.ph',
      userName: 'Maria Santos',
      userType: 'Driver',
      userCountry: 'Philippines',
      productName: 'Smart Driver Monitoring Helmet',
      productPrice: 299.99,
      quantity: 1,
      totalAmount: 299.99,
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-001',
      purchaseDate: '2024-02-15',
      status: 'Completed',
      shippingAddress: 'Manila, Philippines'
    },
    ...additionalPurchases
  ]);

  // Auto-generate report content based on type and prompt
  const generateReportContent = (type: string, prompt: string) => {
    const currentDate = new Date().toLocaleDateString();
    const reportId = `RPT-${Date.now()}`;
    
    return `
A.M.A.T.S. ${type.toUpperCase()} REPORT
Generated: ${currentDate}
Report ID: ${reportId}
User Request: ${prompt}

EXECUTIVE SUMMARY
================
This report has been generated based on your specific request: "${prompt}"

${type === 'Safety' ? `
SAFETY METRICS
==============
• Total Active Drivers: ${Object.values(GLOBAL_FAKE_USER_DATA).filter(u => u.type === 'driver' && !deletedFakeAccounts.includes(u.email)).length}
• Average Safety Score: ${Math.floor(Math.random() * 20) + 80}%
• Total Alerts This Month: ${Math.floor(Math.random() * 100) + 50}
• Drowsiness Detection Accuracy: 98.${Math.floor(Math.random() * 9) + 1}%
• Incident Prevention Rate: ${Math.floor(Math.random() * 20) + 80}%
` : ''}

${type === 'Performance' ? `
PERFORMANCE ANALYSIS
===================
• System Uptime: 99.${Math.floor(Math.random() * 9) + 1}%
• Average Response Time: 0.${Math.floor(Math.random() * 9) + 1} seconds
• Data Processing Speed: ${Math.floor(Math.random() * 1000) + 1000} events/second
• Database Performance: Excellent
` : ''}

${type === 'User Activity' ? `
USER ACTIVITY SUMMARY
=====================
• Total Registered Users: ${analytics.totalUsers}
• Active Users Today: ${Math.floor(Math.random() * 50) + 100}
• New Registrations This Week: ${Math.floor(Math.random() * 10) + 5}
• Fleet Managers: ${Object.values(GLOBAL_FAKE_USER_DATA).filter(u => u.type === 'fleet_manager' && !deletedFakeAccounts.includes(u.email)).length}
• Drivers: ${Object.values(GLOBAL_FAKE_USER_DATA).filter(u => u.type === 'driver' && !deletedFakeAccounts.includes(u.email)).length}
` : ''}

DETAILED ANALYSIS
================
Based on your request: ${prompt}

The system has analyzed the current data and generated this comprehensive report.
All metrics are calculated from real-time system data and represent the current
state of the A.M.A.T.S. platform.

KEY FINDINGS
============
1. System performance is operating within optimal parameters
2. User engagement has increased by ${Math.floor(Math.random() * 30) + 10}% this month
3. Safety detection accuracy continues to improve
4. No critical issues detected

RECOMMENDATIONS
===============
1. Continue monitoring current metrics
2. Consider expanding system capabilities
3. Implement additional safety features
4. Regular system maintenance recommended

---
Report compiled by A.M.A.T.S. Analytics Engine
Generated in response to: "${prompt}"
© 2024 A.M.A.T.S. Driver Drowsiness Detection System
`;
  };



  // Global message system state
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'admin@amats.com',
      to: 'maria.santos@fleet.ph',
      subject: 'Welcome to A.M.A.T.S.',
      content: 'Welcome to our Driver Drowsiness Detection System. Your safety is our priority.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: false,
      fromName: 'A.M.A.T.S. Admin',
      toName: 'Maria Santos'
    },
    {
      id: 2,
      from: 'j.reyes@transport.co',
      to: 'admin@amats.com',
      subject: 'Fleet Monitoring Question',
      content: 'Hi Admin, I have questions about the fleet monitoring features. Can you help?',
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      read: true,
      fromName: 'Juan Dela Cruz',
      toName: 'A.M.A.T.S. Admin'
    }
  ]);

  // Initialize fake user statuses
  useEffect(() => {
    const initialStatuses: {[key: string]: {
      status: string;
      suspendedBy?: string;
      suspensionDuration?: number;
    }} = {};
    Object.values(GLOBAL_FAKE_USER_DATA).forEach(userData => {
      initialStatuses[userData.email] = {
        status: userData.status,
        suspendedBy: undefined,
        suspensionDuration: undefined
      };
    });
    setFakeUserStatuses(initialStatuses);
  }, []);

  // Auto-hide notifications
  useEffect(() => {
    if (showActionNotification) {
      const timer = setTimeout(() => {
        setShowActionNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showActionNotification]);

  // Combine real and fake users, filtering out deleted fake accounts
  const mockUsers = [
    ...analytics.recentRegistrations.slice(0, 10).map((reg, index) => ({
      id: 1000 + index,
      name: reg.name,
      type: reg.type === 'driver' ? 'Driver' : (reg.type === 'fleet_manager' ? 'Fleet Manager' : 'Driver'),
      email: reg.email,
      status: reg.isActive ? 'active' : (reg.suspendedBy ? 'suspended' : 'terminated'),
      joinDate: new Date().toISOString().split('T')[0],
      alerts: Math.floor(Math.random() * 10),
      safetyScore: 85 + Math.floor(Math.random() * 15),
      vehicles: reg.type === 'fleet_manager' ? 15 + Math.floor(Math.random() * 30) : undefined,
      suspendedBy: reg.suspendedBy,
      suspensionDuration: reg.suspendedBy ? Math.floor(Math.random() * 60) + 1 : undefined,
      isRealTime: true,
      country: reg.country || 'Philippines',
      profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(reg.name)}&background=6366f1&color=fff&size=200`
    })),
    ...Object.values(GLOBAL_FAKE_USER_DATA)
      .filter(userData => !deletedFakeAccounts.includes(userData.email))
      .map(userData => ({
        ...userData,
        type: userData.type === 'driver' ? 'Driver' : 'Fleet Manager',
        status: fakeUserStatuses[userData.email]?.status || userData.status,
        suspendedBy: fakeUserStatuses[userData.email]?.suspendedBy || userData.suspendedBy,
        suspensionDuration: fakeUserStatuses[userData.email]?.suspensionDuration || userData.suspensionDuration
      }))
  ];

  // Handle report generation
  const handleGenerateReport = () => {
    if (!selectedReportType || !reportPrompt.trim()) {
      setActionMessage('Please select a report type and provide details.');
      setShowActionNotification(true);
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const reportContent = generateReportContent(selectedReportType, reportPrompt);
    
    const newReport = {
      id: Date.now(),
      title: `${selectedReportType} Report - ${currentDate}`,
      date: currentDate,
      type: selectedReportType,
      status: 'Generated',
      summary: `Auto-generated ${selectedReportType.toLowerCase()} report based on: "${reportPrompt.slice(0, 100)}..."`,
      content: reportContent,
      fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`
    };
    
    setReports(prev => [newReport, ...prev]);
    setShowReportInput(false);
    setSelectedReportType('');
    setReportPrompt('');
    setActionMessage('Report generated successfully!');
    setShowActionNotification(true);
  };

  // Handle user actions
  const handleUserAction = (action: string, userEmail: string, userData: any) => {
    if (action === 'view') {
      setSelectedUser(userData);
      setShowUserProfile(true);
    } else if (action === 'message') {
      setSelectedUserForMessage(userData);
      setShowMessageModal(true);
    } else if (action === 'monitor' && (userData.type === 'Driver' || userData.type === 'Fleet Manager')) {
      setShowMonitoring(true);
    } else if (action === 'suspend') {
      setUserToSuspend({ email: userEmail, userData, name: userData.name });
      setShowSuspensionModal(true);
    } else if (action === 'activate') {
      if (userData.isRealTime) {
        onUserManagement(action, userEmail, user.email);
      } else {
        setFakeUserStatuses(prev => ({
          ...prev,
          [userEmail]: {
            status: 'active',
            suspendedBy: undefined,
            suspensionDuration: undefined
          }
        }));
      }
      setActionMessage(`User ${userEmail} has been activated.`);
      setShowActionNotification(true);
    } else if (action === 'delete') {
      setUserToDelete({ email: userEmail, userData });
      setShowDeleteConfirm(true);
    }
  };

  // Handle suspension
  const handleSuspensionConfirm = (duration: number) => {
    if (userToSuspend) {
      if (userToSuspend.userData.isRealTime) {
        onUserManagement('suspend', userToSuspend.email, user.email, duration);
      } else {
        setFakeUserStatuses(prev => ({
          ...prev,
          [userToSuspend.email]: {
            status: 'suspended',
            suspendedBy: user.email,
            suspensionDuration: duration
          }
        }));
      }
      setActionMessage(`User ${userToSuspend.email} has been suspended for ${duration} minutes.`);
      setShowActionNotification(true);
      setUserToSuspend(null);
      setShowSuspensionModal(false);
    }
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    if (userToDelete) {
      // Always call onUserManagement for deletion, it will handle both real and fake accounts
      onUserManagement('delete', userToDelete.email, user.email);
      
      setActionMessage(`User ${userToDelete.email} has been deleted.`);
      setShowActionNotification(true);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  // Download report with proper filename
  const downloadReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const element = document.createElement('a');
      const file = new Blob([report.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `A.M.A.T.S. ${report.type} Report - ${report.date}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setActionMessage('Report downloaded successfully!');
      setShowActionNotification(true);
    }
  };

  // Export users with proper filename
  const exportUsers = () => {
    const currentDate = new Date().toLocaleDateString().replace(/\//g, '-');
    const csvContent = [
      'Name,Email,Type,Status,Join Date,Safety Score,Alerts,Country,Company',
      ...mockUsers.filter(u => u.status !== 'terminated').map(user => 
        `"${user.name}","${user.email}","${user.type}","${user.status}","${user.joinDate}","${user.safetyScore || 'N/A'}","${user.alerts || 0}","${user.country || 'N/A'}","${user.company || 'N/A'}"`
      )
    ].join('\n');

    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `A.M.A.T.S. User Data - ${currentDate}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setActionMessage('Users exported successfully!');
    setShowActionNotification(true);
  };

  // Export purchases with proper filename
  const exportPurchases = () => {
    const currentDate = new Date().toLocaleDateString().replace(/\//g, '-');
    const csvContent = [
      'Transaction ID,User Name,User Type,Product Name,Quantity,Unit Price,Total Amount,Payment Method,Purchase Date,Status,Country,Shipping Address',
      ...filteredPurchases.map(purchase => 
        `"${purchase.transactionId}","${purchase.userName}","${purchase.userType}","${purchase.productName}","${purchase.quantity}","₱${(purchase.productPrice * 56).toFixed(2)}","₱${(purchase.totalAmount * 56).toFixed(2)}","${purchase.paymentMethod}","${purchase.purchaseDate}","${purchase.status}","${purchase.userCountry}","${purchase.shippingAddress}"`
      )
    ].join('\n');

    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `A.M.A.T.S. Purchase History - ${currentDate}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setActionMessage('Purchase history exported successfully!');
    setShowActionNotification(true);
  };

  // Send message
  const handleSendMessage = () => {
    if (!messageSubject.trim() || !messageContent.trim()) {
      setActionMessage('Please fill in both subject and message.');
      setShowActionNotification(true);
      return;
    }

    // Here you would typically send the message to the user
    setActionMessage(`Message sent to ${selectedUserForMessage?.name} successfully!`);
    setShowActionNotification(true);
    setShowMessageModal(false);
    setMessageSubject('');
    setMessageContent('');
    setSelectedUserForMessage(null);
  };

  const filteredUsers = mockUsers.filter(user => {
    if (user.status === 'terminated') return false;
    if (userFilter === 'drivers') return user.type === 'Driver';
    if (userFilter === 'fleet_managers') return user.type === 'Fleet Manager';
    return true;
  });

  const filteredPurchases = globalPurchaseHistory.filter(purchase => {
    if (purchaseFilter === 'drivers') return purchase.userType === 'Driver';
    if (purchaseFilter === 'fleet_managers') return purchase.userType === 'Fleet Manager';
    if (purchaseFilter === 'completed') return purchase.status === 'Completed';
    if (purchaseFilter === 'processing') return purchase.status === 'Processing';
    return true;
  });

  if (showMonitoring) {
    return <FleetMonitoringView onClose={() => setShowMonitoring(false)} />;
  }

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden" key={refreshKey}>
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm w-full">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  A.M.A.T.S. Admin
                </h1>
                <p className="text-sm text-muted-foreground">Driver Drowsiness Detection System Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowMonitoring(true)}
                className="hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <Monitor className="h-4 w-4 mr-2" />
                Monitor
              </Button>
              <div className="text-right hidden sm:block">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-muted-foreground">System Administrator</p>
              </div>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Action Notification */}
      {showActionNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>{actionMessage}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowActionNotification(false)}
              className="text-white hover:bg-green-700 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Horizontal Tabs List */}
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Purchase History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{12847 + analytics.totalUsers}</p>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Car className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{8456 + filteredUsers.filter(u => u.type === 'Driver').length}</p>
                      <p className="text-sm text-muted-foreground">Active Drivers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">{2341 + filteredUsers.filter(u => u.type === 'Fleet Manager').length}</p>
                      <p className="text-sm text-muted-foreground">Fleet Managers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold">{filteredUsers.filter(u => u.status === 'suspended').length}</p>
                      <p className="text-sm text-muted-foreground">Suspended Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage driver and fleet manager accounts</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="drivers">Drivers Only</SelectItem>
                    <SelectItem value="fleet_managers">Fleet Managers Only</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={exportUsers} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.email} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage 
                            src={user.profileImage} 
                            alt={user.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-indigo-600 text-white">
                            {user.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                          user.status === 'active' ? 'bg-green-500' : 
                          user.status === 'suspended' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={user.type === 'Driver' ? 'default' : 'secondary'}>
                            {user.type}
                          </Badge>
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction('view', user.email, user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction('message', user.email, user)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      {(user.type === 'Driver' || user.type === 'Fleet Manager') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUserAction('monitor', user.email, user)}
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                          onClick={() => handleUserAction('suspend', user.email, user)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:bg-green-50 hover:border-green-300"
                          onClick={() => handleUserAction('activate', user.email, user)}
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleUserAction('delete', user.email, user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Report Management</h3>
                <p className="text-sm text-muted-foreground">Generate and manage system reports</p>
              </div>
              <Button onClick={() => setShowReportInput(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reports.filter(r => !deletedReports.includes(r.id)).map((report) => (
                <Card key={report.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.summary}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-muted-foreground">Generated: {report.date}</span>
                        <Badge variant="outline">{report.type}</Badge>
                        <span className="text-xs text-muted-foreground">{report.fileSize}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadReport(report.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setDeletedReports(prev => [...prev, report.id]);
                          setActionMessage('Report deleted successfully!');
                          setShowActionNotification(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Purchase History Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Purchase History</h3>
                <p className="text-sm text-muted-foreground">Track all safety equipment purchases</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={purchaseFilter} onValueChange={setPurchaseFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter purchases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Purchases</SelectItem>
                    <SelectItem value="drivers">Drivers Only</SelectItem>
                    <SelectItem value="fleet_managers">Fleet Managers Only</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={exportPurchases} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Purchases
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredPurchases.map((purchase) => (
                <Card key={purchase.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{purchase.productName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Purchased by {purchase.userName} ({purchase.userType})
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm">₱{(purchase.totalAmount * 56).toFixed(2)}</span>
                        <Badge variant={purchase.status === 'Completed' ? 'default' : 'secondary'}>
                          {purchase.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{purchase.purchaseDate}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Generation Modal */}
      {showReportInput && (
        <Dialog open={showReportInput} onOpenChange={setShowReportInput}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>
                Choose a report type and describe what you want to analyze
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Report Type</Label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Safety">Safety Report</SelectItem>
                    <SelectItem value="Performance">Performance Report</SelectItem>
                    <SelectItem value="User Activity">User Activity Report</SelectItem>
                    <SelectItem value="Analytics">Analytics Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>What would you like to analyze?</Label>
                <Textarea
                  placeholder="Describe what specific metrics or data you want to include in this report..."
                  value={reportPrompt}
                  onChange={(e) => setReportPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} className="flex-1">
                  Generate Report
                </Button>
                <Button variant="outline" onClick={() => setShowReportInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedUserForMessage && (
        <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Message to {selectedUserForMessage.name}</DialogTitle>
              <DialogDescription>
                Send a direct message to this user
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input
                  placeholder="Message subject"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendMessage} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* User Profile Modal */}
      {showUserProfile && selectedUser && (
        <Dialog open={showUserProfile} onOpenChange={setShowUserProfile}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Profile - {selectedUser.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage 
                    src={selectedUser.profileImage} 
                    alt={selectedUser.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={selectedUser.type === 'Driver' ? 'default' : 'secondary'}>
                      {selectedUser.type}
                    </Badge>
                    <Badge variant={selectedUser.status === 'active' ? 'default' : 'destructive'}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <p>{selectedUser.company || 'N/A'}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p>{selectedUser.phone || 'N/A'}</p>
                </div>
                <div>
                  <Label>Country</Label>
                  <p>{selectedUser.country}</p>
                </div>
                <div>
                  <Label>Join Date</Label>
                  <p>{selectedUser.joinDate}</p>
                </div>
                <div>
                  <Label>Safety Score</Label>
                  <p>{selectedUser.safetyScore}%</p>
                </div>
                <div>
                  <Label>Total Alerts</Label>
                  <p>{selectedUser.alerts}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Suspension Modal */}
      {showSuspensionModal && userToSuspend && (
        <Dialog open={showSuspensionModal} onOpenChange={setShowSuspensionModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Suspend User</DialogTitle>
              <DialogDescription>
                How long do you want to suspend {userToSuspend.name}?
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => handleSuspensionConfirm(5)}>5 Minutes</Button>
              <Button onClick={() => handleSuspensionConfirm(15)}>15 Minutes</Button>
              <Button onClick={() => handleSuspensionConfirm(30)}>30 Minutes</Button>
              <Button onClick={() => handleSuspensionConfirm(60)}>1 Hour</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && userToDelete && (
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to permanently delete {userToDelete.userData.name}'s account? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}