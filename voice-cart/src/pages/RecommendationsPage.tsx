import React, { useMemo, useState } from 'react';
import {
  Sparkles, TrendingUp, Leaf, RefreshCw, Clock, Star,
  Plus, ChevronRight, Flame, Tag
} from 'lucide-react';
import type { ShoppingItem, Product } from '../types';
import { CATEGORY_EMOJIS } from '../types';
import { getCategory } from '../lib/categoryMap';
import { getCurrentSeasonalSuggestions } from '../lib/seasonalSuggestions';
import { getSubstitutions } from '../lib/substitutions';
import { MOCK_PRODUCTS, getProductName, getProductBrand } from '../lib/mockProducts';
import type { Lang } from '../lib/i18n';
import { t } from '../lib/i18n';
import clsx from 'clsx';

interface RecsPageProps {
  lang: Lang;
  items: ShoppingItem[];
  lastAddedItem?: string;
  runningLowItems: string[];
  onAddItem: (name: string) => void;
  onAddProduct: (product: Product) => void;
}

// ─── Trending / popular items (bilingual) ────────────────────────────────────

const TRENDING_ITEMS_EN = [
  { name: 'Sony Wireless Headphones', nameHi: 'सोनी वायरलेस हेडफ़ोन', emoji: '🎧', reason: 'Top Tech Pick', reasonHi: 'टॉप टेक पिक' },
  { name: "Levi's Denim Jeans", nameHi: 'लीवाइस डेनिम जींस', emoji: '👖', reason: 'Trending Fashion', reasonHi: 'ट्रेंडिंग फ़ैशन' },
  { name: 'Hydrating Face Serum', nameHi: 'हाइड्रेटिंग फेस सीरम', emoji: '🧴', reason: 'Beauty Bestseller', reasonHi: 'ब्यूटी बेस्टसेलर' },
  { name: 'Non-Slip Yoga Mat', nameHi: 'नॉन-स्लिप योग मैट', emoji: '🧘', reason: 'Fitness Favorite', reasonHi: 'फिटनेस पसंदीदा' },
  { name: 'Atomic Habits Book', nameHi: 'एटॉमिक हैबिट्स किताब', emoji: '📚', reason: '#1 Bestseller', reasonHi: '#1 बेस्टसेलर' },
  { name: 'LEGO Millennium Falcon', nameHi: 'लेगो मिलेनियम फाल्कन', emoji: '🧸', reason: 'Popular Toy', reasonHi: 'लोकप्रिय खिलौना' },
];

const FREQUENTLY_BOUGHT_EN = [
  { en: 'Wireless Headphones', hi: 'वायरलेस हेडफ़ोन' },
  { en: 'USB-C Cable', hi: 'USB-C केबल' },
  { en: 'Cotton T-Shirt', hi: 'कॉटन टी-शर्ट' },
  { en: 'Hyaluronic Acid Serum', hi: 'हयालूरोनिक एसिड सीरम' },
  { en: 'Toothpaste', hi: 'टूथपेस्ट' },
  { en: 'Milk', hi: 'दूध' },
  { en: 'Eggs', hi: 'अंडे' },
  { en: 'Sourdough Bread', hi: 'साउरडॉ ब्रेड' },
  { en: 'AA Batteries', hi: 'AA बैटरी' },
  { en: 'Gel Ink Pens', hi: 'जेल इंक पेन' },
];

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
}> = ({ icon, title, subtitle, badge, badgeColor = 'bg-emerald-100 text-emerald-600' }) => (
  <div className="flex items-start justify-between mb-3">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {badge && (
      <span className={clsx('text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest', badgeColor)}>
        {badge}
      </span>
    )}
  </div>
);

// ─── Quick Add Chip ───────────────────────────────────────────────────────────

