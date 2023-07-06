import React from 'react';
import Marginer from '../../components/marginer';
import { Box, Container, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Card } from '@mui/joy';
import { CssVarsProvider } from "@mui/joy/styles";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";



SwiperCore.use([Autoplay, Navigation, Pagination]);





export function InfoProduct() {
  const events_list1 = [
    {
      title: "COFFEE MACHINE,BUY FOR HOME",
      desc:  "Mauris rhoncus orci in imperdiet placerat. Vestibulum euismod nisl suscipit ligula volutpat, a feugiat urna maximus. Cras massa nibhtincidunt",
      author: "Abdurahmon Mufid",
      date: "2022/09/01",
      location: "Italy, Rome",
      img: "/restaurant/blog-post-1.jpeg",
    },
    {
      title: "Create a new story with us",
      desc: "Mauris rhoncus orci in imperdiet placerat. Vestibulum euismod nisl suscipit ligula volutpat, a feugiat urna maximus. Cras massa nibhtincidunt",
      author: "BellisimoUz",
      date: "2022/07/25",
      location: "Manchester, Tennessee",
      img: "/restaurant/blog-post-3.jpeg",
    },
    {
      title: "Build Mornig With Coffee",
      desc: "Donec et nibh maximus, congue est eu, mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus mmodo mattis. Aliquam erat volutpat.",
      author: "Chicken House",
      date: "2022/09/10",
      location: "Columbia, Gvatamala",
      img: "/restaurant/blog-post-2.jpg",
    },
    {
      title: "HOW WE PREPARE OUR BEANS",
      desc: "Donec et nibh maximus, congue est eu, mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus mmodo mattis. Aliquam erat volutpat.",
      author: "Food City",
      date: "2022/08/01",
      location: "The Arabian Peninsula, Arabian Peninsula",
      img: "/restaurant/coffee_statics.jpeg",
    },
  ];

  return (
    <div className="top_coffeeshop_frame">
    <Container>
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ mt: "45px" }}
      >
        <Box className="category_title_shop">
          Choose your best tasty
        </Box>
        <Box className={"prev_next_frame1"}>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-prev"}
            style={{ cursor: "pointer" }}
            alt="arrow"
          />
          <div className={"dot_frame_pagination swiper-pagination"}></div>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            style={{
              transform: "rotate(-180deg)",
              cursor: "pointer",
            }}
            alt="arrow"
          />
        </Box>
        <Swiper
          className={"swiper-wrapper"}
          slidesPerView={1}
          spaceBetween={30} // space between sliders
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true, //slider stops when touch it
          }}
        >
          {events_list1.map(( value, number) => {
            return (
              <SwiperSlide
                key={number}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
                className="card"
              >
                <CssVarsProvider>
                  <Card
                    className={"swiper-width"}
                    style={{ borderRadius: "10px 0px 0px 10px" }}

                  >
                    <CardCover style={{ borderRadius: "10px 0px 0px 10px" }}>
                      <img
                        style={{
                          borderRadius: "10px 0px 0px 10px",
                        }}
                        src={value.img}
                        loading="lazy"
                        alt="store"
                      />
                    </CardCover>
                    <CardCover
                      className="card_swiper"
                      sx={{
                        borderRadius: "10px 0px 0px 10px",
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px)",
                      }}
                    />
                    <CardContent className="card_style">
                      <Typography
                        fontSize="lg"
                        textColor="#fff"
                        mb={1}
                      >
                      </Typography>
                      <Typography></Typography>
                    </CardContent>
                  </Card>
                  <Card
                    className="card_desc"
                    style={{
                      width: "800px",
                      height: "400px",
                      background: "#13131A",
                      color: "#13131A",
                      borderRadius: "0px 10px 10px 0px",
                      cursor: "pointer",
                    }}

                  >
                    <h1 style={{ 
                      marginTop: "3px",
                    }}
                    >Our History</h1>
                    <p
                      className={"heading_title"}
                      style={{ marginTop: "10px" }}
                    >
                      {value.title}
                    </p>
                    <p
                      className={"text_desc"}
                      style={{ marginTop: "10px" }}
                    >
                      {value.desc}
                    </p>
                    <p
                      className={"text_desc"}
                      style={{ marginTop: "10px" }}
                    >
                      {value.desc}
                    </p>
                    <p style={{ padding: "0px", margin:"0px"}}>
                      Product of {value.location}
                    </p>
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
}