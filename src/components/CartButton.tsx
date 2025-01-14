import { useCartStore } from "@/domain/state/cartStore";
import { ProductI } from "@/types/Product";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function CartButton({ product }: { product: ProductI }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const items = useCartStore((state) => state.items);
  const { toast } = useToast();

  const isProductInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (product: ProductI) => {
    if (isProductInCart) {
      return;
    }

    addToCart(product);

    toast({
      title: "Product added",
      description: `${product.title} has been added to the cart.`,
      action: (
        <ToastAction
          altText="undo add to cart"
          onClick={() => {
            removeFromCart(product.id);
          }}
          className="bg-white"
        >
          undo
        </ToastAction>
      ),
      style: { backgroundColor: "#84db7d" },
    });
  };

  return (
    <button
      onClick={() => handleAddToCart(product)}
      className="bg-[#cec7a6] px-5 py-2 text-zinc-800 hover:brightness-90 transition rounded-lg font-bold"
    >
      Add to Cart
    </button>
  );
}
