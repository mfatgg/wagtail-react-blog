import React from "react";
import StreamField, { StreamFieldType } from "./StreamField/StreamField";
import BaseImage, { ImageType } from "./BaseImage";
import CommentList from "./CommentList";

type PostContentType = {
  id: number;
  slug: string;
  title: string;
  url: string;
  lastPublishedAt: string;

  tags: {
    name: string;
    slug: string;
    id: number;
  }[];
  categories: {
    name: string;
    slug: string;
    id: number;
  }[];

  body: StreamFieldType[];
  headerImage: ImageType;
  content_type_str?: string;
};

export type PostDetailInterface = {
  // eslint-disable-next-line react/no-unused-prop-types
  pageType: string;
  pageContent: PostContentType;
};

function PostDetail({ pageContent }: PostDetailInterface) {
  return (
    <main role="main" className="w-full sm:w-2/3 md:w-3/4 lg:w-8/12 px-2 mb-4">
      <div className="prose lg:prose-lg xl:prose-xl dark:prose-dark">
        <BaseImage img={pageContent.headerImage} />
        <h1>{pageContent.title}</h1>
        <hr />
        <div> </div>
      </div>

      <StreamField value={pageContent.body} />

      <CommentList pageContent={pageContent} />
    </main>
  );
}

export default PostDetail;
