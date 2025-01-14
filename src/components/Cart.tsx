"use client";

import { useCartStore } from "@/domain/state/cartStore";
import { ShoppingCart, Trash, X } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCartStore();

  return (
    <Drawer>
      <DrawerTrigger className="flex justify-center items-center gap-2 bg-white rounded-lg px-5 py-2 transition hover:brightness-90 relative">
        <div className="text-lg font-bold">My Cart</div>
        <ShoppingCart size={34} />
        {items.length > 0 && (
          <div className="bg-black rounded-full text-white text-lg px-2 font-bold absolute bottom-9 -right-2">
            {items.length}
          </div>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-w-screen-md px-20 ml-auto mr-10 h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="pt-20 text-lg">My Cart</DrawerTitle>
        </DrawerHeader>
        {items.length > 0 && (
          <div>
            <ul className="overflow-y-auto max-h-full h-[55vh]">
              {items.map((item) => (
                <li key={item.id} className="flex p-2 justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-white p-1 rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="max-w-96">
                      <h2 className="font-bold truncate">{item.title}</h2>
                      <p>$ {item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center text-red-800 font-black"
                  >
                    <Trash size={30} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={clearCart}
              className="bg-red-800 text-white py-2 px-5 rounded-lg mt-5"
            >
              Clear cart
            </button>
          </div>
        )}

        {items.length === 0 && (
          <div className="p-10 flex flex-col items-center py-32">
            <ShoppingCart size={200} weight="thin" className="" />
            <p className="text-lg">Cart is empty {":("}</p>
          </div>
        )}
        <DrawerClose className="absolute top-10 font-bold text-red-800 flex gap-2 right-10">
          <p>close</p>
          <X size={25} />
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
