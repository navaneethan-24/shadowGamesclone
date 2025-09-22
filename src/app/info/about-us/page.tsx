
import {
  Box,
  Card,
  Typography,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";

const perRole1 = ["FOUNDER", "CONFIDENCE", "INNOVATOR", "INTELLIGENT"];
const perRole2 = [
  "SMART WORKER",
  "SELF CONFIDENCE",
  "PROBLEM SOLVER",
  "MANAGER",
];
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
  >
    <rect x="2" y="2" width="19" height="19" rx="9.5" fill="#009AFF" />
    <path
      d="M15.541 7L10.959 13.214L8.25 10.429L7 11.715L11.166 16L17 8.286L15.541 7Z"
      fill="white"
    />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: { xs: "95%", md: "80%" },
          mx: "auto",
          py: 5,
          gap: 6,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="h5"
            color="#0e8ce1"
            fontSize="18px"
            fontWeight="600"
            textAlign="center"
  >
            About Us
          </Typography>
          <Typography variant="body1" color="#bfbcc5" textAlign="justify">
            Shadow Games is a company incorporated under the Partnership Act,
            1932 with its registered office at No 5, E-Depot Lane, Dr.Nateasan
            Road, Triplicane, Chennai - 600005.Shadow Games website is the
            virtual supermarket for gaming. If you like shopping the traditional
            way, our stores offer you the same experience. Products offered
            online as well as in our stores, include, consoles like PS4, PS3,
            Xbox One, Nintendo Switch and Many More. We also offer the softwares
            for your consoles and accessories to make your gaming experience
            more realistic. You can also order Playstation Digital Cards & get
            voucher code immediately delivered on your e-mail.Every Shadow Gams
            store will offer you unique experience. Our gaming knowledgeable
            staff not only understand your needs, they also educate you on
            latest gaming trends. You can also avail of offers/deals which are
            exclusive to our stores. This experience ensures that our customers
            come back to satisfy their gaming needs.Shadow Games is the leading
            games and tech buy and sell specialist. You can buy, sell and
            exchange your games, Console for cash and Voucher.Shadow Games
            started working games specialist shop in 2017, Shadow Games has
            expanded over 5 years, in Chennai providing with a 1-month warranty
            for without bill products and 1 year warranty for billed products.At
            Shadow Games you can get cash fast for your games, consoles, with a
            Shadow Games voucher and upgrade your consoles.Upgrade your tech for
            less by trading your unwanted Games and Consoles in at Shadow Games,
            and grabbing yourself that consoles, Games etc. You can shop
            in-store, online orders
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography
            variant="h5"
            color="#d5ced2"
            textAlign="center"
            fontSize="16px"
            fontWeight="600"
          >
            Shop with confidence
          </Typography>
          <Typography variant="body1" color="#bfbcc5" textAlign="justify">
            Shadow Games offers a full 12-month warranty, both in-store and
            online. Changed your mind? You can shop with confidence at Shadow
            Games. Shop in-store and return your product within two days, in
            as-sold condition with a receipt and you can get the full current
            value of your product back in a Shadow Games voucher.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography
            variant="h5"
            fontSize="16px"
            fontWeight="600"
            color="#d5ced2"
            textAlign="center"
          >
            Games and Consoles
          </Typography>
          <Typography variant="body1" color="#bfbcc5" textAlign="justify">
            Get an instant quote and cash in your games and consoles or upgrade
            your games and consoles for less at Shadow Games. Selling your games
            and consoles to Shadow Games is simple, and we buy all major brands
            and generations including Sony PS5, Sony PS4, PS3, PS2, PS1, Xbox
            Original, Xbox 360, Xbox One, Xbox One X, Xbox Series S, Xbox Series
            X. Nintendo Switch, Switch Lite, Switch OLED, Steam Deck. To get an
            instant quote online for your games and consoles, Contact us 9884129983/ 8015911651 / 9941217005.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems:"stretch",
            gap: 2,
      
          }}
        >
          
            <Card
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: 6,
                p :5, 
         backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.2)",
        


              }}
            >
              <CardMedia
                component="img"
                alt="S.Gokula Kannan"
                sx={{ alignContent: "center" ,  }}
              />
              <CardContent sx={{ color: "#fff" }}>
                <Typography pb={2} variant="body1" fontWeight="600">
                  S. GOKULA KANNAN
                </Typography>

                <Typography  pb={2} variant="body1" fontSize="13px">
                  Provide best services to customer and customer will lift you
                  to <br /> heights.
                </Typography>

                <Typography  pb={2} variant="body1" color="#2c72ab">
                  Strength
                </Typography>

                <Box
                  sx={{
                    display: "flex", flexWrap: {xs : "wrap", md :"nowrap"},
                    justifyContent:"center", alignItems:"center", gap: 2
                  }}
                
                >
                  {perRole1.map((role, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <CheckIcon />
                      <Typography variant="body2" fontSize="12px">
                        {role}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
            <Card
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: 6,
                p :5, 
         backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.2)"


              }}
            >
              <CardMedia
                component="img"
                alt="
A. AJMAL BASHA"
                sx={{ alignContent: "center" ,  }}
              />
              <CardContent sx={{ color: "#fff" }}>
                <Typography pb={2} variant="body1" fontWeight="600">
                  
A. AJMAL BASHA
                </Typography>

               

                <Typography  pb={2} variant="body1" color="#2c72ab">
                  Strength
                </Typography>

                <Box
                  sx={{
                    display: "flex", flexWrap: {xs : "wrap", md :"nowrap"},
                    justifyContent:"center", alignItems:"center", gap: 2
                  }}
                
                >
                  {perRole2.map((role, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <CheckIcon />
                      <Typography variant="body2" fontSize="12px">
                        {role}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
        
          
  
        </Box>
      </Box>
    </>
  );
}
