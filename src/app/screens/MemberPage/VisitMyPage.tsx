import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SettingsIcon from "@mui/icons-material/Settings";
// CONNECTIONS OF MEMBERPAGE
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
// OTHERS
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TuiEditor } from "../../components/tuiEditor/tuiEditor";
import TViewer from "../../components/tuiEditor/TViewer";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
//REDUX
import { useDispatch, useSelector} from "react-redux";
import { createSelector } from "reselect";
import {Dispatch} from "@reduxjs/toolkit";
import { 
  setChoosenMember, 
  setChosenMemberBoArticles, 
  setChosenSingleBoArticle 
} from "./slice";
import { 
  retrieveChoosenMember, 
  retrieveChosenMemberBoArticles, 
  retrieveChosenSingleBoArticle 
} from "./selector";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { LinkedIn } from "@mui/icons-material";


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChoosenMember: (data: Member) => dispach(setChoosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) => dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) => dispach(setChosenSingleBoArticle(data)),
});

/** REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retrieveChoosenMember, 
  (choosenMember) => ({ 
    choosenMember, 
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles, 
  (chosenMemberBoArticles) => ({ 
    chosenMemberBoArticles, 
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle, 
  (chosenSingleBoArticle) => ({ 
    chosenSingleBoArticle, 
  })
);

export function VisitMyPage(props: any) {
  /** INITIALIZATIONS **/
  const { 
    setChoosenMember, 
    setChosenMemberBoArticles, 
    setChosenSingleBoArticle 
  } = actionDispatch(useDispatch());
  const { choosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(chosenMemberBoArticlesRetriever);
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [memberArticleSearchObj, setMemberArticleSearchObj] = 
    useState<SearchMemberArticlesObj>({mb_id: "none", page: 1, limit: 4 });

  useEffect(() => {
    if(!localStorage) {
      sweetFailureProvider("Please login first", true, true);
    }

    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();

    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

    memberService
      .getChosenMember(verifiedMemberData?._id)
      .then(data => setChoosenMember(data))
      .catch(err => console.log(err));

  }, [memberArticleSearchObj, articlesRebuild, followRebuild]);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticleSearchObj({ ...memberArticleSearchObj })
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch(err: any) {
      console.log(err);
      sweetErrorHandling(err).then()
    }
  }

  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>My articles</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts 
                    chosenMemberBoArticles={chosenMemberBoArticles}
                    renderChosenArticleHandler={renderChosenArticleHandler}
                    setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={
                            memberArticleSearchObj.page >= 3 
                              ? memberArticleSearchObj.page + 1 
                              : 3 
                          }
                          page={memberArticleSearchObj.page}
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
                  </Box>
                </TabPanel>

                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers 
                      actions_enabled={true} 
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing 
                      actions_enabled={true}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={verifiedMemberData?._id} 
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Write an article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor 
                      setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Chosen article</Box>
                  <Box className={"menu_content"}>
                  <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                  
                </TabPanel>

                <TabPanel value={"6"}>
                  <Box className={"menu_name"}>Edit Information</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <a onClick={() => setValue("6")} className={"settings_btn"}>
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img
                      src={verifiedMemberData?.mb_image}
                      className={"order_user_avatar"}
                      alt={""}
                    />
                    <div className={"order_user_icon_box"}>
                      <img src={ choosenMember?.mb_type === "RESTAURANT" 
                        ? "/icons/restaurant_user.svg" 
                        : "/icons/user_icon_small.svg"
                      } 
                      alt={""}
                    />
                    </div>
                  </div>
                  <span className={"order_user_name"}>
                    {choosenMember?.mb_nick}</span>
                  <span className={"order_user_prof"}>
                    {choosenMember?.mb_type}</span>
                </Box>
                <Box className={"user_media_box"}>
                  <a href="https://www.facebook.com/azamat.solijonov.94">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/azamat_solijonov/">
                    <InstagramIcon />
                  </a>
                  <a href="https://www.youtube.com/">
                    <YouTubeIcon />
                  </a>
                  <a href="https://www.linkedin.com/in/azamat-solijonov-b0b721232/">
                    <LinkedIn />
                  </a>
                </Box>
                <Box className={"user_media_box"}>
                  <p className={"follows"}>
                    Followers: {choosenMember?.mb_subscriber_cnt}</p>
                  <p className={"follows"}>
                    Followings: {choosenMember?.mb_follow_cnt}</p>
                </Box>
                <p className={"user_desc"}>{ choosenMember?.mb_description ?? 
                  "No more infromation"}
                </p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={(e) => (
                        <Button
                          sx={{backgroundColor: "green"}}
                          variant={"contained"}
                          onClick={() => setValue("4")}
                        >
                          Write an article
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>

              <Box className={"my_page_menu"}>
                <TabList
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderColor: 'divider', width: "100%" }}
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div
                        className={`menu_box`}
                        onClick={() => setValue("1")}
                      >
                        <img src={"/icons/post.svg"} />
                        <span>My articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div
                        className={`menu_box`}
                        onClick={() => setValue("2")}
                      >
                        <img src={"/icons/followers.svg"} />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box`}
                        onClick={() => setValue("3")}
                      >
                        <img src={"/icons/following.svg"} />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
