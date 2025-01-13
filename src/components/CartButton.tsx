import { useCartStore } from "@/domain/state/cartStore";
import { ProductI } from "@/types/Product";

export default function CartButton({ product }: { product: ProductI }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        marginTop: "8px",
        padding: "8px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Adicionar ao Carrinho
    </button>
  );
}
