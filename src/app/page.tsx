"use client"
import HeroBanner from "@/components/HeroBanner";
import HeroCategory from "@/components/HeroCategory";
import LimitedTimeDeals from "@/components/LimitedTimeDeals";
import TopSellings from "@/components/TopSelling";
import { Box } from "@mui/material";
import "./globals.css";

export default function Home() {
  return (
    <>
      <main>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'center',
            alignItems:"center",
            mx:{ xs:1, md:4},
            mb:4,   
           
          }}
        >
         <HeroCategory/>
         <HeroBanner/>
         <TopSellings/>
         <LimitedTimeDeals/>
        </Box>
      </main>

    
    </>
  );
}
