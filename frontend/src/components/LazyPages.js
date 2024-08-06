import React from "react";

const lazyPages = {
  BlogPage: React.lazy(() => import("./BlogPage")),
  PostPage: React.lazy(() => import("./PostPage")),
};
export default lazyPages;
