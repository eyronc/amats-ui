import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
  description: string;
  artist?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorited?: boolean;
}

export function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorited = false }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {product.featured && (
        <Badge className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600">
          Featured
        </Badge>
      )}
      {discountPercentage > 0 && (
        <Badge className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600">
          -{discountPercentage}%
        </Badge>
      )}

      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="outline"
          size="sm"
          className={`absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 backdrop-blur-sm border-0 ${
            isFavorited ? 'text-red-500' : 'text-gray-600'
          }`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="line-clamp-2 text-sm leading-tight">{product.name}</h3>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">₱{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₱{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}