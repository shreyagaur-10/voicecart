import React, { useState, useEffect } from 'react';
import {
  Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight,
  User, Mic, Info, ArrowLeft
} from 'lucide-react';
import type { Lang } from '../lib/i18n';

interface LoginPageProps {
  lang: Lang;
  onLoginSuccess: (email: string) => void;
  onSkip: () => void;
}

type AuthView = 'login' | 'register' | 'forgot';

// ── Local "database" helpers ────────────────────────────────────────────────
interface StoredUser {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = 'voice_cart_users';

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUser(user: StoredUser) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUser(email: string): StoredUser | undefined {
  return getStoredUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}


function ensureDemoUser() {
  if (!findUser('demo@voicecart.app')) {
    saveUser({ name: 'Demo User', email: 'demo@voicecart.app', password: 'voice123' });
  }
}

// ── Component ───────────────────────────────────────────────────────────────
export const LoginPage: React.FC<LoginPageProps> = ({ lang, onLoginSuccess, onSkip }) => {
  const isHindi = lang === 'hi-IN';

  const [view, setView] = useState<AuthView>('login');

  // Shared form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => { ensureDemoUser(); }, []);

  // ── Reset form when switching views ─────────────────────────────────────
  const switchView = (v: AuthView) => {
    setView(v);
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError(null);
    setSuccess(false);
    setSuccessMsg('');
  };

  // ── Login ───────────────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) { setError(isHindi ? 'कृपया अपना ईमेल दर्ज करें।' : 'Please enter your email.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError(isHindi ? 'कृपया एक मान्य ईमेल पता दर्ज करें।' : 'Please enter a valid email.'); return; }
    if (!password) { setError(isHindi ? 'कृपया अपना पासवर्ड दर्ज करें।' : 'Please enter your password.'); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = findUser(email);
      if (user && user.password === password) {
        setSuccess(true);
        setSuccessMsg(isHindi ? 'सफल लॉगिन! पुनर्निर्देशित...' : 'Login successful! Redirecting...');
        setTimeout(() => onLoginSuccess(email), 1000);
      } else {
        setError(isHindi ? 'गलत ईमेल या पासवर्ड।' : 'Incorrect email or password.');
      }
    }, 1200);
  };

  // ── Register ────────────────────────────────────────────────────────────
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) { setError(isHindi ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.'); return; }
    if (!email) { setError(isHindi ? 'कृपया अपना ईमेल दर्ज करें।' : 'Please enter your email.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError(isHindi ? 'मान्य ईमेल दर्ज करें।' : 'Please enter a valid email.'); return; }
    if (!password) { setError(isHindi ? 'कृपया पासवर्ड दर्ज करें।' : 'Please enter a password.'); return; }
    if (password.length < 8) { setError(isHindi ? 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।' : 'Password must be at least 8 characters.'); return; }
    if (!agreeTerms) { setError(isHindi ? 'कृपया नियम और शर्तों से सहमत हों।' : 'You must agree to the Terms & Conditions.'); return; }
    if (findUser(email)) { setError(isHindi ? 'यह ईमेल पहले से पंजीकृत है।' : 'This email is already registered.'); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      saveUser({ name: name.trim(), email, password });
      setSuccess(true);
      setSuccessMsg(isHindi ? 'खाता बना! लॉग इन हो रहा है...' : 'Account created! Signing in...');
      setTimeout(() => onLoginSuccess(email), 1200);
    }, 1400);
  };



  // ── Input styles ────────────────────────────────────────────────────────
  const inputCls =
    'w-full h-[50px] pl-11 pr-4 bg-white border border-gray-250 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm';
  const inputWithToggleCls =
    'w-full h-[50px] pl-11 pr-11 bg-white border border-gray-250 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm';
  const labelCls = 'text-xs font-semibold text-gray-700 tracking-wide';

  return (
    <div className="flex flex-col h-full w-full bg-[#F9FAFB] text-gray-850 border border-gray-200/60 rounded-[32px] overflow-hidden shadow-2xl">
      {/* Scrollable content container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        
        {/* ── CREATE ACCOUNT VIEW ────────────────────────────────────────── */}
        {view === 'register' && (
          <div className="flex flex-col flex-1 justify-between">
            {/* Header */}
            <div>
              <header className="flex items-center justify-between mb-8">
                <button
                  type="button"
                  onClick={() => switchView('login')}
                  className="w-8 h-8 rounded-full hover:bg-gray-200/50 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-800"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-extrabold text-sm tracking-wider text-emerald-600 uppercase">
                  Voice Cart
                </span>
                <div className="w-8" />
              </header>

              {/* Mic Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5 mx-auto border border-emerald-100/60 shadow-sm">
                <Mic className="w-6 h-6 text-emerald-600" />
              </div>

              {/* Title / Description */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-850 leading-tight">
                  Join Voice Cart
                </h1>
                <p className="text-xs text-gray-500 mt-2 font-medium px-4">
                  Create an account to start shopping with your voice.
                </p>
              </div>

              {/* Switcher tabs */}
              <div className="flex p-1 bg-gray-200/50 rounded-xl border border-gray-200 mb-6">
                <button
                  type="button"
                  onClick={() => switchView('login')}
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-emerald-700 bg-white border border-gray-200/60 shadow-sm"
                >
                  Create Account
                </button>
              </div>

              {/* Fields */}
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Full Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(null); }}
                      placeholder="John Doe"
                      disabled={isLoading || success}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(null); }}
                      placeholder="you@example.com"
                      disabled={isLoading || success}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(null); }}
                      placeholder="••••••••"
                      disabled={isLoading || success}
                      className={inputWithToggleCls}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400">Must be at least 8 characters long.</p>
                </div>

                {/* Terms and Conditions */}
                <label className="flex items-start gap-2.5 cursor-pointer py-1 select-none touch-manipulation">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 bg-white text-emerald-600 focus:ring-emerald-500/30 accent-emerald-500 mt-0.5"
                  />
                  <span className="text-[11px] text-gray-500 leading-tight">
                    I agree to the <span className="text-emerald-600 font-semibold hover:underline">Terms & Conditions</span> and <span className="text-emerald-600 font-semibold hover:underline">Privacy Policy</span>
                  </span>
                </label>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Create Account button with waveform badge */}
                <div className="relative pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || success}
                    className="w-full h-[50px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-emerald-500/10"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : success ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>

                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-2 border-[#F9FAFB] pointer-events-none">
                    <div className="flex items-center gap-[2px]">
                      <span className="w-[2px] h-3 bg-white rounded-full"></span>
                      <span className="w-[2px] h-5 bg-white rounded-full"></span>
                      <span className="w-[2px] h-4 bg-white rounded-full"></span>
                      <span className="w-[2px] h-6 bg-white rounded-full"></span>
                      <span className="w-[2px] h-3 bg-white rounded-full"></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Bottom Actions */}
            <div>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={onSkip}
                className="w-full h-[50px] bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-300 active:scale-[0.98] shadow-sm"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}

        {/* ── SIGN IN VIEW ──────────────────────────────────────────────── */}
        {view === 'login' && (
          <div className="flex flex-col flex-1 justify-between">
            {/* Header / Brand */}
            <div>
              <header className="text-center mt-4 mb-8">
                <span className="font-extrabold text-base tracking-wider text-emerald-600 uppercase">
                  Voice Cart
                </span>
              </header>

              {/* Title / Description */}
              <div className="text-center mb-6">
                <h1 className="text-sm font-bold text-gray-800 leading-tight">
                  Welcome Back
                </h1>
                <p className="text-xs text-gray-500 mt-2 font-medium px-6 leading-relaxed">
                  Sign in to continue your seamless shopping experience.
                </p>
              </div>

              {/* Switcher tabs */}
              <div className="flex p-1 bg-gray-200/50 rounded-xl border border-gray-200 mb-6">
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-emerald-700 bg-white border border-gray-200/60 shadow-sm"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchView('register')}
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Create Account
                </button>
              </div>

              {/* Demo Account Box */}
              <div className="mb-6 p-4 bg-emerald-50/50 border border-emerald-100/60 rounded-xl flex items-start gap-3 shadow-inner">
                <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-emerald-800">Demo Account</p>
                  <p className="mt-1 text-[11px] text-emerald-700/90 leading-normal">
                    Use <span className="text-emerald-600 font-bold underline">demo@voicecart.app</span> and password <span className="text-emerald-600 font-bold underline">voice123</span> to explore.
                  </p>
                </div>
              </div>

              {/* Inputs */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    placeholder="demo@voicecart.app"
                    disabled={isLoading || success}
                    className={inputCls}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    placeholder="••••••••"
                    disabled={isLoading || success}
                    className={inputWithToggleCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember / Forgot row */}
                <div className="flex items-center justify-between text-xs py-1.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 bg-white text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500"
                    />
                    <span className="text-gray-600 font-medium">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      if (!email) {
                        setError(isHindi ? 'कृपया पहले अपना ईमेल दर्ज करें।' : 'Please enter your email first.');
                        return;
                      }
                      if (!/\S+@\S+\.\S+/.test(email)) {
                        setError(isHindi ? 'कृपया एक मान्य ईमेल पता दर्ज करें।' : 'Please enter a valid email.');
                        return;
                      }
                      setView('forgot');
                    }}
                    className="text-emerald-600 hover:text-emerald-700 hover:underline font-semibold"
                  >
                    Forgot?
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full h-[50px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-2 shadow-sm shadow-emerald-500/10"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : success ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Continue as Guest Button (directly below, no divider) */}
            <div className="mt-4 pt-2">
              <button
                type="button"
                onClick={onSkip}
                className="w-full h-[50px] bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-300 active:scale-[0.98] shadow-sm"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}

        {/* ── FORGOT PASSWORD VIEW ────────────────────────────────────────── */}
        {view === 'forgot' && (
          <div className="flex flex-col flex-1 justify-between">
            {/* Header */}
            <div>
              <header className="flex items-center justify-between mb-8">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="w-8 h-8 rounded-full hover:bg-gray-200/50 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-800"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-extrabold text-sm tracking-wider text-emerald-600 uppercase">
                  Voice Cart
                </span>
                <div className="w-8" />
              </header>

              {/* Icon Container with rich animations */}
              <div className="relative mb-6 mx-auto w-20 h-20">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center border border-emerald-100/60 shadow-sm animate-pulse">
                  <Lock className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-md animate-bounce">
                  <span className="text-[10px] text-white font-extrabold">!</span>
                </div>
              </div>

              {/* Title / Description */}
              <div className="text-center mb-8 px-4">
                <h1 className="text-2xl font-black tracking-tight text-gray-850 leading-tight">
                  {isHindi ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                </h1>
                <div className="mt-4 p-4 bg-amber-50/60 border border-amber-100/70 rounded-2xl shadow-inner">
                  <p className="text-sm font-bold text-amber-800">
                    {isHindi ? 'सुविधा जल्द आ रही है!' : 'Feature coming soon!'}
                  </p>
                  <p className="mt-2 text-xs text-amber-700/90 leading-relaxed font-medium font-sans">
                    {isHindi
                      ? `हम पासवर्ड रीसेट सुविधाएं उपलब्ध कराने के लिए काम कर रहे हैं। आप जल्द ही ${email} के लिए अपना पासवर्ड बदल पाएंगे।`
                      : `We are working hard to bring password reset capabilities online. You will soon be able to reset the password for ${email}.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Sign In button */}
            <div className="mt-4 pt-2">
              <button
                type="button"
                onClick={() => setView('login')}
                className="w-full h-[50px] bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-300 active:scale-[0.98] shadow-sm"
              >
                {isHindi ? 'लॉगिन पर वापस जाएं' : 'Back to Sign In'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
