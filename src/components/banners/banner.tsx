import { Banner } from '@/types';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/ui/error-message'));
const BannerWithSearch = dynamic(
  () => import('@/components/banners/banner-with-search')
);

const Banner: React.FC = () => {
  const banners: Banner[] = [
    {
      id: '12',
      title: "Groceries Delivered in 90 Minute",
      description: "Get your healthy foods & snacks delivered at your doorsteps all day everyday",
      // image: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/grocery.png",
      image: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/bakery.jpg",
    },
    // {
    //   id: "13",
    //   title: "Get Your Bakery Items Delivered",
    //   description: "Get your favorite bakery items baked and delivered to your doorsteps at any time",
    //   image: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/grocery.png",
    //   // image: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/bakery.jpg",
    // },
    // {
    //   id: "14",
    //   title: "Branded & imported makeups",
    //   description: "Easiest and cheapest way to get your branded & imported makeups",
    //   image: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/makeup.png",
    // }
  ];
  return (
    <BannerWithSearch banners={banners} />
  );
};

export default Banner;
