import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import querystring from "query-string";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { getPage, convertWagtailUrlToRelative } from "../utils";

type SearchQueryType = string | readonly string[] | number;

type LoadResultsType = {
  id: number;
  meta: {
    detailUrl: string;
    htmlUrl: string;
    type: string;
  };
  title: string;
}[];

type StateType = {
  searchQuery: SearchQueryType;
  inputSearch: SearchQueryType;
  loading: boolean;
  hasMore: boolean;
  loadResults: LoadResultsType;
  btnSearch: boolean;
};

function SearchPage() {
  const location = useLocation();
  const [state, setState] = useState<StateType>({
    searchQuery: "",
    inputSearch: "",
    loading: true,
    hasMore: false,
    loadResults: [],
    btnSearch: false,
  });
  const { searchQuery, inputSearch, loading, hasMore, loadResults, btnSearch } =
    state;

  const queryParams = querystring.parse(location.search) || "";
  const searchQueryString = queryParams.query as SearchQueryType;

  useEffect(() => {
    // When page load with querystring, we set searchQuery
    if (searchQueryString && !searchQuery && !btnSearch) {
      setState((stateSetting) => ({
        ...stateSetting,
        searchQuery: searchQueryString,
        inputSearch: searchQueryString,
      }));
    }
  }, [searchQueryString, searchQuery, btnSearch]);

  useEffect(() => {
    // if searchQuery is available, we can query search results
    if (searchQuery && loading) {
      const params = {
        search: searchQuery,
        type: "blog.PostPage",
        offset: loadResults.length,
        limit: 2,
      };
      getPage("/api/v1/cms/pages/", params).then((res) => {
        const data = res;
        const newResults = [...loadResults, ...data.items];
        const hasMoreSetting = data.meta.totalCount > newResults.length;

        setState((stateSetting) => ({
          ...stateSetting,
          loading: false,
          loadResults: newResults,
          hasMore: hasMoreSetting,
        }));
      });
    }
  }, [searchQuery, loading, loadResults]);

  const handleLoadMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setState((stateSetting) => ({
      ...stateSetting,
      loading: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState((stateSetting) => ({
      ...stateSetting,
      btnSearch: true,
      searchQuery: inputSearch,
      loading: true,
      hasMore: false,
      loadResults: [],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap py-4">
          <main
            role="main"
            className="w-full sm:w-2/3 md:w-3/4 lg:w-8/12 px-2 mb-4 mx-auto"
          >
            <div>
              <h1 className="text-center text-4xl mb-4">Search</h1>

              <form onSubmit={handleSubmit} className="mb-4">
                <div className="relative text-gray-700">
                  <input
                    className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search"
                    type="search"
                    defaultValue={inputSearch}
                    onChange={(e) => {
                      const { value } = e.target;
                      setState((stateSetting) => ({
                        ...stateSetting,
                        inputSearch: value,
                      }));
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-500 rounded-r-lg border-blue-500 hover:bg-blue-600"
                  >
                    Go
                  </button>
                </div>
              </form>

              {loadResults.length === 0 && !loading && (
                <div className="dark:text-gray-300">No Results Found</div>
              )}

              {loadResults.length > 0 && (
                <div className="w-full border rounded-lg mb-4 overflow-hidden border-opacity-75 border-gray-300 dark:border-gray-500">
                  <ul className="divide-y-2 divide-gray-100 dark:divide-gray-500 border-opacity-75">
                    {loadResults.map((searchResult) => (
                      <Link
                        to={convertWagtailUrlToRelative(
                          searchResult.meta.htmlUrl
                        )}
                        key={searchResult.id}
                        className="block p-3 hover:bg-gray-200 hover:underline cursor-pointer dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-900"
                      >
                        {searchResult.title}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}

              {hasMore && (
                <button
                  type="submit"
                  onClick={handleLoadMoreClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Load More
                </button>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
