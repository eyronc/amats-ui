import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Eye, 
  AlertTriangle, 
  Car, 
  Clock, 
  TrendingUp, 
  Shield, 
  Camera,
  Bell,
  Activity,
  Users,
  MapPin,
  Calendar,
  Zap,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  BarChart3
} from 'lucide-react';

interface DashboardViewProps {
  userType: 'driver' | 'fleet_manager' | 'admin';
  user?: {
    registrationDate?: string;
    isFirstLogin?: boolean;
    stats?: any;
  };
}

export function DashboardView({ userType, user }: DashboardViewProps) {
  const daysSinceRegistration = user?.registrationDate 
    ? Math.floor((new Date().getTime() - new Date(user.registrationDate).getTime()) / (1000 * 3600 * 24))
    : 30; 

  const defaultStats = user?.stats || {};
  const isNewUser = daysSinceRegistration < 7; 
  const [stats, setStats] = useState({
    totalDrivingHours: defaultStats.hoursThisWeek || (isNewUser ? 0 : (userType === 'driver' ? 145 : 2340)),
    alertsThisWeek: defaultStats.alertsToday || (isNewUser ? 0 : (userType === 'driver' ? 3 : 47)),
    safetyScore: defaultStats.safetyScore || (isNewUser ? 100 : (userType === 'driver' ? 94 : 89)),
    drowsinessEvents: defaultStats.totalDrives || (isNewUser ? 0 : (userType === 'driver' ? 8 : 156)),
    activeDrivers: userType === 'fleet_manager' ? 24 : 0,
    totalVehicles: userType === 'fleet_manager' ? 18 : 0
  });

  const mockAlerts = [
    { 
      id: 1, 
      driver: userType === 'driver' ? 'You' : 'Maria Santos', 
      vehicle: 'TRK-001', 
      severity: 'High', 
      time: '14:32 PM', 
      location: 'Highway 95, KM 45',
      type: 'Drowsiness Detected'
    },
    { 
      id: 2, 
      driver: userType === 'driver' ? 'You' : 'Juan Carlos', 
      vehicle: 'TRK-002', 
      severity: 'Medium', 
      time: '11:45 AM', 
      location: 'Main St, City Center',
      type: 'Eye Closure Alert'
    },
    { 
      id: 3, 
      driver: userType === 'driver' ? 'You' : 'Anna Reyes', 
      vehicle: 'TRK-003', 
      severity: 'Low', 
      time: '09:15 AM', 
      location: 'Industrial Rd, Zone A',
      type: 'Fatigue Warning'
    },
  ];

  const userProfiles: { [key: string]: string } = {
    'maria@transport.com': 'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'juan@logistics.com': 'https://images.unsplash.com/photo-1649186019834-18ee06d7d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGRyaXZlcnxlbnwxfHx8fDE3NTg0NTMxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'anna@delivery.com': 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NDUzMTczfDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const mockDrivers = [
    { id: 1, name: 'Maria Santos', email: 'maria@transport.com', vehicle: 'TRK-001', status: 'Active', safetyScore: 96, lastAlert: '2 hours ago', profileImage: userProfiles['maria@transport.com'], company: 'SafeTransport Inc.' },
    { id: 2, name: 'Juan Carlos', email: 'juan@logistics.com', vehicle: 'TRK-002', status: 'Break', safetyScore: 92, lastAlert: '1 day ago', profileImage: userProfiles['juan@logistics.com'], company: 'Metro Fleet Solutions' },
    { id: 3, name: 'Anna Reyes', email: 'anna@delivery.com', vehicle: 'TRK-003', status: 'Active', safetyScore: 88, lastAlert: '3 hours ago', profileImage: userProfiles['anna@delivery.com'], company: 'City Delivery Co.' },
  ];

  const handleViewProfile = (driver: any) => {
    alert(`Driver Profile:\n\nName: ${driver.name}\nEmail: ${driver.email}\nVehicle: ${driver.vehicle}\nCompany: ${driver.company}\nStatus: ${driver.status}\nSafety Score: ${driver.safetyScore}%\nLast Alert: ${driver.lastAlert}\n\nAll driver information is monitored through the A.M.A.T.S. system for fleet safety management.`);
  };

  if (userType === 'driver') {
    return (
      <div className="space-y-6">
        {/* Driver Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.safetyScore}%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Driving Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalDrivingHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts This Week</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.alertsThisWeek}</div>
              <p className="text-xs text-muted-foreground">-1 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drowsiness Events</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.drowsinessEvents}</div>
              <p className="text-xs text-muted-foreground">Total this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Safety Alerts</CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  alert('Safety Alerts Overview:\n\n✓ Total alerts this week: 3\n✓ High priority: 1\n✓ Medium priority: 1\n✓ Low priority: 1\n\n✓ Response time: 1.2 seconds average\n✓ System status: All alerts properly processed\n✓ Driver notifications: Sent successfully\n\nAll safety protocols are functioning optimally.');
                }}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                title="View all safety alerts and system status"
              >
                <Bell className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.slice(0, 3).map((alertItem) => (
                  <div key={alertItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{alertItem.type}</p>
                      <p className="text-sm text-muted-foreground">{alertItem.location}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={
                          alertItem.severity === 'High' ? 'destructive' : 
                          alertItem.severity === 'Medium' ? 'default' : 'secondary'
                        }>
                          {alertItem.severity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{alertItem.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">{alertItem.vehicle}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2 hover:bg-blue-50 hover:border-blue-300" 
                        onClick={() => {
                          window.alert(`Alert Details:\n\nType: ${alertItem.type}\nSeverity: ${alertItem.severity}\nTime: ${alertItem.time}\nLocation: ${alertItem.location}\nVehicle: ${alertItem.vehicle}\nDriver: ${alertItem.driver}\n\nStatus: Alert acknowledged and safety protocol initiated.`);
                        }}
                        title="View Alert Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Safety Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Alert Response Time</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Safe Driving Score</span>
                  <span>{stats.safetyScore}%</span>
                </div>
                <Progress value={stats.safetyScore} className="h-2" />
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consecutive Safe Days</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Camera Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Health</span>
                  <span className="font-semibold text-green-600">Optimal</span>
                </div>
              </div>

              <Button className="w-full mt-4" onClick={() => {
                // Trigger navigation to camera monitor
                const appContainer = document.querySelector('[data-app-container]');
                if (appContainer) {
                  const event = new CustomEvent('navigate-to-camera');
                  appContainer.dispatchEvent(event);
                }
              }}>
                <Camera className="h-4 w-4 mr-2" />
                Camera Monitor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (userType === 'fleet_manager') {
    return (
      <div className="space-y-6">
        {/* Fleet Manager Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeDrivers}</div>
              <p className="text-xs text-muted-foreground">Out of {stats.totalVehicles} vehicles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fleet Safety Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.safetyScore}%</div>
              <p className="text-xs text-muted-foreground">+3% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.alertsThisWeek}</div>
              <p className="text-xs text-muted-foreground">-8 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Driving Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalDrivingHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Driver Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Driver Status</CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  alert('Fleet Management:\n\n✓ Vehicle Assignment\n✓ Driver Scheduling\n✓ Route Planning\n✓ Maintenance Tracking\n✓ Safety Compliance\n\nAll fleet operations are monitored through the A.M.A.T.S. system.');
                }}
                title="Access Fleet Management Tools"
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Fleet
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.profileImage} alt={driver.name} />
                        <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={driver.status === 'Active' ? 'default' : 'secondary'}>
                            {driver.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Score: {driver.safetyScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Last alert</p>
                      <p className="font-semibold">{driver.lastAlert}</p>
                      <div className="flex gap-1 mt-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewProfile(driver)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" onClick={() => {
                          // Trigger navigation to camera monitor
                          const appContainer = document.querySelector('[data-app-container]');
                          if (appContainer) {
                            const event = new CustomEvent('navigate-to-camera');
                            appContainer.dispatchEvent(event);
                          }
                        }}>
                          <Camera className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Fleet Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Safety Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.slice(0, 3).map((alertItem, index) => {
                  const driver = mockDrivers[index];
                  return (
                    <div key={alertItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={driver?.profileImage} alt={alertItem.driver} />
                          <AvatarFallback>{alertItem.driver.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{alertItem.type}</p>
                          <p className="text-sm text-muted-foreground">Driver: {alertItem.driver} | {alertItem.vehicle}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={
                              alertItem.severity === 'High' ? 'destructive' : 
                              alertItem.severity === 'Medium' ? 'default' : 'secondary'
                            }>
                              {alertItem.severity}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{alertItem.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-1">
                          {driver && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-blue-50 hover:border-blue-300"
                              onClick={() => handleViewProfile(driver)}
                              title="View Driver Profile"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => {
                              window.alert(`Fleet Alert Details:\n\nType: ${alertItem.type}\nSeverity: ${alertItem.severity}\nTime: ${alertItem.time}\nLocation: ${alertItem.location}\nVehicle: ${alertItem.vehicle}\nDriver: ${alertItem.driver}\n\nFleet Action: Driver has been notified and safety protocol is active.`);
                            }}
                            title="View Alert Details"
                          >
                            <AlertTriangle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <Button className="w-full mt-4" onClick={() => {
                  // Trigger navigation to analytics/statistics
                  const appContainer = document.querySelector('[data-app-container]');
                  if (appContainer) {
                    const event = new CustomEvent('navigate-to-statistics');
                    appContainer.dispatchEvent(event);
                  }
                }}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Fleet Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="space-y-6">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <p className="text-xs text-muted-foreground">+23 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts Processed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3,456</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">892</div>
            <p className="text-xs text-muted-foreground">97% online</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Camera Detection</p>
                  <p className="text-sm text-muted-foreground">All systems operational</p>
                </div>
              </div>
              <Badge variant="default">Online</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Alert Processing</p>
                  <p className="text-sm text-muted-foreground">Processing normally</p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Database Backup</p>
                  <p className="text-sm text-muted-foreground">Scheduled in 2 hours</p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent System Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">System Update Deployed</p>
                  <p className="text-sm text-muted-foreground">Version 2.1.5 - Enhanced detection algorithms</p>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">New Fleet Added</p>
                  <p className="text-sm text-muted-foreground">TransCorp - 25 vehicles registered</p>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
                <Plus className="h-5 w-5 text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Security Scan Completed</p>
                  <p className="text-sm text-muted-foreground">No vulnerabilities detected</p>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
            </div>

            <Button className="w-full mt-4">
              <Activity className="h-4 w-4 mr-2" />
              System Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}