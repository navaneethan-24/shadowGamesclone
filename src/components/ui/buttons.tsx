"use client";
import { Button } from "@mui/material";

interface HeroBtnProps {
  text: string;
  onClick?: () => void;
}

export function HeroBtn({ text,onClick} : HeroBtnProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontSize: "14px",
        fontWeight: 800,
        color: "#e7ebee",
        borderRadius: "50px",
        background: "radial-gradient(circle at top left, #862c47ff 5%, #07568e 70%)",
        textTransform: "none",
        padding: "4px 18px",
        "&:hover": { background: "#07568e" },
      }}
    >
     {text}
    </Button>
  );
}

