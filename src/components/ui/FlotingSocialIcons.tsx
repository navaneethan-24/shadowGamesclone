import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, IconButton } from "@mui/material";

export default function FloatingSocialIcons() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 40,
        right: 40,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 9999,
      }}
    >
      <IconButton
        component="a"
        href="https://wa.me/1234567890"
        target="_blank"
        sx={{
          backgroundColor: "#25D366",
          color: "#fff",
          width: 60,
          height: 60,
          "&:hover": { backgroundColor: "#1DA851" },
        }}
      >
        <WhatsAppIcon   sx={{ fontSize: 34 }}  />
      </IconButton>

      <IconButton
        component="a"
        href="https://t.me/username" 
        target="_blank"
        sx={{
          backgroundColor: "#0088cc",
          color: "#fff",
          width: 60,
          height: 60,
  
          "&:hover": { backgroundColor: "#0077b5" },
        }}
      >
        <PhoneOutlinedIcon sx={{ fontSize: 34 }}  />
      </IconButton>
    </Box>
  );
}
