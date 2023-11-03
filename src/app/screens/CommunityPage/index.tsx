import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/community.css";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import { TargetArticles } from "./targetArticles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";
import useDeviceDetect from "../../../lib/responsive";
import { useHistory } from "react-router-dom";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});
/* REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);
export function CommunityPage(props: any) {
  /** INITIALIZATION */
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);

  const [value, setValue] = React.useState("1");
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 5,
    }
  );
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj, articlesRebuild]);

  /** HANDLERS */
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    searchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...searchArticlesObj });
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
     searchArticlesObj.page = value;
     setSearchArticlesObj({ ...searchArticlesObj });  // page change
  };


  const { isMobile } = useDeviceDetect();


  if (isMobile()) {
    return (
      <div className="under-construction">
        <img className="back00" src="/icons/f-icon-1.png" alt="" />
        <img className="back01" src="/icons/f-icon-1.png" alt="" />
        <h2 style={{ zIndex: "1" }} >
          Mobile version is developing...
        </h2>
        <h2 style={{ zIndex: "1" }} className="construction">
          Have the best experience using our desktop version👨‍💻⚡️
        </h2>
        <div className="coffee_logo"></div>
      </div>
    );
    } else {
  return (
    <div className="community_page">
      <div className="community_frame">
        <Container sx={{ mt: "50px", mb: "50px" }}>

          <Stack flexDirection={"row"} justifyContent={"center"}>
    
            <img className="walpaper01" src="/icons/top-grade-shape-2-1.png" alt="" />
            <img className="walpaper02" src="/icons/about-shape-2-2.png" alt="" />
            <Stack className="community_all_frame" inputMode={"text"}>
              <TabContext value={value}>
                <Box className="article_tabs">
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      value={value}
                      onChange={handleChange}
                      aria-labelledby="lab API tabs example"
                      style={{ borderColor: "blue"}}
                    >
                      <Tab label="All Articles" value={"1"} />
                      <Tab label="News" value={"2"} />
                      <Tab label="Coffee review" value={"3"} />
                      <Tab label="Local" value={"4"} />
                    </TabList>
                  </Box>
                </Box>

                <Box className={"article_main"}>
                  <TabPanel value={"1"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value={"2"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value={"3"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value={"4"}>
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                </Box>

                <Box className={"article_bott"}>
                  <Pagination
                    count={
                      searchArticlesObj.page >= 3
                        ? searchArticlesObj.page + 1
                        : 3
                    }
                    page={searchArticlesObj.page}
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
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
}
