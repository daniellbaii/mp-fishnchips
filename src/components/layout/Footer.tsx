import Link from 'next/link';
import { LogoIcon } from '@/components/ui/icons';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-sky-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <LogoIcon className="h-10 w-10 text-amber-400" />
              <div className="ml-3">
                <h3 className="text-xl font-medium tracking-tight">Mount Pleasant Fish & Chips</h3>
                <p className="text-sm text-blue-200 font-light font-accent">Perth&apos;s Seafood Tradition Since 1960</p>
              </div>
            </div>
            <p className="text-blue-100 font-light mb-6 max-w-md leading-relaxed">
              Three generations of serving Perth&apos;s freshest fish and chips. From our family to yours, 
              we&apos;re committed to quality, freshness, and the authentic taste of the ocean.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-blue-200 hover:text-amber-400 transition-colors duration-300 font-light cursor-pointer">Home</Link></li>
              <li><Link href="/menu" className="text-blue-200 hover:text-amber-400 transition-colors duration-300 font-light cursor-pointer">Menu & Order</Link></li>
              <li><Link href="/specials" className="text-blue-200 hover:text-amber-400 transition-colors duration-300 font-light cursor-pointer">Daily Specials</Link></li>
              <li><Link href="/contact" className="text-blue-200 hover:text-amber-400 transition-colors duration-300 font-light cursor-pointer">Contact & Location</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Contact Info</h4>
            <ul className="space-y-3 text-blue-200 font-light">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                123 Ocean Drive, Perth WA 6000
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                (08) 9123 4567
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                hello@mountpleasantfish.com.au
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Mon-Sun: 11:00 AM - 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700/50 mt-12 pt-8 text-center text-blue-200">
          <p className="font-light">&copy; 2025 Mount Pleasant Fish & Chips. All Rights Reserved. | Perth&apos;s Seafood Tradition Since 1960</p>
        </div>
      </div>
    </footer>
  );
}