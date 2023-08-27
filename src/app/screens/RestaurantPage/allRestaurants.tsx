import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { serverApi } from '../../../lib/config';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import MemberApiService from '../../apiServices/memberApiService';
import { useHistory } from 'react-router-dom';
import RestaurantApiService from '../../apiServices/restaurantApiService';
import { SearchObj } from '../../../types/others';
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
//REDUX
import { useDispatch, useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieveTargetRestaurants} from "../../screens/RestaurantPage/selector";
import { Restaurant } from '../../../types/user';
import {Dispatch} from "@reduxjs/toolkit";
import  { setTargetRestaurants } from "../../screens/RestaurantPage/slice";
import { verifiedMemberData } from '../../apiServices/verify';







/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) => 
    dispach(setTargetRestaurants(data)),

});

/** REDUX SELECTOR */
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants, 
  (targetRestaurants) => ({ 
    targetRestaurants, 
  })
);

export function AllRestaurants() {
  /** INTIALIZATIONS */
  const history = useHistory();
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
  const [targetSearchObject, setTargetSearchObject ] = useState<SearchObj>({
    page: 1,
    limit: 6,
    order: "mb_point",
  });
  const refs: any = useRef([]);


useEffect(() => {
  // TODO Retrieve targetRestaurantsData
  const restaurantService = new RestaurantApiService();
  restaurantService
    .getRestaurants(targetSearchObject)
    .then((data) => setTargetRestaurants(data))
    .catch((err) => console.log(err));
}, [targetSearchObject]); //update after data is changed

/**HANDLER */
const chosenRestaurantHandler = (id: string) => {
  history.push(`/restaurant/${id}`);
};
const [activeLink, setActiveLink] = useState("mb_point");

const searchHandler = (category: string) => {

  setActiveLink(category);
  targetSearchObject.page = 1;
  targetSearchObject.order = category;
  setTargetSearchObject({...targetSearchObject});
}

/** Enabling search */
const [query, setQuery] = useState("");

const filteredRestaurants = targetRestaurants.filter(
  (product) =>
  product.mb_nick.toLowerCase().includes(query.toLowerCase()) ||
  product.mb_phone.toLowerCase().includes(query.toLowerCase())
);

  /**  Enabling search */

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject }); // if value changes updates
  };

const targetLikeHandler = async (e: any, id: string ) => {
  try {
    assert.ok(verifiedMemberData, Definer.auth_err1);
    
    e.stopPropagation();

  

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
    e.stopPropagation()
    await sweetTopSmallSuccessAlert("success", 700, false);
  } catch (err: any) {
    console.log("targetLikeTop, ERROR:", err);
    sweetErrorHandling(err).then();
  }
};

  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <div className="title_shop">Welcome to Franchises</div>
          <Box className="fill_search_box">
            <Box className="fill_box" style={{ cursor: "pointer" }}>
              <a onClick={() => searchHandler("mb_likes")}>Trending</a>
              <a onClick={() => searchHandler("createdAt")}>New</a>
              <a onClick={() => searchHandler("mb_point")}>Best</a>
              <a onClick={() => searchHandler("mb_views")}>Famous</a>
            </Box>
            <Box className="search_big_box">
              <form className="search_form" action="" method="">
                <input
                  type="text"
                  className="searchInput"
                  name="reSearch"
                  placeholder="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                </Button>
              </form>
            </Box>
          </Box>

          <Stack className={"all_res_box"}>
            {filteredRestaurants.map((ele: Restaurant) => {
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
                    {ele.mb_address} Los Angeles
                  </span>
                  
                </div>
              </Box>
              <Box className="hover_box">
                <div onClick={(e) => targetLikeHandler(e, ele._id)}>
                  
                  <Favorite 
                    
                    style={{ 
                      fill: 
                        ele?.me_liked && ele?.me_liked[0]?.my_favorite 
                          ? "red"
                          : "white", 
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
          <Stack sx={{marginBottom: 5 }}className="bottom_box">
            <Pagination
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
              renderItem={(item) => (
                <PaginationItem
                  sx={{color: "white"}}
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={handlePaginationChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

