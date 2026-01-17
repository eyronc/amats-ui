import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Pause, 
  AlertTriangle, 
  Eye, 
  MapPin, 
  Clock, 
  Users, 
  Activity,
  Camera,
  Volume2,
  SkipBack,
  SkipForward,
  X,
  Maximize2,
  Battery,
  Wifi
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Driver {
  id: string;
  name: string;
  status: 'active' | 'alert' | 'break' | 'offline';
  location: string;
  lastAlert: string;
  vehicle: string;
  alertCount: number;
  safetyScore: number;
}

interface Alert {
  id: string;
  driverId: string;
  driverName: string;
  type: 'drowsiness' | 'distraction' | 'speed' | 'route';
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  location: string;
  description: string;
}

interface FleetMonitoringViewProps {
  onClose: () => void;
}

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Juan Dela Cruz',
    status: 'alert',
    location: 'EDSA, Quezon City',
    lastAlert: '2 min ago',
    vehicle: 'Motorcycle TRK-001',
    alertCount: 3,
    safetyScore: 85
  },
  {
    id: '2', 
    name: 'Maria Santos',
    status: 'active',
    location: 'Makati Avenue',
    lastAlert: '15 min ago',
    vehicle: 'Motorcycle TRK-002',
    alertCount: 1,
    safetyScore: 96
  },
  {
    id: '3',
    name: 'Carlos Mendoza',
    status: 'break',
    location: 'BGC, Taguig',
    lastAlert: '1 hour ago',
    vehicle: 'Motorcycle TRK-003',
    alertCount: 0,
    safetyScore: 92
  }
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    driverId: '1',
    driverName: 'Juan Dela Cruz',
    type: 'drowsiness',
    severity: 'high',
    timestamp: '2 min ago',
    location: 'EDSA, Quezon City',
    description: 'Driver showing signs of drowsiness - eyes closing detected'
  },
  {
    id: '2',
    driverId: '1', 
    driverName: 'Juan Dela Cruz',
    type: 'distraction',
    severity: 'medium',
    timestamp: '5 min ago',
    location: 'EDSA, Quezon City',
    description: 'Driver looking away from road for extended period'
  },
  {
    id: '3',
    driverId: '2',
    driverName: 'Maria Santos',
    type: 'speed',
    severity: 'low',
    timestamp: '15 min ago',
    location: 'Makati Avenue',
    description: 'Slight speed violation detected'
  }
];

export function FleetMonitoringView({ onClose }: FleetMonitoringViewProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 2 minutes
  const [volume, setVolume] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Motorcycle footage images
  const motorcycleImages = [
    'https://images.unsplash.com/photo-1560433568-b744904e825a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjB0aGlyZCUyMHBlcnNvbiUyMHZpZXd8ZW58MXx8fHwxNzU4NTQ4NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1569932353341-b518d82f8a54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwc2FmZXR5JTIwaGVsbWV0JTIwcmlkZXJ8ZW58MXx8fHwxNzU4NTQ4NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1722461132409-27b8f2d257f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwZHJpdmluZyUyMHRyYWZmaWMlMjByb2FkfGVufDF8fHx8MTc1ODU0ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && (showVideoModal || showIncidentModal)) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
        // Change image every 10 seconds for variety
        setCurrentImageIndex(prev => (prev + 1) % motorcycleImages.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showVideoModal, showIncidentModal, duration, motorcycleImages.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert': return 'bg-red-500';
      case 'active': return 'bg-green-500';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const handleViewFootage = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowVideoModal(true);
    setCurrentTime(0);
    setIsPlaying(true);
    setCurrentImageIndex(0);
  };

  const handleViewIncidentFootage = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowIncidentModal(true);
    setCurrentTime(0);
    setIsPlaying(true);
    setCurrentImageIndex(0);
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.max(0, Math.min(duration, newTime)));
  };

  const handleSkipForward = () => {
    handleSeek(currentTime + 10);
  };

  const handleSkipBackward = () => {
    handleSeek(currentTime - 10);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Fleet Monitoring Dashboard</h1>
            <p className="text-muted-foreground">Real-time driver safety monitoring and alerts</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close Monitor
          </Button>
        </div>

        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live">Live Monitoring</TabsTrigger>
            <TabsTrigger value="alerts">Safety Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            {/* Driver Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDrivers.map((driver) => (
                <Card key={driver.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{driver.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(driver.status)}`} />
                        <Badge variant="outline" className="capitalize">
                          {driver.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{driver.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>{driver.vehicle}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Last alert: {driver.lastAlert}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{driver.safetyScore}%</p>
                        <p className="text-xs text-muted-foreground">Safety Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{driver.alertCount}</p>
                        <p className="text-xs text-muted-foreground">Alerts Today</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewFootage(driver)}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        View Live Feed
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Safety Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0">
                        <AlertTriangle className={`h-5 w-5 ${
                          alert.severity === 'high' ? 'text-red-500' :
                          alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.driverName}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityColor(alert.severity)} className="capitalize">
                              {alert.severity} Priority
                            </Badge>
                            <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {alert.type}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Eye className="h-4 w-4 mr-2" />
                          View Incident Footage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-green-600">92%</h3>
                    <p className="text-sm text-muted-foreground">Average Safety Score</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-blue-600">24</h3>
                    <p className="text-sm text-muted-foreground">Active Drivers</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-yellow-600">7</h3>
                    <p className="text-sm text-muted-foreground">Alerts Today</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-red-600">2</h3>
                    <p className="text-sm text-muted-foreground">Critical Incidents</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Video Modal */}
        {showVideoModal && selectedDriver && (
          <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Live Feed - {selectedDriver.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Video Area */}
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  {/* Fake motorcycle footage background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white space-y-4">
                      <div className="relative">
                        {/* Simulated motorcycle helmet view */}
                        <div className="w-64 h-40 bg-gradient-to-b from-blue-900 to-gray-800 rounded-lg border-4 border-gray-600 mx-auto flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto flex items-center justify-center">
                              👤
                            </div>
                            <p className="text-sm">Motorcycle Rider View</p>
                          </div>
                        </div>
                        
                        {/* Alert overlay */}
                        {currentTime > 30 && currentTime < 60 && (
                          <div className="absolute inset-0 bg-red-500/20 border-2 border-red-500 rounded-lg animate-pulse">
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                              ⚠️ DROWSINESS DETECTED
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Road simulation */}
                      <div className="text-xs opacity-75">
                        Manila Highway • Speed: 45 km/h • {selectedDriver.location}
                      </div>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-xs text-white">{formatTime(currentTime)}</span>
                        <div className="flex-1 bg-gray-600 h-1 rounded-full">
                          <div 
                            className="bg-white h-1 rounded-full transition-all"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-white">{formatTime(duration)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-white">
                        <Volume2 className="h-4 w-4" />
                        <Wifi className="h-4 w-4" />
                        <Battery className="h-4 w-4" />
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Alert notifications */}
                  {currentTime > 30 && currentTime < 60 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <div>
                          <p className="font-bold text-sm">Driver Alert!</p>
                          <p className="text-xs">Signs of drowsiness detected</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Status</p>
                    <p className={`text-xs ${selectedDriver.status === 'alert' ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedDriver.status === 'alert' ? 'ALERT - Drowsiness' : 'NORMAL'}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Speed</p>
                    <p className="text-xs">45 km/h</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Heart Rate</p>
                    <p className="text-xs">72 BPM</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Alert Level</p>
                    <p className="text-xs text-yellow-600">MEDIUM</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}