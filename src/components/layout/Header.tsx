'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

export default function Header({ navigation }: { navigation: NavItem[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass shadow-nav py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-page flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-500/30">
            <span className="font-display text-xl font-bold tracking-tight">中</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className={cn(
              'font-bold text-base tracking-wide transition-colors',
              isScrolled ? 'text-dark-900' : 'text-white'
            )}>
              中跨数字贸易产业学院
            </span>
            <span className={cn(
              'text-[11px] font-medium tracking-widest transition-colors',
              isScrolled ? 'text-primary-600' : 'text-gold-400'
            )}>
              ZHONGKUAN · DIGITAL TRADE COLLEGE
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all',
                  isScrolled
                    ? 'text-dark-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>

              {item.children && openDropdown === item.href && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64">
                  <div className="rounded-2xl bg-white shadow-card-hover border border-dark-100/60 p-2 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-dark-700 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              'hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all',
              isScrolled
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-gold hover:from-gold-600 hover:to-gold-700'
                : 'bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25'
            )}
          >
            <Phone className="h-4 w-4" />
            招生咨询
          </Link>

          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={cn('h-6 w-6', isScrolled ? 'text-dark-900' : 'text-white')} />
            ) : (
              <Menu className={cn('h-6 w-6', isScrolled ? 'text-dark-900' : 'text-white')} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-dark-100/60 bg-white shadow-card-hover">
          <nav className="container-page py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-dark-800 rounded-xl hover:bg-primary-50 hover:text-primary-700"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-0.5 border-l-2 border-primary-100 ml-4 mt-1 mb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-dark-600 rounded-lg hover:bg-primary-50/50 hover:text-primary-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-dark-100">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-gold w-full"
              >
                <Phone className="h-4 w-4" />
                招生咨询
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
