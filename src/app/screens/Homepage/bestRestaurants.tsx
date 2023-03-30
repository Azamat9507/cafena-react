import React from 'react';
import { Favorite, Visibility } from '@mui/icons-material';
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from '@mui/joy';
import { Box, Button, Container, Stack } from '@mui/material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CallIcon from '@mui/icons-material/Call';
//REDUX
import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import {retrieveBestRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from '../../../types/user';
import { serverApi } from '../../../lib/config';

/** REDUX SELECTOR */
const bestRestaurantRetriever = createSelector(
  retrieveBestRestaurants, 
  (bestRestaurants) => ({ 
    bestRestaurants, 
  })
);


export function BestRestaurants() {
    /** INTIALIZATIONS */
  const {bestRestaurants} = useSelector(bestRestaurantRetriever);
  return (
    <div className="best_restaurant_frame">
      <img
        src={"icons/line_group.svg"}
        style={{ position: "absolute", left: "6%", transform: "rotate(90deg)" }}
      />
      <Container sx={{ paddingTop: "153px"}}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Zo'r restaranlar</Box>
          <Stack sx={{mt: "43px"}} flexDirection={"row"}>
            {bestRestaurants.map((ele: Restaurant) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return ( 
                <CssVarsProvider>
                  <Card
                    variant="outlined"
                    sx={{ minHeight: 483, minWidth: 320, mr: "35px" }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={image_path} alt="" />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,0.4)",
                        }}
                      >
                        <Favorite
                          /*@ts-ignore*/

                          style={{
                            color: "white", 
                          }} 
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2}}>
                      {ele.mb_nick} restaurant
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, mb: 2}}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address}
                      </Link>
                    </Typography>     
                    <Typography level="body2" sx={{ mt: 0.5, mb: 2}}>
                      <Link
                        href=""
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var-(--Card-padding)",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {ele.mb_views}
                        <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <div>{ele.mb_likes}</div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              )  
            })}
          </Stack>
          <Stack 
            flexDirection={"row"} 
            justifyContent={"flex-end"} 
            style={{width: "100%", marginTop: "16px"}}
          >
            <Button style={{background: "#1976d2", color: "#FFFFFF"}}>
              Barchasini Ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}