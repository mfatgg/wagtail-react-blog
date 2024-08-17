import React from "react";
import TagWidget from "./TagWidget";
import CategoryWidget from "./CategoryWidget";
import SearchForm from "./SearchForm";
import BookCard from "./BookCard";
import { CategoriesListType, TagsListType } from "./BaseTypes";

export type SideBarInterface = CategoriesListType & TagsListType;

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
