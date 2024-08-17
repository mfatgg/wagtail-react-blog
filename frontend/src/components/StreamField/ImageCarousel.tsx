import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BaseImage from "../BaseImage";
import { ImageType } from "../BaseTypes";

type ImageCarouselInterface = {
  value: ImageType[];
};

type ItemWithUidType = {
  uid: string;
  image: ImageType;
};

function ImageCarousel({ value }: ImageCarouselInterface) {
  const [itemsWithUid] = useState<ItemWithUidType[]>(
    value.map((item) => ({ uid: uuidv4(), image: item }))
  );

  return (
    <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
      {itemsWithUid.map((item) => (
        <BaseImage img={item.image} key={item.uid} />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
