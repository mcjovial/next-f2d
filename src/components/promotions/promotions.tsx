import PromotionSlider from '@/components/promotions/promotion-slider';
import ErrorMessage from '@/components/ui/error-message';

export default function PromotionSliders({ variables }: any) {
  // if (error) return <ErrorMessage message={error.message} />;

  const promotional_sliders: string[] = [
    "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
    "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
    "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
    "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
    "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
  ];

  if (!promotional_sliders) return null;

  return <PromotionSlider sliders={promotional_sliders} />;
}
