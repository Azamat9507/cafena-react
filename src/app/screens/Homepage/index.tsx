import React, {useEffect} from 'react';
import { Container } from "@mui/material";
import { Statistics } from './statistics';
import { TopRestaurants } from './topRestaurants';
import { BestRestaurants } from './bestRestaurants';
import { BestDishes } from './bestDishes';
import { Advertisements } from './advertisements';
import { Events } from './events';
import { Recommendations } from './recommendations';
import "../../../css/home.css";

//REDUX
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopRestaurants} from "../../screens/Homepage/slice";
import {retrieveBestRestaurants, retrieveTopRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from '../../../types/user';
import RestaurantApiService from '../../apiServices/restaurantApiService';


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispach(setTopRestaurants(data)),
});
/** REDUX SELECTOR */
const topRestaurantRetriever = createSelector(
  retrieveTopRestaurants, 
  (topRestaurants) => ({ 
    topRestaurants, 
  })
);


export function Homepage() {
  /** INTIALIZATION */
  const {setTopRestaurants} = actionDispatch(useDispatch());

 

  //selector: store => data

  useEffect(() => {
    // backend data request => data
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getTopRestaurants()
      .then(data => {
        setTopRestaurants(data);
      })
      .catch(err => console.log(err));
  }, []);
  
  return (  
    <div className="homepage">
      <Statistics/>
      <TopRestaurants/>
      <BestRestaurants/>
      <BestDishes/>
      <Advertisements/>
      <Events/>
      <Recommendations/>
    </div>
  ); 
}                                                                       