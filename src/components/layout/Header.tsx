'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoIcon, MenuIcon, CloseIcon } from '@/components/ui/icons';
import CartButton from '@/components/cart/CartButton';
import CartSidebar from '@/components/cart/CartSidebar';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, isActive, onClick }: NavLinkProps) {
  const baseClasses = "transition-all duration-300 font-light tracking-wide cursor-pointer";
  const activeClasses = "text-blue-800 font-medium border-b-2 border-blue-800 pb-1";
  const inactiveClasses = "text-gray-600 hover:text-blue-800 hover:font-medium";
  
  return (
    <Link 
      href={href} 
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu & Order' },
    { href: '/specials', label: 'Daily Specials' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-blue-100 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <LogoIcon className="h-10 w-10 text-blue-800 group-hover:text-sky-600 transition-colors duration-300" />
            <div className="ml-3">
              <h1 className="text-xl font-medium text-blue-800 tracking-tight">Mount Pleasant</h1>
              <p className="text-sm text-gray-500 font-light font-accent">Fish & Chips</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={pathname === item.href}
              >
                {item.label}
              </NavLink>
            ))}
            <CartButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-100 py-4 bg-blue-50/30">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="w-full pt-2">
                <CartButton />
              </div>
            </div>
          </div>
        )}
      </nav>
      <CartSidebar />
    </header>
  );
}