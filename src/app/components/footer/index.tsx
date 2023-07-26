import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import EmailIcon from "@mui/icons-material/Email";
import useDeviceDetect from "../../../lib/responsive";
 const handleClickHome = () => {
   const element = document.getElementById("home");
   if (element) {
     element.scrollIntoView({ behavior: "smooth" });
   }
 };

  const handleClickOther = () => {
    const element = document.getElementById("other");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleClickShop = () => {
    const element = document.getElementById("shop");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
export function Footer() {
  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div className="footer_config">
        <Container className="footer_cont">
          <Stack flexDirection={"column"} className="main_footer_container">
            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              style={{ height: "242px" }}
            >
              <Stack className="info" flexDirection={"column"}>
                <Box>
                  <img src="/icons/logo1.svg" alt="logo"></img>
                </Box>
                <Box className="main_text">
                    Subscribe to our newsletters now and stay up to date with 
                    new collections and exclusive offers.
                </Box>
                <Stack className="contact_links">
                  <Box>
                    <a href="https://github.com/alekseykim-dev">
                      <img src="/icons/facebook1.svg" alt="facebook" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://www.linkedin.com/in/aleksey-kim-61a916195/">
                      <img src="/icons/twitter1.svg" alt="twitter" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://github.com/alekseykim-dev">
                      <img src="/icons/instagram1.svg" alt="instagram" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://www.linkedin.com/in/aleksey-kim-61a916195/">
                      <img src="/icons/youtube1.svg" alt="youtube" />
                    </a>
                  </Box>
                </Stack>
              </Stack>
           
            </Stack>
            <Box className="liner"></Box>
            <Box className="copyrights" sx={{ mt: "15px" }}>
              {" "}
              Copyrights Cafena 2023 - All rights
              reserved
            </Box>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="footer_config">
        <Container className="footer_cont">
          <Stack flexDirection={"column"} className="main_footer_container">
            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              style={{ height: "242px" }}
            >
              <Stack className="info" flexDirection={"column"}>
                <Box>
                  <img src="/icons/logo.png" alt="logo"></img>
                </Box>
                <Box className="main_text">
                  Subscribe to our newsletters now and stay up to date with 
                  new collections and exclusive offers.
                </Box>
                <Box className="main">
                  Follow us:
                </Box>
                <Stack className="contact_links">
                  <Box>
                    <a href="https://www.facebook.com/azamat.solijonov.94">
                      <img src="/icons/facebook_icon.svg" alt="facebook" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://www.linkedin.com/in/azamat-solijonov-b0b721232/">
                      <img src="/icons/linkedin.svg" alt="twitter" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://twitter.com/Azamat_sol95">
                      <img src="/icons/twitter.svg" alt="twitter" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://www.instagram.com/azamat_solijonov/">
                      <img src="/icons/insta.svg" alt="instagramm" />
                    </a>
                  </Box>
                  <Box>
                    <a href="https://www.youtube.com/">
                      <img src="/icons/youtube_1.svg" alt="youtube" />
                    </a>
                  </Box>
                </Stack>
              </Stack>
              <Stack className="parts">
                <Box className="part_subject">Cafena</Box>
                <Box className="divider"></Box>
                <Box className="targets target" sx={{ mt: "5px"}} >
                  <NavLink to="/" onClick={handleClickHome}>
                    Home
                  </NavLink>
                </Box>
                <Box className="targets">
                  <NavLink to="/restaurant" onClick={handleClickShop}>
                    Shop
                  </NavLink>
                </Box>
                <Box className="targets">
                  <NavLink to="/community" onClick={handleClickOther}>
                    Community
                  </NavLink>
                </Box>
                <Box className="targets">
                  <NavLink to="/help" onClick={handleClickOther}>
                    Help
                  </NavLink>
                </Box>
              </Stack>
              <Stack className="find_us">
                <Box className="find">Contacts</Box>
                <Box className="divider"></Box>
                <Stack className="details" sx={{ mt: "19px" }}>
                  <Box className="detail_first">
                    <LocationOnIcon />
                  </Box>
                  <Box className="detail_second">Seoul</Box>
                </Stack>
                <Stack className="details" sx={{ mt: "10px" }}>
                  <Box className="detail_first">
                    <PhoneCallbackIcon />{" "}
                  </Box>
                  <Box className="detail_second">+82 10 3912 9556</Box>
                </Stack>
                <Stack className="details" sx={{ mt: "9px" }}>
                  <Box className="detail_first">
                    <EmailIcon />
                  </Box>
                  <Box className="detail_second">www.Cafena@gmail.com</Box>
                </Stack>
              </Stack>
            </Stack>
            <Box className="liner"></Box>
            <Box className="copyrights" sx={{ mt: "10px" }}>
              {" "}
              Copyrights Cafena 2023 - All rights
              reserved
            </Box>
          </Stack>
        </Container>
      </div>
    );
  }
}
