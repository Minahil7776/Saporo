import { create } from "zustand";

export const useCartStore = create((set) => ({
  products: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.products.find((p) => p.id === product.id);
      if (existing) {
        return {
          products: state.products.map((p) =>
            p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
          ),
        };
      }
      return { products: [...state.products, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  clearCart: () => set({ products: [] }),
}));
