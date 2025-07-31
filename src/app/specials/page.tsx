import PageLayout from '@/components/layout/PageLayout';

export default function SpecialsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fresh Daily Specials</h1>
          <p className="text-xl text-gray-500 mb-8">Today&apos;s catch, expertly prepared</p>
          <div className="bg-white p-8 rounded-lg shadow-card">
            <p className="text-gray-500">Our daily specials board is updated fresh each morning!</p>
            <p className="text-gray-500 mt-4">Visit us or call (08) 9123 4567 to hear today&apos;s specials.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}