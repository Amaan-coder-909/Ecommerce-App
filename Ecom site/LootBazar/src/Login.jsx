import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials
    if (email === 'admin@gmail.com' && password === '123456') {
      onLogin({ role: 'admin', email });
    } else if (email && password) {
      // Normal User Login Simulation
      onLogin({ role: 'user', email });
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#14141B] border border-[#2A2A36] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#8B5CF6] to-[#FF6B35] rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-black mb-3 shadow-lg shadow-[#8B5CF6]/20">
            L
          </div>
          <h2 className="text-2xl font-black tracking-wide text-white">
            Login to <span className="text-[#FF6B35]">LootBazar</span>
          </h2>
          <p className="text-xs text-[#71717A] mt-1">Access admin panel or user store</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#71717A] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-all placeholder-[#71717A]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#71717A] uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-all placeholder-[#71717A]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B5CF6] hover:bg-[#7c4dff] text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#8B5CF6]/20 mt-2"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-6 p-4 bg-[#1F1F2A] border border-[#2A2A36] rounded-2xl text-xs space-y-1">
          <p className="font-bold text-[#FF6B35] mb-1">🔑 Admin Demo Access:</p>
          <p className="text-[#71717A]">Email: <span className="text-white font-mono">admin@gmail.com</span></p>
          <p className="text-[#71717A]">Password: <span className="text-white font-mono">123456</span></p>
        </div>

        {/* Skip to Store */}
        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToUser}
            className="text-xs text-[#71717A] hover:text-[#8B5CF6] underline transition-colors"
          >
            Continue as Guest / User Store →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;