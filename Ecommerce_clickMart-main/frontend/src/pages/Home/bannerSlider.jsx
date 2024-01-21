import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";
import banner4 from "../../images/banner4.png";

const BannerSlider = () => {
  return (
    <Carousel showArrows={false} showThumbs={false} infiniteLoop autoPlay >
      <div>
        <img src={banner1} alt="Banner 1" />
      </div>
      <div>
        <img src={banner2} alt="Banner 2" />
      </div>
      <div>
        <img src={banner3} alt="Banner 3" />
      </div>
      <div>
        <img src={banner4} alt="Banner 4" />
      </div>
    </Carousel>
  );
};

export default BannerSlider;
