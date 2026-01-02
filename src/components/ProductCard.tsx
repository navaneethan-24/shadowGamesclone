"use client";
import { ProductCardType } from "@/types";
import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import RightArrowIcon from "./ui/RightArrowIcon";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductCardType;
  width?: number;
  onClick?: () => void;
  inStock?: boolean;
  categoryIds?: string[];
  selectedCategoryId?: string;
}

export default function ProductCard({ product, width }: Props) {
  const isOut = product.inStock === false;
  const router = useRouter();

  const goToDetailPage = () => {
    if (product.id) {
      router.push(`/product-detail?id=${product.id}`);
    }
  };

  return (
    <Box
     onClick={goToDetailPage}
      sx={{
        border: "1px solid #58565f",
        borderRadius: 4,
        cursor: "pointer",
        position: "relative",
        alignContent: "center",
        width: "100%",  
        height: { xs: "250px", sm: "290px", md: "290px", lg: "300px" },
        minHeight: "120px",
        color: "#fff",
        overflow: "hidden",
        textAlign: "center",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        mb: 2,
        "&:hover": {
          boxShadow:
            "2px 0 3px 0px #58565f66, -2px 0 3px 0px #58565f66, 0 2px 3px 0px #aeadb166",
          transition: "box-shadow 0.2s ease-in-out",
        },
      }}
    >
      {/* OUT OF STOCK LABEL */}
      {isOut && (
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "0",
            backgroundColor: "#fff",
            opacity: 0.8,
            color: "#ff3b3b",
            width: "100%",
            px: 1.5,
            py: 0.3,
            fontSize: "12px",
            fontWeight: 500,
            zIndex: 10,
          }}
        >
          out of Stock
        </Box>
      )}
      {/* Product image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "200px",
          py: { xs: 0.5, sm: 1, md: 1.5 },
          background:
            "linear-gradient(90deg, rgba(255,0,0,0.08), rgba(0,150,255,0.02))",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={product.imgSrc}
            alt={product.title}
            fill
            sizes="100%"
            priority
            style={{
              objectFit: "contain",
              padding: "8px",
            }}
          />
        </Box>

        {/* Tag */}
        {product.tag && (
          <Chip
            label={product.tag}
            size="small"
            sx={{
              position: "absolute",
              top: { xs: 20, sm: 25, md: 30 },
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
      <Box
        sx={{
          backgroundColor: "rgba(10, 10, 10, 0.6)",
          height: "40%",
          minHeight:" 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          py: 1,
        }}
      >
        <Box sx={{ minHeight: "50%" }}>
          <Box
            className=" text-xs-9 text-sm-11 font-500  text-white"
            sx={{
              lineHeight: 1.2,
              px: 1,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.title}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            minHeight: "50%",
          }}
        >
          <Box>
            <Typography>₹ {product.price}</Typography>
            <Typography
              className=" text-14 font-600"
              sx={{
                textDecoration: "line-through",
                textDecorationColor: "#801020",
                color: "#58565f",
              }}
            >
              ₹ {product.oldPrice}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            onClick={goToDetailPage}
          >
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
