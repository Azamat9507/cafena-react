import { Logout } from "@mui/icons-material";
import { Badge, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";
import useDeviceDetect from "../../../lib/responsive";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export function NavbarOthers(props: any) {

  const handleClickOther = () => {
    const element = document.getElementById("other");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
 
 const styles = `
 .color {
   color: #fff;
 }
 
 .scroll_btn {
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
 }
 
 .scroll-button:hover {
background-color: #C7A17A;
   color: #C7A17A; 
 }
`;


useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const navbar = document.getElementById("navbar");

    if (scrollTop > lastScrollTop) {
      navbar!.style.top = "-80px";
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
const handlePushConstruction = () => {
 history.push("/construction");
 props.setPath();
};
  return (
    <div className="format_others home_navbar" id="other">
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
                  borderRadius: "24px" 
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
        <style>{styles}</style>
        <div className="scroll_btn">
        <Button style={{ color: "white" }} onClick={handleClickOther}>
          <ArrowUpwardIcon />
        </Button>
      </div>
      </Container>
    </div>
  ); 
}