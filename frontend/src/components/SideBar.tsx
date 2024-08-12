import React from "react";
import TagWidget, { TagsList } from "./TagWidget";
import CategoryWidget, { CategoriesList } from "./CategoryWidget";
import SearchForm from "./SearchForm";
import BookCard from "./BookCard";

export type SideBarInterface = CategoriesList & TagsList;

function SideBar({ categoriesList, tagsList }: SideBarInterface) {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-4/12 px-2">
      <SearchForm />
      <CategoryWidget categoriesList={categoriesList} />
      <TagWidget tagsList={tagsList} />
      <BookCard />
    </div>
  );
}

export default SideBar;
