import Image from 'next/image';

interface ValuePillarProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  iconBgColor: string;
  iconHoverColor: string;
}

function ValuePillar({ icon, title, description, imageSrc, imageAlt, iconBgColor, iconHoverColor }: ValuePillarProps) {
  return (
    <div className="text-center group">
      <div className="relative mb-6">
        <div className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center mx-auto ${iconHoverColor} transition-colors duration-300`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <Image 
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-48 object-cover" 
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}

export default function ValuePillarsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Why Perth Chooses <span className="text-blue-800">Mount Pleasant</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Three pillars of excellence that have made us Perth&apos;s most trusted seafood destination for over 60 years.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ValuePillar
            icon={
              <svg className="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            }
            title="Ocean Fresh Daily"
            description="Direct from Perth's pristine waters every morning. Our fish never sees a freezer, ensuring the cleanest taste and finest texture in every bite."
            imageSrc="/images/fresh-fish-preparation.svg"
            imageAlt="Fresh fish preparation process"
            iconBgColor="bg-blue-100"
            iconHoverColor="group-hover:bg-blue-200"
          />

          <ValuePillar
            icon={
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            }
            title="Three Generations of Excellence"
            description="Family recipes perfected since 1960. Each generation has added their touch while preserving the authentic flavors that made us Perth's favorite."
            imageSrc="/images/family-legacy.svg"
            imageAlt="Family legacy and traditional cooking methods"
            iconBgColor="bg-amber-100"
            iconHoverColor="group-hover:bg-amber-200"
          />

          <ValuePillar
            icon={
              <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            }
            title="15-Minute Guarantee"
            description="Order online and collect in 15 minutes or less. Our streamlined process ensures you get restaurant-quality food without the restaurant wait."
            imageSrc="/images/quick-service.svg"
            imageAlt="Quick service and efficient preparation"
            iconBgColor="bg-sky-100"
            iconHoverColor="group-hover:bg-sky-200"
          />
        </div>
      </div>
    </section>
  );
}