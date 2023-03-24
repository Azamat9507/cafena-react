import React from 'react';
import { Container } from "@mui/material";
import { Statistics } from './statistics';
import { TopRestaurants } from './topRestaurants';
import { BestRestaurants } from './bestRestaurants';
import { BestDishes } from './bestDishes';
import { Advertisements } from './advertisements';
import { Events } from './events';
import { Recommendations } from './recommendations';
import "../../../css/home.css";
import { useEffect } from 'react';


export function Homepage() {
  useEffect(() => {
    console.log("componentDidmount => Data fetch");

    return () => {
      console.log("componentWillUnmount process");
    };
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