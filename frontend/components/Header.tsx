"use client";

import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="container-custom flex h-[var(--header-height)] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary tracking-tighter hover:opacity-80 transition-opacity">
          풀빌라
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <input 
              type="text" 
              placeholder="어디로 떠나시나요?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-hover border border-transparent focus:bg-white focus:border-border hover:shadow-md focus:shadow-lg transition-all outline-none text-text-primary placeholder:text-text-tertiary"
            />
            <div 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Navigation & Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/nearby" className="text-text-secondary font-medium hover:text-primary transition-colors">
              내주변
            </Link>
            <Link href="/booking" className="text-text-secondary font-medium hover:text-primary transition-colors">
              예약내역
            </Link>
            <Link href="/more" className="text-text-secondary font-medium hover:text-primary transition-colors">
              더보기
            </Link>
          </nav>

          <div className="flex items-center gap-3">
             <button className="hidden sm:block px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-hover rounded-full transition-colors">
              로그인
            </button>
            <button className="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