const QuickChip: React.FC<{
  label: string;
  emoji?: string;
  subtext?: string;
  variant?: 'default' | 'trending' | 'seasonal' | 'substitute' | 'sale';
  lang: Lang;
  onAdd: (name: string) => void;
}> = ({ label, emoji, subtext, variant = 'default', lang, onAdd }) => {
  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    onAdd(label);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const variantStyles = {
    default: 'bg-white border border-gray-100',
    trending: 'bg-orange-50 border border-orange-100',
    seasonal: 'bg-amber-50 border border-amber-100',
    substitute: 'bg-emerald-50 border border-emerald-100',
    sale: 'bg-purple-50 border border-purple-100',
  };

  return (
    <div
      className={clsx(
        'flex-none rounded-2xl p-3 shadow-sm flex flex-col items-start gap-1.5 min-w-[110px] max-w-[130px] cursor-pointer active:scale-95 transition-all duration-200',
        variantStyles[variant]
      )}
      onClick={handleAdd}
    >
      <div className="text-xl leading-none">{emoji || CATEGORY_EMOJIS[getCategory(label)]}</div>
      <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{label}</p>
      {subtext && <p className="text-[10px] text-gray-400">{subtext}</p>}
      <button
        className={clsx(
          'mt-auto w-full py-1 rounded-xl text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1',
          added
            ? 'bg-emerald-500 text-white'
            : variant === 'trending'
            ? 'bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white'
            : variant === 'seasonal'
            ? 'bg-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white'
            : variant === 'substitute'
            ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white'
            : variant === 'sale'
            ? 'bg-purple-100 text-purple-600 hover:bg-purple-500 hover:text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-emerald-500 hover:text-white'
        )}
        aria-label={`Add ${label}`}
      >
        {added ? (
          <>{t(lang, 'recs_added')}</>
        ) : (
          <><Plus className="w-2.5 h-2.5" /> {t(lang, 'recs_add')}</>
        )}
      </button>
    </div>
  );
};

// ─── Product Rec Card (horizontal) ────────────────────────────────────────────

