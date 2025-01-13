import { ProductI } from "./Product";

type CartItem = ProductI & { quantity: number };

export interface CartI {
  items: CartItem[];
  addToCart: (product: ProductI) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}
