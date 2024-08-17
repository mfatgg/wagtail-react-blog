import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPage } from "../utils";
import LoadingScreen from "./LoadingScreen";
import getViewByPageType from "./LazyPages";

type PageProxyInterface = Record<string, object>;

function PageProxy(props: PageProxyInterface) {
  const location = useLocation();
  const [pageView, setPageView] = useState<React.JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const data = await getPage(location.pathname);
        const { pageType } = data;
        const view = getViewByPageType(pageType, props, data);
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
