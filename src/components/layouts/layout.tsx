import dynamic from "next/dynamic";
import Footer from "./footer";
import Header from "./header";
const MobileNavigation = dynamic(
  () => import('./mobile-navigation'),
  {ssr: false}
)

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
