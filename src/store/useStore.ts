import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ToastMessage, OrderDetails } from '../types';

interface StoreState {
  // Cart
  cart: CartItem[];
  couponCode: string;
  couponDiscountPercent: number;
  deliveryMethod: 'inside_dhaka' | 'outside_dhaka' | 'store_pickup';
  selectedOutlet: string;
  isCartDrawerOpen: boolean;
  
  // Wishlist & Compare
  wishlist: Product[];
  compareList: Product[];
  
  // Recently Viewed
  recentlyViewed: Product[];

  // Orders history
  orders: OrderDetails[];

  // Toast notifications
  toasts: ToastMessage[];

  // Actions - Cart
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setDeliveryMethod: (method: 'inside_dhaka' | 'outside_dhaka' | 'store_pickup') => void;
  setSelectedOutlet: (outlet: string) => void;
  setIsCartDrawerOpen: (isOpen: boolean) => void;

  // Actions - Wishlist
  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;

  // Actions - Compare
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Actions - Recently viewed
  addRecentlyViewed: (product: Product) => void;

  // Actions - Orders
  addOrder: (order: OrderDetails) => void;
  getOrderById: (orderId: string, phone?: string) => OrderDetails | undefined;

  // Actions - Toasts
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Computed helpers
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getDeliveryCost: () => number;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      couponCode: '',
      couponDiscountPercent: 0,
      deliveryMethod: 'inside_dhaka',
      selectedOutlet: 'Bashundhara City Flagship',
      isCartDrawerOpen: false,
      wishlist: [],
      compareList: [],
      recentlyViewed: [],
      orders: [
        {
          orderId: 'SZ-2026-89412',
          createdAt: '2026-10-08T14:20:00.000Z',
          customerName: 'Tawhid Hasan',
          phone: '01712345678',
          email: 'tawhid@example.com',
          division: 'Dhaka',
          district: 'Dhaka',
          thana: 'Dhanmondi',
          address: 'House 14, Road 5, Dhanmondi',
          deliveryMethod: 'inside_dhaka',
          paymentMethod: 'cod',
          items: [
            {
              id: 'prod-anker-prime-67w-gan-vank-1',
              productId: 'prod-anker-prime-67w-gan',
              slug: 'anker-prime-67w-gan-wall-charger',
              title: 'Anker Prime 67W GaN Wall Charger (3-Port)',
              brand: 'Anker',
              image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80',
              variantId: 'vank-1',
              variantName: 'Black - 67W',
              colorName: 'Black',
              price: 4950,
              regularPrice: 5800,
              quantity: 1,
              status: 'Official',
            },
          ],
          subtotal: 4950,
          discount: 0,
          deliveryCharge: 80,
          total: 5030,
          status: 'Shipped',
        },
      ],
      toasts: [],

      // Cart implementations
      addToCart: (item, quantity = 1) => {
        const { cart, addToast } = get();
        const existingIndex = cart.findIndex((i) => i.id === item.id);

        if (existingIndex > -1) {
          const newCart = [...cart];
          newCart[existingIndex].quantity += quantity;
          set({ cart: newCart, isCartDrawerOpen: true });
        } else {
          set({ cart: [...cart, { ...item, quantity }], isCartDrawerOpen: true });
        }

        addToast(
          'Added to Cart',
          `${item.title} (${quantity} unit${quantity > 1 ? 's' : ''}) added to your bag.`,
          'success'
        );
      },

