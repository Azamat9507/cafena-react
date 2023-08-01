import { Logout } from "@mui/icons-material";
import { Badge, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarHome(props: any) {
  return ( 
    <div className="format home_navbar">
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
              Cafe
              </NavLink>
            </Box>
            {verifiedMemberData ? (
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/orders" activeClassName="underline" >
                Order
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
                  borderRadius: 24 
                }}
                  onClick={props.handleLoginOpen}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px" }}
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
  )
}