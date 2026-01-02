'use client';
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCategory from "@/components/HeroCategory";
import { Box } from "@mui/material";
import FloatingSocialIcons from "@/components/ui/FlotingSocialIcons";
import PageLoader from "@/components/ui/PageLoader";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/CartContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";


export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600'],
  display: 'swap',
  variable: '--font-poppins'
});



export default function RootLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const showheroCategory = pathname === "/" || pathname.startsWith("/products");

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ThemeProvider theme={theme}>
        <CartProvider>
        <Header />
        {showheroCategory && <HeroCategory />}
        <main> 
          <Box sx={{  
            minHeight: "100vh",
            mx:{ xs:1, md:2},   
            mb:2,   
            }}>
            {children}
           
          </Box>
        </main>
        <Footer />
        <FloatingSocialIcons/>
        </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
