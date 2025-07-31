import PageLayout from '@/components/layout/PageLayout';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact & Location</h1>
          <p className="text-xl text-gray-500">Visit us at our Perth location</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-800 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-gray-800">123 Ocean Drive, Perth WA 6000</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-800 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-gray-800">(08) 9123 4567</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-800 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-gray-800">hello@mountpleasantfish.com.au</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-800 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-gray-800">Mon-Sun: 11:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Hours & Additional Info */}
          <div className="bg-white p-8 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit Us</h2>
            <p className="text-gray-500 mb-4">
              We&apos;re located in the heart of Perth, just minutes from the city center. 
              Plenty of parking available for both pickup and dine-in customers.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-800 font-medium">Monday - Friday</span>
                <span className="text-gray-500">11:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800 font-medium">Saturday - Sunday</span>
                <span className="text-gray-500">11:00 AM - 9:00 PM</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-emerald-600 font-medium">Currently Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}