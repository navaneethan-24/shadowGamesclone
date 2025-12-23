"use client";
// import { Category } from "@/data/productCategories";
import { postData } from "@/utils/api";
import { Box, CardMedia, Typography, Grid } from "@mui/material";
import button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
  displayOrder?: string;
  parentId?: string | null;
  items?: Category[];
  defaultImage?: { relativePath: string };
  fullImageUrl?: string;
}

const GridItem = Grid as React.FC<any & { item?: boolean }>;

export default function HeroCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const getCategories = async () => {
    try {
      const result = await postData<{ items: Category[] }>("categories/query", {
        data: { filters: {} },
      });

      if (result.items) {
        const mapped = result.items
          .map((cat) => ({
            ...cat,
            fullImageUrl: cat.defaultImage
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${cat.defaultImage.relativePath}`
              : undefined,
            slug: cat.slug,
          }))
          .sort(
            (a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0)
          );
        setCategories(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = (cat: Category) => {
    const slug = typeof cat.slug === "string" ? cat.slug : "";
    if (!slug) return;
    router.push(`/products/?c=${slug}`);
  };

  return (
    <Box sx={{ mx: 4, py: 5 }}>
      <Grid
        container
        spacing={5}
        justifyContent="center"
        sx={{
          display: {
            xs: "none",
            md: "flex",
            flexWrap: "nowrap",
            overflowX: "hidden",
          },
        }}
      >
        {categories.map((cat) => (
          <GridItem key={cat._id} sx={{ flex: " 1 1 auto", minWidth: 0 }}>
            <Box
              onClick={() => handleClick(cat)}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              {cat.fullImageUrl && (
                <CardMedia
                  component="img"
                  image={cat.fullImageUrl}
                  alt={cat.name}
                  sx={{ height: 30, objectFit: "contain", mb: 2 }}
                />
              )}

              <Typography
                className="font-400 text-13 text-white"
                sx={{
                  mx: "1",
                  width: "100%",
                  textAlign: "center",
                  letterSpacing: "1.2px",
                }}
              >
                {cat.name}
              </Typography>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
