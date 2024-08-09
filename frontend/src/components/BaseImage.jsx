import React from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

function BaseImage({ img, className = "" }) {
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
