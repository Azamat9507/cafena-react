import { Box, Container } from '@mui/material';
import React from 'react';
import { Stack } from '@mui/material';
import { url } from 'inspector';
import { MonetizationOn } from '@mui/icons-material';



export function BestDishes() {
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trendagi Ovqatlar</Box>
          <Stack sx={{mt: "43px"}} flexDirection={"row"}>
            <Box className="dish_box">
              <Stack 
                className="dish_img" 
                sx={{
                  backgroundImage: `url(
                    "https://media.istockphoto.com/id/1017180378/photo/bbq-chicken-legs.jpg?s=612x612&w=0&k=20&c=FCRrqP3RCmQvf41p4EU9sEpac5warRdYOYlXPWvcEAU="
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  <div>Batafsil ko'rish</div>
                  <img 
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                 {/* CHICKEN MAYO 11 $ */}
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
            <Box className="dish_box">
              <Stack 
                className="dish_img" 
                sx={{
                  backgroundImage: `url(
                    "https://media.istockphoto.com/id/1017180378/photo/bbq-chicken-legs.jpg?s=612x612&w=0&k=20&c=FCRrqP3RCmQvf41p4EU9sEpac5warRdYOYlXPWvcEAU="
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  <div>Batafsil ko'rish</div>
                  <img 
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                 {/* CHICKEN MAYO 11 $ */}
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
            <Box className="dish_box">
              <Stack 
                className="dish_img" 
                sx={{
                  backgroundImage: `url(
                    "https://media.istockphoto.com/id/1017180378/photo/bbq-chicken-legs.jpg?s=612x612&w=0&k=20&c=FCRrqP3RCmQvf41p4EU9sEpac5warRdYOYlXPWvcEAU="
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  <div>Batafsil ko'rish</div>
                  <img 
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                 {/* CHICKEN MAYO 11 $ */}
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
            <Box className="dish_box">
              <Stack 
                className="dish_img" 
                sx={{
                  backgroundImage: `url(
                    "https://media.istockphoto.com/id/1017180378/photo/bbq-chicken-legs.jpg?s=612x612&w=0&k=20&c=FCRrqP3RCmQvf41p4EU9sEpac5warRdYOYlXPWvcEAU="
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  <div>Batafsil ko'rish</div>
                  <img 
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                 {/* CHICKEN MAYO 11 $ */}
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}