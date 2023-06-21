import { Container } from '@mui/material';
import React from 'react';

export function Advertisements() {
  return (
    <div className="ads_coffeeshop_frame">
      <video 
        className={"ads_video"}
        autoPlay={true} 
        loop 
        muted 
        playsInline
      >
        <source src="/coffeeplayback.mp4" type='video/mp4'/>
      </video>
    </div>
  );
}