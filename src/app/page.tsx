import Cart from "@/components/Cart";
import ProductList from "@/components/ProductList";
import { Toaster } from "@/components/ui/toaster";

export default async function Home() {
  return (
    <div className="bg-[#333] bg-[url('/assets/texture.png')] min-h-screen">
      <div className="max-w-screen-2xl mx-auto p-10 flex flex-col">
        <div className="bg-[#cec7a6] rounded-t-xl px-20 py-10 flex justify-between items-center">
          <div className="text-[#4e4a32]">
            <h1 className="text-5xl font-bold pb-2">Products</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <Cart />
        </div>
        <ProductList />
      </div>
      <Toaster />
    </div>
  );
}
