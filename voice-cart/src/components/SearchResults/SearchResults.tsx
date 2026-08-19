import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface SearchResultsProps {
  query: string;
  maxPrice?: number;
  filters: string[];
  products: Product[];
  onAddProduct: (product: Product) => void;
  onClearSearch: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  maxPrice,
  filters,
  products,
  onAddProduct,
  onClearSearch,
}) => {
  const activeFilters = [
    ...filters,
    ...(maxPrice !== undefined ? [`Under $${maxPrice}`] : []),
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Heard query banner */}
      <div>
        <p className="text-[10px] font-semibold text-mint-500 uppercase tracking-widest mb-1">
          Heard Query
        </p>
        <h1 className="text-xl font-bold text-charcoal-800 leading-snug">
          &ldquo;{query}&rdquo;
        </h1>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {activeFilters.map((f) => (
            <span
              key={f}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-charcoal-800 text-white text-xs font-semibold uppercase tracking-wide"
            >
              {f}
              <button aria-label={`Remove filter ${f}`}>
                <X className="w-3 h-3 opacity-60 hover:opacity-100 transition-opacity" />
              </button>
            </span>
          ))}
          <button
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-gray-300 text-gray-400 text-xs font-semibold"
            aria-label="Add filter"
          >
            <SlidersHorizontal className="w-3 h-3" />
            Add Filter
          </button>
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-400">
        {products.length === 0
          ? 'No products found'
          : `${products.length} result${products.length === 1 ? '' : 's'}`}
      </p>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAddProduct}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold text-charcoal-800 mb-1">No results found</p>
          <p className="text-sm text-gray-400">
            Try a different search or remove price filters
          </p>
        </div>
      )}

      {/* Back to list */}
      <button
        id="back-to-list"
        onClick={onClearSearch}
        className="w-full py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors mt-2"
      >
        Back to Shopping List
      </button>
    </div>
  );
};
