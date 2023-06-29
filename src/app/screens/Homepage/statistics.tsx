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