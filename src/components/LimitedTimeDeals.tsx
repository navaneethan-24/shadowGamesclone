"use client";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { HeroBtn } from "./ui/buttons";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Scrollbtn from "./ui/Scrollbtn";
import Carousel from "react-multi-carousel";
import { postData, getData } from "@/utils/api";
import { ProductCardType } from "@/types";
import { useRouter } from "next/navigation";


export default function TopSellings() {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  

  const getTopSelling = async () => {
    try {
      const res = await postData<{ items: any[] }>(
        "collections/featured-products/query",
        { data: { filter: {} } }
      );
      const topSelling = res.items.find(
        (item) => item.name === "LIMITED TIME DEAL"
      );
      if (!topSelling) return;

      const productIds = topSelling.products.map((p: any) => p.productId);
      const productResponses = await Promise.all(
        productIds.map((id: string) => getData(`products/${id}`))
      );

      const mapped = productResponses.map((res: any) => {
        const p = res.data || res;
        const defaultVariant = p.variants?.items?.find((v: any) => v.isDefault) || {};

        return {
          id: p._id,
          imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${p.defaultImage?.relativePath || ""}`,
          title: p.name,
          price: defaultVariant.unitPrice || 0,
          oldPrice: defaultVariant.mrPrice || 0,
          tag: defaultVariant.optionSet1 || "",
        } as ProductCardType;
      });

      console.log("Full product details:", productResponses);
      setProducts(mapped);
    } catch (err) {
      console.error("Failed to fetch Top Selling Controllers:", err);
    }
  };

  useEffect(() => {
    getTopSelling();
    setMounted(true);
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 3000, min: 1300 }, items: 9 },
    largeDesktop: { breakpoint: { max: 1300, min: 1200 }, items: 8 },
    desktop: { breakpoint: { max: 1200, min: 900 }, items: 7 },
    tablet: { breakpoint: { max: 900, min: 700 }, items: 5 },
    smallTablet: { breakpoint: { max: 700, min: 600 }, items: 4 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
  };

  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <Scrollbtn direction="left" onClick={onClick!} top="50%" />
  );
  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <Scrollbtn direction="right" onClick={onClick!} top="50%" />
  );

  useEffect(() => {
    postData("categories/query", { filters: {} })
      .then(console.log)
      .catch(console.error);
  }, []);


  return (
    <Box sx={{ width: "100%", px: 1,  }}>
      {/* Heading */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 3, md: 2 } }}>
        <Box>
          <Typography
            fontWeight={800}
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              color: "#019cfa",
              textShadow: `0 0 0.5px #019cfa,0 0 2px #019cfa,0 0 4px #00f,0 0 5px #00f`,
              letterSpacing: "1.5px",
            }}
          >
            LIMITED TIME DEAL
          </Typography>
          <Box
            sx={{
              height: "1px",
              width: "50%",
              background: "linear-gradient(90deg, #6a1121 8%, #07568e 100%)",
      
            }}
          ></Box>
        </Box>
        <HeroBtn
          text="VIEW ALL"
          onClick={() => router.push("/products?c=playstation")}
        />




      </Box>

      {/* Carousel */}
      <Box sx={{ position: "relative" }}>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay={false}
          keyBoardControl
          containerClass="carousel-container"
          itemClass="carousel-item"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {products.map((product, idx) => (
            <Box key={idx} sx={{ mx: 0.5 }}>
              <Link
                href={`/product-detail?id=${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductCard product={product} />
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
