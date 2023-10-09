import React, { useEffect } from "react";
import useDeviceDetect from "../../../lib/responsive";


export function Responsive(props: any) {
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
    return null;
  }
}
