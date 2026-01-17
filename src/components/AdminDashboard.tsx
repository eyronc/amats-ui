import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { ReportGenerationModal } from './ReportGenerationModal';
import { UserProfileModal } from './UserProfileModal';
import { SuspensionDurationModal } from './SuspensionDurationModal';

interface Report {
  id: number;
  title: string;
  date: string;
  type: string;
  status: string;
  summary: string;
  metrics: { [key: string]: string | number };
  fileSize: string;
}

interface AdminDashboardProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
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
      country: string;
      isActive: boolean;
      suspendedBy?: string;
    }>;
  };
  onUserManagement: (action: string, targetEmail: string, adminEmail: string, duration?: number) => void;
}

// Get currency based on country
const getCurrencyInfo = (country: string) => {
  switch (country) {
    case 'United States':
      return { symbol: '$', rate: 1, code: 'USD' };
    case 'Philippines':
      return { symbol: '₱', rate: 56, code: 'PHP' };
    case 'United Kingdom':
      return { symbol: '£', rate: 0.79, code: 'GBP' };
    case 'Canada':
      return { symbol: 'C$', rate: 1.35, code: 'CAD' };
    case 'Australia':
      return { symbol: 'A$', rate: 1.52, code: 'AUD' };
    case 'Germany':
    case 'France':
    case 'Spain':
    case 'Italy':
      return { symbol: '€', rate: 0.93, code: 'EUR' };
    default:
      return { symbol: '₱', rate: 56, code: 'PHP' }; // Default to PHP for Philippines
  }
};

