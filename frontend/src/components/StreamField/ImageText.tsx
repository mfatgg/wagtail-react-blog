import React from "react";
import DOMPurify from "dompurify";
import HtmlReactParser from "html-react-parser";
import BaseImage, { ImageType } from "../BaseImage";
import { classNames } from "../../utils";

export type ImageTextType = {
  text: string;
  image: ImageType;
  reverse: boolean;
};

type ImageTextInterface = {
  value: ImageTextType;
};

function ImageText({ value }: ImageTextInterface) {
  const sanitizedData = DOMPurify.sanitize(value.text);
  const parsedData = HtmlReactParser(sanitizedData);

  return (
    <div
      className={classNames(
        value.reverse ? "sm:flex-row-reverse" : "sm:flex-row",
        "flex items-center mx-auto flex-col"
      )}
    >
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-7/12 px-2">
        <BaseImage img={value.image} />
      </div>
      <div className="w-full sm:w-1/3 md:w-1/4 lg:w-5/12 px-2">
        {parsedData}
      </div>
    </div>
  );
}

export default ImageText;
