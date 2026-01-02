
"use client";
import { Box, Typography, Button, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HeroBtn } from "./ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductCardType } from "@/types";
import { postData } from "@/utils/api";
import ProductCard from "./ProductCard";
import Scrollbtn from "./ui/Scrollbtn";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";





export default function ProductDetail({ product }: { product: any }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recommmended, setRecommended] = useState<ProductCardType[]>([]);

  const variantItems = product?.variants?.items ?? [];
  const defaultVariant = variantItems.find((v: any) => v.isDefault) ?? variantItems[0];

  const [selectedOptionSet1, setSelectedOptionSet1] = useState(defaultVariant?.optionSet1 || "");
  const [selectedoptionSet2, setSelectedoptionSet2] = useState(defaultVariant?.optionSet2 || "");
  const [selectedVariant, setSelectedVariant] = useState<any>(defaultVariant);
  const router = useRouter();
  const { addToCart } = useCart();



  //  optionSet1 
  const uniqueOptionSet1 = Array.from(
    new Set(variantItems.map((item: any) => item.optionSet1).filter(Boolean))
  );

  // optionSet2
  const availableoptionSet2 = variantItems
    .filter((item: any) => item.optionSet1 === selectedOptionSet1 && item.optionSet2)
    .map((item: any) => item.optionSet2);

  const hasoptionSet2 = availableoptionSet2.length > 0;


  const handleOptionSet1Change = (value: string) => {
    setSelectedOptionSet1(value);


    const matchingVariants = variantItems.filter((item: any) => item.optionSet1 === value);

    if (matchingVariants.length > 0) {
      let newVariant;


      if (matchingVariants[0].optionSet2) {
        const matchingWithSize = matchingVariants.find((v: any) => v.optionSet2 === selectedoptionSet2);
        newVariant = matchingWithSize || matchingVariants[0];
        setSelectedoptionSet2(newVariant.optionSet2);
      } else {
        setSelectedoptionSet2("");
        newVariant = matchingVariants[0];
      }

      setSelectedVariant(newVariant);

      // Update image 
      if (newVariant.imageInfo?._id) {
        const imageIndex = allImages.findIndex((img: any) => img._id === newVariant.imageInfo._id);
        if (imageIndex !== -1) {
          setSelectedIndex(imageIndex);
        }
      }
    }
  };


  const handleoptionSet2Change = (event: SelectChangeEvent<string>) => {
    const newSize = event.target.value;
    setSelectedoptionSet2(newSize);

    const newVariant = variantItems.find(
      (item: any) => item.optionSet1 === selectedOptionSet1 && item.optionSet2 === newSize
    );

    if (newVariant) {
      setSelectedVariant(newVariant);


      if (newVariant.imageInfo?._id) {
        const imageIndex = allImages.findIndex((img: any) => img._id === newVariant.imageInfo._id);
        if (imageIndex !== -1) {
          setSelectedIndex(imageIndex);
        }
      }
    }
  };

  const allImages =
    product.images && product.images.length > 0
      ? [product.defaultImage, ...product.images]
      : [product.defaultImage];

  const imgUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${allImages[selectedIndex]?.relativePath}`;

  const isOut =
    !selectedVariant ||
    selectedVariant.isOutOfStock ||
    (!Number(selectedVariant.stockInHand) && !Number(product.stockInHand))

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      _id: product._id,
      title: product.name,
      image: imgUrl,
      price: selectedVariant.unitPrice ?? product.unitPrice,
      mrPrice: selectedVariant.mrPrice ?? product.mrPrice,

      variantId: selectedVariant._id,
      optionSet1: selectedVariant.optionSet1,
      optionSet2: selectedVariant.optionSet2,
      key: `${product._id}-${selectedVariant._id}-${selectedVariant.optionSet1}-${selectedVariant.optionSet2}`,
      qty: 1,
    };

    addToCart(cartItem);

  }

  useEffect(() => {
    if (defaultVariant?.imageInfo?._id) {
      const imageIndex = allImages.findIndex((img: any) => img._id === defaultVariant.imageInfo._id);
      if (imageIndex !== -1) {
        setSelectedIndex(imageIndex);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        if (!product || !product.selectedCategoryId) return;

        const res = await postData<{ items: any[] }>("products/query", {
          data: {
            filters: {
              categoryIds: [{ id: product.selectedCategoryId }],
              startIndex: 0,
              pageSize: 0,
            },
          },
        });

        if (res.items) {
          const categoryId = product.selectedCategoryId;
          const matchedByCategory = res.items?.filter((p: any) =>
            (p.categoryIds || []).some(
              (c: any) => c.id === categoryId || c._id === categoryId
            )
          );

          const finalFiltered = matchedByCategory.filter(
            (p: any) => p._id !== product._id
          );

          const mapped: ProductCardType[] = finalFiltered.map((p: any) => {
            const defaultVariant = p.variants?.items?.find((v: any) => v.isDefault) || {};
            const categoryIds = (p.categoryIds || []).map((c: any) => c.id || c._id || "").filter(Boolean);
            const relativePath = p.defaultImage?.relativePath || "";
            const fullImageUrl = relativePath.startsWith("http")
              ? relativePath
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${relativePath}`;

            const inStock = p.variants?.items?.some((v: any) => Number(v.stockInHand) > 0)
              || Number(p.stockInHand) > 0
              || false;

            return {
              id: p._id,
              imgSrc: fullImageUrl,
              title: p.name,
              price: defaultVariant?.unitPrice ?? p.unitPrice ?? 0,
              oldPrice: defaultVariant?.mrPrice ?? p.mrPrice ?? 0,

              tag: defaultVariant.optionSet1 || "new",
              categoryIds,
              selectedCategoryId: p.selectedCategoryId || "",
              inStock: defaultVariant.stockInHand > 0,
            } as ProductCardType;
          });
          setRecommended(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch recommended products:", err);
      }
    };

    fetchRecommended();
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const variantItems = product?.variants?.items ?? [];
    const def =
      variantItems.find((v: any) => v.isDefault) ?? variantItems[0];

    setSelectedVariant(def);
    setSelectedOptionSet1(def?.optionSet1 || "");
    setSelectedoptionSet2(def?.optionSet2 || "");
    setSelectedIndex(0);
  }, [product]);



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

  return (
    <>

      <Box
        sx={{
          backgroundColor: "#0a0d16",
          width: "calc(100% + 32px)",
          mx: "-16px",
          p: 1.5,
          mt: { xs: 5, md: 0 },
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Link href={`/products`}
            style={{ textDecoration: "none" }}>
            <Typography sx={{ fontSize: "15px", color: "#186cb4" }}>Products</Typography>
          </Link >
          <Typography sx={{ fontSize: "18px" }}> / </Typography>
          <Typography sx={{
            fontSize: "13px", color: "#b0c0cf",
            display: { xs: "-webkit-box", sm: "block" },
            WebkitLineClamp: { xs: 1, sm: "unset" },
            WebkitBoxOrient: { xs: "vertical", sm: "unset" },
            overflow: { xs: "hidden", sm: "visible" },
          }}>
            {product.name}
          </Typography>
        </Box>

      </Box>





      <Box sx={{
        width: "100%",
        display: "flex", flexDirection: "column",
        mx: 'auto', px: 2,
      }}>
        {/* PRODUCT DETAILS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            gap: 4,
            px: { xs: 2, md: 10 },
            py: 4,
            m: 0,
            mb: 5,
            width: "100%",
            backgroundColor: "#101a24",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 4,
              position: "relative",
              height: { xs: "auto", sm: "350px" },
            }}
          >
            {/* SLide IMAGES */}
            {allImages.length > 1 ? (
              <Box
                sx={{
                  width: "100px",
                  height: "250px",
                  py: 0,
                  alignContent: "center",
                  position: "relative",
                  display: { xs: "none", sm: "block" }

                }}
              >
                {index > 0 && (
                  <Box
                    className="thumb-prev"
                    onClick={() => swiper?.slidePrev()}
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 9999,
                      width: "15px",
                      height: "15px",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                    }}
                  >
                    <KeyboardArrowUpIcon fontSize="small" />
                  </Box>
                )}

                <Box
                  sx={{
                    height: "100%",
                    "& .swiper-wrapper": {
                      alignItems: "center",
                    },
                    "& .swiper-slide": {
                      display: "flex",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      nextEl: ".thumb-next",
                      prevEl: ".thumb-prev",
                    }}
                    onSwiper={(s) => setSwiper(s)}
                    onSlideChange={(s) => setIndex(s.activeIndex)}
                    slidesPerView={4}
                    direction="vertical"
                    spaceBetween={1}
                    mousewheel={true}


                    style={{
                      height: "100%", margin: "0px", padding: "0px",
                    }}
                  >
                    {allImages.map((img: any, i: number) => (
                      <SwiperSlide key={img._id}>
                        <Box
                          onClick={() => setSelectedIndex(i)}
                          sx={{
                            width: "70px",
                            height: "50px",
                            cursor: "pointer",
                            background:
                              selectedIndex === i
                                ? "radial-gradient(circle at top left, #862c47ff 5%, #07568e 90%)"
                                : "transparent",

                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                          }}
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${img.relativePath}`}
                            alt={product.name}
                            width={40}
                            height={40}

                            style={{
                              objectFit: "cover",

                            }}
                          />
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>

                {index + 4 < allImages.length - 1 && (
                  <Box
                    onClick={() => swiper?.slideNext()}
                    className="thumb-next"
                    sx={{
                      bottom: "-30px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 9999,
                      width: "15px",
                      height: "15px",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      position: "absolute",
                    }}
                  >
                    <KeyboardArrowDownIcon fontSize="small" />
                  </Box>
                )}
              </Box>
            ) : null}

            {/* MAIN IMAGE */}
            <Box sx={{ p: 0, m: 0, }}>
              <Image
                src={imgUrl}
                alt={product.name}
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </Box>

            {/* SLide IMAGES mobvw */}
            {allImages.length > 1 ? (
              <Box
                sx={{
                  width: "100%",
                  display: { xs: "block", sm: "none" }

                }}
              >

                <Swiper
                  onSwiper={(s) => setSwiper(s)}
                  onSlideChange={(s) => setIndex(s.activeIndex)}
                  slidesPerView={4}
                >
                  {allImages.map((img: any, i: number) => (
                    <SwiperSlide key={img._id}>
                      <Box
                        onClick={() => setSelectedIndex(i)}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${img.relativePath}`}
                          alt={product.name}
                          width={40}
                          height={40}

                          style={{
                            objectFit: "contain",

                          }}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>



              </Box>
            ) : null}

            {/* Product Info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                py: 0,
                gap: 1.5,
                width: "100%",
                height: "auto",
                minHeight: "unset"

              }}
            >
              {/* OptionSet1 */}
              <Box>
                {uniqueOptionSet1.length > 1 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", }}>
                      {uniqueOptionSet1.map((option: any, idx: any) => {

                        const isFirst = idx === 0;
                        const isLast = idx === uniqueOptionSet1.length - 1;

                        return (
                          <Button
                            key={option}
                            onClick={() => handleOptionSet1Change(option)}
                            sx={{
                              backgroundColor:
                                selectedOptionSet1 === option ? "#058ae9ff" : "#1e293d",
                              color: selectedOptionSet1 === option ? "#fff" : "#058ae9ff",
                              border: " 1px solid #058ae9ff",
                              fontSize: "12px",
                              fontWeight: "600",
                              px: "8px",
                              textTransform: "uppercase",
                              borderRadius: isFirst
                                ? "8px 0px 0px   8px"
                                : isLast
                                  ? "0px 8px 8px 0px"
                                  : "0px",
                              m: 0,
                              "&:hover": {
                                backgroundColor:
                                  selectedOptionSet1 === option ? "#058ae9ff" : "transparent",
                              },
                            }}
                          >
                            {option}
                          </Button>
                        )
                      })}
                    </Box>
                  </Box>
                )}



                {Array.isArray(product?.variants?.items) &&
                  product.variants?.items?.some((item: any) => item.optionSet2 &&
                    item.optionSet2.trim() !== "") && (
                    <Box sx={{ my: 2 }}>
                      <FormControl sx={{ width: { xs: "100%", md: "350px" } }}>
                        <Select
                          value={selectedoptionSet2}
                          onChange={handleoptionSet2Change}
                          displayEmpty
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: "#FFFFFF",
                                color: "#000000ff",
                                "& .MuiMenuItem-root": {
                                  color: "#000000ff",
                                },
                                "& .MuiMenuItem-root.Mui-selected": {
                                  bgcolor: "#058ae9ff 70%",
                                },
                                "& .MuiMenuItem-root:hover": {
                                  bgcolor: "#058ae9ff 50%",
                                },
                              },
                            },
                          }}
                          sx={{
                            color: "#fff",
                            borderRadius: "8px",
                            height: "48px",
                            bgcolor: "#1e293d",
                            p: 0,

                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#fff",
                              borderWidth: 1,

                            },
                            "& .MuiSelect-select": {
                              padding: "0 12px",
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                            },
                            "& .MuiSelect-icon": {
                              color: "#fff",
                            },

                          }}
                        >
                          {availableoptionSet2.map((size: string) => (
                            <MenuItem
                              key={size}
                              value={size}
                            >
                              {size.toUpperCase()}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  )}


                <Typography sx={{ fontSize: { xs: "16px", md: "24px" }, fontWeight: "600", mb: 4 }}>
                  {product.name}
                </Typography>
                <Typography sx={{ fontSize: { xs: "17px", md: "24px" }, fontWeight: "700", mb: 2 }}>
                  ₹ {selectedVariant?.unitPrice ?? product.unitPrice ?? 0}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                      color: "#888",
                      mr: 1,
                    }}
                  >
                    ₹ {selectedVariant?.mrPrice ?? product.mrPrice ?? 0}
                  </Typography>
                  <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#0a97ed" }}>
                    Save{" "}
                    {(() => {
                      const mrPrice = selectedVariant?.mrPrice ?? product.mrPrice ?? 0;
                      const unitPrice = selectedVariant?.unitPrice ?? product.unitPrice ?? 0;

                      if (mrPrice > unitPrice && mrPrice > 0) {
                        return Math.round(((mrPrice - unitPrice) / mrPrice) * 100);
                      }
                      return 0;
                    })()}%
                  </Typography>
                </Box>

                {/* Avaliabilty */}
                {isOut ? (
                  <Typography sx={{ fontWeight: 700, mt: 2 }}>
                    <span
                      style={{ color: "#fff", marginRight: 4, fontSize: "20px" }}
                    >
                      Availability:
                    </span>
                    <span style={{ color: "red", fontSize: "20px" }}>Out of Stock</span>
                  </Typography>
                ) : (
                  <HeroBtn
                    text="Add to Cart"
                    padding="8px 48px"
                    borderRadius="8px"

                    onClick={handleAddToCart}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: { xs: 1, md: 2 },
              }}
            >
              <Box>
                <Typography
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "18px", md: "20px" },
                    color: "#019cfa",
                    textShadow: `0 0 0.5px #019cfa,0 0 2px #019cfa,0 0 4px #00f,0 0 5px #00f`,
                    letterSpacing: "1.5px",
                    mb: 1,
                  }}
                >
                  Description
                </Typography>
                <Box
                  sx={{
                    height: "3px",
                    width: "70%",
                    background:
                      "linear-gradient(90deg, #6a1121 8%, #07568e 100%)",
                    mb: 1,
                  }}
                ></Box>
              </Box>
            </Box>
            <Box
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: 1.6,
                wordBreak: "pre-line",
                color: '#a3a0a3ff',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </Box>
          </Box>

          {/* Product Trailer */}
          {product?.videoUrl && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: { xs: 1, md: 2 },

                }}
              >
                <Box>
                  <Typography
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: "18px", md: "20px" },
                      color: "#019cfa",
                      textShadow: `0 0 0.5px #019cfa,0 0 2px #019cfa,0 0 4px #00f,0 0 5px #00f`,
                      letterSpacing: "1.5px",
                      mb: 1,
                    }}
                  >
                    Official Trailer
                  </Typography>
                  <Box
                    sx={{
                      height: "3px",
                      width: "50%",
                      background:
                        "linear-gradient(90deg, #6a1121 8%, #07568e 100%)",
                      mb: 1,

                    }}
                  ></Box>
                </Box>
              </Box>
              {/* video */}
              <Box sx={{ display: "flex", justifyContent: "center", }}>
                <Box
                  sx={{
                    bgcolor: "rgba(128, 128, 128, 0.1)",
                    borderRadius: "8px",
                    p: { xs: "1", sm: "2" },
                    width: "100%",
                    maxWidth: "700px"
                  }}
                >

                  <iframe
                    src={`https://www.youtube.com/embed/${product.videoUrl.includes("youtu.be")
                      ? product.videoUrl.split("/").pop()
                      : product.videoUrl.split("v=")[1]
                      }`}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      border: 0,
                      display: "block",

                    }}
                    allowFullScreen
                  />


                </Box>

              </Box>
            </Box>
          )}

        </Box>

        {/* RECOMMEND PRODUCTS */}
        <Box>
          {recommmended.length > 0 && (
            <Box
              sx={{

                px: 0,
                py: 2,
                m: 0,
                mb: 5,

              }}
            >
              {/* Title */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 5,
                }}
              >
                <Typography

                  sx={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#019cfa",
                    textShadow: `0 0 0.5px #019cfa,0 0 2px #019cfa,0 0 4px #00f,0 0 5px #00f`,
                    letterSpacing: "1.5px",
                  }}
                >
                  Recommended Products
                </Typography>
              </Box>

              {/* Carousel */}
              <Box sx={{ position: "relative", }}>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={false}
                  keyBoardControl
                  containerClass="carousel-container"
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                >
                  {recommmended.map((prod, idx) => (
                    <Box key={idx} sx={{ minWidth: 150, minHeight: 300, width: "100%" }}>
                      <Box sx={{ px: 0.5 }}>
                        <Link
                          href={{
                            pathname: "/product-detail",
                            query: { id: prod.id }
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <ProductCard product={prod} />
                        </Link>
                      </Box>

                    </Box>
                  ))}
                </Carousel>
              </Box>
            </Box>
          )}
        </Box>



      </Box >
    </>
  );
}
