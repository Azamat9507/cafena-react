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
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { 
  setBestRestaurants, 
  setTopRestaurants 
} from "../../screens/Homepage/slice";
import { Restaurant } from '../../../types/user';
import RestaurantApiService from '../../apiServices/restaurantApiService';


/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispach(setTopRestaurants(data)),
  setBestRestaurants: (data: Restaurant[]) => dispach(setBestRestaurants(data)),
});


export function Homepage() {
  /** INTIALIZATION */
  const {setTopRestaurants, setBestRestaurants} = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    // backend data request => data
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getTopRestaurants()
      .then(data => {
        setTopRestaurants(data);
      })
      .catch(err => console.log(err));

      restaurantService.getRestaurants({page: 1, limit: 4, order: "mb_point"}).then( data => {
        setBestRestaurants(data);
      }).catch(err => console.log(err));
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
