import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BaseImage, { ImageType } from "../BaseImage";

type ItemWithUidType = {
  uid: string;
  image: ImageType;
};

type ThumbnailGalleryInterface = {
  value: ImageType[];
};

function ThumbnailGallery({ value }: ThumbnailGalleryInterface) {
  const [itemsWithUid] = useState<ItemWithUidType[]>(
    value.map((item) => ({ uid: uuidv4(), image: item }))
  );

  return (
    <div className="flex flex-row flex-wrap">
      {itemsWithUid.map((item, index) => (
        <div className="w-full md:w-2/4 lg:w-1/3 px-2">
          <a
            aria-label={`Thumbnail${index}`}
            href={item.image.url}
            className="d-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BaseImage
              className="img-thumbnail"
              img={item.image}
              key={item.uid}
            />
          </a>
        </div>
      ))}
    </div>
  );
}

export default ThumbnailGallery;
