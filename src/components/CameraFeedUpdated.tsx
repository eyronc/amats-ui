import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Camera, Wifi, WifiOff, Settings, Play, Pause, AlertTriangle, Video, VideoOff, Circle, Activity, Shield, CheckCircle, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { DeviceSelector } from './DeviceSelector';

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [isConnected, setIsConnected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [status, setStatus] = useState<'alert' | 'drowsy' | 'critical'>('alert');
  const [alertCount, setAlertCount] = useState(0);
  const [detectionStatus, setDetectionStatus] = useState({
    eyesOpen: true,
    alertLevel: 'normal' as 'normal' | 'warning' | 'critical',
    blinkRate: 21,
    sessionTime: '00:02:37',
    drowsinessLevel: 'Alert'
  });
  const [demoMode, setDemoMode] = useState(false);
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const startCamera = async () => {
    if (!selectedDevice) {
      setShowDeviceSelector(true);
      return;
    }
    
    try {
      // Custom confirmation dialog with better message
      const confirmed = window.confirm(`Start camera monitoring with ${selectedDevice.name}?\n\nThis will activate drowsiness detection using your selected device to monitor eye movements and facial patterns for driver safety.`);
      
      if (confirmed) {
        setError('');
        setIsStreaming(true);
        setIsRecording(true);
        setHasPermission(true);
        setIsConnected(true);
        
        // Add success notification
        const successEvent = new CustomEvent('show-notification', {
          detail: {
            type: 'success',
            title: 'Camera Monitoring Started',
            message: `Successfully connected to ${selectedDevice.name}. Driver monitoring is now active.`,
            duration: 5000
          }
        });
        document.dispatchEvent(successEvent);
        
        // Simulate real-time detection updates
        const interval = setInterval(() => {
          const randomAlert = Math.random();
          if (randomAlert > 0.8) {
            setDetectionStatus(prev => ({
              ...prev,
              eyesOpen: Math.random() > 0.4,
              alertLevel: randomAlert > 0.9 ? 'critical' : 'warning',
              blinkRate: Math.floor(Math.random() * 30) + 15,
              drowsinessLevel: randomAlert > 0.9 ? 'Critical' : 'Drowsy'
            }));
            setEyesClosed(Math.random() > 0.4);
            setStatus(randomAlert > 0.9 ? 'critical' : 'drowsy');
          } else {
            setDetectionStatus(prev => ({
              ...prev,
              eyesOpen: true,
              alertLevel: 'normal',
              blinkRate: Math.floor(Math.random() * 10) + 18,
              drowsinessLevel: 'Alert'
            }));
            setEyesClosed(false);
            setStatus('alert');
          }
        }, 3000);

        return () => clearInterval(interval);
      }
    } catch (error) {
      setError('Failed to start camera monitoring. Please try again.');
      setIsStreaming(false);
      setIsRecording(false);
      setIsConnected(false);
    }
  };

  const handleDeviceSelect = (device: any) => {
    setSelectedDevice(device);
    setShowDeviceSelector(false);
    // Don't auto-start, wait for user to explicitly start
  };

  const handleShopRedirect = () => {
    setShowDeviceSelector(false);
    // Navigate to shop
    const appContainer = document.querySelector('[data-app-container]');
    if (appContainer) {
      const event = new CustomEvent('navigate-to-shop');
      appContainer.dispatchEvent(event);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsRecording(false);
    setIsConnected(false);
    setDemoMode(false);
  };

  const stopDemo = () => {
    setDemoMode(false);
    setIsStreaming(false);
    setIsRecording(false);
    setIsConnected(false);
    setError('');
  };

  const startDemoMode = () => {
    setDemoMode(true);
    setIsStreaming(true);
    setIsRecording(true);
    setIsConnected(true);
    setError('');
    
    // Simulate real-time detection updates for demo
    const interval = setInterval(() => {
      const randomAlert = Math.random();
      if (randomAlert > 0.8) {
        setDetectionStatus(prev => ({
          ...prev,
          eyesOpen: Math.random() > 0.4,
          alertLevel: randomAlert > 0.9 ? 'critical' : 'warning',
          blinkRate: Math.floor(Math.random() * 30) + 15,
          drowsinessLevel: randomAlert > 0.9 ? 'Critical' : 'Drowsy'
        }));
        setEyesClosed(Math.random() > 0.4);
        setStatus(randomAlert > 0.9 ? 'critical' : 'drowsy');
      } else {
        setDetectionStatus(prev => ({
          ...prev,
          eyesOpen: true,
          alertLevel: 'normal',
          blinkRate: Math.floor(Math.random() * 10) + 18,
          drowsinessLevel: 'Alert'
        }));
        setEyesClosed(false);
        setStatus('alert');
      }
    }, 3000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getOverlayColor = () => {
    switch (status) {
      case 'alert': return 'border-green-500';
      case 'drowsy': return 'border-yellow-500';
      case 'critical': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'alert':
        return <Badge className="bg-green-900/30 text-green-300 border-green-700/50">Alert</Badge>;
      case 'drowsy':
        return <Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-700/50">Drowsy</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (showDeviceSelector) {
    return (
      <DeviceSelector 
        onDeviceSelect={handleDeviceSelect}
        onShopRedirect={handleShopRedirect}
      />
    );
  }

  return (
    <div className="space-y-6 font-inter">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Camera Feed */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-card/50 to-muted/30 border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-manrope">
                  <Camera className="h-5 w-5" />
                  Driver Camera Feed
                  {selectedDevice && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {selectedDevice.name}
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={isConnected ? 'default' : 'destructive'}>
                    {isConnected ? 'LIVE' : 'OFFLINE'}
                  </Badge>
                  {getStatusBadge()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Camera Feed with Real Video or Demo */}
                <div className="relative bg-black aspect-video flex items-center justify-center rounded-lg overflow-hidden border border-border/20">
                  {isStreaming ? (
                    <>
                      {demoMode ? (
                        /* Demo Mode - Simulated Feed */
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                          {/* Demo badge */}
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/50">
                              DEMO MODE
                            </Badge>
                          </div>
                          
                          {/* Simulated driver silhouette */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative flex items-center justify-center">
                              {/* Face detection overlay - positioned to center properly */}
                              <div className="w-48 h-64 border-2 border-cyan-400 rounded-lg relative">
                                {/* Corner indicators */}
                                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
                                
                                {/* Professional driver silhouette */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-32 h-40 relative">
                                    {/* Driver silhouette outline */}
                                    <div className="w-full h-full bg-gradient-to-b from-gray-800/60 to-gray-900/60 relative rounded-lg border border-gray-600/30">
                                      {/* Head shape */}
                                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-700/50 rounded-full border border-gray-600/20" />
                                      
                                      {/* Shoulders */}
                                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gray-700/40 rounded-t-full border-t border-x border-gray-600/20" />
                                      
                                      {/* Eye indicators - more subtle and professional */}
                                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                        <div className={`w-3 h-2 rounded-sm transition-all duration-300 ${
                                          eyesClosed ? 'bg-red-500/80 h-0.5' : 'bg-cyan-400/60 h-2'
                                        }`} />
                                        <div className={`w-3 h-2 rounded-sm transition-all duration-300 ${
                                          eyesClosed ? 'bg-red-500/80 h-0.5' : 'bg-cyan-400/60 h-2'
                                        }`} />
                                      </div>
                                      
                                      {/* Professional detection points */}
                                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400/40 rounded-full" />
                                      <div className="absolute top-10 left-6 w-1 h-1 bg-cyan-400/30 rounded-full" />
                                      <div className="absolute top-10 right-6 w-1 h-1 bg-cyan-400/30 rounded-full" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Real Camera Feed */
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                          {/* Face Detection Overlay - matching your design */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              {/* Main face detection rectangle */}
                              <div className="w-48 h-64 border-2 border-cyan-400 rounded-lg relative">
                                {/* Corner indicators */}
                                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* Status Overlays (common for both modes) */}
                      <div className="absolute bottom-4 left-4 space-y-2">
                        <div className="flex flex-col space-y-1">
                          <div className="bg-black/70 px-3 py-1 rounded text-sm font-mono">
                            <Circle className="h-2 w-2 fill-green-500 text-green-500 inline mr-2" />
                            IR Night Vision On
                          </div>
                          <div className="bg-black/70 px-3 py-1 rounded text-sm font-mono">
                            Face Detection: Active
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 space-y-2">
                        <div className="flex flex-col space-y-1 items-end">
                          <div className="bg-black/70 px-3 py-1 rounded text-white text-sm font-mono">
                            Eye Tracking: {eyesClosed ? 'Closed' : 'Open'}
                          </div>
                          <div className="bg-black/70 px-3 py-1 rounded text-white text-sm font-mono">
                            Quality: HD
                            <Circle className="h-2 w-2 fill-green-500 text-green-500 inline ml-2" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="destructive" className="animate-pulse font-mono">
                          REC
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-4 text-muted-foreground">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <Camera className="h-10 w-10" />
                      </div>
                      <div>
                        <p className="text-lg font-medium font-manrope">Camera Not Active</p>
                        <p className="text-sm">Start camera or try demo mode</p>
                      </div>
                      {error && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm max-w-md mx-auto">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Camera Access Required</p>
                              <p>{error}</p>
                              <div className="mt-2 text-xs text-red-400">
                                <p>To enable camera access:</p>
                                <p>1. Click the camera icon in your browser's address bar</p>
                                <p>2. Select "Allow" for camera permissions</p>
                                <p>3. Refresh the page and try again</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Critical warning overlay */}
                {status === 'critical' && isStreaming && (
                  <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center animate-pulse">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-semibold font-manrope">
                      DROWSINESS DETECTED
                    </div>
                  </div>
                )}
              </div>

              {/* Camera controls */}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground font-mono">
                <div className="flex items-center gap-4">
                  <span>IR Night Vision: {isStreaming ? 'On' : 'Off'}</span>
                  <span>Face Detection: {isStreaming ? 'Active' : 'Inactive'}</span>
                  <span>Alerts: {alertCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Mode: {demoMode ? 'Demo' : isStreaming ? 'Live' : 'Offline'}</span>
                  <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-500' : 'bg-gray-500'}`} />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant={isStreaming ? "destructive" : "default"}
                  onClick={isStreaming ? (demoMode ? stopDemo : stopCamera) : startCamera}
                  className="flex items-center gap-2 font-manrope"
                >
                  {isStreaming ? (
                    <>
                      <VideoOff className="h-4 w-4" />
                      {demoMode ? 'Stop Demo' : 'Stop Camera'}
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4" />
                      Start Camera
                    </>
                  )}
                </Button>
                
                {!isStreaming && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={startDemoMode}
                    className="flex items-center gap-2 font-manrope"
                  >
                    <Play className="h-4 w-4" />
                    Try Demo
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-2 font-manrope"
                  onClick={() => setShowDeviceSelector(true)}
                >
                  <Camera className="h-4 w-4" />
                  {selectedDevice ? 'Switch Device' : 'Select Device'}
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-2 font-manrope"
                  onClick={() => {
                    // Navigate to Camera & Detection settings
                    const event = new CustomEvent('navigate-to-camera-settings');
                    document.querySelector('[data-app-container]')?.dispatchEvent(event);
                  }}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel - Driver Status - Matching your design */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-card/50 to-muted/30 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-manrope">Driver Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-inter">Current Status</span>
                <div className="flex items-center gap-2">
                  {demoMode && <Badge variant="outline" className="text-xs">DEMO</Badge>}
                  <Badge variant={
                    status === 'alert' ? 'default' : 
                    status === 'drowsy' ? 'secondary' : 'destructive'
                  }>
                    {status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium font-inter">Drowsiness Level</span>
                <div className="flex gap-2">
                  <Button 
                    variant={status === 'alert' ? 'default' : 'outline'} 
                    size="sm" 
                    className="flex-1 text-xs font-manrope"
                  >
                    Alert
                  </Button>
                  <Button 
                    variant={status === 'drowsy' ? 'secondary' : 'outline'} 
                    size="sm" 
                    className="flex-1 text-xs font-manrope"
                  >
                    Drowsy
                  </Button>
                  <Button 
                    variant={status === 'critical' ? 'destructive' : 'outline'} 
                    size="sm" 
                    className="flex-1 text-xs font-manrope"
                  >
                    Critical
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-inter">Eyes Status</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${eyesClosed ? 'bg-red-500' : 'bg-green-500'}`} />
                  <span className="text-sm font-mono">{eyesClosed ? 'Closed' : 'Open'}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-inter">Blink Rate</span>
                <span className="text-sm font-mono">21 bpm</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-inter">Session Time</span>
                <span className="text-sm font-mono">00:02:37</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card/50 to-muted/30 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-manrope">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertCount > 0 && (
                <>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium font-inter">Eye closure detected</p>
                      <p className="text-xs text-muted-foreground font-mono">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium font-inter">Fatigue warning</p>
                      <p className="text-xs text-muted-foreground font-mono">5 minutes ago</p>
                    </div>
                  </div>
                </>
              )}
              {alertCount === 0 && (
                <p className="text-sm text-muted-foreground font-inter">No alerts in this session</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}