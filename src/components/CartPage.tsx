"use Client"

import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useCart } from "./CartContext";
import type { CartItem } from "@/types";
import { HeroBtn } from "./ui/buttons";





export default function CartPage() {
    const { cart: contextCart, updateQty, removeFromCart } = useCart();

    const subtotal = contextCart.reduce((sum, item) => sum + ((item.mrPrice || item.price) * item.qty), 0);
    const discount = contextCart.reduce((sum, item) => sum + (((item.mrPrice || item.price) - item.price) * item.qty), 0);
    const totalAmount = contextCart.reduce((sum, item) => sum + (item.price * item.qty), 0);



    return (
        <Box sx={{ width: "100%", py: 2, px: 2 }}>

            <Box sx={{
                display: "flex", flex: "row", gap: 1, mb: 4,
                mt: { xs: 6, md: 0 }
            }}>
                <Link
                    href={`/`}
                    style={{ textDecoration: "none" }}>
                    <Typography sx={{ color: "#009AFF", fontSize: "15px" }}>Home</Typography>
                </Link>

                <Typography sx={{ fontSize: "18px", color: "#FFFFFF" }}> / </Typography>
                <Typography sx={{ fontSize: "15px", color: "#B0C0CF", }}>
                    Cart
                </Typography>

            </Box>



            {contextCart.length === 0 ? (
                <Typography> NO ITEMS TO SHOW </Typography>
            ) : (


                <Box sx={{ mb: 4, }}>
                    <Box sx={{
                        borderBottom: "1px solid #0f2d49",
                        position: "relative",
                        width: { md: "20%", xs: "80%" },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            background: "linear-gradient(90deg, #009aff 10%, rgba(32,141,222, 0) 100%, transparent 100%)",
                            height: "2px",
                        },

                    }}>
                        <Box
                            sx={{
                                display: "inline-block",
                                px: 4,
                                py: 2,
                                borderRadius: "20px 20px 0 0",
                                bgcolor: "#0f2d49",
                            }}
                        >
                            <Typography sx={{ color: "#009AFF" }}>Buy</Typography>
                        </Box>


                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row" }, gap: 5 }}>
                        {/* purchase card */}
                        <Box sx={{ width: { xs: "100%", md: "70%" }, mt: 2 }}>

                            {contextCart.map((item: CartItem) => (
                                <Box
                                    key={item._id}
                                    sx={{
                                        display: "flex",
                                        gap: 3,
                                        mb: 2,
                                        width: "100%",
                                        p: 2,
                                        borderRadius: { xs: 0, md: 4 },
                                        justifyContent: "space-between", alignItems: "center",
                                        background: { md: "rgba(167, 162, 162, 0.05)" },
                                        backdropFilter: "blur(10px)",
                                        WebkitBackdropFilter: "blur(10px)",
                                        borderBottom: " 0.5px solid #4f4e50ff",
                                    }}
                                >
                                    <Box sx={{
                                        display: "flex", flexDirection: "column", width: "100%",
                                    }}>
                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between", gap: 3,

                                            alignItems: "center",
                                        }}>
                                            {/* Image */}
                                            <Box sx={{
                                                width: 80, height: 80, position: "relative",

                                            }}>
                                                <img src={item.image} alt={item.title}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />

                                            </Box>
                                            {/* pro Info */}
                                            <Box sx={{ width: "100%", ml: 0, }}>
                                                <Typography sx={{ color: "EDEDED", fontSize: { xs: "12px", md: "15px" }, alignContent: "start", mb: 1 }}>{item.title}</Typography>
                                                <Box>
                                                    <Box sx={{ display: "flex",  gap: 1 }} >
                                                        { item.optionSet1 && (
                                                        <Box sx={{ display: { xs: "none", md: "inline-block" }, borderRadius: "15px", border: "1px solid #2a3441", mb: 2 }}>
                                                            <Typography sx={{ fontSize: "12px", color: "#89868d", px: 1, }}>
                                                             
                                                                    {item.optionSet1.charAt(0).toUpperCase() +
                                                                    item.optionSet1?.slice(1).toLowerCase()}
                                                                
                                                            </Typography >
                                                        </Box>
                                                        )}
                                                        {item.optionSet2 && (
                                                            
        
                                                        <Box sx={{ display: { xs: "none", md: "inline-block" }, borderRadius: "15px", border: "1px solid #2a3441", mb: 2 }}>
                                                            <Typography sx={{ fontSize: "12px", color: "#89868d", px: 1, }}>
                                                                {
                                                                   item.optionSet2.charAt(0).toUpperCase() +
                                                                    item.optionSet2?.slice(1).toLowerCase()
                                                                
                                                                }
                                                            </Typography >
                                                        </Box>
                                                        )}  
                                                    </Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                        <Typography sx={{
                                                            color: "#89868d", fontSize: "13px", display: {
                                                                xs: "none", md: "block",
                                                                order: 0
                                                            }
                                                        }}> Unit Price:

                                                        </Typography>
                                                        <Typography component="span" sx={{
                                                            color: "#FFFFF",
                                                            fontSize: "13px",
                                                            order: { xs: 1, md: 0 }
                                                        }}>₹{item.price}
                                                        </Typography>

                                                        <Typography sx={{
                                                            color: "#89868d",
                                                            fontSize: "13px",
                                                            display: { xs: "none", md: "block" }
                                                        }}> MRP:
                                                        </Typography>
                                                        <Typography component="span" sx={{
                                                            color: "#89868d",
                                                            textDecoration: "line-through",
                                                            fontSize: "11px",
                                                            order: 0,
                                                        }}>₹{item.mrPrice}
                                                        </Typography>
                                                        <Typography sx={{
                                                            color: "#009AFF",
                                                            fontSize: { xs: "13px", md: "14px" }, fontWeight: "800",
                                                            order: 2
                                                        }}>
                                                            {item.mrPrice ? Math.round(((item.mrPrice - item.price) / item.mrPrice) * 100) : 0}% OFF
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                            </Box>

                                            {/* QTY */}
                                            <Box sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center", alignItems: "center", p: 0, }}>

                                                <Typography sx={{ display: "flex", alignItems: "center", gap: 4 }}>

                                                    <Box component="span" sx={{ cursor: item.qty <= 1 ? "not-allowed" : "pointer", fontSize: "24px" }}
                                                        onClick={() => {
                                                            if (item.qty === 1) {
                                                                removeFromCart(item)
                                                            } else {
                                                                updateQty(item, item.qty - 1)
                                                            }
                                                        }}

                                                    >−</Box>

                                                    <Box component="span" sx={{ fontSize: "17px", color: "#FFFFF" }}>{item.qty} </Box>

                                                    <Box component="span" sx={{ cursor: "pointer", fontSize: "24px" }}
                                                        onClick={() => updateQty(item, item.qty + 1)}
                                                    >+</Box>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {/* mbvw */}
                                        <Box sx={{ display: { xs: "flex", md: "none" }, mt: 2 }}>
                                            <Box sx={{ display: "inline-block", px: 1, py: 0.2, borderRadius: 2, border: "1px solid #2a3441", }}>
                                                <Typography sx={{ fontSize: "12px", color: "#89868d", borderRadius: "20px", p: 0 }}>
                                                    {item.optionSet1
                                                        ? item.optionSet1.charAt(0).toUpperCase() +
                                                        item.optionSet1?.slice(1).toLowerCase()
                                                        : ""
                                                    }</Typography >

                                            </Box>

                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, }}>
                                            <Box sx={{ display: { md: "none", xs: "flex" }, justifyContent: "center", alignItems: "center", gap: 2, p: 0, }}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        cursor: item.qty <= 1 ? "not-allowed" : "pointer",
                                                        width: 38,
                                                        height: 38,
                                                        borderRadius: "999px",
                                                        background: item.qty === 1
                                                            ? "#89868d"
                                                            : "radial-gradient(circle at top left, #862c47ff 5%, #07568e 90%)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: item.qty === 1 ? "#89868da4" : "#FFFFFF",
                                                        userSelect: "none",
                                                    }}
                                                    onClick={() => {
                                                        if (item.qty === 1) {
                                                            removeFromCart(item);
                                                        } else {
                                                            updateQty(item, item.qty - 1);
                                                        }
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: 16, lineHeight: 1 }}>−</Typography>
                                                </Box>


                                                <Box component="span" sx={{ fontSize: "17px", color: "#FFFFF" }}>{item.qty} </Box>

                                                <Box component="span" sx={{
                                                    width: 38,
                                                    height: 38,
                                                    borderRadius: "999px",
                                                    background: "radial-gradient(circle at top left, #862c47ff 5%, #07568e 90%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#fff",
                                                    userSelect: "none",
                                                    cursor: "pointer",
                                                }}
                                                    onClick={() => updateQty(item, item.qty + 1)}
                                                >
                                                    <Typography sx={{ fontSize: 16, lineHeight: 1 }}>+</Typography>
                                                </Box>

                                            </Box>
                                            <Box sx={{ display: { xs: "flex", md: "none" }, }}>
                                                <Typography sx={{
                                                    color: "#89868d", fontSize: "13px", mr: 1
                                                }}> Total:
                                                </Typography>
                                                <Typography component="span" sx={{
                                                    color: "#FFFFF",
                                                    fontSize: "13px",
                                                    order: { xs: 1, md: 0 }
                                                }}> ₹{item.price}
                                                </Typography>


                                            </Box>


                                        </Box>
                                    </Box>
                                </Box>


                            ))}

                        </Box>

                        {/* Bill card */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "column",
                            width: { xs: "100%", md: "30%", },
                            height:"auto",
                            alignSelf: "flex-start",
                            mt: 1,
                            p: 5,
                            borderRadius: 4,
                            background: "rgba(167, 162, 162, 0.05)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                        }}>
                            <Box sx={{ width: "100%", maxHeight:"280px", mb: 2,  }}>
                                <Typography sx={{ textAlign: "center" }}>Price Details</Typography></Box>
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", }}>
                                <Box>
                                    <Box sx={{ display: "flex", width: "100%", flexDirection: "row", mb: 2 }}>
                                        <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" } }}>Subtotal</Typography>
                                        <Typography sx={{ color: "#009aff" }}>{subtotal}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                        <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" } }}>Discount</Typography>
                                        <Typography sx={{ color: "#009aff" }}>{discount}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                        <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" }, textWrap: "nowrap" }}>Delivery Charges</Typography>
                                        <Typography sx={{ color: "#009aff" }}>Free</Typography>
                                    </Box>

                                    <Divider sx={{ borderColor: "#009aff", borderWidth: "2px", mb: 2 }} />

                                    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                        <Typography sx={{ flex: 1, textWrap: "nowrap" }}>Total Amount </Typography>
                                        <Typography sx={{ color: "#009aff" }}>{totalAmount} </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", }}>
                                    <HeroBtn text="CHECKOUT" borderRadius="12px"
                                        padding="10px" />

                                    <Link href={{
                                        pathname: `/products`,
                                        query: { c: "games" }
                                    }}><Typography sx={{ color: "#89868d", cursor: "pointer", mt: 2, textAlign: "center" }}> Continue Shopping</Typography></Link>

                                </Box>
                            </Box>


                        </Box>


                    </Box>

                </Box>
            )}

        </Box>


    );
}