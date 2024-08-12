import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPagePreview } from "../utils.js";
import LazyPages from "./LazyPages.js";
import LoadingScreen from "./LoadingScreen.jsx";

function PreviewPage(props) {
  const location = useLocation();
  const [pageView, setPageView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      // convert querystring to dict
      const querystring = location.search.replace(/^\?/, "");
      const params = {};
      querystring.replace(/([^=&]+)=([^&]*)/g, (m, key, value) => {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });

      const { content_type: contentType, token } = params;
      setLoading(true);
      try {
        const data = await getPagePreview(contentType, token);

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
    return <React.Suspense fallback={LoadingScreen}>{pageView}</React.Suspense>;
  }
  return <div>Error when loading content</div>;
}

export default PreviewPage;
