import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Shield, Camera, Eye, Bell, Lock, UserCheck } from 'lucide-react';

interface TermsAndConditionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsAndConditionsModal({ open, onOpenChange }: TermsAndConditionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-primary" />
            Terms and Conditions & End User License Agreement (EULA)
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            {/* Privacy and Camera Access Section */}
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">Camera Access & Privacy Consent</h3>
              </div>
              <div className="space-y-2 text-blue-700 dark:text-blue-300">
                <p>
                  <strong>By accepting these terms, you explicitly consent to the following:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>A.M.A.T.S. will access your device's camera to monitor driver behavior for safety purposes</li>
                  <li>Real-time video analysis will be performed to detect signs of drowsiness and distraction</li>
                  <li>Camera data will be processed locally and in the cloud for enhanced safety detection</li>
                  <li>Video recordings may be stored temporarily for incident analysis and system improvement</li>
                  <li>Your facial biometric data will be analyzed for drowsiness detection only</li>
                </ul>
              </div>
            </div>

            {/* Data Collection Section */}
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Data Collection & Usage</h3>
              </div>
              <div className="space-y-2 text-yellow-700 dark:text-yellow-300">
                <p>We collect and process the following data:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Video Data:</strong> Live camera feed for drowsiness detection</li>
                  <li><strong>Biometric Data:</strong> Eye movement patterns, head position, and facial expressions</li>
                  <li><strong>Location Data:</strong> GPS coordinates for route tracking and incident reporting</li>
                  <li><strong>Device Data:</strong> Device performance, battery status, and connectivity information</li>
                  <li><strong>Safety Metrics:</strong> Alert history, safety scores, and driving patterns</li>
                </ul>
              </div>
            </div>

            {/* Terms of Service */}
            <div>
              <h3 className="font-semibold text-lg mb-3">1. Terms of Service</h3>
              <div className="space-y-3">
                <p>
                  Welcome to A.M.A.T.S. (Advanced Monitoring and Alert Technology System). By registering and using our service, 
                  you agree to comply with and be bound by the following terms and conditions.
                </p>
                <p>
                  This agreement governs your use of our driver drowsiness detection system, including all software, 
                  hardware integration, and related services.
                </p>
              </div>
            </div>

            {/* User Responsibilities */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                2. User Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ensure your device camera is functional and unobstructed during operation</li>
                <li>Maintain proper lighting conditions for optimal drowsiness detection</li>
                <li>Respond appropriately to all safety alerts and warnings</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Report any system malfunctions or false alerts immediately</li>
                <li>Comply with all local traffic laws and regulations</li>
              </ul>
            </div>

            {/* Alert System */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                3. Alert System & Notifications
              </h3>
              <p className="mb-3">Our system provides real-time alerts for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Drowsiness Detection:</strong> When signs of fatigue are detected</li>
                <li><strong>Distraction Alerts:</strong> When attention is diverted from the road</li>
                <li><strong>Safety Violations:</strong> Speed limits and route deviations</li>
                <li><strong>System Status:</strong> Device connectivity and performance issues</li>
              </ul>
              <p className="mt-3 text-orange-600 dark:text-orange-400">
                <strong>Important:</strong> Alerts are supplementary safety measures. Users remain fully responsible 
                for safe driving practices.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                4. Data Security & Privacy
              </h3>
              <div className="space-y-3">
                <p>
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Secure cloud storage with regular security audits</li>
                  <li>Limited access to authorized personnel only</li>
                  <li>Regular deletion of temporary video data</li>
                  <li>Compliance with international data protection standards</li>
                </ul>
                <p className="text-red-600 dark:text-red-400">
                  <strong>Data Retention:</strong> Video data is automatically deleted after 30 days unless involved 
                  in an incident report or safety investigation.
                </p>
              </div>
            </div>

            {/* Limitations */}
            <div>
              <h3 className="font-semibold text-lg mb-3">5. System Limitations & Disclaimers</h3>
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-700 dark:text-red-300 mb-2">
                  <strong>IMPORTANT DISCLAIMERS:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-red-600 dark:text-red-400">
                  <li>A.M.A.T.S. is an assistance system and does not replace driver responsibility</li>
                  <li>System accuracy may vary based on lighting, weather, and environmental conditions</li>
                  <li>False positives and missed detections may occur</li>
                  <li>Users must remain alert and ready to take control at all times</li>
                  <li>The system is not liable for accidents or incidents during use</li>
                </ul>
              </div>
            </div>

            {/* License Agreement */}
            <div>
              <h3 className="font-semibold text-lg mb-3">6. End User License Agreement (EULA)</h3>
              <div className="space-y-3">
                <p>
                  This software is licensed, not sold. You are granted a limited, non-exclusive, 
                  non-transferable license to use A.M.A.T.S. software and services.
                </p>
                <p><strong>You may:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the software for personal or commercial vehicle safety monitoring</li>
                  <li>Install the software on authorized devices</li>
                  <li>Access real-time safety alerts and reports</li>
                </ul>
                <p><strong>You may not:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Reverse engineer, decompile, or disassemble the software</li>
                  <li>Share your account credentials with unauthorized users</li>
                  <li>Use the system for surveillance of individuals without consent</li>
                  <li>Attempt to bypass or disable safety features</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">7. Contact & Support</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="mb-2">For questions about these terms or our services:</p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> support@amats-system.com</li>
                  <li><strong>Phone:</strong> +63 (2) 8XXX-XXXX</li>
                  <li><strong>Website:</strong> www.amats-system.com</li>
                  <li><strong>Privacy Officer:</strong> privacy@amats-system.com</li>
                </ul>
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-primary font-medium">
                <strong>By checking the "I agree to the Terms and Conditions" box, you acknowledge that:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-primary/90">
                <li>You have read and understood all terms and conditions</li>
                <li>You consent to camera access and data processing as described</li>
                <li>You agree to use the system responsibly and safely</li>
                <li>You understand the limitations and disclaimers</li>
                <li>You accept the End User License Agreement</li>
              </ul>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-4 border-t">
              Last updated: January 2024 | Version 2.1 | A.M.A.T.S. Driver Drowsiness Detection System
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}