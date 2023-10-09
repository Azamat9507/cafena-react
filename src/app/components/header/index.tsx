import { Logout } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { Badge, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useDeviceDetect from "../../../lib/responsive";
import Typed from 'typed.js';
import { motion } from "framer-motion";

export function NavbarHome(props: any) {
  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const handleClick = () => {
    const element = document.getElementById("video");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
   const handleClickHome = () => {
     const element = document.getElementById("home");
     if (element) {
       element.scrollIntoView({ behavior: "smooth" });
     }
   };


     // Create ref element
const textRef = useRef<HTMLSpanElement>(null);

useEffect(() => {
  if (textRef.current) {  // Make sure the ref is attached to an element
    const options = {
      strings: ["Welcome to Cafena"],
      startDelay: 300,
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 150,
      smartBackspace: true,
      showCursor: false,
      loop: true,
    };

    const typed = new Typed(textRef.current, options);
    textRef.current.classList.add("color");

    return () => {
      typed.destroy();
    };
  }
}, []);

   const styles = `
  .color {
    color: #fff;
  }
  
  .scroll-button {
    position: fixed;
    bottom: 80px;
    left: 20px;
    z-index: 999;
    background-color: transparent;
    backdrop-filter: blur(20px);
    border: 2px solid #C7A17A;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 20px;
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .scroll-button:hover {
 background-color: #C7A17A;
    color: #C7A17A;
  }
`;
  
   useEffect(() => {
     const handleScroll = () => {
       const scrollTop =
         window.scrollY || document.documentElement.scrollTop;
       const navbar = document.getElementById("navbar");

       if (scrollTop > lastScrollTop) {
         navbar!.style.top = "-100px";
       } else {
         navbar!.style.top = "0";
       }

       lastScrollTop = scrollTop;
     };

     let lastScrollTop = 0;
     window.addEventListener("scroll", handleScroll);

     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

   const history = useHistory<History>();
     const { isMobile } = useDeviceDetect();
     const handlePushConstruction = () => {
       history.push("/construction");
       props.setPath();
     };
  if (isMobile()) {

    return (
      <div className="format home_navbar" id="home">
        <div className="navbar_block">
          <div className="navbar_config" id="navbar">
            <Box onClick={props.setPath}>
              <NavLink to="/">
                <img
                  style={{
                    cursor: "pointer",
                    // borderRadius: "24px",
                  }}
                  src="/icons/logo.png"
                  alt="logo"
                  className="logo"
                />
              </NavLink>
            </Box>
            {/* <Stack className="navbar_links">
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/restaurant"} activeClassName="underline">
                  Franchase
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/order" activeClassName="underline">
                  My Order
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Community
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            </Stack> */}
            <Stack className="navbar_icons">
              {!verifiedMemberData ? (
                <Box>
                  <Button
                    className="nav_button"
                    variant="contained"
                    style={{
                      color: isHovered1 ? "#282828" : "#f5f5f5",
                      opacity: isHovered1 ? 0.7 : 1,
                      backgroundColor: isHovered1 ? "#f5f5f5" : "transparent",
                    }}
                    onMouseEnter={handleMouseEnter1}
                    onMouseLeave={handleMouseLeave1}
                    onClick={handlePushConstruction}
                  >
                    Sign up
                  </Button>
                </Box>
              ) : null}

              {!verifiedMemberData ? (
                <Box>
                  <Button
                    variant="contained"
                    style={{
                      color: isHovered2 ? "#282828" : "#f5f5f5",
                      opacity: isHovered2 ? 0.7 : 1,
                      backgroundColor: isHovered2 ? "#f5f5f5" : "transparent",
                    }}
                    onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}
                    onClick={handlePushConstruction}
                  >
                    Log in
                  </Button>
                </Box>
              ) : (
                <img
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "24px",
                  }}
                  src={verifiedMemberData.mb_image}
                  alt=""
                  onClick={props.handleLogOutClick}
                />
              )}

              <Menu
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleCloseLogOut}
                onClick={handlePushConstruction}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "hidden",
                    backgroundColor: "#fff", 
                    mt: "15px",
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={props.handleLogOutRequest}
                  style={{
                    color: "#1f1f1f",
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "#222222" }} />
                  </ListItemIcon>
                  <span style={{ color: "#222222", fontWeight: "600" }}>
                    {" "}
                    Log out
                  </span>
                </MenuItem>
              </Menu>
            </Stack>
          </div>

          <Stack className="head_information" justifyContent={"row"}>
            <Stack justifyContent={"column"} style={{ marginTop: "200px" }}>
              <Box className="define_shop">
                <div className="crossed_under">
                  <style>{styles} </style> <span ref={textRef}></span>
                </div>
              </Box>
            </Stack>
          </Stack>
        </div>
        <style>{styles}</style>

        <div className="scroll-button">
         <Button style={{ color: "white" }} onClick={handleClickHome}>
            <ArrowUpwardIcon />
          </Button>
       </div>
      </div>
    );
  } else {
    return ( 
      <div className="format home_navbar" id="home">
        <div className="navbar_block">
          <Container>
            <Stack 
              flexDirection={"row"} 
              className="navbar_config"
              justifyContent={"space-between"}
                    
            >
              <Box>
                <img src='/icons/logo.png' alt=""/>
              </Box> 
              <Stack
                flexDirection={"row"}
                justifyContent="space-evenly"
                alignItems={"center"}
                className="navbar_links"
              >
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/" activeClassName="underline" >
                    Home
                  </NavLink>
                </Box>
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/restaurant" activeClassName="underline" >
                  Franchise
                  </NavLink>
                </Box>
                {verifiedMemberData ? (
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/orders" activeClassName="underline" >
                    My Order
                  </NavLink>
                </Box>
                ) : null}
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/community" activeClassName="underline" >
                    Community
                  </NavLink>
                </Box>
                {verifiedMemberData ? (
                  <Box className="hover-line" onClick={props.setPath}>
                    <NavLink to="/member-page" activeClassName="underline" >
                      My Page
                    </NavLink>
                  </Box>
                ) : null}
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/help" activeClassName="underline" >
                    Help
                  </NavLink>
                </Box>
                {/* Basketdan chaqirib olindi */}
                <Basket 
                  cartItems={props.cartItems} 
                  onAdd={props.onAdd} 
                  onRemove={props.onRemove}
                  onDelete={props.onDelete}
                  onDeleteAll={props.onDeleteAll}
                  setOrderRebuild={props.setOrderRebuild}
                />
                <Box>
                    {!verifiedMemberData ? (
                      <Button
                        sx={{border: 1, borderRadius: 24, borderColor: "#C7A17A"}} 
                        variant="contained" 
                        style={{width: "100px", 
                        height: "48px", 
                        backgroundColor: "transparent", 
                        color: "#FFFFFF",  
                        }}
                        onClick={props.handleSignUpOpen}
                      >
                        SIGN UP
                      </Button>
                    ) : null}
                </Box>
                {!verifiedMemberData ? (  
                  <Box>
                    <Button 
                      variant="contained" 
                      style={{ color: "#FFFFFF",
                      width: "100px", 
                      background: "#C7A17A",
                      height: "48px",
                      borderRadius: "24px",
                    }}
                      onClick={props.handleLoginOpen}
                    >
                      Login
                    </Button>
                  </Box>
                ) : (
                  <img
                    style={{ 
                      borderRadius: "50%", 
                      width: "70px", 
                      height: "70px",
                      objectFit: "cover",
                      background: "no-repeat",
                      border: "2px #f9b909 solid"

                    }}
                    src={verifiedMemberData.mb_image}
                    onClick={props.handleLogOutClick} 
                    alt={""}
                  />
                )}
                <Menu
                  anchorEl={props.anchorEl}
                  open ={props.open}
                  onClose={props.handleCloseLogOut}
                  onClick={props.handleCloseLogOut}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={props.handleLogOutRequest}>
                    <ListItemIcon>
                      <Logout fontSize="small" style={{ color: "blue" }} />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Stack>
            </Stack>
            <Stack className="head_information">
                <Stack justifyContent={"column"} style={{ marginTop: "86px", marginLeft: "24px"}}>
                  <Box className="title_info">
                    We have got your morning covered with
                  </Box>
                  <Box className="define_restaurant">
                    <img src='/icons/coffee-title.svg' alt=""/>
                  </Box>
                  <Box className="timeline_service">
                  It is best to start your day with a cup of coffee. Discover the
                  best flavours coffee you will ever have. We provide the best
                  for our customers. 
                  </Box>
                </Stack>
                <Stack>
                  <Box className="big_img"></Box>
                </Stack>
            </Stack>
          </Container>
        </div>
        <div className="framer-motion-wrapper">
          <div onClick={handleClick} className="framer-motion-container">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="framer-motion-element"
            />
          </div>
        </div>
        <style>{styles}</style>

        <div className="scroll-button">
          <Button style={{ color: "white" }} onClick={handleClickHome}>
            <ArrowUpwardIcon />
          </Button>
        </div>
      </div>
    )
  }
}