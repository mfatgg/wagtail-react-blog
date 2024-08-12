import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPage } from "../utils.js";
import LazyPages from "./LazyPages.js";
import LoadingScreen from "./LoadingScreen.jsx";

function PageProxy(props) {
  const location = useLocation();
  const [pageView, setPageView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const data = await getPage(location.pathname);
        const { pageType } = data;
        const PageComponent = LazyPages[pageType];
        const view = <PageComponent {...props} {...data} />;
        setPageView(view);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      setLoading(false);
    };

    fetchPageData();
  }, [location, props]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (pageView) {
    return (
      <React.Suspense fallback={<LoadingScreen />}>{pageView}</React.Suspense>
    );
  }
  return <div>Error when loading content</div>;
}

export default PageProxy;
