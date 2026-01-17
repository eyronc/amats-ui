import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Eye, Shield, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowWelcome(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4 transition-all duration-1000 ease-in-out">
        <div className="text-center space-y-8 max-w-md mx-auto animate-fade-in">
          {/* App Icon - Clean Design */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center transform animate-bounce">
              <Eye className="h-12 w-12 text-white" />
            </div>
          </div>
          
          {/* Feature Icons */}
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">Secure</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">Fast</span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl font-bold text-white">
              Welcome to A.M.A.T.S.
            </h1>
            <p className="text-xl text-gray-300">
              Driver Drowsiness Detection System
            </p>
            <p className="text-gray-400">
              Advanced AI-powered driver safety monitoring
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={onComplete}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
            <p className="text-sm text-gray-400">
              Join thousands of drivers prioritizing safety
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center transition-all duration-1000">
      <div className="text-center space-y-8">
        {/* App Logo - Simple without spinning ring */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
            <Eye className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">A.M.A.T.S.</h1>
          <p className="text-gray-400">Loading your safety platform...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{Math.round(loadingProgress)}%</p>
        </div>

        {/* Loading Messages */}
        <div className="space-y-1 text-sm text-gray-400">
          {loadingProgress < 30 && <p>Initializing camera systems...</p>}
          {loadingProgress >= 30 && loadingProgress < 60 && <p>Loading detection algorithms...</p>}
          {loadingProgress >= 60 && loadingProgress < 90 && <p>Connecting safety network...</p>}
          {loadingProgress >= 90 && <p>Almost ready...</p>}
        </div>
      </div>
    </div>
  );
}