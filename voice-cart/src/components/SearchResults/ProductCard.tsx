import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-md transition-shadow duration-200',
        !product.inStock && 'opacity-70'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-charcoal-800/60 flex items-center justify-center">
            <span className="text-white text-xs font-bold px-2 py-1 bg-charcoal-800/80 rounded-full uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-mint-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
        {/* Category tag */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          {product.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-charcoal-800 text-sm leading-snug line-clamp-2 mb-0.5">
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-400 font-medium mb-2 uppercase tracking-wide">
          {product.brand}
        </p>

        {/* Price + add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-charcoal-800 text-base">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through ml-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            id={`add-product-${product.id}`}
            onClick={() => product.inStock && onAdd(product)}
            disabled={!product.inStock}
            className={clsx(
              'flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
              product.inStock
                ? 'bg-mint-500 text-white hover:bg-mint-600 active:scale-95 shadow-mint'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            )}
            aria-label={product.inStock ? `Add ${product.name} to cart` : 'Out of stock'}
          >
            <ShoppingCart className="w-3 h-3" />
            {product.inStock ? 'Add' : 'N/A'}
          </button>
        </div>
      </div>
    </div>
  );
};
