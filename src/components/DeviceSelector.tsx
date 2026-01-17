import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Camera, 
  Smartphone, 
  Wifi, 
  Battery, 
  Signal, 
  Plus,
  Settings,
  ShoppingBag,
  Check,
  AlertTriangle,
  Bluetooth
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'helmet' | 'dashboard' | 'phone';
  status: 'connected' | 'disconnected' | 'low_battery';
  battery?: number;
  signal: number;
  lastSeen: string;
  features: string[];
}

interface DeviceSelectorProps {
  onDeviceSelect: (device: Device) => void;
  onShopRedirect: () => void;
}

const mockDevices: Device[] = [
  {
    id: 'helmet-001',
    name: 'Smart Safety Helmet Pro',
    type: 'helmet',
    status: 'connected',
    battery: 78,
    signal: 85,
    lastSeen: 'Just now',
    features: ['Eye tracking', 'Vibration alerts', 'Night vision', 'HD recording']
  },
  {
    id: 'phone-001',
    name: 'Your Phone Camera',
    type: 'phone',
    status: 'connected',
    battery: 65,
    signal: 92,
    lastSeen: 'Just now',
    features: ['Front camera', 'Motion detection', 'Audio alerts', 'Cloud sync']
  }
];

export function DeviceSelector({ onDeviceSelect, onShopRedirect }: DeviceSelectorProps) {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setShowConfirmDialog(true);
  };

  const handleConfirmSelection = () => {
    if (selectedDevice) {
      onDeviceSelect(selectedDevice);
      setShowConfirmDialog(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'helmet':
        return <Camera className="h-8 w-8" />;
      case 'phone':
        return <Smartphone className="h-8 w-8" />;
      case 'dashboard':
        return <Camera className="h-8 w-8" />;
      default:
        return <Camera className="h-8 w-8" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      case 'low_battery':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-600">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">Disconnected</Badge>;
      case 'low_battery':
        return <Badge variant="secondary" className="bg-yellow-600 text-white">Low Battery</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full">
            <Camera className="h-12 w-12 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Choose a Device to Link</h2>
          <p className="text-muted-foreground">
            Select a camera device to start monitoring driver drowsiness
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDevices.map((device) => (
          <Card 
            key={device.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-indigo-300"
            onClick={() => handleDeviceSelect(device)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg ${getStatusColor(device.status)}`}>
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{device.type} Camera</p>
                  </div>
                </div>
                {getStatusBadge(device.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Device Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {device.battery && (
                  <div className="space-y-1">
                    <Battery className={`h-4 w-4 mx-auto ${device.battery < 20 ? 'text-red-500' : 'text-green-500'}`} />
                    <p className="text-xs text-muted-foreground">Battery</p>
                    <p className="font-semibold">{device.battery}%</p>
                  </div>
                )}
                
                <div className="space-y-1">
                  <Signal className={`h-4 w-4 mx-auto ${device.signal > 70 ? 'text-green-500' : device.signal > 40 ? 'text-yellow-500' : 'text-red-500'}`} />
                  <p className="text-xs text-muted-foreground">Signal</p>
                  <p className="font-semibold">{device.signal}%</p>
                </div>
                
                <div className="space-y-1">
                  <Wifi className="h-4 w-4 mx-auto text-blue-500" />
                  <p className="text-xs text-muted-foreground">Last Seen</p>
                  <p className="font-semibold text-xs">{device.lastSeen}</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-sm font-medium mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {device.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {device.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{device.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeviceSelect(device);
                }}
                disabled={device.status === 'disconnected'}
              >
                <Check className="h-4 w-4 mr-2" />
                Select Device
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Add New Device Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 border-dashed border-muted-foreground/50 hover:border-indigo-300">
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full">
              <Plus className="h-12 w-12 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Need More Devices?</h3>
              <p className="text-sm text-muted-foreground">
                Browse our safety equipment shop for additional camera devices
              </p>
            </div>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onShopRedirect();
              }}
              variant="outline"
              className="w-full"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Browse Shop
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Device Selection Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Device Selection</DialogTitle>
            <DialogDescription>
              You are about to start camera monitoring with the selected device.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDevice && (
            <div className="py-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg text-white">
                  {getDeviceIcon(selectedDevice.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{selectedDevice.name}</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedDevice.type} Camera - {selectedDevice.status}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    {selectedDevice.battery && (
                      <div className="flex items-center space-x-1">
                        <Battery className="h-3 w-3" />
                        <span className="text-xs">{selectedDevice.battery}%</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Signal className="h-3 w-3" />
                      <span className="text-xs">{selectedDevice.signal}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Camera Access Note</p>
                    <p className="text-blue-800">
                      This will activate drowsiness monitoring. The system will track eye movements and alert you when signs of fatigue are detected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSelection}>
              <Camera className="h-4 w-4 mr-2" />
              Start Monitoring
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}