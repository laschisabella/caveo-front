"use client";

import CartButton from "@/components/CartButton";
import { fetchPaginatedProducts } from "@/services/productsService";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

export default function ProductsPage() {
  const limit = 8;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => fetchPaginatedProducts(pageParam, limit),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === limit ? allPages.length : undefined,
    initialPageParam: 0,
  });

  const observerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const renderSkeleton = () => (
    <div className="flex flex-wrap gap-10 p-10 bg-white justify-center">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="flex flex-col gap-10 w-[22%] h-[400px] border-2 border-gray-100 rounded-lg p-5 shadow-lg items-center"
        >
          <Skeleton className="h-[325px] w-[220px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-5 w-[90%]" />
        </div>
      ))}
    </div>
  );

  const renderProducts = () => (
    <motion.div
      className="flex flex-wrap gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data?.pages.flatMap((page, pageIndex) =>
        page.map((product, productIndex) => (
          <motion.div
            key={`${pageIndex}-${productIndex}`}
            className="flex flex-col justify-between p-5 border-2 border-gray-200 rounded-lg w-[23%] shadow-lg"
            variants={itemVariants}
          >
            <Image
              src={product.image}
              alt={product.title}
              className="w-full h-52 object-contain"
              width={200}
              height={200}
            />
            <div className="px-2 py-5">
              <h2 className="font-bold text-lg line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-zinc-600 line-clamp-4">
                {product.description}
              </p>
              <p className="font-bold text-center text-lg">{product.price}</p>
            </div>
            <CartButton product={product} />
          </motion.div>
        ))
      )}
    </motion.div>
  );

  if (isLoading) return renderSkeleton();
  if (isError)
    return <p className="p-10 bg-white">Erro ao carregar produtos!</p>;

  return (
    <div className="p-10 bg-white">
      {renderProducts()}
      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      />
      {isFetchingNextPage && <p>Carregando mais produtos...</p>}
    </div>
  );
}
