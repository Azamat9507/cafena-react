import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material"; 
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star"; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; 
import Favorite from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; 
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import { useHistory, useParams } from "react-router-dom";
import { Product } from "../../../types/product";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { 
  sweetErrorHandling, 
  sweetTopSmallSuccessAlert } 
  from "../../../lib/sweetAlert";
//REDUX
import { useDispatch, useSelector} from "react-redux";
import { createSelector } from "reselect";
import { 
  retrieveChosenRestaurant, 
  retrieveRandomRestaurants, 
  retrieveTargetProducts 
} from "../../screens/RestaurantPage/selector";
import { Restaurant } from '../../../types/user';
import {Dispatch} from "@reduxjs/toolkit";
import  { 
  setChosenRestaurant, 
  setRandomRestaurants, 
  setTargetProducts 
} from "../../screens/RestaurantPage/slice";
import { verifiedMemberData } from "../../apiServices/verify";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants: randomRestaurants,
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant: chosenRestaurant,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);



export function OneRestaurant(props: any) {
  /** INTIALIZATIONS */
  const history = useHistory();
  let {restaurant_id} = useParams<{restaurant_id: string}>();
  const { setRandomRestaurants, setChosenRestaurant, setTargetProducts } = 
  actionDispatch(useDispatch());
  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [ chosenRestaurantId, setChosenRestaurantId] = 
    useState<string>(restaurant_id);
  const [ targetProductSearchObj, setTargetProductSearchObj ] = 
    useState<ProductSearchObj>({
    page: 1,
    limit:8,
    order: "createdAt",
    restaurant_mb_id: restaurant_id,
    product_collection: "dish",
  });


  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    // RandomShops
    const shopService = new RestaurantApiService();
    shopService
      .getRestaurants({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomRestaurants(data))
      .catch((err) => console.log(err));

    shopService
      .getChosenRestaurant(chosenRestaurantId)
      .then((data) => setChosenRestaurant(data))
      .catch((err) => console.log(err));

    // ChosenProduct
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenRestaurantId, targetProductSearchObj, productRebuild]);

 
  /* HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurant/${id}`);
  };


  /** Enabling search */
  const [query, setQuery] = useState("");

  const filteredProducts = targetProducts.filter(
    (product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase()) ||
      product.product_description.toLowerCase().includes(query.toLowerCase()) ||
      product.product_collection.toLowerCase().includes(query.toLowerCase())
  );

  /**  Enabling search */
  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const chosenProductHandler = (id: string) => {
    history.push(`/restaurant/products/${id}`);
  };

  
const handleSingleSelection = (groupName: string, selectedValue: string) => {
  const checkboxes = document.querySelectorAll(
    `input[name=${groupName}]`
  ) as NodeListOf<HTMLInputElement>;
  checkboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.checked = checkbox.value === selectedValue;
  });

  // Call the appropriate handler function based on the selected value
  if (groupName === "filter") {
    searchCollectionHandler(selectedValue);
  } else if (groupName === "sort") {
    searchOrderHandler(selectedValue);
  }
};


  // Like handle
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("Success!", 900, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="single_res">
      <img className="back12" src="/icons/bit_back4.svg" alt="" />
      <img className="back13" src="/icons/bit_back3.svg" alt="" />
      <img className="back14" src="/icons/bit_back4.svg" alt="" />

      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
        <div className="other_shop_see">Welcome to Cafena</div>
          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn shop-prev">
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40, color: "#575656", cursor: "pointer" }}
              />
            </Box>
            <Swiper
              className={"shop_avatars_wrapper"}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              // style={{ cursor: "pointer" }}
              navigation={{
                nextEl: ".shop-next",
                prevEl: ".shop-prev",
              }}
            >
              {randomRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className="shop_avatars"
                  >
                    <img src={image_path} alt="" />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box className="next_btn shop-next" style={{ color: "#fff" }}>
              <ArrowForwardIosIcon
                sx={{ fontSize: 40, color: "#575656", cursor: "pointer" }}
              />
            </Box>
          </Stack>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>{chosenRestaurant?.mb_nick} coffee's menu</p>
              <Box className="Single_search_big_box">
                <form className="Single_search_form" action="" method="">
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_resSearch"
                    placeholder="Input product name"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>

                <Box className={"drop_down"}>
                  <div className="dishs_filter_box">
                    <Button className="checkbox_list"
                      variant="contained"
                      name="filter"
                      color="secondary"
                      onClick={() => handleSingleSelection("filter", "etc")}
                    >
                      Others
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="filter"
                      color="secondary"
                      onClick={() => handleSingleSelection("filter", "dessert")}
                    >
                      Dessert
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="filter"
                      color="secondary"
                      onClick={() => handleSingleSelection("filter", "drink")}
                    >
                      Drinks
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="filter"
                      color="secondary"
                      onClick={() => handleSingleSelection("filter", "salad")}
                    >
                      Salads
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="filter"
                      color="secondary"
                      onClick={() => handleSingleSelection("filter", "dish")}
                    >
                      Food
                    </Button>
                  </div>
                </Box>

                <Box className={"drop_down_right"}>
                  <div className="checkbox_list">
                  <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="sort"
                      color="secondary"
                      onClick={() => handleSingleSelection("sort", "createdAt")}
                    >
                      new added
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="sort"
                      color="secondary"
                      onClick={() => handleSingleSelection("sort", "product_price")}
                    >
                      price
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="sort"
                      color="secondary"
                      onClick={() => handleSingleSelection("sortr", "product_likes")}
                    >
                      Most liked
                    </Button>
                    <Button className="checkbox_list"
                      sx={{ml: 3}}
                      variant="contained"
                      name="sort"
                      color="secondary"
                      onClick={() => handleSingleSelection("sort", "product_views")}
                    >
                      Most views
                    </Button>
                  </div>
                </Box>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex"}}
            flexDirection={"row"}
          >
            <Stack className={"product_wrapper"}>
              {filteredProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;

                return (
                  <Box
                    className={"product_box"}
                    key={`${product._id}`}
                    onClick={() => chosenProductHandler(product._id)}
                  >
                    <Box
                      className="product_img"
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                      key={product._id}
                    >
                      <Button
                        className={"like_view_btn"}
                        style={{ left: "36px" }}
                      >
                        {/* hover -> */}
                        <Badge
                          badgeContent={product.product_likes}
                          color={"primary"}
                          onClick={(e) => {
                            props.onAddFav(product);
                            e.stopPropagation();
                          }}
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            /* @ts-ignore */
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button
                        className={"view_btn"}
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      >
                        <img
                          src="/icons/shopping_card.svg"
                          style={{ display: "flex" }}
                          alt=""
                        />
                      </Button>
                      <Button
                        className={"like_view_btn"}
                        style={{ right: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>

                    <Box className={"product_desc"}>
                      <span className={"product_title_text"}>
                        {product.product_name}
                      </span>
                      <span className={"product_price_text"}>
                        $ {product.product_price}
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
