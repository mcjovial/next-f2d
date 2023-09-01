import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
import { PRODUCTS_PER_PAGE } from '@/utilities/client/variables';
import { useProducts } from '@/utilities/queries/product';

interface Props {
  className?: string;
  variables: any;
  column?: any;
  gridClassName?: string;
}

export default function ProductGridHome({
  className,
  variables,
  column,
  gridClassName,
}: Props) {
  const { query } = useRouter();
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts({
      ...variables,
      ...(query.category && { categories: query.category }),
      ...(query.text && { name: query.text }),
    });
  const productsItem: any = products;
  
  return (
    <Grid
      products={productsItem}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      limit={PRODUCTS_PER_PAGE}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
}
