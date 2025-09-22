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
  size = 60,
  top = "50%",
}: ScrollbtnProps) {
  const src = direction === "left" ? "/images/l-arrow.png" : "/images/r-arrow.png";

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: top,
        [direction]: 5,
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
       
      }}
    >
      <Image src={src} alt={`${direction}-arrow`} width={size} height={size} />
    </Box>
  );
}
