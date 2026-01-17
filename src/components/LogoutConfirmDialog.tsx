import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

interface LogoutConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmDialog({ onConfirm, onCancel }: LogoutConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100000] flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Confirm Logout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to log out? You'll need to sign in again to access your safety dashboard.
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}