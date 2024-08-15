import React from "react";
import BaseImage, { ImageType } from "../BaseImage";

type ThumbnailGalleryInterface = {
  value: ImageType[];
  key: string;
};

function ThumbnailGallery({ value, key }: ThumbnailGalleryInterface) {
  return (
    <div className="flex flex-row flex-wrap">
      {value.map((imageItem, index) => (
        <div className="w-full md:w-2/4 lg:w-1/3 px-2" key={key}>
          <a
            aria-label={`Thumbnail${index}`}
            href={imageItem.url}
            className="d-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BaseImage className="img-thumbnail" img={imageItem} />
          </a>
        </div>
      ))}
    </div>
  );
}

export default ThumbnailGallery;
