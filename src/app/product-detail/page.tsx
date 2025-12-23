"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { getData } from "@/utils/api";
import ProductDetail from "@/components/ProductDetail";

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    getData(`products/${id}`)
      .then((res) => setProduct(res.data || res))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <Typography>Loading product...</Typography>;

  return (
    <Box sx={{py:2 , maxWidth: "100%",  }}>
      <ProductDetail product={product} />
    </Box>
  );
}
