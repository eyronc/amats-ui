import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Check,
  X,
  Upload,
  User
} from 'lucide-react';

interface AvatarSelectionModalProps {
  onClose: () => void;
  onSave: (selectedImage: string) => void;
  currentAvatar?: string;
  userCountry?: string;
  userEmail?: string; // Add user email to make profiles unique per user
}

// Professional avatar options based on different countries/ethnicities
const avatarOptions = {
  filipino: [
    'https://images.unsplash.com/photo-1627839135348-155dc256b33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZHJpdmVyfGVufDF8fHx8MTc1ODQ1MzE0OHww&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1649186019834-18ee06d7d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGRyaXZlcnxlbnwxfHx8fDE3NTg0NTMxNTV8MA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1648448942225-7aa06c7e8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG1hbiUyMGJ1c2luZXNzJTIwbWFuYWdlcnxlbnwxfHx8fDE3NTg0NTMxNjd8MA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NDUzMTczfDA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NDUzMTYwfDA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODQ1MzE3OXww&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&crop=faces'
  ],
  international: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces'
  ]
};

export function AvatarSelectionModal({ 
  onClose, 
  onSave, 
  currentAvatar,
  userCountry = 'Philippines',
  userEmail = 'default'
}: AvatarSelectionModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Determine which avatar set to show based on country
  const isFilipino = userCountry === 'Philippines';
  const availableAvatars = isFilipino ? avatarOptions.filipino : avatarOptions.international;

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleSave = () => {
    if (selectedImage) {
      // Save avatar to localStorage with user-specific key
      localStorage.setItem(`userAvatar_${userEmail}`, selectedImage);
      
      // Dispatch custom event to notify other components
      const event = new CustomEvent('avatarUpdated', { 
        detail: { 
          avatarUrl: selectedImage,
          userEmail: userEmail 
        } 
      });
      document.dispatchEvent(event);
      
      onSave(selectedImage);
      onClose();
    }
  };

  const handleCustomUpload = () => {
    setIsUploading(true);
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          setIsUploading(false);
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          setIsUploading(false);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setSelectedImage(result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } else {
        setIsUploading(false);
      }
    };

    input.click();
  };

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
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border bg-muted">
                <img 
                  src={currentAvatar} 
                  alt="Current avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
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
                  className={`p-3 cursor-pointer transition-all group hover:shadow-md ${
                    selectedImage === avatar 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => handleImageSelect(avatar)}
                >
                  <div className="space-y-2">
                    <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-border bg-muted">
                      <img 
                        src={avatar} 
                        alt={`Avatar option ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling!.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-full flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge 
                        variant={selectedImage === avatar ? "default" : "outline"} 
                        className="text-xs"
                      >
                        {selectedImage === avatar ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          'Select'
                        )}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Upload Section */}
          <div className="border-t pt-4">
            <Card className="p-6 border-dashed hover:border-solid transition-all cursor-pointer" 
                  onClick={handleCustomUpload}>
              <div className="text-center space-y-3">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-medium">Upload Custom Photo</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your own professional photo (Max 5MB, JPG/PNG)
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  disabled={isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCustomUpload();
                  }}
                >
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Selected Image Preview */}
          {selectedImage && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary bg-muted">
                  <img 
                    src={selectedImage} 
                    alt="Selected avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-primary">Selected Avatar</p>
                  <p className="text-sm text-muted-foreground">
                    This will be your new profile picture
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!selectedImage}
            className="min-w-[100px]"
          >
            <Check className="h-4 w-4 mr-2" />
            Save Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}