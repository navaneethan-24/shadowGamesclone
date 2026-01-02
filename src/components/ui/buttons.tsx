"use client";
import { Button } from "@mui/material";

interface HeroBtnProps {
  text: string;
  onClick?: () => void;
  borderRadius?: string;
  width?:string;
  padding?: string;
}

export function HeroBtn({
   text,
   onClick,
   borderRadius = "15px",
   padding = "4px 18px",
   width = "auto",
} : HeroBtnProps) {
  return (
    <Button
      onClick={onClick}
      className="font-500 text-13 text-white"
      sx={{
        fontFamily: "'Poppins', 'Open Sans', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 500,
        fontSize: "13px",
        width,
        lineHeight: "23px",
        color: "rgb(255,255,255)",
        borderRadius,
        background: "radial-gradient(circle at top left, #862c47ff 5%, #07568e 90%)",
        textTransform: "none",
        padding,
        "&:hover": { background: "#07568e" },
      }}  
    >
     {text}
    </Button>
  );
}

