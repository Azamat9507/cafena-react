import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
//REDUX
import { useSelector} from "react-redux";
import { createSelector } from "reselect";
import { 
  retrievePausedOrders, 
} from "../../screens/OrdersPage/selector";
import { Restaurant } from '../../../types/user';
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import OrderApiService from '../../apiServices/orderApiService';
import { verifiedMemberData } from "../../apiServices/verify";
/** REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders, 
  (pausedOrders) => ({ 
    pausedOrders, 
  })
);


export default function PausedOrders(props: any) {
  /** INTIALIZATIONS */
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

/** HANDLERS */
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = {order_id: order_id, order_status: "DELETED"};
    
      if(!verifiedMemberData) {
        sweetFailureProvider("Please login first", true)
      }

      let confirmation = window.confirm("Do you want to cancel your order");
        if(confirmation) {
          const orderService = new OrderApiService();
          await orderService.updateOrderStatus(data);
          props.setOrderRebuild(new Date());
        }

    } catch(err) {
      console.log("deleteOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = {order_id: order_id, order_status: "PROCESS"};
    
      if(!verifiedMemberData) {
        await sweetFailureProvider("Please login first", true)
      }

      let confirmation = window.confirm("Proceed to ckeckout?");
        if(confirmation) {
          const orderService = new OrderApiService();
          await orderService.updateOrderStatus(data);
          props.setOrderRebuild(new Date());

        }

    } catch(err) {
      console.log("processOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id)[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>${item.item_price}</p>
                        <img src={"/icons/close.svg"}/>
                        <p>{item.item_quantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box black_solid"}>
                <Box className={"boxTotal"}>
                  <p>Price</p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>Delivery fee</p>
                  <p>${order.order_delivery_cost}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total price</p>
                  <p>${order.order_total_amount}</p>
                </Box>
                <Button 
                  value={order._id}
                  onClick={deleteOrderHandler}
                  variant="contained"
                    style={{
                    background: "red",

                    borderRadius: "5px",
                    boxShadow:
                      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  onClick={processOrderHandler}
                  variant="contained"
                  style={{
                    background: "rgb(58, 191, 58)",
                    color: "primary",
                    borderRadius: "5px",
                    boxShadow:
                      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}