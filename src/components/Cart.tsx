"use client";

import { useCartStore } from "@/domain/state/cartStore";
import Image from "next/image";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-orange-400 p-10">
        <p>O carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-400 p-10">
      <h1 className="text-xl">Cart</h1>
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
}
