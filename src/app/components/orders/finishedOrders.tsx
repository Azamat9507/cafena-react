import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
//REDUX
import { useSelector} from "react-redux";
import { createSelector } from "reselect";
import { 
  retrieveProcessOrders, 
} from "../../screens/OrdersPage/selector";
/** REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders, 
  (processOrders) => ({ 
    processOrders, 
  })
);

const finishedOrders = [
  [1, 2, 3],
  [1, 2, 3],
];

export default function FinishedOrders(props: any) {
  /** INTIALIZATIONS */
  // const { processOrders } = useSelector(processOrdersRetriever);
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.map((item) => {
                  const image_path = "/others/burak_burgers.jpeg";
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>Burger</p>
                      <Box className={"priceBox"}>
                        <p>$12</p>
                        <img src={"/icons/Close.svg"} />
                        <p>2</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>$22</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box red_solid"}>
                <Box className={"boxTotal"}>
                  <p>mahsulot narxi</p>
                  <p>$22</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>yetkazish xizmati</p>
                  <p>$2</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>jami narx</p>
                  <p>$24</p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}