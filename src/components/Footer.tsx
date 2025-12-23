import { Box, Typography, Link, Rating } from "@mui/material";
import Image from "next/image";

interface FooterLink {
  name: string;
  href: string;
}

const aboutLinks: FooterLink[] = [
  { name: "About Us", href: "/info/about-us" },
  { name: "Contact Us", href: "#" },
  { name: "Cancellation Policy", href: "../info/return-policy" },
];

const policyLinks: FooterLink[] = [
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Return & Refund Policy", href: "../info/return-policy" },
];

const Footer: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#e7ebee",
          width: "100%",
          py: { xs: 5, md: 4 },
          px: { xs: 2, md: 4 },
          
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: {xs : 3 , sm : 4 , md: 4}  ,
            p:1,
           
            
            
          }}
        >
          {/* Logo + Contact */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:"center",
              alignSelf: 'center',
              gap: 2,
              width:"100%",
              flexGrow: 1,
              maxWidth: { md: 440, xs: 360   },
          
            }}
          >
            <Box
              sx={{
                width: "100%",                               
                display: "flex",
                justifyContent: "center", 
                alignItems: "center",
                position: "relative",
                aspectRatio: "500 / 150",
                mx: "auto",
              }}
            >
              <Image
                src="/images/sglogo.png"
                alt="ShadowGames Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            {/* Phone */}
            <Box display="flex" alignSelf="flex-start" gap={2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#009AFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 16.477v2.71a1.8 1.8 0 0 1-1.23 1.718c-.24.08-.492.11-.744.088a17.9 17.9 0 0 1-7.81-2.773 17.6 17.6 0 0 1-5.43-5.42 17.85 17.85 0 0 1-2.779-7.83A1.8 1.8 0 0 1 4.08 3.153c.23-.101.478-.154.73-.154h2.714a1.81 1.81 0 0 1 1.81 1.554c.115.867.328 1.718.634 2.538a1.8 1.8 0 0 1-.407 1.906l-1.15 1.147a14.47 14.47 0 0 0 5.43 5.42l1.15-1.148a1.81 1.81 0 0 1 1.91-.406c.82.305 1.674.518 2.543.632a1.81 1.81 0 0 1 1.556 1.834"
                />
              </svg>
              <Typography variant="body2" color="#C5BCC0">
                +91-9884129983, +91-9941217005
              </Typography>
            </Box>
            {/* Email */}
            <Box display="flex" alignSelf="flex-start" gap={2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="none"
                viewBox="0 0 23 23"
              >
                <path
                  fill="#009AFF"
                  d="M19.31 19.965H3.69a3.53 3.53 0 0 1-3.526-3.527V6.561A3.53 3.53 0 0 1 3.69 3.035h15.62a3.53 3.53 0 0 1 3.526 3.526v9.877a3.53 3.53 0 0 1-3.526 3.527M3.69 4.678a1.885 1.885 0 0 0-1.883 1.883v9.877a1.885 1.885 0 0 0 1.883 1.884h15.62a1.885 1.885 0 0 0 1.883-1.884V6.561a1.885 1.885 0 0 0-1.884-1.883z"
                />
                <path
                  fill="#009AFF"
                  d="M11.49 13.711a3.07 3.07 0 0 1-1.905-.64L.8 6.07a.822.822 0 1 1 1.025-1.285l8.782 7a1.53 1.53 0 0 0 1.774-.004l8.674-6.992a.821.821 0 1 1 1.03 1.278l-8.67 6.992c-.55.43-1.227.66-1.924.652"
                />
              </svg>
              <Link
                href="mailto:reply@shadowgames.in"
                color="#C5BCC0"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                reply@shadowgames.in
              </Link>
            </Box>
            {/* Location */}
            <Box display="flex" alignSelf="flex-start" gap={2}>
              <Box display="flex" gap={1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#009AFF"
                    d="M12 3a7.44 7.44 0 0 0-7.386 7.438c0 1.993.85 3.921 2.1 5.274l5.288 5.287 5.268-5.27c1.26-1.351 2.116-3.287 2.116-5.291A7.44 7.44 0 0 0 12 3m4.087 11.593-4.085 4.085-4.103-4.102c-1.03-1.127-1.643-2.671-1.643-4.139 0-3.168 2.576-5.765 5.744-5.795 3.168.03 5.744 2.628 5.745 5.796 0 1.477-.62 3.029-1.658 4.154"
                  />
                  <path
                    fill="#009AFF"
                    d="M12 7.05a3.338 3.338 0 1 0 0 6.675 3.338 3.338 0 0 0 0-6.676m0 5.032c-.935 0-1.696-.76-1.696-1.696S11.064 8.69 12 8.69s1.697.76 1.697 1.696-.761 1.696-1.697 1.696"
                  />
                </svg>
                <Typography
                  component="address"
                  variant="body2"
                  color="#C5BCC0"
                  style={{ fontStyle: "normal", lineHeight: 1.6 }}
                >
                  No.5, E-Depot Street,
                  <br />
                  Dr.Natesan Road, Triplicane,
                  <br />
                  Chennai-600005
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* About Links */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: { xs: 350, sm:600, md: 600 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, md: 2 },
                minWidth: 200,
                
              }}
            >
              <Typography variant="body1" gutterBottom fontWeight={600} >
                ABOUT
              </Typography>
              {aboutLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  color="#C5BCC0"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    transition: "color 0.3s ,transform 0.3s",
                    "&:hover": {
                      color: "#0380D4",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
            {/* policy */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, md: 2 },
                minWidth: 200,
                
              }}
            >
              <Typography variant="body1" fontWeight={600}  gutterBottom>
                POLICY
              </Typography>
              {policyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  color="#C5BCC0"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    transition: "color 0.6s ease ,transform 0.6s ease",
                    "&:hover": {
                      color: "#0380D4",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Social media */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 200,
              
            }}
          >
            <Box   >
              <Typography variant="body1" gutterBottom fontWeight={600}>SOCIAL MEDIA</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              {/* Facebook Icon */}
              <Link
                href="https://www.facebook.com/shdowgamers"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": { transform: "scale(1.2)" },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    stroke="#009AFF"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M10.269 7.61v2.868H7v3.542h3.269V22h3.868v-7.98h3.297l.394-3.54h-3.69V7.61c0-.508.416-.76.591-.916.31-.255 1.805-.295 1.805-.295H18V3.19A19 19 0 0 0 15.696 3c-5.54 0-5.427 4.61-5.427 4.61Z"
                  />
                </svg>
              </Link>
              {/* Instagram Icon */}
              <Link
                href="https://www.instagram.com/shadowgameshop/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": { transform: "scale(1.2)" },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#009AFF"
                    d="M15.563 4.313a4.125 4.125 0 0 1 4.124 4.125v7.124a4.125 4.125 0 0 1-4.125 4.126H8.439a4.125 4.125 0 0 1-4.126-4.125V8.436a4.125 4.125 0 0 1 4.126-4.124zm0-1.5H8.436a5.64 5.64 0 0 0-5.624 5.624v7.126a5.64 5.64 0 0 0 5.624 5.624h7.126a5.64 5.64 0 0 0 5.624-5.625V8.439a5.64 5.64 0 0 0-5.625-5.626"
                  />
                  <path
                    fill="#009AFF"
                    d="M16.901 6a1.074 1.074 0 1 0 0 2.149 1.074 1.074 0 0 0 0-2.149M12.05 8.713a3.315 3.315 0 1 1 .004 6.631 3.315 3.315 0 0 1-.003-6.63m0-1.5a4.815 4.815 0 1 0 .02 9.63 4.815 4.815 0 0 0-.02-9.63"
                  />
                </svg>
              </Link>

              {/* Youtube Icon */}
              <Link
                href="https://www.facebook.com/shdowgamers"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": { transform: "scale(1.2)" },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="18"
                  fill="none"
                  viewBox="0 0 26 18"
                >
                  <path
                    stroke="#009AFF"
                    strokeWidth="1.5"
                    d="M24.167 2.833c-.3-1.125-1.183-2-2.3-2.292C20.167 0 13 0 13 0S5.833 0 4.133.541c-1.117.292-2 1.167-2.3 2.292C1.333 4.667 1.333 9 1.333 9s0 4.333.5 6.167c.3 1.125 1.183 2 2.3 2.292C5.833 18 13 18 13 18s7.167 0 8.867-.541c1.117-.292 2-1.167 2.3-2.292.5-1.834.5-6.167.5-6.167s0-4.333-.5-6.167Z"
                  />
                  <path
                    stroke="#009AFF"
                    strokeWidth="1.5"
                    d="M10.5 12.167 16.333 9 10.5 5.833v6.334Z"
                  />
                </svg>
              </Link>
              {/* WhatsApp Icon */}
              <Link
                href="https://api.whatsapp.com/send/?phone=%2B919884129983&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": { transform: "scale(1.2)" },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="#009AFF"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.645 2.846A9.65 9.65 0 0 0 9.781 0C4.434 0 .08 4.352.08 9.701c0 1.71.446 3.38 1.296 4.851L0 19.58l5.143-1.35a9.7 9.7 0 0 0 4.635 1.182h.003c5.347 0 9.699-4.352 9.702-9.702a9.63 9.63 0 0 0-2.838-6.864m-6.86 14.927H9.78a8.04 8.04 0 0 1-4.104-1.125l-.295-.174-3.053.8.815-2.976-.192-.304a8.06 8.06 0 0 1-1.234-4.293c.003-4.446 3.62-8.062 8.069-8.062 2.155 0 4.178.841 5.701 2.364a8 8 0 0 1 2.359 5.704c0 4.45-3.62 8.066-8.063 8.066m4.422-6.04c-.242-.121-1.435-.709-1.657-.789s-.383-.12-.546.121c-.162.242-.626.789-.767.951s-.284.183-.526.062-1.024-.378-1.948-1.204c-.72-.644-1.208-1.438-1.35-1.68-.141-.242-.014-.375.107-.496.109-.11.242-.284.363-.426.12-.141.162-.242.242-.404s.041-.304-.02-.425c-.063-.121-.547-1.314-.748-1.801-.198-.472-.395-.407-.546-.416a12 12 0 0 0-.463-.01.9.9 0 0 0-.647.305c-.221.242-.847.83-.847 2.022 0 1.193.868 2.347.989 2.507.12.162 1.71 2.61 4.142 3.66.579.252 1.03.4 1.382.511.581.186 1.11.16 1.526.098.466-.071 1.435-.588 1.635-1.152.201-.566.201-1.05.142-1.151s-.221-.16-.463-.283"
                  />
                </svg>
              </Link>
              {/* X Icon */}
              <Link
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": { transform: "scale(1.2)" },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="19"
                  fill="#009AFF"
                  viewBox="0 0 24 19"
                >
                  <path
                    fill="#009AFF"
                    clipPath="url(#x_svg__a)"
                    d="M11.159 8.167 17.643.792h-1.536l-5.633 6.402L5.978.792H.792l6.8 9.683-6.8 7.733h1.536l5.945-6.763 4.749 6.763h5.186zM9.054 10.56l-.69-.965-5.482-7.67h2.36l4.425 6.192.688.965 5.751 8.048h-2.36z"
                  />
                  <defs>
                    <clipPath id="x_svg__a">
                      <path d="M0 0h19v19H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="https://www.google.com/maps/place/ShadowGames/reviews"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: 0.5, alignItems: "end", mr: 4 }}
                  >
                    {/* Rating Value */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "initial",
                      }}
                    >
                      4.9
                    </Typography>

                    {/* Stars */}
                    <Rating
                      name="read-only"
                      value={4.9}
                      precision={0.1}
                      readOnly
                      sx={{
                        color: "#feae00",
                        fontSize: "22px",
                      }}
                    />
                  </Box>
                  <Box>
                    {/* Google Reviews Text */}
                    <Typography sx={{ fontSize: "13px", color: "initial" }}>
                      3,494 Google reviews
                    </Typography>
                  </Box>
                </Box>
              </Link>

              <Box
                bgcolor={"white"}
                sx={{ px: 0.5, py: 0.5 }}
                borderRadius={1}
                boxShadow={1}
              >
                <Link
                  id="profileUrl"
                  href="https://www.trustpilot.com/review/shadowgames.in?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
                  target="_blank"
                  underline="none"
                >
                  {/* Review text */}
                  <Typography
                    sx={{ color: "#434343ff", fontSize: "12px" }}
                    component="span"
                    textAlign="center"
                  >
                    Review us
                  </Typography>
                  {/* Logo */}
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <svg
                      role="img"
                      aria-labelledby="trustpilotLogo-r2oimxzv7bo"
                      viewBox="0 0 31 31"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "14px", height: "14px" }}
                    >
                      <path
                        className="tp-logo__star"
                        fill="#00B67A"
                        d="M30.141707 11.07005H18.63164L15.076408.177071l-3.566342 10.892977L0 11.059002l9.321376 6.739063-3.566343 10.88193 9.321375-6.728016 9.310266 6.728016-3.555233-10.88193 9.310266-6.728016z"
                      />
                      <path
                        className="tp-logo__star-notch"
                        fill="#005128"
                        d="M21.631369 20.26169l-.799928-2.463625-5.755033 4.153914z"
                      />
                    </svg>

                    <Typography
                      sx={{ color: "#434343ff", fontSize: "10px" }}
                      component="span"
                    >
                      Trustpilot
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* copyright */}
      <Box
        sx={{ height: "2px", bgcolor: "#3F4245", width: "95%", mx: "auto" }}
      />
      <Box
        width="100%"
        py={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#191e24",
        }}
      >
        <Typography variant="body1" textAlign="center" fontSize="13px">
          Copyright © 2025. All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
