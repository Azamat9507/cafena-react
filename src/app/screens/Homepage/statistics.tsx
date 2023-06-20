import { Container, Stack } from '@mui/material';
import React from 'react';
import { Box } from '@mui/material';



export function Statistics() {
  return (
    <div className="static_frame">
      <Container className="static_width">
        <Stack className="static_frame_static_frame">
          <Stack className="static_box" >
            <div className="static_img_left"></div>
            <div className="static_text">
              <Box className="static_num">Fast Delivery</Box>
              <Box className="static_text">When order over $15</Box>
            </div>
          </Stack>
          {/* <Stack className="static_box">
            <div className="static_img_middle1"></div>
            <div className="static_text">
              <Box className="static_num">100% Quality</Box>
              <Box className="static_text">Natural Premium coffee nuts</Box>
            </div>
          </Stack> */}
          <Stack className="static_box">
            <div className="static_img_middle"></div>
            <div className="static_text">
              <Box className="static_num">24/7 AI Support </Box>
              <Box className="static_text">Contact us whenever</Box>
            </div>
          </Stack>
          <Stack className="static_box">
            <div className="static_img_right"></div>
            <div className="static_text">
              <Box className="static_num1">100% Payment Secure</Box>
              <Box className="static_text">SSL Certificate</Box>
            </div>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
// import React from 'react';
// import Marginer from '../../components/marginer';
// import { Box, Container, Stack } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
// SwiperCore.use([Autoplay, Navigation, Pagination]);



// export function Statistics() {
//   const events_list1 = [
//     {
//       title: "Boyin Foodga marhamat",
//       desc: "Yangicha uslubda Yangicha Tam va Yangicha his",
//       author: "Abdurahmon Mufid",
//       date: "2022/09/01",
//       location: "Toshkent, Nurafshon ko'cha",
//       img: "/restaurant/blog-post-1.jpeg",
//     },
//     {
//       title: "Katta Chegirma Endi Belisimoda",
//       desc: "Faqat 25 ~ 31- iyul kunlari antiqa Pitsa yegani tashrif buyuring!",
//       author: "BellisimoUz",
//       date: "2022/07/25",
//       location: "Toshkent, Chilonzor",
//       img: "/restaurant/blog-post-3.jpeg",
//     },
//     {
//       title: "Hali his qilmagan hisni his qilmoqchimisiz?",
//       desc: "Merhaba promokodi orqali 50% skidgani qo'lga kiriting",
//       author: "Chicken House",
//       date: "2022/09/10",
//       location: "Toshkent, Qo'yliq",
//       img: "/icons/f-icon-1.png",
//     },
//     {
//       title: "Yangicha yondashuv endi O'zbekistonda!!",
//       desc: "O’zbekistondagi eng yirik ulgurji bozor.\n",
//       author: "Food City",
//       date: "2022/08/01",
//       location: "Toshkent, Yangi Qo'yliq bozori",
//       img: "/restaurant/coffee_statics.jpeg",
//     },
//   ];

//   return (
//       <Container sx={{ overflow: "hidden" }}>
//         <Stack className={"events_main_page"}>
//           <Box className={"events_text_page"}>
//           </Box>
//           <Box className={"prev_next_frame_page"}>
//             <img
//               src={"/icons/arrow-right.svg"}
//               className={"swiper-button-prev"}
//             />
//             <div className={"dot_frame_pagination1 swiper-pagination"}></div>
//             <img
//               src={"/icons/arrow-right.svg"}
//               className={"swiper-button-next"}
//               style={{ transform: "rotate(-180deg)"}}
//             />
//           </Box>
//           <Swiper
//             className={"events_info1 swiper-wrapper1"}
//             slidesPerView={1}
//             centeredSlides={true}
//             spaceBetween={30}
//             navigation={{
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             }}
//             pagination={{
//               el: ".swiper-pagination",
//               clickable: true,
//             }}
//             autoplay={{
//               delay: 2000,
//               disableOnInteraction: true, 
//             }}
//           >
//             {events_list1.map((value, number) => {
//               return (
//                 <SwiperSlide className={"events_info_frame1"}>
//                   <div className={"events_img1"}>
//                     <img src={value.img} className={"events_img1"} />
//                   </div>
//                   <Box className={"events_desc1"}>
//                     <Box className={"events_bott1"}>
//                       <Box className={"bott_left1"}>
//                         <div className={"event_title_speaker1"}>
//                           <strong>{value.title}</strong>
//                           <div className={"event_organizator1"}>
//                             <img
//                               src={"/icons/speaker.svg"}
//                               style={{ width: "20px", marginRight: "10px" }}
//                             />
//                             <p className={"spec_text_author1"}>{value.author}</p>
//                           </div>
//                         </div>

//                         <p
//                           className={"text_desc1"}
//                           style={{ marginTop: "10px" }}
//                         >
//                           {value.desc}
//                         </p>

//                         <div
//                           className={"bott_info1"}
//                           style={{ marginTop: "10px" }}
//                         >
//                           <div className={"bott_info_main1"}>
//                             <img
//                               src={"/icons/calendar.svg"}
//                               style={{ marginRight: "10px" }}
//                             />
//                             {value.date}
//                           </div>
//                           <div className={"bott_info_main1"}>
//                             <img
//                               src={"/icons/location.svg"}
//                               style={{ marginRight: "10px" }}
//                             />
//                             {value.location}
//                           </div>
//                         </div>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </Stack>
//       </Container>
//   );
// }