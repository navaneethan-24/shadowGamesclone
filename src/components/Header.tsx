"use client";

import {AppBar,Box,TextField,Toolbar,InputAdornment,Typography,IconButton,Drawer,ListItemButton,OutlinedInput,}from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { HeroBtn } from "./ui/buttons";
import Portal from "@mui/material/Portal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const categories = [
    { name: "Console", href: "#" },
    { name: "Game CDs", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "VR / AR", href: "#" },
    { name: "Retro Game", href: "#" },
    { name: "Gaming Posters", href: "#" },
    { name: "Electronics", href: "#" },
    { name: "Limited Time Deal", href: "#" },
    { name: "Fashion", href: "#" },
  ];

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
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
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
                  width: { xs: 250, md: 287 },
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
              slots={{ input: OutlinedInput }}
              slotProps={{
                input: {
                  type: "text",
                  "aria-label": "search",
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
            <IconButton
              disableRipple
              disableFocusRipple
              sx={{
                "&:focus": { outline: "none" },
                "&:focus-visible": { outline: "none" },
                "&:hover": { background: "transparent" },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 38 38"
              >
                <defs>
                  <linearGradient
                    id="cartGradient"
                    x1="11.083"
                    x2="58.557"
                    y1="-38.5"
                    y2="22.301"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="red" />
                    <stop offset="1" stopColor="#009AFF" />
                  </linearGradient>
                </defs>
                <circle
                  cx="19"
                  cy="19"
                  r="19"
                  fill="url(#cartGradient)"
                  fillOpacity="0.5"
                />
                <path
                  fill="#fff"
                  d="M15 21.7a.67.67 0 0 1-.67-.53l-1.56-7.85a2 2 0 0 0-1.96-1.61H9.68a.67.67 0 1 1 0-1.33h1.15a3.33 3.33 0 0 1 3.26 2.66l1.59 7.86a.67.67 0 0 1-.54.8zM15.67 26.37h-1.24a2.76 2.76 0 0 1-.25-5.5l12.26-1.11 1.07-5.37H13.67a.67.67 0 0 1 0-1.33h14.65c.2 0 .4.09.52.25.12.16.17.36.15.55l-1.33 6.66a.67.67 0 0 1-.59.53l-12.8 1.22a1.42 1.42 0 0 0 .13 2.84h1.24a.67.67 0 0 1 0 1.33z"
                />
                <path
                  fill="#fff"
                  d="M25.66 28.36a2.66 2.66 0 1 1 0-5.32 2.66 2.66 0 0 1 0 5.32zm0-3.99a1.33 1.33 0 1 0 0 2.66 1.33 1.33 0 0 0 0-2.66zM17.67 28.36a2.66 2.66 0 1 1 0-5.33 2.66 2.66 0 0 1 0 5.33zm0-3.99a1.33 1.33 0 1 0 0 2.66 1.33 1.33 0 0 0 0-2.66zM23.66 26.37h-4a.67.67 0 1 1 0-1.33h4a.67.67 0 1 1 0 1.33z"
                />
              </svg>
            </IconButton>
          </Box>

          {/* Mobile Actions */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton sx={{ color: "#e7ebee" }}>
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
            <IconButton sx={{ color: "#e7ebee" }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
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
              href={cat.href}
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
