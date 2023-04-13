
import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
//REDUX
import { useDispatch, useSelector} from "react-redux";
import { createSelector } from "reselect";
import {Dispatch} from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";
import { retrieveMemberFollowings } from "./selector";
import { Following, FollowSearchObj } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowings: (data: Following[]) => 
    dispach(setMemberFollowings(data)),
});


/** REDUX SELECTOR */
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings, 
  (memberFollowings) => ({ 
    memberFollowings, 
  })
);


export function MemberFollowing(props: any) {
  /** INITIALIZATIONS **/
  const {mb_id, followRebuild, setFollowRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [ followingsSearchObj, setFollowingsSearchObj] = 
  useState<FollowSearchObj>({page: 1, limit: 5, mb_id: mb_id});
  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch(err => console.log(err));
  }, [followingsSearchObj, followRebuild]);

    /** HANDLERS */
    const unsubscribeHandler = async (e: any, id: string) => {
      try {
        e.stopPropagation();
        assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
  
        const followService = new FollowApiService();
        await followService.unsubscribe(id);
  
        await sweetTopSuccessAlert("unsubscribed successfully", 700);
        setFollowRebuild(!followRebuild);
  
      } catch(err: any) {
        console.log(err);
        sweetErrorHandling(err).then();
      }
    }

    const handlePaginationChange = (event: any, value: number) => {
      followingsSearchObj.page = value;
      setFollowingsSearchObj({ ...followingsSearchObj })
    };

  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image 
          ? `${serverApi}/${following.follow_member_data.mb_image}`
          : "/auth/default_user.svg";
        return (
          <Box className={"follow_box"}>
            <Avatar alt={""} src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className={"username_text"}>
                {following?.follow_member_data?.mb_type}</span>
              <span className={"name_text"}>
                {following?.follow_member_data?.mb_nick}</span>
            </div>

            {props.actions_enabled && (
              <Button
                variant={"contained"}
                startIcon={
                  <img
                    src={"/icons/follow_icon.svg"}
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                className={"follow_cancel_btn"}
                onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
              >
                Unsubscribe
              </Button>
            )}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box className={"bottom_box"}>
          <Pagination
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"secondary"}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}