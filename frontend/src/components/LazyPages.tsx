import { lazy } from "react";

const lazyPages = {
  BlogPage: lazy(() => import("./BlogPage")),
  PostPage: lazy(() => import("./PostPage")),
};
export default lazyPages;
