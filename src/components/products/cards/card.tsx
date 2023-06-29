import type { Product } from '@/types';
import dynamic from 'next/dynamic';
const Helium = dynamic(() => import('@/components/products/cards/helium'));
const Neon = dynamic(() => import('@/components/products/cards/neon')); // grocery-two
interface ProductCardProps {
  product: Product;
  className?: string;
  cardType?: any;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  ...props
}) => {
  return <Helium product={product} {...props} className={className} />;
};
export default ProductCard;
