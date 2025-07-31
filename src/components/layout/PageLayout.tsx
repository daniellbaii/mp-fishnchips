import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}