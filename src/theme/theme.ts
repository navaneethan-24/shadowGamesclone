// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#009AFF" },     
    secondary: { main: "#FFFFFF" },   
    text: {
      primary: "#FFFFFFCC",           
      disabled: "#fffc",             
      secondary: "#888888",    
     },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif`,
  },
});

export default theme;
