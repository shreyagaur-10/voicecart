import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { MicFAB } from './components/MicFAB';
import { VoiceListener } from './components/VoiceListener/VoiceListener';
import { ErrorState } from './components/ErrorState';
import { CartDrawer } from './components/CartDrawer';
import { UnavailableToast } from './components/UnavailableToast';
import { useVoiceInput } from './hooks/useVoiceInput';
import { useShoppingList } from './hooks/useShoppingList';
import { parseCommand } from './lib/commandParser';
import { searchProducts, checkProductAvailability } from './lib/mockProducts';
import { getCategory } from './lib/categoryMap';
import type { Lang } from './lib/i18n';
import type { NavTab, ActionConfirmation, VoiceError, Product } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ListPage } from './pages/ListPage';
import { SettingsPage } from './pages/SettingsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { LoginPage } from './pages/LoginPage';
import { PaymentToast } from './components/PaymentToast';

// ─── Error Boundary ────────────────────────────────────────────────────────────

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-500 mb-4">
            Please refresh the page to restart the app.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md"
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('user_email'));
  const [isGuest, setIsGuest] = useState<boolean>(() => localStorage.getItem('is_guest') === 'true');
  const [showPaymentComingSoon, setShowPaymentComingSoon] = useState<boolean>(false);

  const handleLogout = useCallback(() => {
    setUserEmail(null);
    setIsGuest(false);
    localStorage.removeItem('user_email');
    localStorage.removeItem('is_guest');
  }, []);

  const handleLoginSuccess = useCallback((email: string) => {
    setUserEmail(email);
    setIsGuest(false);
    localStorage.setItem('user_email', email);
    localStorage.removeItem('is_guest');
  }, []);

  const handleSkipLogin = useCallback(() => {
    setIsGuest(true);
    localStorage.setItem('is_guest', 'true');
  }, []);

  const handleLoginClick = useCallback(() => {
    setUserEmail(null);
    setIsGuest(false);
    localStorage.removeItem('user_email');
    localStorage.removeItem('is_guest');
  }, []);

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en-US');
  const [voiceError, setVoiceError] = useState<VoiceError | null>(null);
  const [confirmation, setConfirmation] = useState<ActionConfirmation | null>(null);
  const [newItemId, setNewItemId] = useState<string | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<string | undefined>(undefined);
  const [unavailableItem, setUnavailableItem] = useState<string | null>(null);

  // Search state (voice-driven)
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceMaxPrice, setVoiceMaxPrice] = useState<number | undefined>(undefined);
  const [voiceFilters, setVoiceFilters] = useState<string[]>([]);
  const [voiceResults, setVoiceResults] = useState<Product[]>([]);

  const {
    items,
    addItem,
    removeItem,
    removeItemByName,
    toggleItem,
    clearList,
    updateQuantity,
    itemCount,
    checkedCount,
    estimatedTotal,
    runningLowSuggestions,
  } = useShoppingList();

  const confirmationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const newItemTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Voice command handler ──────────────────────────────────────────────────

  const handleTranscript = useCallback(
    (transcript: string) => {
      const intent = parseCommand(transcript);

      const conf: ActionConfirmation = {
        transcript,
        intent,
        timestamp: Date.now(),
      };

      if (intent.action === 'add') {
        const check = checkProductAvailability(intent.item);
        if (!check.available) {
          conf.intent = { action: 'unavailable', item: check.product?.name || intent.item };
          setUnavailableItem(check.product?.name || intent.item);
        } else {
          const added = addItem(intent.item, intent.quantity, intent.unit, intent.category);
          setLastAddedItem(intent.item);
          setNewItemId(added.id);
          conf.itemName = intent.item;
          setActiveTab('home');
          if (newItemTimerRef.current) clearTimeout(newItemTimerRef.current);
          newItemTimerRef.current = setTimeout(() => setNewItemId(null), 2000);
        }
      }

      if (intent.action === 'remove') {
        removeItemByName(intent.item);
        setActiveTab('list');
      }

      if (intent.action === 'clear') {
        clearList();
        setActiveTab('home');
      }

      if (intent.action === 'search') {
        const results = searchProducts(intent.query, intent.maxPrice, intent.filters);
        setVoiceQuery(intent.query);
        setVoiceMaxPrice(intent.maxPrice);
        setVoiceFilters(intent.filters);
        setVoiceResults(results);
        setActiveTab('search');
      }

      setConfirmation(conf);
      setTimeout(() => setIsVoiceOpen(false), 1800);
      if (confirmationTimerRef.current) clearTimeout(confirmationTimerRef.current);
      confirmationTimerRef.current = setTimeout(() => setConfirmation(null), 4500);
    },
    [addItem, removeItemByName, clearList]
  );

  const handleVoiceError = useCallback((error: VoiceError) => {
    setVoiceError(error);
  }, []);

  const { voiceState, interimTranscript, finalTranscript, isSupported, startListening, stopListening } =
    useVoiceInput({
      language: lang,
      onResult: handleTranscript,
      onError: handleVoiceError,
    });

  // ── Mic press ─────────────────────────────────────────────────────────────

  const handleMicPress = useCallback(() => {
    if (!isSupported) {
      setVoiceError('not-supported');
      setIsVoiceOpen(true);
      return;
    }
    if (voiceState === 'listening' || voiceState === 'requesting-permission') {
      stopListening();
      setIsVoiceOpen(false);
      return;
    }
    setVoiceError(null);
    setConfirmation(null);
    setIsVoiceOpen(true);
    startListening();
  }, [isSupported, voiceState, startListening, stopListening]);

  const handleVoiceClose = useCallback(() => {
    stopListening();
    setIsVoiceOpen(false);
  }, [stopListening]);

  // ── Language toggle ────────────────────────────────────────────────────────

  const handleLanguageToggle = useCallback(() => {
    setLang((prev) => (prev === 'en-US' ? 'hi-IN' : 'en-US'));
  }, []);

  // ── Cart ───────────────────────────────────────────────────────────────────

  const handleOpenCart = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);

  // ── Product add from search / recs ─────────────────────────────────────────

  const handleAddProduct = useCallback(
    (product: Product) => {
      if (!product.inStock) {
        setUnavailableItem(product.name);
        return;
      }
      const added = addItem(product.name, 1, undefined, product.category);
      setNewItemId(added.id);
      setLastAddedItem(product.name);
      if (newItemTimerRef.current) clearTimeout(newItemTimerRef.current);
      newItemTimerRef.current = setTimeout(() => setNewItemId(null), 2000);
    },
    [addItem]
  );

  // ── Suggestion quick-add ──────────────────────────────────────────────────

  const handleSuggestionAdd = useCallback(
    (name: string) => {
      const check = checkProductAvailability(name);
      if (!check.available) {
        setUnavailableItem(check.product?.name || name);
        return;
      }
      const category = getCategory(name);
      const added = addItem(name, 1, undefined, category);
      setNewItemId(added.id);
      setLastAddedItem(name);
      if (newItemTimerRef.current) clearTimeout(newItemTimerRef.current);
      newItemTimerRef.current = setTimeout(() => setNewItemId(null), 2000);
    },
    [addItem]
  );

  // ── Clear voice search ────────────────────────────────────────────────────

  const handleClearVoiceSearch = useCallback(() => {
    setVoiceQuery('');
    setVoiceMaxPrice(undefined);
    setVoiceFilters([]);
    setVoiceResults([]);
  }, []);

  // ── Cleanup ───────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      if (confirmationTimerRef.current) clearTimeout(confirmationTimerRef.current);
      if (newItemTimerRef.current) clearTimeout(newItemTimerRef.current);
    };
  }, []);

  // ── Tab change ────────────────────────────────────────────────────────────

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      setActiveTab(tab);
      setShowPaymentComingSoon(false);
      // When manually navigating away from search, clear voice search state
      if (tab !== 'search') {
        handleClearVoiceSearch();
      }
    },
    [handleClearVoiceSearch]
  );

  // ── Render active page ────────────────────────────────────────────────────

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {voiceError && voiceError !== 'aborted' && !isVoiceOpen && (
              <ErrorState type={voiceError} onDismiss={() => setVoiceError(null)} />
            )}
            <HomePage
              lang={lang}
              items={items}
              itemCount={itemCount}
              checkedCount={checkedCount}
              estimatedTotal={estimatedTotal}
              newItemId={newItemId}
              lastAddedItem={lastAddedItem}
              runningLowSuggestions={runningLowSuggestions}
              onRemove={removeItem}
              onToggle={toggleItem}
              onQuantityChange={updateQuantity}
              onSuggestionAdd={handleSuggestionAdd}
              onMicPress={handleMicPress}
            />
          </>
        );

      case 'search':
        return (
          <SearchPage
            lang={lang}
            voiceQuery={voiceQuery || undefined}
            voiceMaxPrice={voiceMaxPrice}
            voiceFilters={voiceFilters}
            voiceResults={voiceResults.length > 0 ? voiceResults : undefined}
            onAddProduct={handleAddProduct}
            onClearVoiceSearch={handleClearVoiceSearch}
          />
        );

      case 'recs':
        return (
          <RecommendationsPage
            lang={lang}
            items={items}
            lastAddedItem={lastAddedItem}
            runningLowItems={runningLowSuggestions}
            onAddItem={handleSuggestionAdd}
            onAddProduct={handleAddProduct}
          />
        );

      case 'list':
        return (
          <ListPage
            lang={lang}
            items={items}
            itemCount={itemCount}
            checkedCount={checkedCount}
            newItemId={newItemId}
            onRemove={removeItem}
            onToggle={toggleItem}
            onQuantityChange={updateQuantity}
            onClearList={clearList}
            onGoHome={() => setActiveTab('home')}
            onProceedToPayment={() => setShowPaymentComingSoon(true)}
          />
        );

      case 'settings':
        return (
          <SettingsPage
            lang={lang}
            onLanguageToggle={handleLanguageToggle}
            onClearList={clearList}
            userEmail={userEmail}
            onLogout={handleLogout}
            onLoginClick={handleLoginClick}
          />
        );

      default:
        return null;
    }
  };

  if (!userEmail && !isGuest) {
    return (
      <ErrorBoundary>
        <div
          className="relative flex flex-col h-full max-w-sm mx-auto shadow-2xl overflow-hidden"
          style={{ height: '100dvh' }}
        >
          <LoginPage
            lang={lang}
            onLoginSuccess={handleLoginSuccess}
            onSkip={handleSkipLogin}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      {/* Mobile container */}
      <div
        className="relative flex flex-col h-full max-w-sm mx-auto bg-gray-50 shadow-2xl overflow-hidden"
        style={{ height: '100dvh' }}
      >
        {/* Unavailable item toast notification */}
        {unavailableItem && (
          <UnavailableToast
            itemName={unavailableItem}
            onDismiss={() => setUnavailableItem(null)}
          />
        )}

        {/* Top bar */}
        <TopBar
          lang={lang}
          activeTab={activeTab}
          onLanguageToggle={handleLanguageToggle}
          itemCount={itemCount}
          onCartClick={handleOpenCart}
        />

        {/* Scrollable content area */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-20"
          id="main-content"
        >
          {renderPage()}
        </main>

        {/* Floating Voice Assistant Bot FAB on bottom right */}
        <MicFAB
          voiceState={voiceState}
          onClick={handleMicPress}
          isSupported={isSupported}
          floating={true}
        />

        {/* Bottom navigation */}
        <BottomNav
          activeTab={activeTab}
          lang={lang}
          onTabChange={handleTabChange}
        />

        {/* Voice listener modal */}
        <VoiceListener
          isOpen={isVoiceOpen}
          voiceState={voiceState}
          interimTranscript={interimTranscript}
          finalTranscript={finalTranscript}
          confirmation={confirmation}
          onClose={handleVoiceClose}
          language={lang}
        />

        {/* Cart drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          items={items}
          itemCount={itemCount}
          checkedCount={checkedCount}
          estimatedTotal={estimatedTotal}
          lang={lang}
          onClose={handleCloseCart}
          onRemove={removeItem}
          onToggle={toggleItem}
          onQuantityChange={updateQuantity}
          onClearAll={() => { clearList(); handleCloseCart(); }}
          onGoToList={() => setActiveTab('list')}
          onProceedToPayment={() => setShowPaymentComingSoon(true)}
        />

        {/* Payment Coming Soon Toast */}
        {showPaymentComingSoon && (
          <PaymentToast
            estimatedTotal={estimatedTotal}
            lang={lang}
            onDismiss={() => setShowPaymentComingSoon(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
