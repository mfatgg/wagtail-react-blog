import React, { useState, useEffect } from "react";
import useSWR, { mutate, Fetcher } from "swr";
import DOMPurify from "dompurify";
import HtmlReactParser from "html-react-parser";
import CommentForm from "./CommentForm";
import { getPage } from "../utils";
import useOnScreen from "../hooks/useOnScreen";
import { PageContentType } from "./BaseTypes";

type CommentListInterface = {
  pageContent: PageContentType;
};

type CommentType = {
  pk: number;
  userName: string;
  submitDate: string;
  parsedComment: string;
};

type FetcherType = {
  count: number;
};

// https://swr.vercel.app/docs/arguments
const fetcher: Fetcher<FetcherType> = (args: string) => {
  const [url, objectPk, contentType] = args;
  return getPage(url, {
    objectPk,
    contentType,
  });
};

function CommentList({ pageContent }: CommentListInterface) {
  const { id: objectPk, contentTypeStr: contentType } = pageContent;

  const ref = React.useRef(null);
  const isVisible = useOnScreen(ref);

  const [commentsCount, setCommentsCount] = useState(0);
  const [loadComments, setLoadComments] = useState<CommentType[]>([]);

  const COMMENTS_API_URL = "/api/v1/comments/";
  const key = [COMMENTS_API_URL, objectPk, contentType];
  const { data } = useSWR<FetcherType>(key, fetcher);

  const refreshForNewComment = () => {
    mutate(key);
  };

  useEffect(() => {
    if (data && commentsCount !== data.count) {
      setCommentsCount(data.count);
    }
  }, [data, commentsCount]);

  useEffect(() => {
    if (isVisible && loadComments.length !== commentsCount) {
      getPage(COMMENTS_API_URL, {
        limit: 10,
        offset: loadComments.length,
        objectPk,
        contentType,
      }).then((res) => {
        // combine
        let newComments = [...loadComments, ...res.results];

        // sanitize and parse comment for html display
        newComments = newComments.map((item) => {
          const sanitizedData = DOMPurify.sanitize(item.prettyComment);
          const parsedData = HtmlReactParser(sanitizedData);
          return { ...item, parsedComment: parsedData };
        });

        setLoadComments(newComments);
      });
    }
  }, [
    isVisible,
    commentsCount,
    loadComments,
    objectPk,
    contentType,
    COMMENTS_API_URL,
  ]);

  return (
    <div className="dark:text-gray-300">
      {loadComments.map((commentObj) => (
        <div className="flex my-4" key={commentObj.pk}>
          {/* eslint-disable-next-line */}
          <div className="flex-none">
            <img
              width={64}
              height={64}
              src="http://via.placeholder.com/64"
              alt="Generic placeholder"
              className="flex-none"
            />
          </div>
          <div className="ml-3">
            <div className="comment-date">
              <strong className="text-primary">{commentObj.userName}</strong>{" "}
              <small>{new Date(commentObj.submitDate).toString()}</small>
            </div>
            {commentObj.parsedComment}
          </div>
        </div>
      ))}
      <div ref={ref} />
      <CommentForm
        refreshForNewComment={refreshForNewComment}
        pageContent={pageContent}
      />
    </div>
  );
}

export default CommentList;