import Header from './header';
import MobileNavigation from './mobile-navigation';

export default function GeneralLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <Header />
      {children}
    </div>
  );
}

export const getGeneralLayout = (page: React.ReactElement) => (
  <GeneralLayout>
    {page}
    <MobileNavigation />
  </GeneralLayout>
);
