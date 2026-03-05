import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, Ticket, User, Lock, ArrowRight, Globe } from 'lucide-react';

type LoginType = 'voucher' | 'account';

export default function App() {
  const [loginType, setLoginType] = useState<LoginType>('voucher');
  const [voucherCode, setVoucherCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = loginType === 'voucher' 
      ? { authType: 'voucher', account: voucherCode }
      : { authType: 'fixaccount', account: username, password: password };

    try {
      const response = await fetch('/api/auth/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (data.success) {
        window.location.href = data.result.logonUrl;
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4 font-sans selection:bg-white/30">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-4 shadow-xl"
          >
            <Wifi className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-sm">
            Welcome to Planet Wifi
          </h1>
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest">
            High-Speed Internet Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex p-2 gap-2">
            <button
              onClick={() => setLoginType('voucher')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-all duration-300 ${
                loginType === 'voucher' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="text-sm font-semibold">Voucher Code</span>
            </button>
            <button
              onClick={() => setLoginType('account')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-all duration-300 ${
                loginType === 'account' 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-semibold">Account Login</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8 pt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <AnimatePresence mode="wait">
                {loginType === 'voucher' ? (
                  <motion.div
                    key="voucher"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1">
                        Access Code
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Ticket className="h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={voucherCode}
                          onChange={(e) => setVoucherCode(e.target.value)}
                          placeholder="Enter your voucher code"
                          className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1">
                        Username
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                          className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative flex items-center justify-center gap-2 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                ) : (
                  <>
                    Connect Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Info */}
          <div className="px-8 py-6 bg-black/10 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              Global Network
            </div>
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
              © 2024 Planet Wifi
            </div>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-8 text-white/50 text-sm">
          Need help? <a href="#" className="text-white hover:underline font-semibold">Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
}
