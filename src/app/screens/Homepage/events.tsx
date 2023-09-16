import { Box, Button, Container, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);




export function Events() {
  const [showModal, setShowModal] = useState(false);


const showModalHandler = () => {
  setShowModal(true)
}
const hiddenModalHandler = () => {
  setShowModal(false)
}


  return (
    <div className={"events_frame"}>
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title_shop"}>COFFEE MACHINE</span>
          </Box>
          <Box className="machine_box">
            <Box className="machine_left">
              <h3 className="machine_left_title">BUY FOR HOME</h3>
              <p className="machine_left_p">Donec et nibh maximus, congue est eu, mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus mmodo mattis. Aliquam erat volutpat.
mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus mmodo mattis.</p>
              <Button className='machine_left_btn' onClick={showModalHandler}>
                Discover now
              </Button>
            </Box>
            <Box className="machine_right"><img src="../../../../home/machine.png"  alt=""/>
              <Box className="call_model" onClick={showModalHandler}>+</Box>

             
            </Box>
          </Box>

          {showModal && <Box className="machine_modal">
              <Button className="quite_btn" onClick={() => {setShowModal(false)}}><span>+</span></Button>
          <Box className="machine_box">
            <Box className="machine_right"><img src="../../../../home/machine.png"  alt=""/>
            </Box>
            <Box className="machine_left">
              <h3 className="machine_left_title">BUY FOR HOME</h3>
              <p className="machine_left_p">Donec et nibh maximus, congue est eu, mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus mmodo mattis. Aliquam erat volutpat.
mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus mmodo mattis.</p>
              <Button className='machine_left_btn'>
                Discover now
              </Button>
            </Box>
          </Box>
          </Box>}
          

        </Stack>
      </Container>
    </div>
  );
}