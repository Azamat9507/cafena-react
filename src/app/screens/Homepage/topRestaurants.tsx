import { Box, Button, Container, Stack } from '@mui/material';
import React, { useRef } from 'react';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Favorite } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { serverApi } from '../../../lib/config';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import MemberApiService from '../../apiServices/memberApiService';
import { useHistory } from 'react-router-dom';
import useDeviceDetect from "../../../lib/responsive";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from 'swiper/react';
import { 
  CssVarsProvider,
  Typography, 
} from '@mui/joy';
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";


//REDUX
import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieveTopRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from '../../../types/user';
import { verifiedMemberData } from '../../apiServices/verify';
/** REDUX SELECTOR */
const topRestaurantRetriever = createSelector(
  retrieveTopRestaurants, 
  (topRestaurants) => ({ 
    topRestaurants, 
  })
);

SwiperCore.use([Autoplay, Navigation, Pagination]);

export function TopRestaurants() {
    /** INTIALIZATIONS */
  const history = useHistory();
  const {topRestaurants} = useSelector(topRestaurantRetriever);
  console.log("topRestaurants::", topRestaurants);

  const refs: any = useRef([]);

    /** HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`)
  }
  const targetLikeTop = async (e: any, id: string ) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({ 
          like_ref_id: id, 
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if(like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const { isMobile } = useDeviceDetect();
  const handleClickOpenAlert = () => {
    history.push("/construction");
  };

  if (isMobile()) {
    return (
      <div className="all_restaurant">
        <Container>
          <Stack
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ mt: "10px" }}
          >
            <Box className="category_title_shop">
              Popular coffee shops
            </Box>
            <Box className={"prev_next_frame1"}>
              <img
                src={"/icons/arrow-right.svg"}
                className={"swiper-button-prev"}
                style={{ cursor: "pointer", color: "white" }}
                alt="arrow"
              />
              <div className={"dot_frame_paginations swiper-pagination"}></div>
              <img
                src={"/icons/arrow-right.svg"}
                className={"swiper-button-next"}
                style={{
                  transform: "rotate(-180deg)",
                  cursor: "pointer",
                  color: "white",
                }}
                alt="arrow"
              />
            </Box>
            <Swiper
              className={"swiper-wrapper"}
              slidesPerView={1}
              spaceBetween={20} // space between sliders
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true, //slider stops when touch it
              }}
            >
              {topRestaurants.map((ele: Restaurant, index: number) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className="card"
                  >
                    <CssVarsProvider>
                      <Card
                        className={"allrestaurant_box"}
                        style={{ borderRadius: "10px" }}
                        onClick={handleClickOpenAlert}
                        ref={(ref) => (refs.current[index] = ref)}
                      >
                        <CardCover style={{ borderRadius: "10px" }}>
                          <img
                            style={{
                              borderRadius: "10px",
                            }}
                            src={image_path}
                            loading="lazy"
                            alt="store"
                          />
                        </CardCover>
                        <CardCover
                          className="allrestaurant_img"
                          sx={{
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px)",
                          }}
                        />
                        <CardContent className="allrestaurant_box">
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {ele.mb_nick}
                          </Typography>
                          <Typography></Typography>
                        </CardContent>
                      </Card>
                    </CssVarsProvider>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Container>
      </div>
    );

  } else {
    return (
      <div className="all_restaurant">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Box className="category_title_shop">
              Popular coffee shops
            </Box>
            <Stack className={"all_res_box"}>
              {topRestaurants && topRestaurants.map((ele: Restaurant) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <Box
                  onClick={() => chosenRestaurantHandler(ele._id)}
                  className={"allrestaurant_box"}
                >
                <Box
                  className={"allrestaurant_img"}
                  sx={{
                    backgroundImage: `url(${image_path})`,
                  }}
                >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={"like_view_btn"}
                  style={{ left: "36px" }}
                >
                  </Button>
                </Box>
                <Box className="cafe_info">
                  <div className='cafe_info_nick'>
                  <h2>
                    {ele.mb_nick} coffee 
                  </h2>
                  {/* <span>
                    {ele.mb_phone}
                  </span> */}
                  </div>
                  <div>
                    <span>
                    <LocationOnRoundedIcon />
                    {ele.mb_address} Los Angeles
                    </span>
                    
                  </div>
                </Box>

                <Box className="hover_box">
                  <div>
                    
                  <Favorite
                    onClick={(e) => {
                        e.stopPropagation(); // Add this line to stop event propagation
                        targetLikeTop(e, ele._id);
                    }}
                    style={{
                      fontSize: "25px",
                      fill:
                        ele?.me_liked && ele?.me_liked[0]?.my_favorite
                          ? "red"
                          : "#5a5a72",
                    }}
                  />

                    <span
                      ref={(element) => (refs.current[ele._id] = element)}
                    > 
                      {" "}
                      {ele.mb_likes}
                    </span>
                  </div>
                    <div>
                      <span>
                      {ele.mb_views}
                      </span>
                    <VisibilityIcon
                      sx={{ fontSize: 20, marginLeft: "5px" }}
                    />
                    </div>
                    </Box>
                </Box>
              );
              })}
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }
}