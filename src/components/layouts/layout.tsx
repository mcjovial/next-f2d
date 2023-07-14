import dynamic from "next/dynamic";
import Footer from "./footer";
import Header from "./header";
import { FC, PropsWithChildren } from "react";
const MobileNavigation = dynamic(
  () => import('./mobile-navigation'),
  {ssr: false}
)

const SiteLayout: FC<PropsWithChildren<any>> = ({ children }) => {
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

export default SiteLayout