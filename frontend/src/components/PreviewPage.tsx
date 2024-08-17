import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPagePreview } from "../utils";
import getViewByPageType from "./LazyPages";
import LoadingScreen from "./LoadingScreen";
import { DictionaryType } from "./BaseTypes";

type PreviewPageInterface = Record<string, object>;

function PreviewPage(props: PreviewPageInterface) {
  const location = useLocation();
  const [pageView, setPageView] = useState<React.JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      // convert querystring to dict
      const querystring = location.search.replace(/^\?/, "");
      const params: DictionaryType = {};
      querystring.replace(/([^=&]+)=([^&]*)/g, (m, key, value) => {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
        return m;
      });

      const { content_type: contentType, token } = params;
      setLoading(true);
      try {
        const data = await getPagePreview(
          contentType as string,
          token as string
        );

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

export default PreviewPage;
