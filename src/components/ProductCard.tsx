"use client";
import { ProductCardType } from "@/types";
import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import RightArrowIcon from "./ui/RightArrowIcon";

interface Props {
  product: ProductCardType;
  width?: number; 
  onClick?: () => void;

}

export default function ProductCard({ product, width }: Props) {
  return (
    <Box 
      sx={{
        border: "1px solid #58565f",
        borderRadius: 4,
        cursor: "pointer",
        position: "relative",
        alignContent: "center",
        width: width || 140,
        height: 280,
        color: "#fff",
        overflow: "hidden",
        textAlign: "center",
        flexShrink: 0, 
        display:"flex",
        flexDirection:"column",
        "&:hover": {
          boxShadow:
            "2px 0 3px 0px #58565f66, -2px 0 3px 0px #58565f66, 0 2px 3px 0px #aeadb166",
          transition: "box-shadow 0.2s ease-in-out",
        },
      }}
    >
      {/* Product image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height:"60%",
          py: 1,
          background:
            "linear-gradient(90deg, rgba(255,0,0,0.08), rgba(0,150,255,0.02))",
        }}
      >
        <Image
          src={product.imgSrc}
          alt={product.title}
          width={150}
          height={150}
          style={{ objectFit: "contain" }}
        />

        {/* Tag */}
        {product.tag && (
          <Chip
            label={product.tag}
            size="small"
            sx={{
              position: "absolute",
              top: 30,
              right: 0,
              backgroundColor: "#0599f3",
              color: "#fff",
              mx: "auto",
              borderRadius: "16px 0px 0px 16px",
            }}
          />
        )}
      </Box>

      {/* Info */}
      <Box sx={{ backgroundColor: "rgba(10, 10, 10, 0.6)", height:"40%",display:"flex", flexDirection:"column",justifyContent:"space-around", py: 1 , }}>
        <Box  sx={{ minHeight:"50%"}}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
              px: 1,
            }}
          >
            {product.title} 
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center", 
            justifyContent: "space-between",
            p: 2,
            minHeight:"50%"
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "14px" }}>₹ {product.price}</Typography>
            <Typography
              sx={{
                fontSize: "12px",
                textDecoration: "line-through",
                textDecorationColor: "#801020",
                color: "#58565f",
              }}
            >
              ₹ {product.oldPrice}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: "2px",
                height: "40px",
                backgroundColor: "#58565f",
                borderRadius: "2px",
              }}
            />
            <RightArrowIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
