import React from "react";
import { useLocation, Link, Location } from "react-router-dom";
import PostPageCard from "./PostPageCard";
import { classNames } from "../utils";
import { PaginatorType, FilterMetaType } from "./BaseTypes";
import { PostDetailInterface } from "./PostDetail";

export type PostPageCardContainerInterface = {
  childrenPages: PostDetailInterface[];
  paginator: PaginatorType;
  filterMeta: FilterMetaType;
};

function getPageItems(paginator: PaginatorType, location: Location) {
  const { currentPage, numPages } = paginator;
  const items = [];

  const curPath = location.pathname;

  let prePageUrl;
  let nextPageUrl;
  if (curPath.match(/\/page-[0-9]+/)) {
    prePageUrl = curPath.replace(/\/page-[0-9]+/, `/page-${currentPage - 1}`);
    nextPageUrl = curPath.replace(/\/page-[0-9]+/, `/page-${currentPage + 1}`);
  } else {
    prePageUrl = `${curPath}/page-${currentPage - 1}`.replace("//", "/");
    nextPageUrl = `${curPath}/page-${currentPage + 1}`.replace("//", "/");
  }

  items.push(
    <li key={prePageUrl}>
      <Link
        to={prePageUrl}
        className={classNames(
          currentPage <= 1
            ? "pointer-events-none text-gray-300"
            : "text-blue-500 dark:text-white",
          "inline-block py-2 px-4 bg-white  border border-gray-300 ",
          "border-r-0 rounded-l-lg hover:bg-blue-500 hover:text-white ",
          "dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-blue-500 dark:hover:text-white"
        )}
      >
        Prev
      </Link>
    </li>
  );

  items.push(
    <li key={nextPageUrl}>
      <Link
        to={nextPageUrl}
        className={classNames(
          currentPage >= numPages
            ? "pointer-events-none text-gray-300"
            : "text-blue-500 dark:text-white ",
          "inline-block py-2 px-4 bg-white  border border-gray-300 ",
          "rounded-r-lg hover:bg-blue-500 hover:text-white ",
          "dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-blue-500 dark:hover:text-white"
        )}
      >
        Next
      </Link>
    </li>
  );

  return items;
}

function getFilterMsg(filterMeta: FilterMetaType) {
  if (filterMeta.filterType) {
    return (
      <div
        className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded-lg mb-4"
        role="alert"
      >
        <p>
          {filterMeta.filterType}: {filterMeta.filterTerm}
        </p>
      </div>
    );
  }
  return "";
}

function PostPageCardContainer({
  childrenPages,
  paginator,
  filterMeta,
}: PostPageCardContainerInterface) {
  const location = useLocation();
  const pageItems = getPageItems(paginator, location);
  const filterMsg = getFilterMsg(filterMeta);

  return (
    <main role="main" className="w-full sm:w-2/3 md:w-3/4 lg:w-8/12 px-2 mb-4">
      {filterMsg}

      {childrenPages.map((post) => (
        <PostPageCard post={post} key={post.pageContent.id} />
      ))}

      <nav aria-label="Page navigation">
        <ul className="flex pl-0 rounded list-none flex-wrap">{pageItems}</ul>
      </nav>
    </main>
  );
}

export default PostPageCardContainer;