const ProductRecCard: React.FC<{
  product: Product;
  reason: string;
  lang: Lang;
  onAdd: (product: Product) => void;
}> = ({ product, reason, lang, onAdd }) => {
  const [added, setAdded] = React.useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex-none w-44 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative h-28 bg-gray-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={getProductName(product, lang)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-lg">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold bg-black/60 px-2 py-1 rounded-lg">
              {t(lang, 'recs_out_of_stock')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1 gap-1">
        <p className="text-[11px] text-gray-400 line-clamp-1">{getProductBrand(product, lang)}</p>
        <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 flex-1">{getProductName(product, lang)}</p>

        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-emerald-600 font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-gray-300 text-[10px] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        <p className="text-[10px] text-indigo-500 font-medium">{reason}</p>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={clsx(
            'mt-1 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center justify-center gap-1',
            added
              ? 'bg-emerald-500 text-white'
              : product.inStock
              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? t(lang, 'recs_added') : <><Plus className="w-2.5 h-2.5" /> {t(lang, 'recs_add_to_cart')}</>}
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const RecommendationsPage: React.FC<RecsPageProps> = ({
  lang,
  items,
  lastAddedItem,
  runningLowItems,
  onAddItem,
  onAddProduct,
}) => {
  const isHindi = lang === 'hi-IN';
  const { month, items: seasonalItems } = getCurrentSeasonalSuggestions(lang);
  const substitutes = lastAddedItem ? getSubstitutions(lastAddedItem, lang) : [];

  // Items already in cart (to filter out from suggestions)
  const cartNames = useMemo(
    () => new Set(items.map((i) => i.name.toLowerCase())),
    [items]
  );

  // On-sale products (those with originalPrice)
  const onSaleProducts = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.originalPrice && p.inStock).slice(0, 8),
    []
  );

  // Personalized products based on cart categories
  const personalizedProducts = useMemo(() => {
    if (items.length === 0) return MOCK_PRODUCTS.filter((p) => p.inStock).slice(0, 8);
    const cartCategories = new Set(items.map((i) => i.category));
    const matching = MOCK_PRODUCTS.filter(
      (p) => cartCategories.has(p.category) && p.inStock && !cartNames.has(p.name.toLowerCase())
    );
    // Shuffle and slice
    return [...matching].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [items, cartNames]);

  const [showAllFrequent, setShowAllFrequent] = useState(false);
  const frequentItems = showAllFrequent ? FREQUENTLY_BOUGHT_EN : FREQUENTLY_BOUGHT_EN.slice(0, 5);

  const recsCount =
    (substitutes.length > 0 ? 1 : 0) +
    (runningLowItems.length > 0 ? 1 : 0) +
    seasonalItems.length +
    TRENDING_ITEMS_EN.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Hero card */}
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">{t(lang, 'recs_smart_picks')}</span>
        </div>
        <p className="text-2xl font-bold leading-tight">
          {isHindi ? 'आपके लिए\nसुझाव' : 'Recommendations\nfor You'}
        </p>
        <p className="text-sm opacity-80 mt-1">
          {recsCount}+ {t(lang, 'recs_subtitle')}
        </p>
      </div>

      {/* Substitutes — only when an item was just added */}
      {substitutes.length > 0 && lastAddedItem && (
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <SectionHeader
            icon={<RefreshCw className="w-4 h-4 text-emerald-500" />}
            title={`${t(lang, 'recs_alternatives_for')} ${lastAddedItem}`}
            subtitle={t(lang, 'recs_alternatives_sub')}
            badge={t(lang, 'recs_swap')}
            badgeColor="bg-emerald-100 text-emerald-600"
          />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {substitutes.slice(0, 5).map((sub) => (
              <QuickChip
                key={sub}
                label={sub}
                variant="substitute"
                lang={lang}
                onAdd={onAddItem}
              />
            ))}
          </div>
        </section>
      )}

      {/* Running low */}
      {runningLowItems.length > 0 && (
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <SectionHeader
            icon={<Clock className="w-4 h-4 text-orange-400" />}
            title={t(lang, 'recs_running_low')}
            subtitle={t(lang, 'recs_running_low_sub')}
            badge={t(lang, 'recs_restock')}
            badgeColor="bg-orange-100 text-orange-500"
          />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {runningLowItems.map((item) => (
              <QuickChip
                key={item}
                label={item}
                subtext={t(lang, 'recs_ran_out')}
                variant="default"
                lang={lang}
                onAdd={onAddItem}
              />
            ))}
          </div>
        </section>
      )}

      {/* Personalized picks (based on cart) */}
      {personalizedProducts.length > 0 && (
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <SectionHeader
            icon={<Star className="w-4 h-4 text-yellow-400" />}
            title={items.length > 0 ? t(lang, 'recs_you_might_need') : t(lang, 'recs_popular_picks')}
            subtitle={items.length > 0 ? t(lang, 'recs_based_on_cart') : t(lang, 'recs_bestsellers')}
            badge={t(lang, 'recs_for_you')}
            badgeColor="bg-yellow-100 text-yellow-600"
          />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {personalizedProducts.map((product) => (
              <ProductRecCard
                key={product.id}
                product={product}
                reason={
                  items.length > 0
                    ? t(lang, 'recs_pairs_well')
                    : t(lang, 'recs_customer_fav')
                }
                lang={lang}
                onAdd={onAddProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Trending */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <SectionHeader
          icon={<Flame className="w-4 h-4 text-red-400" />}
          title={t(lang, 'recs_trending')}
          subtitle={t(lang, 'recs_trending_sub')}
          badge="🔥 Hot"
          badgeColor="bg-red-100 text-red-500"
        />
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {TRENDING_ITEMS_EN.map((item) => (
            <QuickChip
              key={item.name}
              label={isHindi ? item.nameHi : item.name}
              emoji={item.emoji}
              subtext={isHindi ? item.reasonHi : item.reason}
              variant="trending"
              lang={lang}
              onAdd={onAddItem}
            />
          ))}
        </div>
      </section>

      {/* On sale */}
      {onSaleProducts.length > 0 && (
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <SectionHeader
            icon={<Tag className="w-4 h-4 text-purple-500" />}
            title={t(lang, 'recs_on_sale')}
            subtitle={t(lang, 'recs_on_sale_sub')}
            badge={t(lang, 'recs_save_badge')}
            badgeColor="bg-purple-100 text-purple-600"
          />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {onSaleProducts.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              const saveLabel = isHindi
                ? `${discount}% ${t(lang, 'recs_save_today')}`
                : `Save ${discount}% today`;
              return (
                <ProductRecCard
                  key={product.id}
                  product={product}
                  reason={saveLabel}
                  lang={lang}
                  onAdd={onAddProduct}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Seasonal */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <SectionHeader
          icon={<Leaf className="w-4 h-4 text-amber-500" />}
          title={`${t(lang, 'recs_in_season')} — ${month}`}
          subtitle={t(lang, 'recs_in_season_sub')}
          badge={t(lang, 'recs_fresh')}
          badgeColor="bg-amber-100 text-amber-600"
        />
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {seasonalItems.map((item) => (
            <QuickChip
              key={item}
              label={item}
              subtext={`${t(lang, 'recs_peak_season')} ${month}`}
              variant="seasonal"
              lang={lang}
              onAdd={onAddItem}
            />
          ))}
        </div>
      </section>

      {/* Frequently bought */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <SectionHeader
          icon={<TrendingUp className="w-4 h-4 text-indigo-500" />}
          title={t(lang, 'recs_frequently_bought')}
          subtitle={t(lang, 'recs_frequently_sub')}
          badge={t(lang, 'recs_staples')}
          badgeColor="bg-indigo-100 text-indigo-500"
        />
        <div className="flex flex-col gap-2">
          {frequentItems.map((item) => {
            const displayName = isHindi ? item.hi : item.en;
            const inCart = cartNames.has(item.en.toLowerCase()) || cartNames.has(item.hi.toLowerCase());
            return (
              <FrequentRow
                key={item.en}
                name={displayName}
                inCart={inCart}
                lang={lang}
                onAdd={onAddItem}
              />
            );
          })}
        </div>
        {FREQUENTLY_BOUGHT_EN.length > 5 && (
          <button
            onClick={() => setShowAllFrequent((v) => !v)}
            className="mt-3 w-full py-2 rounded-xl bg-gray-50 text-gray-500 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors"
          >
            {showAllFrequent
              ? t(lang, 'recs_show_less')
              : `${t(lang, 'recs_show_all')} (${FREQUENTLY_BOUGHT_EN.length})`}
            <ChevronRight className={clsx('w-3.5 h-3.5 transition-transform', showAllFrequent && 'rotate-90')} />
          </button>
        )}
      </section>

      {/* Empty bottom padding for nav bar */}
      <div className="h-2" />
    </div>
  );
};

// ─── Frequent row item ─────────────────────────────────────────────────────────

const FrequentRow: React.FC<{
  name: string;
  inCart: boolean;
  lang: Lang;
  onAdd: (name: string) => void;
}> = ({ name, inCart, lang, onAdd }) => {
  const [added, setAdded] = React.useState(false);
  const cat = getCategory(name);
  const emoji = CATEGORY_EMOJIS[cat];

  const handleAdd = () => {
    if (inCart || added) return;
    onAdd(name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200',
        inCart || added ? 'bg-emerald-50' : 'bg-gray-50 hover:bg-gray-100 active:scale-[0.98]'
      )}
      onClick={handleAdd}
    >
      <span className="text-lg leading-none shrink-0">{emoji}</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-[10px] text-gray-400">{t(lang, 'recs_everyday')}</p>
      </div>
      <div>
        {inCart ? (
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
            {t(lang, 'recs_in_cart')}
          </span>
        ) : added ? (
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
            {t(lang, 'recs_added')}
          </span>
        ) : (
          <div className="w-7 h-7 rounded-xl bg-emerald-500 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};