// Purchase History Mock Data with correct prices from shop
const mockPurchaseHistory = [
  {
    id: 1,
    userEmail: 'maria@transport.com',
    userName: 'Maria Fernandez',
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
  {
    id: 2,
    userEmail: 'juan@logistics.com',
    userName: 'Juan Hernandez',
    userType: 'Fleet Manager',
    userCountry: 'Philippines',
    productName: 'Fleet Management Hub',
    productPrice: 1299.99,
    quantity: 1,
    totalAmount: 1299.99,
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN-2024-002',
    purchaseDate: '2024-02-14',
    status: 'Completed',
    shippingAddress: 'Quezon City, Philippines'
  },
  {
    id: 3,
    userEmail: 'anna@delivery.com',
    userName: 'Anna Villanueva',
    userType: 'Driver',
    userCountry: 'Philippines',
    productName: 'Wearable Safety Monitor',
    productPrice: 89.99,
    quantity: 2,
    totalAmount: 179.98,
    paymentMethod: 'PayPal',
    transactionId: 'TXN-2024-003',
    purchaseDate: '2024-02-13',
    status: 'Processing',
    shippingAddress: 'Cebu City, Philippines'
  },
  {
    id: 4,
    userEmail: 'carlos@cargo.com',
    userName: 'Carlos Mercado',
    userType: 'Fleet Manager',
    userCountry: 'Philippines',
    productName: 'AI Dashboard Camera Pro',
    productPrice: 199.99,
    quantity: 3,
    totalAmount: 599.97,
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-2024-004',
    purchaseDate: '2024-02-12',
    status: 'Shipped',
    shippingAddress: 'Davao City, Philippines'
  },
  {
    id: 5,
    userEmail: 'sofia@fasttrack.ph',
    userName: 'Sofia Gutierrez',
    userType: 'Driver',
    userCountry: 'Philippines',
    productName: 'Smart Steering Wheel Sensor',
    productPrice: 149.99,
    quantity: 1,
    totalAmount: 149.99,
    paymentMethod: 'GCash',
    transactionId: 'TXN-2024-005',
    purchaseDate: '2024-02-11',
    status: 'Completed',
    shippingAddress: 'Makati City, Philippines'
  },
  {
    id: 6,
    userEmail: 'miguel@citylogistics.ph',
    userName: 'Miguel Santos',
    userType: 'Fleet Manager',
    userCountry: 'United States',
    productName: 'In-Cabin Air Quality Monitor',
    productPrice: 179.99,
    quantity: 2,
    totalAmount: 359.98,
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-2024-006',
    purchaseDate: '2024-02-10',
    status: 'Completed',
    shippingAddress: 'California, USA'
  }
];

export function AdminDashboard({ user, onLogout, registeredUsers, analytics, onUserManagement }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [userFilter, setUserFilter] = useState('all');
  const [purchaseFilter, setPurchaseFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportSelectionModal, setShowReportSelectionModal] = useState(false);
  const [showSpecificReportModal, setShowSpecificReportModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [showViewReportModal, setShowViewReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToSuspend, setUserToSuspend] = useState<{ email: string; userData: any; name: string } | null>(null);
  const [showSuspensionModal, setShowSuspensionModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ email: string; userData: any } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reports, setReports] = useState<Report[]>([
    { 
      id: 1, 
      title: 'Monthly Safety Report', 
      date: '2024-02-01', 
      type: 'Safety', 
      status: 'Generated',
      summary: 'Complete overview of safety metrics for January 2024. 89% improvement in drowsiness detection accuracy.',
      metrics: { 'Total Alerts': 1247, 'Avg Response Time': '1.2s', 'Safety Improvement': '89%' },
      fileSize: '2.4 MB'
    },
    { 
      id: 2,
      title: 'Driver Performance Analysis', 
      date: '2024-02-01', 
      type: 'Analytics', 
      status: 'Generated',
      summary: 'Comprehensive analysis of driver behavior patterns and safety scores across fleet.',
      metrics: { 'Drivers Analyzed': 156, 'Avg Safety Score': '92%', 'Risk Reduction': '67%' },
      fileSize: '1.8 MB'
    },
    { 
      id: 3,
      title: 'Drowsiness Detection Trends', 
      date: '2024-01-31', 
      type: 'Detection', 
      status: 'Generated',
      summary: 'Analysis of drowsiness detection patterns and effectiveness over time.',
      metrics: { 'Detection Accuracy': '98.7%', 'False Positives': '2.1%', 'Avg Detection Time': '0.8s' },
      fileSize: '3.1 MB'
    },
    { 
      id: 4,
      title: 'System Security Audit', 
      date: '2024-01-30', 
      type: 'Security', 
      status: 'Generated',
      summary: 'Complete security assessment of A.M.A.T.S. infrastructure and data protection.',
      metrics: { 'Vulnerabilities': 0, 'Security Score': '99.8%', 'Compliance Level': '100%' },
      fileSize: '4.2 MB'
    }
  ]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionMessage, setActionMessage] = useState('');
  const [showActionNotification, setShowActionNotification] = useState(false);
  const [specificReportData, setSpecificReportData] = useState<any>(null);

  // Profile images for users
  const userProfiles: { [key: string]: string } = {
    'mariasantos@gmail.com': 'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'juancruz@gmail.com': 'https://images.unsplash.com/photo-1649186019834-18ee06d7d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGRyaXZlcnxlbnwxfHx8fDE3NTg0NTMxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'maria@transport.com': 'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'juan@logistics.com': 'https://images.unsplash.com/photo-1648448942225-7aa06c7e8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMGJ1c2luZXNzJTIwbWFuYWdlcnxlbnwxfHx8fDE3NTg0NTMxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'anna@delivery.com': 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NDUzMTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'carlos@cargo.com': 'https://images.unsplash.com/photo-1648448942225-7aa06c7e8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMGJ1c2luZXNzJTIwbWFuYWdlcnxlbnwxfHx8fDE3NTg0NTMxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'sofia@fasttrack.ph': 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NDUzMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'miguel@citylogistics.ph': 'https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODQ1MzE3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'carmen@delivery.ph': 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NDUzMTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'roberto@fleet.com': 'https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODQ1MzE3OXww&ixlib=rb-4.1.0&q=80&w=1080'
  };

  // Combine real registered users with mock data, filtering out deleted ones
  const mockUsers = [
    // Real registered users (only active ones, not deleted)
    ...analytics.recentRegistrations.slice(0, 10).map((reg, index) => ({
      id: 1000 + index,
      name: reg.name,
      type: reg.type === 'driver' ? 'Driver' : 'Fleet Manager',
      email: reg.email,
      status: reg.isActive ? 'active' : (reg.suspendedBy ? 'suspended' : 'terminated'),
      joinDate: new Date().toISOString().split('T')[0],
      alerts: Math.floor(Math.random() * 10),
      safetyScore: 85 + Math.floor(Math.random() * 15),
      vehicles: reg.type === 'fleet_manager' ? 15 + Math.floor(Math.random() * 30) : undefined,
      suspendedBy: reg.suspendedBy,
      suspensionDuration: reg.suspendedBy ? Math.floor(Math.random() * 60) + 1 : undefined, // 1-60 minutes
      isRealTime: true,
      profileImage: userProfiles[reg.email] || undefined,
      country: reg.country || 'Philippines'
    })),
    // Filipino mock users with unique names and profile images
    { id: 1, name: 'Maria Fernandez', type: 'Driver', email: 'maria@transport.com', status: 'active', joinDate: '2024-01-15', alerts: 3, safetyScore: 96, isRealTime: false, profileImage: userProfiles['maria@transport.com'], country: 'Philippines' },
    { id: 2, name: 'Juan Hernandez', type: 'Fleet Manager', email: 'juan@logistics.com', status: 'active', joinDate: '2024-01-20', vehicles: 25, safetyScore: 89, isRealTime: false, profileImage: userProfiles['juan@logistics.com'], country: 'Philippines' },
    { id: 3, name: 'Anna Villanueva', type: 'Driver', email: 'anna@delivery.com', status: 'active', joinDate: '2024-02-01', alerts: 8, safetyScore: 88, isRealTime: false, profileImage: userProfiles['anna@delivery.com'], country: 'Philippines' },
    { id: 4, name: 'Carlos Mercado', type: 'Fleet Manager', email: 'carlos@cargo.com', status: 'suspended', joinDate: '2024-01-10', vehicles: 45, safetyScore: 75, suspendedBy: 'admin@amats.com', suspensionDuration: 30, isRealTime: false, profileImage: userProfiles['carlos@cargo.com'], country: 'Philippines' },
    { id: 5, name: 'Sofia Gutierrez', type: 'Driver', email: 'sofia@fasttrack.ph', status: 'active', joinDate: '2024-01-25', alerts: 1, safetyScore: 93, isRealTime: false, profileImage: userProfiles['sofia@fasttrack.ph'], country: 'Philippines' },
    { id: 6, name: 'Miguel Santos', type: 'Fleet Manager', email: 'miguel@citylogistics.ph', status: 'active', joinDate: '2024-01-30', vehicles: 18, safetyScore: 91, isRealTime: false, profileImage: userProfiles['miguel@citylogistics.ph'], country: 'Philippines' },
    { id: 7, name: 'Carmen Delgado', type: 'Driver', email: 'carmen@delivery.ph', status: 'active', joinDate: '2024-02-02', alerts: 5, safetyScore: 87, isRealTime: false, profileImage: userProfiles['carmen@delivery.ph'], country: 'Philippines' },
    { id: 8, name: 'Roberto Pereira', type: 'Fleet Manager', email: 'roberto@fleet.com', status: 'active', joinDate: '2024-01-18', vehicles: 32, safetyScore: 94, isRealTime: false, profileImage: userProfiles['roberto@fleet.com'], country: 'Philippines' },
  ];

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setActionMessage('Dashboard refreshed successfully!');
    setShowActionNotification(true);
  };

  const handleGenerateReport = (reportType: string) => {
    setSelectedReportType(reportType);
    setShowReportModal(true);
  };

  const handleGenerateNewReport = () => {
    setShowReportSelectionModal(true);
  };

  const handleSpecificReportGeneration = (reportType: string) => {
    setSelectedReportType(reportType);
    setShowReportSelectionModal(false);
    
    // Create specific data based on report type
    let specificData = {};
    
    switch(reportType) {
      case 'Safety Report':
        specificData = {
          safetyMetrics: {
            'Total Alerts': 1247,
            'Response Time': '1.2s',
            'Accuracy': '98.7%'
          },
          alertTypes: ['Drowsiness', 'Distraction', 'Fatigue'],
          timeframe: 'Last 30 days'
        };
        break;
      case 'Driver Performance Analysis':
        specificData = {
          drivers: mockUsers.filter(u => u.type === 'Driver'),
          performanceMetrics: ['Safety Score', 'Alert Count', 'Response Time'],
          averageScore: '91%'
        };
        break;
      case 'Detection System Report':
        specificData = {
          systems: ['Drowsiness Detection', 'Eye Tracking', 'Head Position'],
          uptime: '99.2%',
          accuracy: '98.7%'
        };
        break;
      case 'Security Audit Report':
        specificData = {
          vulnerabilities: 0,
          securityScore: '99.8%',
          lastAudit: new Date().toISOString().split('T')[0]
        };
        break;
    }
    
    setSpecificReportData(specificData);
    setShowSpecificReportModal(true);
  };

  const handleSubmitSpecificReport = (formData: any) => {
    setShowSpecificReportModal(false);
    setGeneratingReport(true);
    
    setTimeout(() => {
      setGeneratingReport(false);
      const newReport = {
        id: reports.length + 1,
        title: formData.reportName || selectedReportType,
        date: new Date().toISOString().split('T')[0],
        type: selectedReportType.split(' ')[0],
        status: 'Generated',
        summary: formData.description || `Comprehensive ${selectedReportType.toLowerCase()} generated on ${new Date().toLocaleDateString()}.`,
        metrics: {
          'Generated By': 'A.M.A.T.S. Admin System',
          'Date Range': formData.dateRange || 'Current Month',
          'Priority': formData.priority || 'Standard'
        },
        fileSize: '2.1 MB'
      };
      
      setReports(prev => [newReport, ...prev]);
      setActionMessage(`${selectedReportType} generated successfully! The report "${newReport.title}" has been added to Recent Reports.`);
      setShowActionNotification(true);
    }, 2000);
  };

  const handleSubmitReport = (formData: any) => {
    setShowReportModal(false);
    setGeneratingReport(true);
    
    setTimeout(() => {
      setGeneratingReport(false);
      const newReport = {
        id: reports.length + 1,
        title: formData.reportName || selectedReportType,
        date: new Date().toISOString().split('T')[0],
        type: selectedReportType.split(' ')[0],
        status: 'Generated',
        summary: formData.description || `Comprehensive ${selectedReportType.toLowerCase()} generated on ${new Date().toLocaleDateString()}.`,
        metrics: {
          'Vulnerabilities': 0,
          'Security Score': '95%',
          'Compliance Level': 'High',
          'Total Alerts': 0,
          'Avg Response Time': 'N/A',
          'Safety Improvement': 'N/A'
        },
        fileSize: '2.1 MB'
      };
      
      setReports(prev => [newReport, ...prev]);
      setActionMessage(`${selectedReportType} generated successfully! The report "${newReport.title}" has been added to Recent Reports.`);
      setShowActionNotification(true);
    }, 2000);
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowViewReportModal(true);
  };

  const handleDownloadReport = (report: any) => {
    // Simulate file download
    const element = document.createElement('a');
    const file = new Blob([`${report.title}\n\nGenerated: ${report.date}\nType: ${report.type}\nStatus: ${report.status}\n\nSummary:\n${report.summary}\n\nMetrics:\n${JSON.stringify(report.metrics, null, 2)}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${report.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setActionMessage(`Report "${report.title}" downloaded successfully!`);
    setShowActionNotification(true);
  };

  const handleUserAction = (action: string, userEmail: string, userData?: any) => {
    if (action === 'view') {
      setSelectedUser(userData);
      setShowUserProfile(true);
    } else if (action === 'suspend') {
      setUserToSuspend({ email: userEmail, userData, name: userData.name });
      setShowSuspensionModal(true);
    } else if (action === 'activate') {
      onUserManagement(action, userEmail, user.email);
      setActionMessage(`User ${userEmail} has been activated and can now log in.`);
      setShowActionNotification(true);
      // Trigger refresh
      setTimeout(() => setRefreshKey(prev => prev + 1), 100);
    } else if (action === 'delete') {
      setUserToDelete({ email: userEmail, userData });
      setShowDeleteConfirm(true);
    }
  };

  const handleSuspensionConfirm = (duration: number, unit: string) => {
    if (userToSuspend) {
      onUserManagement('suspend', userToSuspend.email, user.email, duration);
      setActionMessage(`User ${userToSuspend.email} has been suspended for ${duration} minute${duration !== 1 ? 's' : ''} (${unit}).`);
      setShowActionNotification(true);
      setUserToSuspend(null);
      // Trigger refresh
      setTimeout(() => setRefreshKey(prev => prev + 1), 100);
    }
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      onUserManagement('delete', userToDelete.email, user.email);
      setActionMessage(`User ${userToDelete.email} has been terminated. All records have been permanently removed.`);
      setShowActionNotification(true);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      // Trigger refresh
      setTimeout(() => setRefreshKey(prev => prev + 1), 100);
    }
  };

  const handleFilterUsers = (filterType?: string) => {
    if (filterType) {
      setUserFilter(filterType);
    } else {
      if (userFilter === 'all') {
        setUserFilter('drivers');
      } else if (userFilter === 'drivers') {
        setUserFilter('fleet_managers');
      } else {
        setUserFilter('all');
      }
    }
  };

  const handleExportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Type,Status,Join Date,Safety Score\n" +
      filteredUsers.map(user => 
        `${user.name},${user.email},${user.type},${user.status},${user.joinDate},${user.safetyScore}%`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "amats_users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setActionMessage('User data exported successfully!');
    setShowActionNotification(true);
  };

  const filteredUsers = mockUsers.filter(user => {
    if (userFilter === 'drivers') return user.type === 'Driver';
    if (userFilter === 'fleet_managers') return user.type === 'Fleet Manager';
    return true;
  });

  const filteredPurchases = mockPurchaseHistory.filter(purchase => {
    if (purchaseFilter === 'drivers') return purchase.userType === 'Driver';
    if (purchaseFilter === 'fleet_managers') return purchase.userType === 'Fleet Manager';
    if (purchaseFilter === 'completed') return purchase.status === 'Completed';
    if (purchaseFilter === 'processing') return purchase.status === 'Processing';
    return true;
  });

  const formatPurchasePrice = (usdPrice: number, country: string) => {
    const currency = getCurrencyInfo(country);
    const convertedPrice = usdPrice * currency.rate;
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const totalPurchaseValue = mockPurchaseHistory.reduce((sum, purchase) => {
    const currency = getCurrencyInfo(purchase.userCountry);
    return sum + (purchase.totalAmount * currency.rate);
  }, 0);
  const averageOrderValue = totalPurchaseValue / mockPurchaseHistory.length;

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
                onClick={handleRefresh}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                title="Refresh Dashboard"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
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
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 w-full max-w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto text-xs md:text-sm">
            <TabsTrigger value="overview" className="text-xs md:text-sm p-2 md:p-3">
              <span className="hidden md:inline">Overview</span>
              <span className="md:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs md:text-sm p-2 md:p-3">Users</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-xs md:text-sm p-2 md:p-3">
              <span className="hidden md:inline">Monitoring</span>
              <span className="md:hidden">Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs md:text-sm p-2 md:p-3">Reports</TabsTrigger>
            <TabsTrigger value="purchases" className="text-xs md:text-sm p-2 md:p-3">
              <span className="hidden md:inline">Purchase History</span>
              <span className="md:hidden">Purchases</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 w-full">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{analytics.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{registeredUsers.length} new registrations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">892</div>
                  <p className="text-xs text-muted-foreground">97% online</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₱{totalPurchaseValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">99.2%</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New fleet registration completed</p>
                      <p className="text-sm text-muted-foreground">TransCorp - 25 vehicles with A.M.A.T.S. integration</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Purchase completed</p>
                      <p className="text-sm text-muted-foreground">Maria Fernandez - Smart Driver Monitoring Helmet (₱16,799.44)</p>
                    </div>
                    <span className="text-sm text-muted-foreground">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Critical drowsiness alert processed</p>
                      <p className="text-sm text-muted-foreground">Driver Sofia Gutierrez - Emergency protocol activated</p>
                    </div>
                    <span className="text-sm text-muted-foreground">8 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 w-full">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle>User Management</CardTitle>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <div className="relative">
                    <select 
                      className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm cursor-pointer hover:border-primary transition-colors w-full sm:w-auto"
                      value={userFilter}
                      onChange={(e) => handleFilterUsers(e.target.value)}
                    >
                      <option value="all">All Users</option>
                      <option value="drivers">Drivers Only</option>
                      <option value="fleet_managers">Fleet Managers Only</option>
                    </select>
                    <Filter className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportUsers} className="w-full sm:w-auto">
                    Export Users
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {filteredUsers.map((userData) => (
                    <div key={userData.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={userData.profileImage} alt={userData.name} />
                          <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{userData.name}</p>
                            {userData.isRealTime && (
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Real-time
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{userData.email}</p>
                          <div className="flex items-center space-x-2 mt-1 flex-wrap gap-1">
                            <Badge variant={userData.type === 'Driver' ? 'default' : 'secondary'}>
                              {userData.type === 'Driver' ? (
                                <><Car className="h-3 w-3 mr-1" />{userData.type}</>
                              ) : (
                                <><Truck className="h-3 w-3 mr-1" />{userData.type}</>
                              )}
                            </Badge>
                            <Badge variant={
                              userData.status === 'active' ? 'default' : 
                              userData.status === 'suspended' ? 'destructive' : 'outline'
                            }>
                              {userData.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {userData.status === 'suspended' && <Ban className="h-3 w-3 mr-1" />}
                              {userData.status === 'terminated' && <X className="h-3 w-3 mr-1" />}
                              {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                            </Badge>
                            {userData.type === 'Fleet Manager' && userData.vehicles && (
                              <Badge variant="outline" className="text-xs">
                                {userData.vehicles} vehicles
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                        <div className="text-right w-full sm:w-auto">
                          <div className="text-sm font-medium">Safety Score: {userData.safetyScore}%</div>
                          <div className="text-xs text-muted-foreground">
                            {userData.type === 'Driver' ? `${userData.alerts || 0} alerts today` : `Joined ${userData.joinDate}`}
                          </div>
                          {userData.suspendedBy && (
                            <div className="text-xs text-red-600">
                              Suspended by {userData.suspendedBy}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-1 w-full sm:w-auto justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUserAction('view', userData.email, userData)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {userData.status === 'suspended' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUserAction('activate', userData.email, userData)}
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            >
                              <UserCheck className="h-3 w-3" />
                            </Button>
                          ) : userData.status === 'active' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUserAction('suspend', userData.email, userData)}
                              className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                            >
                              <Ban className="h-3 w-3" />
                            </Button>
                          ) : null}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUserAction('delete', userData.email, userData)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fleet Safety Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Fleet Safety Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.filter(u => u.type === 'Driver').slice(0, 4).map((driver) => (
                      <div key={driver.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={driver.profileImage} alt={driver.name} />
                            <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">{driver.email}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Badge variant={(driver.alerts ?? 0) > 5 ? 'destructive' : (driver.alerts ?? 0) > 2 ? 'secondary' : 'default'} className="text-xs">
                                {driver.alerts} alerts today
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Safety: {driver.safetyScore}%</div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUserAction('view', driver.email, driver)}
                            className="mt-2"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <span>System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Camera Network</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Online (97%)
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Detection Engine</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Alert System</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Processing</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        <Clock className="h-3 w-3 mr-1" />
                        High Load
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 w-full">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle>System Reports</CardTitle>
                <Button onClick={handleGenerateNewReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate New Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{report.title}</h3>
                          <Badge variant="outline">{report.type}</Badge>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.summary}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.fileSize}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewReport(report)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report)}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="space-y-6 w-full">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle>Purchase History</CardTitle>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <div className="relative">
                    <select 
                      className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm cursor-pointer hover:border-primary transition-colors w-full sm:w-auto"
                      value={purchaseFilter}
                      onChange={(e) => setPurchaseFilter(e.target.value)}
                    >
                      <option value="all">All Purchases</option>
                      <option value="drivers">Drivers</option>
                      <option value="fleet_managers">Fleet Managers</option>
                      <option value="completed">Completed</option>
                      <option value="processing">Processing</option>
                    </select>
                    <Filter className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {filteredPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{purchase.productName}</h3>
                          <Badge variant={
                            purchase.status === 'Completed' ? 'default' :
                            purchase.status === 'Processing' ? 'secondary' :
                            purchase.status === 'Shipped' ? 'outline' : 'destructive'
                          }>
                            {purchase.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>Customer: {purchase.userName}</div>
                          <div>Type: {purchase.userType}</div>
                          <div>Transaction: {purchase.transactionId}</div>
                          <div>Payment: {purchase.paymentMethod}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {formatPurchasePrice(purchase.totalAmount, purchase.userCountry)}
                        </div>
                        <div className="text-sm text-muted-foreground">{purchase.purchaseDate}</div>
                        <div className="text-xs text-muted-foreground mt-1">{purchase.shippingAddress}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showUserProfile && selectedUser && (
        <UserProfileModal
          isOpen={showUserProfile}
          user={selectedUser}
          onClose={() => setShowUserProfile(false)}
        />
      )}

      {showSuspensionModal && userToSuspend && (
        <SuspensionDurationModal
          isOpen={showSuspensionModal}
          onClose={() => setShowSuspensionModal(false)}
          onConfirm={handleSuspensionConfirm}
          userEmail={userToSuspend.email}
          userName={userToSuspend.name}
        />
      )}

      {showDeleteConfirm && (
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Confirm Account Termination
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to permanently delete this user account? This action cannot be undone and will remove all associated data including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>User profile and credentials</li>
                  <li>Safety records and statistics</li>
                  <li>Purchase history and transactions</li>
                  <li>Camera monitoring data</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeleteUser}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Permanently Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {showActionNotification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-card border rounded-lg shadow-lg p-4 max-w-sm animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">Success</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActionNotification(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{actionMessage}</p>
          </div>
        </div>
      )}

      {generatingReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md mx-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="font-medium">Generating Report...</p>
                <p className="text-sm text-muted-foreground">Please wait while we process your request</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modals */}
      {showReportModal && (
        <ReportGenerationModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleSubmitReport}
          reportType={selectedReportType}
        />
      )}

      {showReportSelectionModal && (
        <Dialog open={showReportSelectionModal} onOpenChange={setShowReportSelectionModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Report Type</DialogTitle>
              <DialogDescription>
                Choose the type of report you want to generate.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: 'Safety Report', icon: Shield, color: 'text-green-600' },
                { type: 'Driver Performance Analysis', icon: Users, color: 'text-blue-600' },
                { type: 'Detection System Report', icon: Camera, color: 'text-purple-600' },
                { type: 'Security Audit Report', icon: Lock, color: 'text-red-600' }
              ].map(({ type, icon: Icon, color }) => (
                <Button
                  key={type}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleSpecificReportGeneration(type)}
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                  <span className="text-xs text-center">{type}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showSpecificReportModal && (
        <ReportGenerationModal
          isOpen={showSpecificReportModal}
          onClose={() => setShowSpecificReportModal(false)}
          onSubmit={handleSubmitSpecificReport}
          reportType={selectedReportType}
        />
      )}

      {showViewReportModal && selectedReport && (
        <Dialog open={showViewReportModal} onOpenChange={setShowViewReportModal}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedReport.title}</DialogTitle>
              <DialogDescription>
                Generated on {selectedReport.date} • {selectedReport.fileSize}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">{selectedReport.summary}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedReport.metrics).map(([key, value]) => (
                    <div key={key} className="p-3 bg-muted/30 rounded">
                      <div className="text-sm font-medium">{key}</div>
                      <div className="text-lg font-bold text-primary">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => handleDownloadReport(selectedReport)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={() => setShowViewReportModal(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}