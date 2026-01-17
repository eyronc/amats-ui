import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { RotateCcw, ZoomIn, ZoomOut, Save, X } from 'lucide-react';

interface AvatarCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File | null;
  onSave: (croppedImageUrl: string) => void;
}

export function AvatarCropModal({ isOpen, onClose, imageFile, onSave }: AvatarCropModalProps) {
  const [zoom, setZoom] = useState([100]);
  const [rotation, setRotation] = useState([0]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleSave = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for avatar (square)
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Save context
    ctx.save();

    // Move to center and apply transformations
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation[0] * Math.PI) / 180);
    ctx.scale(zoom[0] / 100, zoom[0] / 100);

    // Draw image centered
    const img = imageRef.current;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = size;
    let drawHeight = size;

    if (aspectRatio > 1) {
      drawHeight = size / aspectRatio;
    } else {
      drawWidth = size * aspectRatio;
    }

    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

    // Restore context
    ctx.restore();

    // Get the cropped image as data URL
    const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
    onSave(croppedImageUrl);
  };

  const resetTransforms = () => {
    setZoom([100]);
    setRotation([0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" aria-describedby="avatar-crop-description">
        <DialogHeader>
          <DialogTitle>Crop & Resize Avatar</DialogTitle>
          <DialogDescription id="avatar-crop-description">
            Adjust your profile picture by zooming, rotating, and positioning it to your preference.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {imageUrl && (
            <div className="flex flex-col items-center space-y-4">
              {/* Preview Area */}
              <div className="relative">
                <div 
                  className="w-64 h-64 border-2 border-dashed border-primary rounded-full overflow-hidden bg-muted/50 flex items-center justify-center"
                  style={{ clipPath: 'circle(50%)' }}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Avatar preview"
                    className="max-w-none"
                    style={{
                      transform: `scale(${zoom[0] / 100}) rotate(${rotation[0]}deg)`,
                      transformOrigin: 'center center'
                    }}
                    onLoad={() => {
                      // Auto-fit the image initially
                      if (imageRef.current) {
                        const img = imageRef.current;
                        const aspectRatio = img.naturalWidth / img.naturalHeight;
                        if (aspectRatio < 1) {
                          setZoom([100 / aspectRatio]);
                        }
                      }
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none" />
              </div>

              {/* Controls */}
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <ZoomOut className="h-4 w-4" />
                      Zoom: {zoom[0]}%
                    </Label>
                    <ZoomIn className="h-4 w-4" />
                  </div>
                  <Slider
                    value={zoom}
                    onValueChange={setZoom}
                    min={50}
                    max={300}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rotation: {rotation[0]}°</Label>
                  <Slider
                    value={rotation}
                    onValueChange={setRotation}
                    min={-180}
                    max={180}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetTransforms}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Avatar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden canvas for generating the final image */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
}