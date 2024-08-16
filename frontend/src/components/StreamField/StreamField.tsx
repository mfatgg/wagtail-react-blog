import React from "react";
import DOMPurify from "dompurify";
import HtmlReactParser from "html-react-parser";
import ThumbnailGallery from "./ThumbnailGallery";
import ImageText, { ImageTextType } from "./ImageText";
import ImageCarousel from "./ImageCarousel";
import { ImageType } from "../BaseImage";

export type StreamFieldType = {
  type: string;
  value: string | ImageType[] | ImageTextType;
  id: string;
};

type StreamFieldInterface = {
  value: StreamFieldType[];
};

function StreamField({ value }: StreamFieldInterface) {
  const html: React.JSX.Element[] = [];

  value.forEach((field) => {
    if (field.type === "h1") {
      html.push(
        <div
          key={field.id}
          className="prose lg:prose-lg xl:prose-xl dark:prose-dark"
        >
          <h1>{field.value as string}</h1>
        </div>
      );
    } else if (field.type === "h2") {
      html.push(
        <div
          key={field.id}
          className="prose lg:prose-lg xl:prose-xl dark:prose-dark"
        >
          {" "}
          <h2>{field.value as string}</h2>{" "}
        </div>
      );
    } else if (field.type === "paragraph") {
      const sanitizedData = DOMPurify.sanitize(field.value as string);
      const parsedData = HtmlReactParser(sanitizedData);
      html.push(
        <div
          key={field.id}
          className="prose lg:prose-lg xl:prose-xl dark:prose-dark"
        >
          {parsedData}
        </div>
      );
    } else if (field.type === "thumbnail_gallery") {
      html.push(
        <div
          key={field.id}
          className="prose lg:prose-lg xl:prose-xl dark:prose-dark"
        >
          <ThumbnailGallery value={field.value as ImageType[]} />
        </div>
      );
    } else if (field.type === "image_text") {
      html.push(
        <div
          key={field.id}
          className="prose lg:prose-lg xl:prose-xl dark:prose-dark"
        >
          <ImageText value={field.value as ImageTextType} />
        </div>
      );
    } else if (field.type === "image_carousel") {
      html.push(
        <div key={field.id}>
          <ImageCarousel value={field.value as ImageType[]} />
        </div>
      );
    } else {
      // fallback empty div
      html.push(<div key={field.id} className={field.type} />);
    }
  });

  return html;
}

export default StreamField;
