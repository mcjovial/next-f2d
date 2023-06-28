import dynamic from 'next/dynamic';
import ErrorMessage from '../ui/error-message';
import { useCategories } from '@/utilities/category';

const StickySidebarListCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-list-categories')
);

interface CategoriesProps {
  layout: string;
  variables: any;
  className?: string;
}
export default function Categories({
  layout,
  className,
  variables,
}: CategoriesProps) {
  const { categories, isLoading, error } = useCategories(variables);

  if (error) return <ErrorMessage message={error.message} />;
  return (
    <StickySidebarListCategories
      notFound={!Boolean(categories.length)}
      categories={categories}
      loading={isLoading}
      className={className}
      // variables={variables}
    />
  );
}