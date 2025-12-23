"use client";

import { AppBar, Box, TextField, Toolbar, InputAdornment, Typography, IconButton, Drawer, ListItemButton, OutlinedInput, SvgIcon, } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { HeroBtn } from "./ui/buttons";
import { postData } from "@/utils/api";
import { Badge } from "@mui/material";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import type { Category, CartItem } from "@/types";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const [categories, setCategories] = useState<Category[]>([]);
  const { cart } = useCart();
  const router = useRouter();

  const cartCount = cart.reduce((sum: number, item: CartItem) => sum + item.qty, 0);

  const getCategories = async () => {
    try {
      const result = await postData<{ items: any[] }>("categories/query", {
        data: { filters: {} }
      })

      if (result.items) {
        const mapped = result.items.map((cat) => ({
          ...cat,
        })).sort(
          (a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0)
        )
        setCategories(mapped)
      }
    } catch (err) {
      console.log("Failed to fecth categories:", err);

    }
  }

  useEffect(() => {
    getCategories();
  }, [])



  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.61)",
          width: "100%",
          mb: "0",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1, md: 2 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>

            <IconButton onClick={toggleDrawer} sx={{ color: "#fff", mr: 10 }}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{
            position: { xs: "absolute", md: "static" },
            left: { xs: "50%", md: "unset" },
            transform: { xs: "translateX(-60%)", md: "none" },
            display: "flex",
            alignItems: "center",
            flexGrow: { xs: 1, md: 0 },
          }}
          >
            <Link href="/" passHref>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: { xs: 220, md: 287 },
                }}
              >
                <Image
                  src="/images/sglogo.png"
                  alt="ShadowGames Logo"
                  width={287}
                  height={55}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Link>
          </Box>

          {/* Desktop Search */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              mx: 1,
              maxWidth: 800,
            }}
          >
            <TextField
              placeholder="Search Product"
              size="small"
              fullWidth
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": { borderColor: "#3c3c3c" },
                  "&:hover fieldset": { borderColor: "#3c3c3c" },
                  "&.Mui-focused fieldset": { borderColor: "#0181db" },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#3d424d",
                  fontSize: "16px",
                },
              }}

              slotProps={{
                input: {
                  type: "text",
                  "aria-label": "search",
                  className: "font-400 text-13 text-white",
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: "#626263" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Desktop Actions: Login + ShopCart */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
        
            }}
          >
            <HeroBtn text="LOGIN" />

            <Link href="/cart" passHref>
              <IconButton
                disableRipple
                disableFocusRipple

              >
                <Badge badgeContent={cartCount} color="error">
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "radial-gradient(circle at top left, #862c47ff 5%, #07568e 90%)",

                    
                    }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
                  </Box>


                </Badge>
              </IconButton>
            </Link>
          </Box>

          {/* Mobile Actions */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              p: 0,
              
            }}
          >
            <IconButton sx={{ color: "#e7ebee" ,  ml: 2 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m22 18-4-4m4 4-4 4m4-4H12M17 27a9 9 0 1 0 0-18"
                ></path>
              </svg>
            </IconButton>

            <Link href="/cart" passHref>
              <IconButton
                disableRipple
                disableFocusRipple
               

              >
                <Badge badgeContent={cartCount} color="error">
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 0,
                      m: 0,
                    }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
                  </Box>


                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {/* mobile search bar */}
      <Toolbar
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          top: 83,
          left: 0,
          right: 0,
          width: "100vw",
          maxWidth: "100%",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          justifyContent: "center",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          p: 1,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <TextField
            placeholder="Search Product"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "& fieldset": { borderColor: "#3c3c3c" },
                "&:hover fieldset": { borderColor: "#3c3c3c" },
                "&.Mui-focused fieldset": { borderColor: "#0181db" },
              },
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputBase-input::placeholder": {
                color: "#3d424d",
                fontSize: 16,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#626263" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            background: "#04030cff",
            color: "#fff",
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 250, py: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 12 }}>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                ml: 5,
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {categories.map((cat) => (
            <ListItemButton
              key={cat.name}
              component={Link}
              href={`/products/?c=${cat.slug}`}
              onClick={toggleDrawer}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(22, 17, 43, 0.1)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {cat.name.toUpperCase()}
              </Typography>
            </ListItemButton>
          ))}

        </Box>
      </Drawer>
    </>
  );
}
