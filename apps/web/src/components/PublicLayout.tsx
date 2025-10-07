import PublicNavigation from '@/components/PublicNavigation';
import PublicFooter from '@/components/PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavigation />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}