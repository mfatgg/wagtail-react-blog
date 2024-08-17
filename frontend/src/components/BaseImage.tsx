import React from "react";
import { ImageType } from "./BaseTypes";

const API_BASE = process.env.REACT_APP_API_BASE;

type BaseImageInterface = {
  img: ImageType;
  className?: string;
};

function BaseImage({ img, className = "" }: BaseImageInterface) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <img
        className={`${className}`}
        alt={img.alt}
        height={img.height}
        width={img.width}
        src={`${API_BASE}${img.url}`}
      />
    </>
  );
}

export default BaseImage;
