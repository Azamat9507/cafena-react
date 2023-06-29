import { Box, Button, Container, Stack } from '@mui/material';
import React, { useRef } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { CssVarsProvider } from '@mui/joy/styles';
import { CardOverflow, IconButton, Link, AspectRatio } from '@mui/joy';
import { Favorite, Visibility} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { serverApi } from '../../../lib/config';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import MemberApiService from '../../apiServices/memberApiService';
import { useHistory } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
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
  const goRestaurantsHandler = () => history.push("/restaurant");
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


  return (
    <div className="popular_shop_frame">
      <Container>
        <Stack 
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title_shop">Popular Coffee Shops</Box>
          <Stack sx={{mt: "20px" }} flexDirection={"row"}>
            {topRestaurants.map((ele: Restaurant) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider key={ele._id}>
                  <Card 
                    className="popular_card"
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    variant="outlined"
                    sx={{ paddingBottom: "5px" }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={image_path} alt="popular" />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="warning"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "20%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,0.4)",
                        }}
                        onClick={(e) => { 
                          e.stopPropagation();
                        }}
                      >
                        <Favorite
                          onClick={(e) => targetLikeTop(e, ele._id)}
                          style={{ 
                            fill: 
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite 
                                ? "red"
                                : "white", 
                          }} 
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 1}}>
                      {ele.mb_nick} coffee
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.1, mb: 0.2}}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address} Los Angles
                      </Link>
                    </Typography>     
                    <Typography level="body2" sx={{ mt: 0.1,   }}>
                      <Link
                        href=""
                        startDecorator={<CallIcon />}
                        fontSize="15px"
                        textColor="neutral.700"
                      >
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        gap: 10,
                        py: 0.5,
                        px: "var-(--Card-padding)",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
                        
                      }}
                    >
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "#0b0e11",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {ele.mb_views}
                        <Visibility sx={{ fontSize: 23, marginLeft: "5px" }} />
                      </Typography>
                      
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "#5a5a72",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          width: "30px",
                          height: "auto",
                        }}
                      >
                        <div
                          ref={(element) => (refs.current[ele._id] = element)}
                          style={{ fontSize: "15px"}}
                        >
                          {ele.mb_likes}
                        </div>
                        <Favorite sx={{ fontSize: 23, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
              </CssVarsProvider>
              );
            })}
          </Stack>
          <Stack 
            flexDirection={"row"} 
            justifyContent={"flex-end"} 
            style={{width: "100%", marginTop: "16px"}}
          >
            <Button 
              style={{background: "#F8BE69", color: "#FFFFFF"}} 
              onClick={goRestaurantsHandler}
            >
              See all
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}