"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import Scrollbtn from "./ui/Scrollbtn";

const herobannerImg = ["/images/banner1.png", "/images/banner2.jpg"];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? herobannerImg.length - 1 : prev - 1
    );
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev + 1) % herobannerImg.length);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 250, sm: 300, md: 380 },
        overflow: "hidden",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        bgcolor:" ",
       

      }}
    >
      {/* Left button */}
      <Scrollbtn direction="left" onClick={scrollLeft} />

      {/* Right button */}
      <Scrollbtn direction="right" onClick={scrollRight} />

      {/* Slider container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 250, sm: 300, md: 380 },
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
      
            {/* Slider track */}
            <Box
              sx={{
                display: "flex",
                width: `${herobannerImg.length * 100}%`,
                height: "80%",
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.6s ease",
              
              }}
            >
              {herobannerImg.map((img, id) => (
                <Box
                  key={id}
                  sx={{
                    flex: "0 0 100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    src={img}
                    alt={`banner${id}`}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Box>
        </Box>
      </Box>
    
  );
}
