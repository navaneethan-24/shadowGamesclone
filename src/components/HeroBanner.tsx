"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { postData } from "@/utils/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Scrollbtn from "./ui/Scrollbtn";


interface HeroPanel {
  _id: string;
  title?: string;
  fullImageUrl?: string;
}

  const responsive = {
    all: {
      breakpoint: { max: 3000, min: 0 },
      items: 1, 
    },
  };



export default function HeroBanner() {
  const[ panels, setPanels ] = useState<HeroPanel[]>([])
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<any>(null);


  const getPanles = async () => {
    try {
      const result = await postData< {items : any[]}> (
        "collections/heropanels/query",
        { data: { filter: {} } }
      );

      const mapped:HeroPanel[] = result.items.map((panel: any) => ({
        _id: panel._id,
        title: panel.name,
        fullImageUrl: panel.image 
        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${encodeURI(panel.image.relativePath)}`
        : undefined,  
      }))
      
      setPanels(mapped);
    } catch(err) {
       console.error("Failed to fetch hero panels:",err)
    }
  }
  
  useEffect(() => {
      getPanles();
      setMounted(true);
    },[])

  if (!mounted) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {xs:"130px", md:"auto"},
        overflow: "hidden",
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        mb: 2,
        p: 0,
      }}
    >
      <Scrollbtn direction="left" onClick={() => carouselRef.current?.previous()}/>
      <Scrollbtn direction="right" onClick={() => carouselRef.current?.next()} />

      <Box sx={{ width: "100%",}}>
      <Carousel
        responsive={responsive} ref={carouselRef}
        autoPlay autoPlaySpeed={2000} infinite   arrows={false}   
        >
           {panels.map((panel, id) => (
                  <Box key={panel._id || id} sx={{ position: "relative", width: {xs:"100%" ,md:"70%"}, height: 300, mx:"auto", }}
                  >
                    {panel.fullImageUrl && (
                    <Image
                      src={panel.fullImageUrl}
                      alt={panel.title || `banner-${id}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                    )}
        
                </Box>
              ))}
      
      </Carousel>
      </Box>
       
</Box>

     
    
  );
}
