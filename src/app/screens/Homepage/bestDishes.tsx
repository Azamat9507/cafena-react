import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';
//REDUX
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { setTrendProducts } from "../../screens/Homepage/slice";
import { Product } from '../../../types/product';
import ProductApiService from '../../apiServices/productApiService';
import { retrieveTrendProducts } from './selector';
import { createSelector } from 'reselect';
import { serverApi } from '../../../lib/config';
import { useHistory } from 'react-router-dom';
import useDeviceDetect from "../../../lib/responsive";


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTrendProducts: (data: Product[]) => dispach(setTrendProducts(data)),
});

/** REDUX SELECTOR */
const trendProductsRetriever = createSelector(
  retrieveTrendProducts, 
  (trendProducts) => ({ 
    trendProducts, 
  })
);

export function BestDishes() {
    /** INTIALIZATIONS */
  const history = useHistory();
  const {trendProducts} = useSelector(trendProductsRetriever);
  const {setTrendProducts } = actionDispatch(useDispatch());
  useEffect(() => {
    const productService = new ProductApiService();
    productService.getTargetProducts({order: "product_likes", page: 1, limit: 6}) 
      .then((data) => setTrendProducts(data)) 
      .catch(err => console.log(err));
  }, []);

  /** HANDLERS */
  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  }
  const { isMobile } = useDeviceDetect();
  const handleClickOpenAlert = () => {
    history.push("/construction");
  };

  if (isMobile()) {
      return (
        <div className="best_dishes_frame">
          <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
              <Box className="category_title_shop">Popular menu Cafena</Box>
              <div className='menu-frame'>
                {trendProducts && trendProducts.map((product: Product) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  const size_volume = 
                    product.product_collection === "drink" 
                      ? product.product_volume + "ml" 
                      : product.product_size + " size";
                  return (
                    <Box className="dish_box"  onClick={handleClickOpenAlert}>
                      <Stack 
                        className="dish_img" 
                        sx={{
                          backgroundImage: `url(${image_path})`,
                        }}
                      >
                      </Stack>
                      <Stack className={"dish_desc"}>
                        <span className={"dish_title_text"}>{product.product_name}</span>
                        <div className={"dish_sale"}>{size_volume}</div>
                        <span className={"dish_desc_text"}>
                        <MonetizationOn style={{ width: '20px' }} />
                          {product.product_price}
                        </span>
                      </Stack>
                    </Box>
                  )
                })}
              </div>
            </Stack>
          </Container>
        </div>
      );
  } else {
    return (
      <div className="best_dishes_frame">
        <img
          src={"icons/blog-section-shape-1.png"}
          style={{ position: "absolute", right: "5%", transform: "rotate(90deg)" }}
          alt={"hero-shape-2-1.png"}
        />
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Box className="category_title_shop">Popular menu Cafena</Box>
            <div className='menu-frame'>
              {trendProducts && trendProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                const size_volume = 
                  product.product_collection === "drink" 
                    ? product.product_volume + "ml" 
                    : product.product_size + " size";
                return (
                  <Box className="dish_box"  onClick={() => chosenDishHandler(product._id)}>
                    <Stack 
                      className="dish_img" 
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                    >
                    </Stack>
                    <Stack className={"dish_desc"}>
                      <span className={"dish_title_text"}>{product.product_name}</span>
                      <div className={"dish_sale"}>{size_volume}</div>
                      <span className={"dish_desc_text"}>
                        <MonetizationOn />
                        {product.product_price}
                      </span>
                    </Stack>
                  </Box>
                )
              })}
            </div>
          </Stack>
        </Container>
      </div>
    );
  }
}
