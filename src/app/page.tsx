"use client"
import HeroBanner from "@/components/HeroBanner";
import HeroCategory from "@/components/HeroCategory";
import LimitedTimeDeals from "@/components/LimitedTimeDeals";
import ProductDetail from "@/components/ProductDetail";
import TopSellings from "@/components/TopSelling";
import { Box } from "@mui/material";
import "./globals.css";

export default function Home() {
  return (
    <>
      <main>
        <Box> 
         <HeroBanner/>
         <TopSellings/>
         <LimitedTimeDeals/>
        
        </Box>
      </main>

    
    </>
  );
}
