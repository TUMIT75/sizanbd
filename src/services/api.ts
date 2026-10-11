import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product, Category } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface FetchProductsParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  status?: string;
  sort?: string;
  q?: string;
}

export const api = {
  async getProducts(params?: FetchProductsParams): Promise<Product[]> {
    // Artificial realistic delay (350ms)
    await delay(350);

    let list = [...PRODUCTS];

    if (params?.category) {
      list = list.filter((p) => p.categorySlug === params.category);
    }
    if (params?.brand) {
      list = list.filter((p) => p.brand.toLowerCase() === params.brand?.toLowerCase());
    }
    if (params?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= params.maxPrice!);
    }
    if (params?.condition) {
      list = list.filter((p) => p.condition === params.condition);
    }
    if (params?.status) {
      list = list.filter((p) => p.status === params.status);
    }
    if (params?.q) {
      const q = params.q.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (params?.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (params?.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (params?.sort === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    await delay(300);
    const found = PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  },

  async getCategories(): Promise<Category[]> {
    await delay(250);
    return [...CATEGORIES];
  },

  async searchProducts(query: string): Promise<Product[]> {
    await delay(250);
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  },
};
