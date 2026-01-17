import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Clock, User, AlertTriangle } from 'lucide-react';

interface SuspensionDurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (duration: number, unit: string) => void;
  userEmail: string;
  userName: string;
}

export function SuspensionDurationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userEmail, 
  userName 
}: SuspensionDurationModalProps) {
  const [duration, setDuration] = useState(5);
  const [unit, setUnit] = useState('minutes');

  const handleConfirm = () => {
    let totalMinutes = duration;
    
    switch (unit) {
      case 'minutes':
        totalMinutes = duration;
        break;
      case 'hours':
        totalMinutes = duration * 60;
        break;
      case 'days':
        totalMinutes = duration * 60 * 24;
        break;
      case 'weeks':
        totalMinutes = duration * 60 * 24 * 7;
        break;
      case 'months':
        totalMinutes = duration * 60 * 24 * 30;
        break;
      case 'years':
        totalMinutes = duration * 60 * 24 * 365;
        break;
    }
    
    onConfirm(totalMinutes, unit);
    onClose();
    setDuration(5);
    setUnit('minutes');
  };

  const handleCancel = () => {
    onClose();
    setDuration(5);
    setUnit('minutes');
  };

  const getDisplayDuration = () => {
    let totalMinutes = duration;
    
    switch (unit) {
      case 'minutes':
        totalMinutes = duration;
        break;
      case 'hours':
        totalMinutes = duration * 60;
        break;
      case 'days':
        totalMinutes = duration * 60 * 24;
        break;
      case 'weeks':
        totalMinutes = duration * 60 * 24 * 7;
        break;
      case 'months':
        totalMinutes = duration * 60 * 24 * 30;
        break;
      case 'years':
        totalMinutes = duration * 60 * 24 * 365;
        break;
    }

    if (totalMinutes < 60) {
      return `${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
    } else if (totalMinutes < 1440) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours} hour${hours !== 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`;
    } else if (totalMinutes < 10080) {
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      return `${days} day${days !== 1 ? 's' : ''}${hours > 0 ? ` and ${hours} hour${hours !== 1 ? 's' : ''}` : ''}`;
    } else if (totalMinutes < 43200) {
      const weeks = Math.floor(totalMinutes / 10080);
      const days = Math.floor((totalMinutes % 10080) / 1440);
      return `${weeks} week${weeks !== 1 ? 's' : ''}${days > 0 ? ` and ${days} day${days !== 1 ? 's' : ''}` : ''}`;
    } else if (totalMinutes < 525600) {
      const months = Math.floor(totalMinutes / 43200);
      const weeks = Math.floor((totalMinutes % 43200) / 10080);
      return `${months} month${months !== 1 ? 's' : ''}${weeks > 0 ? ` and ${weeks} week${weeks !== 1 ? 's' : ''}` : ''}`;
    } else {
      const years = Math.floor(totalMinutes / 525600);
      const months = Math.floor((totalMinutes % 525600) / 43200);
      return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? ` and ${months} month${months !== 1 ? 's' : ''}` : ''}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Suspend User Account
          </DialogTitle>
          <DialogDescription>
            Set the duration for suspending this user's account access.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="duration">Suspension Duration</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="999"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center"
                />
              </div>
              <div className="flex-1">
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-3 bg-orange-50/10 border border-orange-200/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Suspension Summary</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The user will be suspended for <span className="font-medium text-orange-600">{getDisplayDuration()}</span>.
                They won't be able to log in until the suspension expires or is lifted manually.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Suspend User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}