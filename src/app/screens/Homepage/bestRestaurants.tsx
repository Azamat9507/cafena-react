import React, {useRef} from 'react';
import { Favorite } from '@mui/icons-material';
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Box, Button, Container, Stack } from '@mui/material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
//REDUX
import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieveBestRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from '../../../types/user';
import { serverApi } from '../../../lib/config';
import { Definer } from '../../../lib/Definer';
import assert from 'assert';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import MemberApiService from '../../apiServices/memberApiService';
import { useHistory } from 'react-router-dom';
import { verifiedMemberData } from '../../apiServices/verify';


/** REDUX SELECTOR */
const bestRestaurantRetriever = createSelector(
  retrieveBestRestaurants, 
  (bestRestaurants) => ({ 
    bestRestaurants, 
  })
);



export function BestRestaurants() {
  /** INTIALIZATIONS */
  const history = useHistory();
  const { bestRestaurants } = useSelector(bestRestaurantRetriever);
  const refs: any = useRef([]);

  /** HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`);
  };
  const goRestaurantsHandler = () => history.push("/restaurant");

  const targetLikeBest = async (e: any, id: string ) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({ 
          like_ref_id: id, 
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (refs.current && refs.current[like_result.like_ref_id]) {
        if (like_result.like_status > 0) {
            e.target.style.fill = "red";
            refs.current[like_result.like_ref_id].innerHTML++;
        } else {
            e.target.style.fill = "white";
            refs.current[like_result.like_ref_id].innerHTML--;
        }
    }
    
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeBest, ERROR:", err);
      sweetErrorHandling(err).then();

    }
  };




  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <div className="title_shop">Top seller</div>
          <Stack className={"all_res_box"}>
            {bestRestaurants && bestRestaurants.map((ele: Restaurant) => {
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
                      targetLikeBest(e, ele._id);
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
            <Stack
              flexDirection={"row"}
              justifyContent={"flex-end"}
              style={{ width: "100%", marginTop: "16px", marginRight: "40px" }}
            >
              <Button
                style={{ alignContent: "center",background: "#C7A17A", color: "#FFFFFF", width: "100px"}}
                onClick={goRestaurantsHandler}
              >
                veiw all
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
