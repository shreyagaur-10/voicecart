import React, { useState, useRef } from 'react';
import { Search, X, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import { searchProducts, getProductName, getProductBrand } from '../lib/mockProducts';
import clsx from 'clsx';

interface SearchPageProps {
  lang: Lang;
  // Voice-driven search pre-fill
  voiceQuery?: string;
  voiceMaxPrice?: number;
  voiceFilters?: string[];
  voiceResults?: Product[];
  onAddProduct: (product: Product) => void;
  onClearVoiceSearch: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  lang,
  voiceQuery,
  voiceMaxPrice,
  voiceFilters = [],
  voiceResults,
  onAddProduct,
  onClearVoiceSearch,
}) => {
  const [query, setQuery] = useState(voiceQuery ?? '');
  const [results, setResults] = useState<Product[]>(voiceResults ?? []);
  const [hasSearched, setHasSearched] = useState(!!voiceQuery);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const doSearch = (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const res = searchProducts(q, voiceMaxPrice, voiceFilters);
    setResults(res);
    setHasSearched(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    // Live search
    doSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    onClearVoiceSearch();
    inputRef.current?.focus();
  };

  const handleAdd = (product: Product) => {
    onAddProduct(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const n = new Set(prev);
        n.delete(product.id);
        return n;
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800">{t(lang, 'search_title')}</h1>

      {/* Search bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={query}
          onChange={handleInput}
          onKeyDown={(e) => e.key === 'Enter' && doSearch(query)}
          placeholder={t(lang, 'search_placeholder')}
          className="w-full pl-10 pr-10 py-3.5 bg-white rounded-2xl border border-gray-200 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-sm"
          autoFocus
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Voice search badge */}
      {voiceQuery && query === voiceQuery && (
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">🎙</span>
          </div>
          <p className="text-xs font-semibold text-emerald-700">
            {t(lang, 'search_heard')}: &ldquo;{voiceQuery}&rdquo;
          </p>
          <button
            onClick={onClearVoiceSearch}
            className="ml-auto text-emerald-400 hover:text-emerald-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Active filters */}
      {voiceFilters.length > 0 || voiceMaxPrice !== undefined ? (
        <div className="flex items-center gap-2 flex-wrap">
          {voiceFilters.map((f) => (
            <span
              key={f}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-800 text-white text-xs font-semibold uppercase tracking-wide"
            >
              {f}
            </span>
          ))}
          {voiceMaxPrice !== undefined && (
            <span className="px-2.5 py-1 rounded-full bg-gray-800 text-white text-xs font-semibold">
              Under ₹{voiceMaxPrice.toLocaleString('en-IN')}
            </span>
          )}
          <button
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-gray-300 text-gray-400 text-xs font-semibold"
            aria-label="Add filter"
          >
            <SlidersHorizontal className="w-3 h-3" />
            {t(lang, 'search_add_filter')}
          </button>
        </div>
      ) : null}

      {/* Results count */}
      {hasSearched && (
        <p className="text-xs text-gray-400">
          {results.length === 0
            ? t(lang, 'search_no_results')
            : `${results.length} ${results.length === 1 ? t(lang, 'search_result') : t(lang, 'search_results')}`}
        </p>
      )}

      {/* Product grid */}
      {hasSearched && results.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {results.map((product) => {
            const isAdded = addedIds.has(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                {/* Product image */}
                <div className="h-28 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={getProductName(product, lang)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded-md uppercase tracking-wide">
                        {t(lang, 'search_out_of_stock')}
                      </span>
                    </div>
                  )}
                  {product.inStock && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-bold uppercase shadow-sm">
                      {t(lang, 'search_in_stock')}
                    </span>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <p className="text-[10px] text-gray-400 font-medium">{getProductBrand(product, lang)}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-snug mt-0.5 flex-1">
                    {getProductName(product, lang)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      {product.originalPrice && (
                        <p className="text-[10px] text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                    <button
                      id={`add-product-${product.id}`}
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className={clsx(
                        'w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90',
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : product.inStock
                          ? 'bg-gray-800 hover:bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      )}
                    >
                      {isAdded ? (
                        <span className="text-sm">✓</span>
                      ) : (
                        <ShoppingCart className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No results */}
      {hasSearched && results.length === 0 && (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-bold text-gray-800 mb-2">{t(lang, 'search_no_results')}</p>
          <p className="text-sm text-gray-400">{t(lang, 'search_no_results_sub')}</p>
        </div>
      )}

      {/* Start state */}
      {!hasSearched && (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="font-bold text-gray-800 mb-2">{t(lang, 'search_start_title')}</p>
          <p className="text-sm text-gray-400">{t(lang, 'search_start_sub')}</p>
        </div>
      )}
    </div>
  );
};
