import React, {useEffect} from 'react';
import { Statistics } from './statistics';
import { TopRestaurants } from './topRestaurants';
import { BestRestaurants } from './bestRestaurants';
import { BestDishes } from './bestDishes';
import { Advertisements } from './advertisements';
import { Events } from './events';
import { Recommendations } from './recommendations';
import "../../../css/home.css";
import  WeatherComponent  from "./weatherComponent";



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
  /** INTIALIZATIONS */
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

      restaurantService.getRestaurants({page: 1, limit: 3, order: "mb_point"}).then( data => {
        setBestRestaurants(data);
      }).catch(err => console.log(err));
  }, []);
  
  return (  
    <div className="homepage">
      <Statistics/>
      <Advertisements/>
      <BestRestaurants/>
      <BestDishes/>
      <TopRestaurants/>
      <WeatherComponent/>
      <Events/>
      <Recommendations/>
    </div>
  ); 
}   
