import { QueryClient } from '@tanstack/react-query';
import { api } from './api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes in memory
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Prefetch product data on card or link hover
 */
export const prefetchProduct = (slug: string) => {
  queryClient.prefetchQuery({
    queryKey: ['product', slug],
    queryFn: () => api.getProductBySlug(slug),
  });
};

/**
 * Prefetch category data on category tile hover
 */
export const prefetchCategory = (categorySlug: string) => {
  queryClient.prefetchQuery({
    queryKey: ['products', { category: categorySlug }],
    queryFn: () => api.getProducts({ category: categorySlug }),
  });
};
