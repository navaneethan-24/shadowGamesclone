"use client";
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Modal,
  Card,
  Slider,
} from "@mui/material";
import "../globals.css";
import { useSearchParams } from "next/navigation";
import { postData } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import type { ProductCardType } from "@/types";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { HeroBtn } from "@/components/ui/buttons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState, useRef } from "react";


export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("c");

  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductCardType[]>([]);
  const [loading, setLoading] = useState(true);

  const [subItems, setSubItems] = useState<any[]>([]);
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>("");

  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [tempPrice, setTempPrice] = useState<number>(300000);
  const [appliedPrice, setAppliedPrice] = useState<number>(300000);

  const [sliderValue, setSliderValue] = useState<number>(appliedPrice);
  const [showRelevance, setShowRelevance] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const relevanceRef = useRef<HTMLDivElement>(null)

  const getParentCategories = async () => {
    try {
      const result = await postData<any>("categories/query", {
        data: { filters: {} },
      });

      if (result?.items) {
        const currentCategory = result.items.find(
          (cat: any) => cat.slug === categorySlug
        );

        if (currentCategory) {
          setParentCategoryId(currentCategory._id);
          if (currentCategory.subItems?.length > 0) {
            setSubItems(currentCategory.subItems);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const getSubCategories = async (parentId: string) => {
    try {
      const result = await postData<any>("categories/query", {
        data: { filters: { parentId } },
      });
      if (result?.items?.length > 0) {
        setSubItems(result.items);
      }
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
    }
  };

  const getProduct = async () => {
    if (!categorySlug) return;
    try {
      setLoading(true);
      const result = await postData<{ items: any }>("products/query", {
        data: {
          filters: {
            categorySlug,
            parentCategorySlug: categorySlug,
            selectedSubCategory: "",
            tagId: "",
            minPrice: 0,
            maxPrice: 300000,
            startIndex: 0,
            pageSize: 10000,
          },
        },
      });

      if (result.items) {
        const mapped: ProductCardType[] = result.items.map((res: any) => {
          const p = res.data || res;
          const defaultVariant =
            p.variants?.items?.find((v: any) => v.isDefault) || {};

          const categoryIds = (p.categoryIds || [])
            .map((cat: any) => {
              if (typeof cat === "string") return cat;
              return cat.id || cat._id || "";
            })
            .filter(Boolean);

          const relativePath = p.defaultImage?.relativePath || null;
          const fullImageUrl = relativePath.startsWith("http")
            ? relativePath
            : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${relativePath}`;

          const inStock = p.variants?.items?.some((v: any) => Number(v.stockInHand) > 0) || false;

          return {
            id: p._id,
            imgSrc: fullImageUrl,
            title: p.name,
            price: defaultVariant?.unitPrice ?? p.unitPrice ?? 0,
            oldPrice: defaultVariant?.mrPrice ?? p.mrPrice ?? 0 ,
            tag: defaultVariant.optionSet1 || "new",
            categoryIds,
            selectedCategoryId: p.selectedCategoryId || "",
            inStock,
          } as ProductCardType & {
            categoryIds: string[];
            selectedCategoryId: string;
          };
        });

        const sorted = mapped.sort((a, b) => {
          if ((a as any).inStock === (b as any).inStock) return 0;
          return a.inStock ? -1 : 1;
        });

        setAllProducts(sorted);
        setProducts(sorted);

      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterProductsBySubCategory = (subCategoryId: string) => {
    if (!subCategoryId) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((product: any) => {
      const categoryIds = product.categoryIds || [];
      const selectedCategoryId = product.selectedCategoryId || "";
      return (
        categoryIds.includes(subCategoryId) ||
        selectedCategoryId === subCategoryId
      );
    });

    setProducts(filtered);
  };

  const handleSubCategoryClick = (subItemId: string) => {
    if (selectedSubCategoryId === subItemId) {
      setSelectedSubCategoryId("");
      filterProductsBySubCategory("");
    } else {
      setSelectedSubCategoryId(subItemId);
      filterProductsBySubCategory(subItemId);
    }
  };

  const handleApplyFilter = () => {
    setTempPrice(sliderValue);
    setAppliedPrice(sliderValue);
    const filtered = allProducts.filter((p) => p.price <= sliderValue);
    setProducts(filtered);
    setShowFilter(false);
  };

  const handlePriceChange = (
    event: Event | React.SyntheticEvent | any,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      const [max] = newValue;
      setSliderValue(typeof max === "number" ? max : (newValue[0] as number));
      setPriceRange(newValue as number[]);
    } else {
      setSliderValue(newValue as number);
      setPriceRange([0, newValue as number]);
    }
  };

  useEffect(() => {
    setSubItems([]);
    setSelectedSubCategoryId("");
    setProducts([]);
  }, [categorySlug]);

  useEffect(() => {
    if (categorySlug) {
      getParentCategories();
    }
  }, [categorySlug]);

  useEffect(() => {
    if (parentCategoryId) {
      getSubCategories(parentCategoryId);
    }
  }, [parentCategoryId]);

  useEffect(() => {
    if (categorySlug) {
      getProduct();
    }
  }, [categorySlug]);

  useEffect(() => {
    setSliderValue(appliedPrice);
  }, [appliedPrice, showFilter]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        showRelevance &&
        relevanceRef.current &&
        !relevanceRef.current.contains(e.target as Node)
      ) {
        setShowRelevance(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showRelevance]);


  return (
    <Box sx={{ p: { xs: 2, md: 2 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            className="font-600 text-white"
            sx={{ fontSize: { xs: "16px", md: "20px" } }}
          >
            Products
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<TuneIcon />}
            variant="outlined"
            onClick={() => setShowFilter(true)}
            sx={{
              px: "16px",
              py: "8px",
              border: "0px",
              color: "white",
              textTransform: "none",
              borderRadius: "5px",
              backgroundColor: "rgba(49, 49, 49, 0.5)",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(50, 42, 42, 0.5)",
              },
            }}
          >
            Filter
          </Button>
          <Box sx={{ position: "relative" }}>
            <Button
              endIcon={<ArrowDropDownIcon sx={{ fontSize: 20 }} />}
              variant="outlined"
              onClick={() => setShowRelevance(true)}
              sx={{
                px: "16px",
                py: "8px",
                border: "0px",
                color: "white",
                textTransform: "none",
                borderRadius: "5px",
                backgroundColor: "rgba(49, 49, 49, 0.5)",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(50, 42, 42, 0.5)",
                },
              }}
            >
              {selectedSort}
            </Button>

            {showRelevance && (
              <Box ref={relevanceRef}>
              <Card
                sx={{
                  position: "absolute",
                  top: "100px",
                  right: 0,
                  width: "130px",
                  backgroundColor: "rgba(25,25,25,1)",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  zIndex: 1000,
                }}
              >
                {[
                  "Relevance",
                  "Latest",
                  "Assending",
                  "Descending",
                  "Low To High",
                  "High To Low",
                ].map((option, i) => (
                  <Button
                    key={i}
                    onClick={() => {
                      setShowRelevance(false);
                      setSelectedSort(option);
                    }}
                    sx={{
                      width: "100%",
                      textTransform: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#333232" },
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Card>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {subItems.length > 0 && (
        <Box sx={{ my: 2, display: { xs: "none", sm: "block" } }}>
          {subItems.map((subItem, index) => {
            const isFirst = index === 0;
            const isLast = index === subItems.length - 1;
            const isSelected = selectedSubCategoryId === subItem._id;

            return (
              <Button
                key={subItem._id}
                size="small"
                onClick={() => handleSubCategoryClick(subItem._id)}
                sx={{
                  mb: 1,
                  p: "5px",
                  px: "12px",
                  color: "#ccc",
                  borderTop: "none",
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: isLast ? "none" : "1px solid #388eccff",
                  background: isSelected
                    ? "linear-gradient(to right, #621622ff 0%, #134f80 70%), linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, #134f80 100%)"
                    : "#333232",
                  backgroundBlendMode: "overlay",
                  borderRadius: isFirst
                    ? "3px 0 0 3px"
                    : isLast
                      ? "0  3px 3px 0"
                      : "0",
                  "&:hover": {
                    backgroundColor: "#019cfa",
                    backgroundImage: "none",
                  },
                }}
              >
                <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                  {subItem.name}
                </Typography>
              </Button>
            );
          })}

          {selectedSubCategoryId && (
            <Button
              variant="text"
              size="small"
              onClick={() => handleSubCategoryClick("")}
              sx={{
                ml: 1,
                mb: 1,
                color: "#ff6b6b",
                "&:hover": {
                  backgroundColor: "rgba(255,107,107,0.1)",
                },
              }}
            ></Button>
          )}
        </Box>
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress size={40} sx={{ color: "primary.main" }} />
        </Box>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No products available
          </Typography>
        </Box>
      ) : (
        <Box>
          <Grid container spacing={1}>
            {products.map((product) => (
              <Grid
                size={{ xs: 6, sm: 4, md: 1.71, lg: 1.5, xl: 1.33 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

        </Box>
      )}

      <Modal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: "30px",
          p: "10px",
        }}
      >
        <Card
          sx={{
            width: { xs: "90%", sm: "80%", md: 600 },
            maxHeight: "90vh",
            minHeight: 300,
            m: 2,
            p: 3,
            borderRadius: 3,
            backgroundColor: "rgba(25,25,25,0.97)",
            color: "white",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              width: "100%",
            }}
          >
            <Typography variant="h6">Filter</Typography>
            <Button onClick={() => setShowFilter(false)}>
              <CloseIcon sx={{ color: "#ccc", ml: "50px" }} />
            </Button>
          </Box>

          {subItems.length > 0 && (
            <Box sx={{ my: 2 }}>
              {subItems.map((subItem) => (
                <Button
                  key={subItem._id}
                  onClick={() => {
                    handleSubCategoryClick(subItem._id);
                    setShowFilter(false);
                  }}
                  sx={{
                    mr: 1,
                    mb: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign: "center",
                    textTransform: "none",
                    borderRadius: "5px",
                    backgroundColor: "#333333",
                    fontSize: { xs: "8px", md: "12px" },
                    color: "#fff",
                    background:
                      selectedSubCategoryId === subItem._id
                        ? "linear-gradient(to right, #621622 0%, #134f80 70%), linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, #134f80 100%)"
                        : "#333333",
                    backgroundBlendMode:
                      selectedSubCategoryId === subItem._id
                        ? "overlay"
                        : "normal",
                    "&:hover": {
                      backgroundColor: "#0995f7",
                      backgroundImage: "none",
                    },
                  }}
                >
                  {subItem.name}
                </Button>
              ))}
              {selectedSubCategoryId && (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => handleSubCategoryClick("")}
                  sx={{
                    ml: 1,
                    mb: 1,
                    color: "#de2929ff",
                    "&:hover": {
                      backgroundColor: "rgba(255,107,107,0.1)",
                    },
                  }}
                ></Button>
              )}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: { sm: "14px", md: "16px" } }}
            >
              Price
            </Typography>

            <Typography variant="body2">₹{tempPrice}</Typography>
          </Box>

          <Slider
            value={sliderValue}
            onChange={(e, newValue) => {
              if (typeof newValue === "number") {
                setSliderValue(newValue);
              }
            }}
            valueLabelDisplay="auto"
            min={0}
            max={300000}
            sx={{
              color: "#0ba5ec",
              height: 8,
              "& .MuiSlider-thumb": {
                background: "linear-gradient(240deg, #ff0e32ff, #007bff)",
                "&:hover": {
                  boxShadow: "0 0 0px 8px rgba(0, 0, 0, 0.2)",
                },
              },
              "& .MuiSlider-rail": {
                color: "#eeeeeeff",
                opacity: 1,
              },
              "& .MuiSlider-track": {
                background: "linear-gradient(to right, #007bff, #ff2a2a)",
                border: "none",
              },
              mb: 1,
            }}
          />
          <HeroBtn
            text="APPLY FILTER"
            onClick={handleApplyFilter}
            borderRadius="6px"
          />
        </Card>
      </Modal>
    </Box>
  );
}
