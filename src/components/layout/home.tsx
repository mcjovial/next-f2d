import { HomePageProps } from "@/types";
import { useTranslation } from 'next-i18next';
import { Element } from 'react-scroll';
import FilterBar from "./filter-bar";
// import Banner from "../banners/banner";
import PromotionSliders from "../promotions/promotions";
import Categories from "../categories/categories";
import ProductGridHome from "../products/grids/home";
import dynamic from "next/dynamic";

const Banner = dynamic(
  () => import('../banners/banner'),
  {ssr: false}
)

export default function ShopHome({ variables }: HomePageProps) {
  const { t } = useTranslation('common');
  return (
    <>
      <Banner />
      <PromotionSliders />
      <FilterBar variables={variables?.categories} />
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories layout="classic" variables={variables?.categories} />
        <ProductGridHome
          className="px-4 pb-8 lg:p-8"
          variables={variables?.products}
        />
      </Element>
    </>
  );
}