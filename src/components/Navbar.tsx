'use client';

import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName =
    user?.google?.name ?? user?.apple?.email?.split('@')[0] ?? user?.wallet?.address?.slice(0, 8) ?? 'Connected';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#1E2035]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="ChadWallet" width={32} height={32} className="rounded-lg" />
          <span className="font-black text-xl tracking-tight text-white">Chad<span className="gradient-text">Wallet</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link href="/trade" className="text-sm text-gray-400 hover:text-white transition-colors">Trade</Link>
          <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Android</a>
          <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">iOS</a>
        </div>

        <div className="flex items-center gap-3">
          {ready && (
            authenticated ? (
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2035] hover:border-[#FF3B5C44] text-sm text-gray-300 hover:text-[#FF3B5C] transition-all">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                {displayName.length > 14 ? displayName.slice(0, 12) + '…' : displayName}
              </button>
            ) : (
              <button onClick={login} className="px-5 py-2 rounded-lg bg-[#4AFF91] text-black font-semibold text-sm hover:bg-[#22DD66] transition-all glow-blue">
                Sign In
              </button>
            )
          )}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-white mb-1" /><div className="w-5 h-0.5 bg-white mb-1" /><div className="w-5 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#1E2035] px-4 py-4 flex flex-col gap-3 glass">
          <Link href="/" className="text-sm text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/trade" className="text-sm text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Trade</Link>
          <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Android App</a>
          <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">iOS App</a>
        </div>
      )}
    </nav>
  );
}
