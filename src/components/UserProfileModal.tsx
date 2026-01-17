import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  X, 
  User, 
  Mail, 
  Calendar,
  MapPin,
  Building,
  Phone,
  Shield,
  Car,
  Truck,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  Eye,
  Download,
  Zap
} from 'lucide-react';

interface UserProfileModalProps {
  user: {
    name: string;
    email: string;
    type: string;
    status: string;
    joinDate: string;
    alerts?: number;
    safetyScore: number;
    vehicles?: number;
    isRealTime?: boolean;
  };
  onClose: () => void;
  isOpen: boolean;
  isRealTime?: boolean;
}

export function UserProfileModal({ user, onClose, isOpen, isRealTime }: UserProfileModalProps) {
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showSafetyReports, setShowSafetyReports] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      case 'terminated': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Mock activity log data
  const activityLog = [
    { id: 1, action: 'Login', timestamp: '2024-02-15 09:30:00', details: 'Successful login from Manila, Philippines' },
    { id: 2, action: 'Camera Check', timestamp: '2024-02-15 09:35:00', details: 'Drowsiness detection system activated' },
    { id: 3, action: 'Safety Alert', timestamp: '2024-02-15 11:20:00', details: 'Low drowsiness level detected - warning issued' },
    { id: 4, action: 'Route Completed', timestamp: '2024-02-15 14:45:00', details: 'Successfully completed 4-hour route with 95% safety score' },
    { id: 5, action: 'Purchase', timestamp: '2024-02-14 16:20:00', details: 'Purchased Smart Safety Helmet Pro - $299.99' },
    { id: 6, action: 'Profile Update', timestamp: '2024-02-13 10:15:00', details: 'Updated contact information and preferences' }
  ];

  // Mock safety reports data
  const safetyReports = [
    { id: 1, title: 'Weekly Safety Summary', date: '2024-02-15', score: '95%', alerts: 2, status: 'Generated' },
    { id: 2, title: 'Monthly Performance Report', date: '2024-02-01', score: '92%', alerts: 8, status: 'Generated' },
    { id: 3, title: 'Route Safety Analysis', date: '2024-01-25', score: '89%', alerts: 5, status: 'Generated' },
    { id: 4, title: 'Equipment Check Report', date: '2024-01-20', score: '96%', alerts: 1, status: 'Generated' }
  ];

  const downloadReport = (report: any) => {
    // Simulate file download
    const element = document.createElement('a');
    const file = new Blob([`${report.title}\n\nGenerated: ${report.date}\nSafety Score: ${report.score}\nAlerts: ${report.alerts}\nStatus: ${report.status}\n\nThis is a detailed safety report for ${user.name}.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${report.title.replace(/\s+/g, '_')}_${user.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full mx-4 max-h-[85vh] overflow-hidden flex flex-col" aria-describedby="user-profile-description">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>User Profile Details</span>
            {(isRealTime || user.isRealTime) && (
              <Badge variant="outline" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Real-time Account
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription id="user-profile-description">
            Detailed information and statistics for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-2 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant={user.type === 'Driver' ? 'default' : 'secondary'}>
                  {user.type === 'Driver' ? (
                    <><Car className="h-3 w-3 mr-1" />{user.type}</>
                  ) : (
                    <><Truck className="h-3 w-3 mr-1" />{user.type}</>
                  )}
                </Badge>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                  <span className="text-sm capitalize">{user.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Join Date</p>
                    <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {(isRealTime || user.isRealTime) ? 'Not provided' : 'Manila, Philippines'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">
                      {(isRealTime || user.isRealTime) ? 'Not provided' : 'TransCorp Logistics'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {(isRealTime || user.isRealTime) ? 'Not provided' : '+63 912 345 6789'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Active</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safety Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className={`text-2xl font-bold ${getScoreColor(user.safetyScore)}`}>
                    {user.safetyScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                </div>
                {user.type === 'Driver' ? (
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{user.alerts || 0}</div>
                    <p className="text-sm text-muted-foreground">Total Alerts</p>
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{user.vehicles || 0}</div>
                    <p className="text-sm text-muted-foreground">Vehicles</p>
                  </div>
                )}
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {user.type === 'Driver' ? '145h' : '2,340h'}
                  </div>
                  <p className="text-sm text-muted-foreground">Driving Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed safety training</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Camera system calibrated</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile information updated</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Enhanced account security</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Data Backup</p>
                    <p className="text-xs text-muted-foreground">Automatic safety data backup</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Camera Permissions</p>
                    <p className="text-xs text-muted-foreground">Drowsiness detection access</p>
                  </div>
                  <Badge variant="default">Granted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-2 sticky bottom-0 bg-background pt-4 border-t">
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => setShowActivityLog(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Activity Log
              </Button>
              <Button variant="outline" onClick={() => setShowSafetyReports(true)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Safety Reports
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Activity Log Modal */}
      <Dialog open={showActivityLog} onOpenChange={setShowActivityLog}>
        <DialogContent className="max-w-3xl" aria-describedby="activity-log-description">
          <DialogHeader>
            <DialogTitle>Activity Log - {user.name}</DialogTitle>
            <DialogDescription id="activity-log-description">
              Recent activity and system interactions for this user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Safety Reports Modal */}
      <Dialog open={showSafetyReports} onOpenChange={setShowSafetyReports}>
        <DialogContent className="max-w-4xl" aria-describedby="safety-reports-description">
          <DialogHeader>
            <DialogTitle>Safety Reports - {user.name}</DialogTitle>
            <DialogDescription id="safety-reports-description">
              Generated safety reports and performance analysis for this user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {safetyReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated: {report.date} • Score: {report.score} • Alerts: {report.alerts}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => downloadReport(report)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}