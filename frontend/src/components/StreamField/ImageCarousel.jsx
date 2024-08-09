import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BaseImage from "../BaseImage.jsx";

function ImageCarousel(props) {
  return (
    <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
      {props.value.map((item, index) => (
        <BaseImage img={item} key={`${index}.${item}`} />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
