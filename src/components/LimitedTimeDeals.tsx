"use client"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { HeroBtn } from "./ui/buttons";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import Scrollbtn from "./ui/Scrollbtn";
import { useRef, useEffect, useState } from "react";

export default function TopSellings() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const gap = 8;
  const [cardWidth, setCardWidth] = useState(150);
  useEffect(() => {
    const calcWidth = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const cardsPerRow = isMdUp ? 4 : 2; 
      const newWidth = (containerWidth - (cardsPerRow - 1) * gap) / cardsPerRow;
      setCardWidth(newWidth);
    };
    calcWidth();
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, [isMdUp]);

  const scrollAmount = cardWidth + gap;
  const loopProducts = [...products, ...products];

  const checkLoop = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const totalWidth = scrollWidth / 2;
    if (scrollLeft <= 0) scrollRef.current.scrollLeft += totalWidth;
    else if (scrollLeft >= totalWidth)
      scrollRef.current.scrollLeft -= totalWidth;
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(checkLoop, 300);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkLoop, 300);
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", px: 1, mt: 2, position: "relative" }}>
      {/* Heading and viewall btn */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: { xs: 1, md: 2 },
        }}
      >
        <Box>
          <Typography
            fontWeight={800}
            color="#019cfa"
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              color: "#019cfa",
              textShadow: `0 0 0.5px #019cfa,
                        0 0 2px #019cfa,
                        0 0 4px #00f,
                        0 0 5px #00f
                        `,
              letterSpacing: "1.5px",
              mb: 1
            }}
          >
           LIMITED TIME DEAL
          </Typography>
          <Box
            sx={{
              height: "1px",
              width: "50% ",
              background: "linear-gradient(90deg, #6a1121 8%, #07568e 100%)",
              mb: 1,
            }}
          ></Box>
        </Box>
        <HeroBtn text="VIEW ALL" />
      </Box>

      {/* Porduct cart */}
      <Box sx={{ position: "relative" }}>

        <Scrollbtn direction="left" onClick={scrollLeft} />
        <Scrollbtn direction="right" onClick={scrollRight} />
        <Box ref={scrollRef} onScroll={checkLoop}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 1.2,
            "&::-webkit-scrollbar": { height: 6 },
          }}
        >
          {loopProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
