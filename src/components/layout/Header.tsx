'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoIcon, MenuIcon, CloseIcon } from '@/components/ui/icons';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, isActive, onClick }: NavLinkProps) {
  const baseClasses = "transition-colors duration-200";
  const activeClasses = "text-blue-800 font-semibold border-b-2 border-blue-800 pb-1";
  const inactiveClasses = "text-gray-500 hover:text-blue-800";
  
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
    <header className="bg-white shadow-subtle sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <LogoIcon className="h-10 w-10 text-blue-800" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-blue-800">Mount Pleasant</h1>
              <p className="text-sm text-gray-500 font-accent">Fish & Chips</p>
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
            <button className="btn-accent">Order Now</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-blue-800 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
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
              <button className="btn-accent w-full text-center">Order Now</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}