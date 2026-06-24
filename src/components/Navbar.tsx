'use client';

import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [menuOpen, setMenuOpen] = useState(false);

  const walletAddress = user?.wallet?.address;
  const short = walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : '';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#1E2035]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#FFB700] flex items-center justify-center font-black text-black text-sm">
            C
          </div>
          <span className="font-black text-xl tracking-tight text-white">
            Chad<span className="gradient-text">Wallet</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link href="/trade" className="text-sm text-gray-400 hover:text-white transition-colors">Trade</Link>
          <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Android</a>
          <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">iOS</a>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {ready && (
            authenticated ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2035] hover:border-[#FF3B5C44] text-sm text-gray-300 hover:text-[#FF3B5C] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                {short || user?.email?.address?.split('@')[0] || 'Connected'}
              </button>
            ) : (
              <button
                onClick={login}
                className="px-5 py-2 rounded-lg bg-[#00D4FF] text-black font-semibold text-sm hover:bg-[#00BBEE] transition-all glow-blue"
              >
                Sign In
              </button>
            )
          )}
          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1E2035] px-4 py-4 flex flex-col gap-3 glass">
          <Link href="/" className="text-sm text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/trade" className="text-sm text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Trade</Link>
          <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Android App</a>
          <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">iPhone App</a>
        </div>
      )}
    </nav>
  );
}
