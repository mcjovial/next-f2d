import Footer from "./footer";
import Header from "./header";
import MobileNavigation from "./mobile-navigation";

export default function SiteLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Header />
      {children}
      <Footer />
      <MobileNavigation />
    </div>
  )
}

export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);
