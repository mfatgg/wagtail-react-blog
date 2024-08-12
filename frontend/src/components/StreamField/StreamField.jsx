import React from "react";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";
import HtmlReactParser from "html-react-parser";
import ThumbnailGallery from "./ThumbnailGallery";
import ImageText from "./ImageText";
import ImageCarousel from "./ImageCarousel";

function StreamField(props) {
  const streamField = props.value;
  const html = [];

  for (let i = 0; i < streamField.length; i += 1) {
    const field = streamField[i];

    if (field.type === "h1") {
      html.push(
        <div className="prose lg:prose-lg xl:prose-xl dark:prose-dark">
          <div key={uuidv4()}>
            <h1>{field.value}</h1>
          </div>
        </div>
      );
    } else if (field.type === "h2") {
      html.push(
        <div className="prose lg:prose-lg xl:prose-xl dark:prose-dark">
          <div key={uuidv4()}>
            {" "}
            <h2>{field.value}</h2>{" "}
          </div>
        </div>
      );
    } else if (field.type === "paragraph") {
      const sanitizedData = DOMPurify.sanitize(field.value);
      const parsedData = HtmlReactParser(sanitizedData);
      html.push(
        <div className="prose lg:prose-lg xl:prose-xl dark:prose-dark">
          <div key={uuidv4()}>{parsedData}</div>
        </div>
      );
    } else if (field.type === "thumbnail_gallery") {
      html.push(
        <div className="prose lg:prose-lg xl:prose-xl dark:prose-dark">
          <ThumbnailGallery value={field.value} key={uuidv4()} />
        </div>
      );
    } else if (field.type === "image_text") {
      html.push(
        <div className="prose lg:prose-lg xl:prose-xl dark:prose-dark">
          <ImageText value={field.value} key={uuidv4()} />
        </div>
      );
    } else if (field.type === "image_carousel") {
      html.push(<ImageCarousel value={field.value} key={uuidv4()} />);
    } else {
      // fallback empty div
      html.push(<div className={field.type} key={uuidv4()} />);
    }
  }

  return html;
}

export default StreamField;
