import React from "react";

const lazyPages = {
  BlogPage: React.lazy(() => import("./BlogPage.jsx")),
  PostPage: React.lazy(() => import("./PostPage.jsx")),
};
export default lazyPages;
