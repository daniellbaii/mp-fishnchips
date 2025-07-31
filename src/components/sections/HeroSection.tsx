import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-sky-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 to-sky-600/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Perth&apos;s <span className="text-blue-800">Ocean Fresh</span>
              <span className="font-accent text-amber-500 block text-5xl lg:text-7xl">Fish & Chips</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-lg">
              Three generations of seafood excellence. From Perth&apos;s waters to your plate in just 15 minutes. 
              Experience the difference that fresh makes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/menu" className="btn-accent text-lg px-8 py-4 inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
                </svg>
                Order Fresh Now
              </Link>
              <Link href="/specials" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                View Today&apos;s Catch
              </Link>
            </div>

            {/* Live Status */}
            <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle">
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium text-gray-800">Open Now</span>
                </div>
                <div className="text-sm text-gray-500">Current wait: 12 mins</div>
                <div className="text-sm text-gray-500">Popular: Barramundi & Chips</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-card">
              <Image 
                src="/images/fish-and-chips-hero.svg" 
                alt="Golden fish and chips with Perth coastal backdrop" 
                className="w-full h-96 object-cover" 
                width={600}
                height={400}
                priority
              />
            </div>
            
            {/* Floating Daily Catch Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-card p-4 hidden lg:block">
              <div className="text-sm font-semibold text-gray-800">Today&apos;s Fresh Catch</div>
              <div className="text-xs text-gray-500 mt-1">Barramundi • Snapper • King George Whiting</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}