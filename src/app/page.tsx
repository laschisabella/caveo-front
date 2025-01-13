import Cart from "@/components/Cart";
import ProductList from "@/components/ProductList";

export default async function Home() {
  return (
    <div className="bg-zinc-300">
      <div className="bg-white max-w-screen-lg mx-auto p-20">
        <Cart />

        <h1>Product List</h1>
        <ProductList />
      </div>
    </div>
  );
}
