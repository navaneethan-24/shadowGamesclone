"use client";
import { Box, Button, Card, circularProgressClasses, Divider, Drawer, TextField, Typography } from "@mui/material";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import { HeroBtn } from "./ui/buttons";
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


type Address = {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
};
const dummyAddress: Address = {
    line1: "Flat 302, Sri Sai Residency",
    line2: "5th Cross, BTM 2nd Stage",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560076",
    landmark: "Near Apollo Pharmacy",
};


export default function OrderConfirmation() {
    const router = useRouter();
    const { cart, order, updateQty, removeFromCart } = useCart();
    const [contact, setContact] = useState("");
    const [active, setActive] = useState(false);
    const [address, setAddress] = useState<Address | null>(null);
    const [tempAddress, setTempAddress] = useState<Address>({
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
    });

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cod" | null>(null);
    const isCod = paymentMethod === "cod";
    const [OrderConfirmation, setOrderConfirmation] = useState(false);

    const items = order?.items?.length ? order.items : cart;

    const subtotal = items.reduce(
        (s, i) => s + ((i.mrPrice || i.price) * i.qty),
        0
    );

    const discount = items.reduce(
        (s, i) => s + (((i.mrPrice || i.price) - i.price) * i.qty),
        0
    );

    const totalAmount = items.reduce(
        (s, i) => s + (i.price * i.qty),
        0
    );

    const codCharge = paymentMethod === "cod"
        ? Math.round(totalAmount * 0.1)
        : 0;

    const payableAmount = totalAmount + codCharge;

    const handleSave = () => {
        setAddress(tempAddress);
        setDrawerOpen(false)
    }

    const toogleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }
    const handleOpenDrawer = () => {
        setTempAddress(dummyAddress);
        setDrawerOpen(true);
    };

    useEffect(() => {
        if (!items.length) router.push("/cart");
    }, [items]);



    return (
        <Box sx={{ width: "100%", pt: { xs: 10, md: 3 }, px: 2 }}>
            <Box sx={{ mb: 4, }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row" }, gap: 5 }}>
                    {/* Order-Details */}
                    <Box sx={{ width: { xs: "100%", md: "70%" }, }}>
                        {/* Contact */}
                        <Box sx={{ mb: 5 }} >
                            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                                <Typography color="secondary" sx={{ fontSize: "18px", fontWeight: "400", }} >
                                    Contact Number
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex", gap: 3, mb: 2, width: "100%", px: 4, py: 1,
                                borderRadius: 4, justifyContent: "space-between", alignItems: "center",
                                background: "rgba(167, 162, 162, 0.05)", backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                            }}>
                                <Box component="form" onSubmit={(e) => e.preventDefault()}>
                                    <TextField value={contact} variant="outlined" disabled={!active}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                "& fieldset": {
                                                    border: active ? "2px solid" : "none",          // show border only if active
                                                    borderColor: active ? "primary.main" : "none",


                                                },
                                                "&:hover fieldset": {
                                                    border: active ? "2px solid" : "none",
                                                    borderColor: active ? "primary.main" : "none",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    border: active ? "2px solid" : "none",          // thicker border on fo
                                                    borderColor: active ? "primary.main" : "none",
                                                },
                                            },
                                        }}

                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            if (value.length <= 10) setContact(value);
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment:
                                                    <InputAdornment position="start" >
                                                        <Typography color="secondary">+91</Typography>
                                                    </InputAdornment>,
                                            }
                                        }}
                                    />

                                </Box>
                                <Box >
                                    <Button sx={{

                                        bgcolor: "rgba(0, 154, 255, 0.1)", color: 'primary',
                                        px: 2, py: 1, borderRadius: 2,
                                    }}
                                        variant="contained"
                                        onClick={(e) => setActive(prev => !prev)}>
                                        <Typography color="primary" sx={{ fontSize: "13px", fontWeight: "500", px: 1, }}>{active ? "SAVE" : "CHANGE"}</Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        {/* Address */}
                        <Box sx={{ mb: 2, bgcolor: '' }}>
                            <Typography sx={{ fontSize: "18px", fontWeight: "400", mb: 2 }}  > Delivery Address</Typography>
                            <Box sx={{
                                display: "flex", gap: 3, mb: 2, width: "100%", px: 4, py: 1,
                                borderRadius: { xs: 0, md: 4 }, justifyContent: "space-between", alignItems: "center",
                                background: { md: "rgba(167, 162, 162, 0.05)" }, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                            }}>
                                {address ? (
                                    <Box sx={{
                                        display: "flex", gap: 2, justifyContent: "center", alignItems: "self-start",
                                        background: "rgba(255, 255, 255, 0.03)",
                                        backdropFilter: "blur(5px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        borderRadius: "8px",
                                        p: 2


                                    }}>
                                        <Box>
                                            <CheckCircleIcon sx={{ fontSize: 13, color: "primary.main" }} />
                                        </Box>
                                        <Box>
                                            <Typography fontSize="14px">
                                                {address.line1}, {address.line2}
                                            </Typography>
                                            <Typography fontSize="14px">
                                                {address.city},
                                            </Typography>
                                            <Typography fontSize="14px">
                                                {address.state} - {address.pincode},
                                            </Typography>
                                            <Typography fontSize="13px" color="secondary">
                                                Landmark: {address.landmark}
                                            </Typography>
                                        </Box>

                                        <Button size="small" onClick={() => handleOpenDrawer()}>
                                            <EditLocationAltOutlinedIcon sx={{ fontSize: 18, color: "secondary.main" }} />
                                        </Button>
                                    </Box>
                                ) : null}

                            </Box>
                            <Box>
                                <Button variant="contained" onClick={() => handleOpenDrawer()}
                                    sx={{
                                        display: address ? "none" : "block",
                                        bgcolor: "rgba(0, 154, 255, 0.1)",
                                        color: 'primary', px: 2, py: 1, borderRadius: 2
                                    }}
                                >
                                    <Typography color="primary" sx={{ fontSize: "13px", fontWeight: "500", px: 1, }}>
                                        + ADD NEW ADDRESS
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                        {/* Payment mode*/}
                        <Box sx={{ mb: 2, }} >
                            <Typography color="secondary" sx={{ fontSize: "18px", fontWeight: "400", mb: 1 }} >
                                Payment mode
                            </Typography>
                            <Box sx={{ display: "flex", gap: 3, mb: 2, }}>
                                <Box sx={{
                                    display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: { xs: "flex-start", md: "space-between" }, alignItems: "flex-start",
                                    gap: 2, mb: 2, width: "100%", px: 4, py: 3,
                                    borderRadius: 4,
                                    background: "rgba(167, 162, 162, 0.05)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                                }}>
                                    <Button disableRipple disableFocusRipple
                                        sx={{
                                            color: "secondary.main", fontSize: "15px", width: "50%",
                                            display: "flex", justifyContent: "flex-start", alignItems: "center",
                                            backgroundColor: "transparent",
                                            "&:hover, &:active, &:focus": { backgroundColor: "transparent" },

                                        }} onClick={() => setPaymentMethod("online")}>
                                        <Box sx={{ width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <CheckCircleIcon
                                                sx={{
                                                    fontSize: 16,
                                                    color: "primary.main",
                                                    visibility: paymentMethod === "online" ? "visible" : "hidden",
                                                }}
                                            />
                                        </Box>
                                        <Typography sx={{ fontSize: "15px", textTransform: "none", textWrap: "nowrap", ml: 2 }}> Razorpay (upi/cards/netbanking) </Typography>
                                    </Button>

                                    <Button disableRipple disableFocusRipple
                                        sx={{
                                            color: "secondary.main", fontSize: "15px", width: "50%",
                                            display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 0,
                                            backgroundColor: "transparent",
                                            "&:hover, &:active, &:focus": { backgroundColor: "transparent" },
                                        }} onClick={() => setPaymentMethod("cod")}>
                                        <Box sx={{ width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <CheckCircleIcon
                                                sx={{
                                                    fontSize: 16,
                                                    color: "primary.main",
                                                    visibility: paymentMethod === "cod" ? "visible" : "hidden",
                                                }}
                                            />
                                        </Box>
                                        <Typography sx={{ fontSize: "15px", textTransform: "none", textWrap: "nowrap", ml: 2 }}>Cash on Delivery</Typography>
                                    </Button>


                                </Box>


                            </Box>

                        </Box>
                        {/* Order Summary */}
                        <Box sx={{ mb: 2 }}>
                            <Typography color="secondary" sx={{ fontSize: "18px", fontWeight: "400", mb: 2 }} >
                                Order Summary
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2, }}>
                                {items.map((item) => (
                                    <Box key={item.key}
                                        sx={{
                                            display: "flex", justifyContent: "space-between", alignItems: "center",
                                            width: "100%", gap: 3, mb: 2, p: 2, borderRadius: { xs: 0, md: 4 },
                                            background: { md: "rgba(167, 162, 162, 0.05)" },
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)",
                                            borderBottom: " 0.5px solid #4f4e50ff",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3, alignItems: "center", }}>
                                                {/* Image */}
                                                <Box sx={{ width: 80, height: 80, position: "relative", }}>
                                                    <img src={item.image} alt={item.title}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />

                                                </Box>
                                                {/* pro Info */}
                                                <Box sx={{ width: "100%", ml: 0, }}>
                                                    <Typography sx={{ color: "EDEDED", fontSize: { xs: "12px", md: "15px" }, alignContent: "start", mb: 1 }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Box>
                                                        <Box sx={{ display: "flex", gap: 1 }} >
                                                            {item.optionSet1 && (
                                                                <Box sx={{ display: { xs: "none", md: "inline-block" }, borderRadius: "15px", border: "1px solid #2a3441", mb: 2 }}>
                                                                    <Typography sx={{ fontSize: "12px", color: "#89868d", px: 1, }}>
                                                                        {
                                                                            item.optionSet1.charAt(0).toUpperCase() +
                                                                            item.optionSet1?.slice(1).toLowerCase()
                                                                        }
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
                                                                color: "#89868d", fontSize: "13px",
                                                                display: { xs: "none", md: "block", order: 0 }
                                                            }}>
                                                                Unit Price :

                                                            </Typography>
                                                            <Typography component="span" sx={{ color: "#FFFFF", fontSize: "13px", order: { xs: 1, md: 0 } }}>
                                                                ₹{item.price}
                                                            </Typography>

                                                            <Typography sx={{
                                                                color: "#89868d", fontSize: "13px",
                                                                display: { xs: "none", md: "block", order: 0 }
                                                            }}>
                                                                Quantity :
                                                            </Typography>

                                                            <Typography component="span" sx={{ color: "#FFFFF", fontSize: "13px", order: { xs: 1, md: 0 } }}>
                                                                {item.qty}
                                                            </Typography>


                                                            <Typography sx={{ color: "#89868d", fontSize: "13px", display: { xs: "none", md: "block" } }}>
                                                                MRP :{" "}
                                                            </Typography>
                                                            <Typography component="span" sx={{ color: "#89868d", textDecoration: "line-through red", fontSize: "13px", order: 0, }}>
                                                                ₹{item.mrPrice}
                                                            </Typography>

                                                        </Box>
                                                    </Box>
                                                </Box>

                                                {/* Delete */}
                                                <Box sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center", alignItems: "center", p: 0, }}>
                                                    <Typography sx={{
                                                        fontSize: "14px", color: "text.secondary", textDecoration: "underline",
                                                        "&: hover": { cursor: "pointer", color: " red" },
                                                    }}
                                                        onClick={() => removeFromCart(item)} >
                                                        Delete
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
                        </Box>
                    </Box>

                    {/* paymet Details */}
                    <Box sx={{
                        display: 'flex', flexDirection: "column", width: { xs: "100%", md: "30%", },
                        height: "auto", alignSelf: "flex-start",
                        mt: 1, p: 5, borderRadius: 4,
                        background: "rgba(167, 162, 162, 0.05)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}>
                        <Box sx={{ width: "100%", maxHeight: "280px", mb: 2, }}>
                            <Typography sx={{ textAlign: "center" }}>Price Details</Typography></Box>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", }}>
                            <Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: "row", mb: 2 }}>
                                    <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" } }}>Subtotal</Typography>
                                    <Typography sx={{ color: "#009aff" }}>{"\u20B9"} {subtotal}</Typography>
                                </Box>
                                {isCod &&
                                    <Box sx={{ display: "flex", width: "100%", flexDirection: "row", mb: 2 }}>
                                        <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" } }}>COD Charges</Typography>
                                        <Typography sx={{ color: "#009aff" }}>{"\u20B9"} {codCharge}</Typography>
                                    </Box>
                                }
                                <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                    <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" } }}>Discount</Typography>
                                    <Typography sx={{ color: "#009aff" }}>{"\u20B9"} {discount}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                    <Typography sx={{ flex: 1, fontSize: { md: "14px", xs: "12px" }, textWrap: "nowrap" }}>Delivery Charges</Typography>
                                    <Typography sx={{ color: "#009aff" }}>Free</Typography>
                                </Box>

                                <Divider sx={{ borderColor: "#009aff", borderWidth: "2px", mb: 2 }} />

                                <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                                    <Typography sx={{ flex: 1, textWrap: "nowrap" }}>Total Amount </Typography>
                                    <Typography sx={{ color: "#009aff" }}>{"\u20B9"} {payableAmount} </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", }}>
                                <HeroBtn text="PLACE ORDER" borderRadius="12px"
                                    padding="10px" />
                            </Box>
                        </Box>


                    </Box>
                </Box>
            </Box>
            {/* Address Drawer */}
            <Drawer open={drawerOpen} anchor="right" onClose={() => setDrawerOpen(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        background: `linear-gradient(120deg, rgba(54, 27, 27, 1), rgba(5, 47, 75, 1))`,
                    },
                }} >
                <Box sx={{ width: { xs: "300px", md: "450px" }, mt: { md: 10, xs: "150px" }, p: 2 }}>
                    <Box sx={{ bgcolor: "primary.main", p: 1, mb: 3 }}>
                        <Typography sx={{ fontWeight: "500", color: "secondary.main" }}> Address </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "400", mb: 1 }}>Address Line1</Typography>
                        <TextField
                            fullWidth
                            value={tempAddress.line1}
                            onChange={(e) => setTempAddress({ ...tempAddress, line1: e.target.value })}
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: "12px",

                                },
                                "& .MuiOutlinedInput-root": {
                                    height: 35, borderRadius: "8px",
                                    "& fieldset": { borderColor: "#fffc", },
                                    "&:hover fieldset": { borderColor: "primary.main", }
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "400", mb: 1 }}>Address Line2</Typography>
                        <TextField
                            fullWidth
                            value={tempAddress.line2}
                            onChange={(e) => setTempAddress({ ...tempAddress, line2: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 35, borderRadius: "8px",
                                    "& fieldset": { borderColor: "#fffc", },
                                    "&:hover fieldset": { borderColor: "primary.main", }
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "400", mb: 1 }}>City*</Typography>
                        <TextField
                            fullWidth
                            value={tempAddress.city}
                            onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 35, borderRadius: "8px",
                                    "& fieldset": { borderColor: "#fffc", },
                                    "&:hover fieldset": { borderColor: "primary.main", }
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "400", mb: 1 }}>State*</Typography>
                        <TextField
                            fullWidth
                            value={tempAddress.state}
                            onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 35, borderRadius: "8px",
                                    "& fieldset": { borderColor: "#fffc", },
                                    "&:hover fieldset": { borderColor: "primary.main", }
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "400", mb: 1 }}>Pincode</Typography>
                        <TextField
                            fullWidth
                            value={tempAddress.pincode}
                            onChange={(e) => setTempAddress({ ...tempAddress, pincode: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 35, borderRadius: "8px",
                                    "& fieldset": { borderColor: "#fffc", },
                                    "&:hover fieldset": { borderColor: "primary.main", }
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: "400", mb: 1 }}>Landmark </Typography>
                        <TextField
                            fullWidth
                            value={tempAddress.landmark}
                            onChange={(e) => setTempAddress({ ...tempAddress, landmark: e.target.value })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 35, borderRadius: "8px",
                                    "& fieldset": { borderColor: "#fffc", },
                                    "&:hover fieldset": { borderColor: "primary.main", }
                                },
                            }}
                        />
                    </Box>

                    <HeroBtn width="100%" borderRadius="8px" text="SAVE ADDRESS" onClick={handleSave} />

                </Box>


            </Drawer>
        </Box>




    )


}