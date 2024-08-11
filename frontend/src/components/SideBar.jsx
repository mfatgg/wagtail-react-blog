import React from "react";
import TagWidget from "./TagWidget.tsx";
import CategoryWidget from "./CategoryWidget.jsx";
import SearchForm from "./SearchForm.jsx";
import BookCard from "./BookCard.jsx";

function SideBar(props) {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-4/12 px-2">
      <SearchForm {...props} />
      <CategoryWidget {...props} />
      <TagWidget {...props} />
      <BookCard />
    </div>
  );
}

export default SideBar;
