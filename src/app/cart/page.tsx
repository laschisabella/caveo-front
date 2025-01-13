"use client";

import { useCartStore } from "@/domain/state/cartStore";
import Image from "next/image";

const CartPage = () => {
  const { items, removeFromCart, clearCart } = useCartStore();

  if (items.length === 0) {
    return <p>O carrinho está vazio.</p>;
  }

  return (
    <div>
      <h1>Seu Carrinho</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "16px" }}>
            <Image src={item.image} alt={item.title} width={100} height={100} />
            <h2>{item.title}</h2>
            <p>Preço: R$ {item.price}</p>
            <p>Quantidade: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <button
        onClick={clearCart}
        style={{ marginTop: "16px", backgroundColor: "#f00", color: "#fff" }}
      >
        Limpar Carrinho
      </button>
    </div>
  );
};

export default CartPage;
