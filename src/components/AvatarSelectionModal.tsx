import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Crop,
  Check,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Download
} from 'lucide-react';

interface AvatarSelectionModalProps {
  onClose: () => void;
  onSave: (selectedImage: string) => void;
  currentAvatar?: string;
  userCountry?: string;
}

// Professional avatar options based on different countries/ethnicities
const avatarOptions = {
  filipino: [
    'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1649186019834-18ee06d7d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGRyaXZlcnxlbnwxfHx8fDE3NTg0NTMxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1648448942225-7aa06c7e8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMGJ1c2luZXNzJTIwbWFuYWdlcnxlbnwxfHx8fDE3NTg0NTMxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NDUzMTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NDUzMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODQ1MzE3OXww&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  international: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  ]
};

export function AvatarSelectionModal({ 
  onClose, 
  onSave, 
  currentAvatar,
  userCountry = 'Philippines' 
}: AvatarSelectionModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCropEditor, setShowCropEditor] = useState(false);
  const [zoom, setZoom] = useState([100]);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Determine which avatar set to show based on country
  const isFilipino = userCountry === 'Philippines';
  const availableAvatars = isFilipino ? avatarOptions.filipino : avatarOptions.international;

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowCropEditor(true);
  };

  const handleCropSave = () => {
    if (selectedImage) {
      onSave(selectedImage);
      onClose();
      setShowCropEditor(false);
      setSelectedImage(null);
    }
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetCrop = () => {
    setZoom([100]);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  if (showCropEditor && selectedImage) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5" />
              Customize Your Avatar
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview Area */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative bg-muted rounded-lg p-8 flex flex-col items-center space-y-4">
                <div className="relative overflow-hidden rounded-full border-4 border-primary">
                  <img
                    src={selectedImage}
                    alt="Avatar preview"
                    className="w-32 h-32 object-cover"
                    style={{
                      transform: `scale(${zoom[0] / 100}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                      transformOrigin: 'center center'
                    }}
                  />
                </div>
                <Badge variant="outline" className="text-xs">Preview</Badge>
              </div>
            </div>

            {/* Editing Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Zoom Control */}
                <Card className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ZoomIn className="h-4 w-4" />
                    <span className="text-sm font-medium">Zoom: {zoom[0]}%</span>
                  </div>
                  <Slider
                    value={zoom}
                    onValueChange={setZoom}
                    max={200}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </Card>

                {/* Rotation Control */}
                <Card className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4" />
                    <span className="text-sm font-medium">Rotation: {rotation}°</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleRotate}
                    className="w-full"
                  >
                    Rotate 90°
                  </Button>
                </Card>

                {/* Position Control */}
                <Card className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Move className="h-4 w-4" />
                    <span className="text-sm font-medium">Position</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetCrop}
                    className="w-full"
                  >
                    Reset All
                  </Button>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCropEditor(false);
                  setSelectedImage(null);
                }}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Back to Selection
              </Button>
              <Button
                onClick={handleCropSave}
                className="flex-1"
              >
                <Check className="h-4 w-4 mr-2" />
                Save Avatar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Avatar</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select a professional avatar that represents you in the A.M.A.T.S. system
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Avatar */}
          {currentAvatar && (
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentAvatar} alt="Current avatar" />
                <AvatarFallback>Current</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Current Avatar</p>
                <p className="text-sm text-muted-foreground">
                  This is your current profile picture
                </p>
              </div>
            </div>
          )}

          {/* Avatar Categories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Professional Avatars</h3>
              <Badge variant="outline">
                {isFilipino ? 'Filipino' : 'International'} Collection
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {availableAvatars.map((avatar, index) => (
                <Card
                  key={index}
                  className="p-2 cursor-pointer hover:ring-2 hover:ring-primary transition-all group"
                  onClick={() => handleImageSelect(avatar)}
                >
                  <div className="space-y-2">
                    <Avatar className="w-full aspect-square">
                      <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                      <AvatarFallback>A{index + 1}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs group-hover:bg-primary group-hover:text-primary-foreground">
                        Select
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upload Custom Avatar Section */}
          <div className="border-t pt-4">
            <Card className="p-6 border-dashed">
              <div className="text-center space-y-3">
                <Download className="h-8 w-8 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-medium">Custom Upload</p>
                  <p className="text-sm text-muted-foreground">
                    Upload your own professional photo (Coming Soon)
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Upload Photo
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}