import React from "react";
import PostDetail, { PostDetailInterface } from "./PostDetail";
import SideBar, { SideBarInterface } from "./SideBar";
import TopNav from "./TopNav";
import Footer from "./Footer";

export type PostPageInterface = {
  pageType: "PostPage";
} & SideBarInterface &
  PostDetailInterface;

function PostPage(props: PostPageInterface) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap py-4">
          <PostDetail {...props} />
          <SideBar {...props} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PostPage;
