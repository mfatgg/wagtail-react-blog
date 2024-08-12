import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BaseImage from "../BaseImage";

function ImageCarousel(props) {
  const [itemsWithUid, setItemsWithUid] = useState(false);
  const { value } = props;

  useEffect(() => {
    setItemsWithUid(value.map((item) => ({ uid: uuidv4(), value: item })));
  }, []);

  return itemsWithUid ? (
    <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
      {itemsWithUid.map((item) => (
        <BaseImage img={item.value} key={item.uid} />
      ))}
    </Carousel>
  ) : (
    ""
  );
}

export default ImageCarousel;
