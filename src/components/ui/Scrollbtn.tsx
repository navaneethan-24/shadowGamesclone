"use client";
import { Box } from "@mui/material";
import Image from "next/image";

interface ScrollbtnProps {
  direction: "left" | "right";
  onClick: () => void;
  size?: number;
  top?: string | number;
}

export default function Scrollbtn({
  direction = "left",
  onClick,
  size = 70,
  top = "70%",
}: ScrollbtnProps) {
  const src = direction === "left" ? "/images/l-arrow.png" : "/images/r-arrow.png";

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: top,
        [direction]: -10 ,
        transform: "translateY(-100%)",
        zIndex: 10,
        cursor: "pointer",
       
      }}
    >
      <Image src={src} alt={`${direction}-arrow`} width={size} height={size} />
    </Box>
  );
}
