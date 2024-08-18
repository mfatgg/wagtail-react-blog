import React, { lazy } from "react";
import { BlogPageInterface } from "./BlogPage";
import { PostPageInterface } from "./PostPage";

const BlogPage = lazy(() => import("./BlogPage"));
const PostPage = lazy(() => import("./PostPage"));

type PageType = "BlogPage" | "PostPage";
type DataType = BlogPageInterface | PostPageInterface;

export default function getViewByPageType(
  pageType: PageType,
  props: Record<string, object>,
  data: DataType
) {
  switch (pageType) {
    case "BlogPage":
      return <BlogPage {...props} {...(data as BlogPageInterface)} />;
    case "PostPage":
      return <PostPage {...props} {...(data as PostPageInterface)} />;
    default:
      return null;
  }
}
