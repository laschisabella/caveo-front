"use client";

import CartButton from "@/components/CartButton";
import { fetchPaginatedProducts } from "@/services/productsService";
import { ProductI } from "@/types/Product";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ProdutosPage() {
  const limit = 10;

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
    getNextPageParam: (lastPage: ProductI[], allPages: ProductI[][]) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
    initialPageParam: 0, // Define o valor inicial do parâmetro da página
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Carregando produtos...</p>;
  if (isError) return <p>Erro ao carregar produtos!</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-20">
      <h1>Lista de Produtos</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data?.pages.map((page, pageIndex) =>
          page.map((product: ProductI) => (
            <div
              key={`${product.id}-${pageIndex}`}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                width: "200px",
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                style={{ width: "100%" }}
                width={200}
                height={200}
              />
              <h2 style={{ fontSize: "1rem" }}>{product.title}</h2>
              <p>Preço: R$ {product.price}</p>
              <CartButton product={product} />
            </div>
          ))
        )}
      </div>

      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      />

      {isFetchingNextPage && <p>Carregando mais produtos...</p>}
    </div>
  );
}