      removeFromCart: (itemId) => {
        const { cart, addToast } = get();
        const item = cart.find((i) => i.id === itemId);
        set({ cart: cart.filter((i) => i.id !== itemId) });
        if (item) {
          addToast('Removed from cart', `${item.title} was removed.`, 'info');
        }
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [], couponCode: '', couponDiscountPercent: 0 });
      },

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'SIZAN10') {
          set({ couponCode: clean, couponDiscountPercent: 10 });
          get().addToast('Coupon Applied!', '10% discount applied to your subtotal.', 'success');
          return { success: true, message: '10% discount applied successfully!' };
        } else if (clean === 'WELCOME5') {
          set({ couponCode: clean, couponDiscountPercent: 5 });
          get().addToast('Coupon Applied!', '5% discount applied to your subtotal.', 'success');
          return { success: true, message: '5% discount applied successfully!' };
        } else {
          get().addToast('Invalid Coupon', 'Code not found or expired. Use SIZAN10 for 10% off.', 'error');
          return { success: false, message: 'Invalid coupon code. Try SIZAN10' };
        }
      },

      removeCoupon: () => {
        set({ couponCode: '', couponDiscountPercent: 0 });
        get().addToast('Coupon Removed', 'Coupon discount was removed.', 'info');
      },

      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      setSelectedOutlet: (outlet) => set({ selectedOutlet: outlet }),
      setIsCartDrawerOpen: (isOpen) => set({ isCartDrawerOpen: isOpen }),

      // Wishlist
      toggleWishlist: (product) => {
        const { wishlist, addToast } = get();
        const exists = wishlist.some((p) => p.id === product.id);

        if (exists) {
          set({ wishlist: wishlist.filter((p) => p.id !== product.id) });
          addToast('Removed from Wishlist', `${product.title} removed from saved list.`, 'info');
          return false;
        } else {
          set({ wishlist: [...wishlist, product] });
          addToast('Saved to Wishlist', `${product.title} saved to your wishlist.`, 'success');
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter((p) => p.id !== productId) });
      },

      // Compare (Max 3)
      addToCompare: (product) => {
        const { compareList, addToast } = get();
        if (compareList.some((p) => p.id === product.id)) {
          return { success: false, message: 'Item already in comparison table.' };
        }
        if (compareList.length >= 3) {
          addToast('Compare Limit', 'You can compare up to 3 devices simultaneously.', 'warning');
          return { success: false, message: 'Comparison table full (max 3 items).' };
        }

        set({ compareList: [...compareList, product] });
        addToast('Added to Compare', `${product.title} added to comparison.`, 'success');
        return { success: true, message: 'Added to comparison.' };
      },

      removeFromCompare: (productId) => {
        const { compareList, addToast } = get();
        set({ compareList: compareList.filter((p) => p.id !== productId) });
        addToast('Removed from Compare', 'Device removed from comparison.', 'info');
      },

      clearCompare: () => {
        set({ compareList: [] });
      },

      isInCompare: (productId) => {
        return get().compareList.some((p) => p.id === productId);
      },

      // Recently viewed
      addRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter((p) => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 8) });
      },

      // Orders
      addOrder: (order) => {
        set((state) => ({ orders: [order, ...state.orders] }));
      },

      getOrderById: (orderId, phone) => {
        const { orders } = get();
        const trimmedId = orderId.trim().toUpperCase();
        return orders.find((o) => {
          const idMatches = o.orderId.toUpperCase() === trimmedId;
          if (phone) {
            const cleanPhone = phone.replace(/[\s-]/g, '');
            const orderPhone = o.phone.replace(/[\s-]/g, '');
            return idMatches && orderPhone.endsWith(cleanPhone.slice(-10));
          }
          return idMatches;
        });
      },

      // Toast management
      addToast: (title, message, type = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastMessage = { id, title, message, type };
        set((state) => ({ toasts: [...state.toasts, newToast] }));

        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },

      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },

      // Calculated values
      getCartSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartDiscount: () => {
        const subtotal = get().getCartSubtotal();
        const percent = get().couponDiscountPercent;
        return percent > 0 ? Math.round((subtotal * percent) / 100) : 0;
      },

      getDeliveryCost: () => {
        const { deliveryMethod, cart } = get();
        if (cart.length === 0) return 0;
        if (deliveryMethod === 'store_pickup') return 0;
        if (deliveryMethod === 'inside_dhaka') return 80;
        return 150; // outside_dhaka
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().getCartDiscount();
        const delivery = get().getDeliveryCost();
        return Math.max(0, subtotal - discount + delivery);
      },

      getCartCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'sizanbd-ecommerce-store',
      partialize: (state) => ({
        cart: state.cart,
        couponCode: state.couponCode,
        couponDiscountPercent: state.couponDiscountPercent,
        deliveryMethod: state.deliveryMethod,
        wishlist: state.wishlist,
        compareList: state.compareList,
        recentlyViewed: state.recentlyViewed,
        orders: state.orders,
      }),
    }
  )
);
