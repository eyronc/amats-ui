import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Eye, Users, Car, Truck, Calendar, Activity, Shield, Clock, RefreshCw, CheckCircle, XCircle, Camera, DollarSign, ShoppingCart, Package } from 'lucide-react';

interface StatisticsViewProps {
  userType: 'driver' | 'fleet_manager' | 'admin';
  user?: {
    registrationDate?: string;
    isFirstLogin?: boolean;
    stats?: any;
  };
  analytics?: {
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

export function StatisticsView({ userType, user, analytics }: StatisticsViewProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  // Update timestamp every 5 seconds to show real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate realistic stats based on account age
  const daysSinceRegistration = user?.registrationDate 
    ? Math.floor((new Date().getTime() - new Date(user.registrationDate).getTime()) / (1000 * 3600 * 24))
    : 30;

  const isNewUser = daysSinceRegistration < 7;
  // Real-time driver data based on account age
  const generateRealisticDriverData = () => {
    if (isNewUser) {
      // For new users, show minimal or zero data
      const today = new Date().getDay();
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      return daysOfWeek.map((day, index) => {
        // Only show data for days since registration
        const dayIndex = index;
        const daysSinceToday = (today - dayIndex + 7) % 7;
        const hasData = daysSinceToday <= daysSinceRegistration;
        
        return {
          day,
          drivingTime: hasData ? (index < daysSinceRegistration ? Math.random() * 2 + 1 : 0) : 0,
          alerts: hasData ? (Math.random() > 0.8 ? 1 : 0) : 0,
          safetyScore: hasData ? Math.floor(Math.random() * 5 + 95) : 100
        };
      });
    } else {
      // For existing users, show established data
      return [
        { day: 'Mon', drivingTime: 8.5, alerts: 2, safetyScore: 92 },
        { day: 'Tue', drivingTime: 9.2, alerts: 1, safetyScore: 95 },
        { day: 'Wed', drivingTime: 7.8, alerts: 3, safetyScore: 89 },
        { day: 'Thu', drivingTime: 8.1, alerts: 1, safetyScore: 94 },
        { day: 'Fri', drivingTime: 9.5, alerts: 4, safetyScore: 87 },
        { day: 'Sat', drivingTime: 6.2, alerts: 0, safetyScore: 98 },
        { day: 'Sun', drivingTime: 5.1, alerts: 1, safetyScore: 96 },
      ];
    }
  };

  const driverWeeklyData = generateRealisticDriverData();

  // Fleet manager data (only visible to fleet managers)
  const fleetWeeklyData = [
    { day: 'Mon', totalDrivers: 25, alerts: 12, avgSafetyScore: 91 },
    { day: 'Tue', totalDrivers: 23, alerts: 8, avgSafetyScore: 93 },
    { day: 'Wed', totalDrivers: 27, alerts: 15, avgSafetyScore: 89 },
    { day: 'Thu', totalDrivers: 26, alerts: 9, avgSafetyScore: 92 },
    { day: 'Fri', totalDrivers: 28, alerts: 18, avgSafetyScore: 88 },
    { day: 'Sat', totalDrivers: 15, alerts: 3, avgSafetyScore: 95 },
    { day: 'Sun', totalDrivers: 12, alerts: 2, avgSafetyScore: 96 },
  ];

  const alertTypes = [
    { name: 'Drowsiness Detection', value: 45, color: '#ef4444' },
    { name: 'Eye Closure', value: 25, color: '#f97316' },
    { name: 'Head Position', value: 20, color: '#eab308' },
    { name: 'Other', value: 10, color: '#8b5cf6' },
  ];

  // For drivers
  if (userType === 'driver') {
    const totalDrivingTime = driverWeeklyData.reduce((sum, day) => sum + day.drivingTime, 0);
    const totalAlerts = driverWeeklyData.reduce((sum, day) => sum + day.alerts, 0);
    const avgSafetyScore = Math.round(driverWeeklyData.reduce((sum, day) => sum + day.safetyScore, 0) / driverWeeklyData.length);

    return (
      <div className="space-y-6">
        {/* Real-time Status Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Personal Analytics</h2>
            <p className="text-muted-foreground">Real-time driving safety statistics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-sm text-muted-foreground">
                {isLive ? 'Live' : 'Offline'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* New User Welcome Message */}
        {isNewUser && (
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-indigo-900">Welcome to A.M.A.T.S.!</h3>
                  <p className="text-sm text-indigo-800">
                    You've been registered for {daysSinceRegistration} day{daysSinceRegistration !== 1 ? 's' : ''}. 
                    Start driving with camera monitoring to build your safety analytics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Driver Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Weekly Driving Time</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">{totalDrivingTime.toFixed(1)}h</span>
                    <Badge variant={totalDrivingTime > 0 ? "default" : "secondary"}>
                      {isNewUser ? (totalDrivingTime > 0 ? 'Started' : 'Not started') : 'Normal'}
                    </Badge>
                  </div>
                  {isNewUser && totalDrivingTime === 0 && (
                    <p className="text-xs text-muted-foreground">Start your first drive to see data</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">{totalAlerts}</span>
                    <span className="text-sm text-muted-foreground">this week</span>
                  </div>
                  {isNewUser && totalAlerts === 0 && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Clean record</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">{avgSafetyScore}%</span>
                    <Badge variant={avgSafetyScore >= 95 ? "default" : avgSafetyScore >= 85 ? "secondary" : "destructive"}>
                      {avgSafetyScore >= 95 ? 'Excellent' : avgSafetyScore >= 85 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  {isNewUser && avgSafetyScore === 100 && (
                    <p className="text-xs text-muted-foreground">Perfect start!</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-purple-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">98.7%</span>
                    <span className="text-sm text-muted-foreground">avg</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Driving Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Driving Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={driverWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}h`, 'Driving Time']} />
                  <Bar dataKey="drivingTime" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Safety Score Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Safety Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={driverWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="safetyScore" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alert Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={alertTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={(entry: any) => `${entry.name} ${((entry.percent as number) * 100).toFixed(0)}%`}
                  >
                    {alertTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-medium">Camera Status</p>
                    <p className="text-xs text-muted-foreground">
                      {isLive ? 'Active monitoring' : 'Monitoring paused'}
                    </p>
                  </div>
                </div>
                <Badge variant={isLive ? "default" : "secondary"}>
                  {isLive ? 'LIVE' : 'OFFLINE'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Detection Accuracy</p>
                    <p className="text-xs text-muted-foreground">Real-time analysis</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">98.7%</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-xs text-muted-foreground">Average alert response</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">1.2s</span>
              </div>

              {isNewUser && totalDrivingTime === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Start driving with camera monitoring to see performance metrics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Fleet Manager Analytics (only visible to fleet managers)
  if (userType === 'fleet_manager') {
    const totalDrivers = Math.max(...fleetWeeklyData.map(day => day.totalDrivers));
    const totalAlerts = fleetWeeklyData.reduce((sum, day) => sum + day.alerts, 0);
    const avgFleetSafetyScore = Math.round(fleetWeeklyData.reduce((sum, day) => sum + day.avgSafetyScore, 0) / fleetWeeklyData.length);
    const newRegistrations = analytics?.recentRegistrations.length || 0;

    // Purchase History Analytics for Fleet Managers
    const purchaseData = [
      { month: 'Oct', revenue: 4200, orders: 12 },
      { month: 'Nov', revenue: 5800, orders: 18 },
      { month: 'Dec', revenue: 7200, orders: 24 },
      { month: 'Jan', revenue: 8900, orders: 31 },
      { month: 'Feb', revenue: 12400, orders: 42 },
      { month: 'Mar', revenue: 9800, orders: 34 }
    ];

    const topProducts = [
      { name: 'Smart Safety Helmet Pro', sales: 45, revenue: 13499.55 },
      { name: 'Fleet Safety Package', sales: 28, revenue: 36399.72 },
      { name: 'Vehicle Monitoring Kit', sales: 34, revenue: 18699.66 },
      { name: 'Emergency Alert Device', sales: 52, revenue: 4159.48 },
      { name: 'Driver Assistance Module', sales: 38, revenue: 7599.62 }
    ];

    const totalRevenue = purchaseData.reduce((sum, month) => sum + month.revenue, 0);
    const totalOrders = purchaseData.reduce((sum, month) => sum + month.orders, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    
    return (
      <div className="space-y-6">
        {/* Fleet Manager Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Drivers</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">{totalDrivers}</span>
                    <Badge variant="default">+{newRegistrations} new</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">${totalRevenue.toLocaleString()}</span>
                    <Badge variant="default">6 months</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4 text-orange-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">{totalOrders}</span>
                    <span className="text-sm text-muted-foreground">completed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fleet Safety Score</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">{avgFleetSafetyScore}%</span>
                    <Badge variant="default">Good</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">${avgOrderValue.toFixed(0)}</span>
                    <span className="text-sm text-muted-foreground">per order</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fleet Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Purchase Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Purchase Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={purchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Orders Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Monthly Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={purchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Orders']} />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Driver Activity and Safety Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Driver Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Daily Driver Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={fleetWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Active Drivers']} />
                  <Bar dataKey="totalDrivers" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Fleet Safety Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Safety Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={fleetWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgSafetyScore" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products and New Registrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-green-600">${product.revenue.toFixed(2)}</span>
                      <p className="text-xs text-muted-foreground">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent New Driver Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent New Driver Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.recentRegistrations.slice(0, 5).map((reg, index) => (
                  <div key={reg.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {reg.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium">{reg.name}</span>
                        <p className="text-xs text-muted-foreground">{reg.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={reg.type === 'driver' ? 'default' : 'secondary'}>
                        {reg.type === 'driver' ? 'Driver' : 'Fleet Manager'}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{reg.time}</p>
                    </div>
                  </div>
                ))}
                {(!analytics?.recentRegistrations || analytics.recentRegistrations.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent registrations</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fleet Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Drivers This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Driver</th>
                    <th className="text-left p-2">Safety Score</th>
                    <th className="text-left p-2">Driving Time</th>
                    <th className="text-left p-2">Alerts</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Maria Santos</td>
                    <td className="p-2">98.5%</td>
                    <td className="p-2">42.5h</td>
                    <td className="p-2">1</td>
                    <td className="p-2">
                      <Badge variant="default">Excellent</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Juan Dela Cruz</td>
                    <td className="p-2">96.8%</td>
                    <td className="p-2">38.2h</td>
                    <td className="p-2">2</td>
                    <td className="p-2">
                      <Badge variant="default">Excellent</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Sofia Morales</td>
                    <td className="p-2">94.2%</td>
                    <td className="p-2">35.8h</td>
                    <td className="p-2">3</td>
                    <td className="p-2">
                      <Badge variant="secondary">Good</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default view for other user types
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Analytics are only available for fleet managers. Drivers can view their personal statistics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}