import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import "../../../css/order.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
import { Order } from "../../../types/order";
//REDUX
import { useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import  { 
  setPausedOrders, 
  setProcessOrders, 
  setFinishedOrders, 
} from "../../screens/OrdersPage/slice";
import OrderApiService from "../../apiServices/orderApiService";
import { Member } from "../../../types/user";
import { verifiedMemberData } from "../../apiServices/verify";


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispach(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispach(setProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispach(setFinishedOrders(data)),

});



export function OrdersPage(props: any) {
  /*** INITIALIZATIONS ***/
  const [value, setValue] = useState("1");
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = 
    actionDispatch(useDispatch());

  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrders("paused").then(data => setPausedOrders(data))
      .catch(err => console.log(err));
    orderService
      .getMyOrders("process").then(data => setProcessOrders(data))
      .catch(err => console.log(err));
    orderService
      .getMyOrders("finished").then(data => setFinishedOrders(data))
      .catch(err => console.log(err));
  }, [props.orderRebuild]);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  return (
    <div className={"order_page"}>
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "row-reverse" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab 
                    label="My orders" 
                    value={"1"} 
                    style={{
                      marginRight: "150px",
                      marginLeft: "115px",
                      color: "#ffffff",
                    }}
                  />
                  <Tab 
                    label="In process" value={"2"} 
                    style={{ marginRight: "150px", color: "#ffffff" }}
                  />
                  <Tab 
                    label="Finished" value={"3"} 
                    style={{ marginRight: "150px", color: "#ffffff" }}
                  />
                </TabList>
              </Box>
            </Box>
            <Stack className={"order_main_content"}>
              <PausedOrders setOrderRebuild={props.setOrderRebuild}/>
              <ProcessOrders setOrderRebuild={props.setOrderRebuild}/>
              <FinishedOrders setOrderRebuild={props.setOrderRebuild}/>
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className={"order_user_img"}>
                <img
                  src={verifiedMemberData?.mb_image}
                  className={"order_user_avatar"}
                />
                <div className={"order_user_icon_box"}>
                  <img
                    src={"/icons/user_icon_small.svg"}
                    className={"order_user_prof_img"}
                  />
                </div>
              </div>
              <span className={"order_user_name"}>{verifiedMemberData?.mb_nick}</span>
              <span className={"order_user_prof"}>{verifiedMemberData?.mb_type ?? "Foydalanuvchi ismi"}</span>
            </Box>
            <Box
              style={{ border: "1px solid #A1A1A1" }}
              width={"100%"}
              sx={{ mt: "40px", mb: "8px" }}
            ></Box>
            <Box className={"order_user_address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec_address_txt"}>{verifiedMemberData?.mb_address ?? "South Korea"}</div>
            </Box>
          </Box>
          <Box className={"order_info_box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"card_number"}
              placeholder={"Input your card number"}
              className={"card_input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input
                type={"text"}
                name={"card_period"}
                placeholder={"MM / YY"}
                className={"card_date"}
              />
              <input
                type={"text"}
                name={"card_cvv"}
                placeholder={"CVV:"}
                className={"card_date"}
              />
            </div>
            <input
              type={"text"}
              name={"card_creator"}
              placeholder={"Input your name"}
              className={"card_input"}
            />
            <div className={"cards_box"}>
              <img src={"/icons/western_card.svg"} />
              <img src={"/icons/master_card.svg"} />
              <img src={"/icons/paypal_card.svg"} />
              <img src={"/icons/visa_card.svg"} />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}