import React, { useState, useEffect } from "react";
import { TributeItem } from "tributejs";
// @ts-ignore
import Tribute from "tributejs/src/Tribute";
import { postRequest, getRequest, classNames, ParamsType } from "../utils";
import { PageContentType } from "./BaseTypes";

const API_BASE = process.env.REACT_APP_API_BASE;

type QueryDataType = {
  url: string;
  contentType: string;
  objectPk: number;
};

type UserValue = {
  userName: string;
};

type Collection = {
  key: string;
  value: string;
};

async function getMentionTribute(
  Tribute: Tribute<{ key: string; value: string }>,
  queryData: QueryDataType
) {
  const { url, ...params } = queryData;
  let tribute;

  try {
    const data = await getRequest(url, params);

    const values: Collection[] = [];
    data.result.forEach((userValue: UserValue) => {
      values.push({
        key: userValue.userName,
        value: userValue.userName,
      });
    });

    tribute = new Tribute({
      values,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return tribute;
}

async function getEmojiTribute(
  Tribute: Tribute<{ key: string; value: string }>
) {
  const url = "https://api.github.com/emojis";
  let tribute;

  try {
    const data = await getRequest(url);

    const values = Object.entries(data).map((key, value) => [key, value]);
    tribute = new Tribute({
      trigger: ":",
      values,
      menuItemTemplate(item: TributeItem<{ key: string; value: string }>) {
        return `<img src="${item.original.value}"/>&nbsp;<small>:${item.original.key}:</small>`;
      },
      selectTemplate(item: TributeItem<{ key: string; value: string }>) {
        return `:${item.original.key}:`;
      },
      menuItemLimit: 5,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return tribute;
}

type CommentFormInterface = {
  pageContent: PageContentType;
  refreshForNewComment: () => void;
};

function CommentForm({
  pageContent,
  refreshForNewComment,
}: CommentFormInterface) {
  const { id: objectPk, contentTypeStr: contentType } = pageContent;

  const commentInput = React.useRef(null);
  const [displayCommentForm, setDisplayCommentForm] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [commentFormSetup, setCommentFormSetup] = useState(false);

  useEffect(() => {
    if (displayCommentForm && !commentFormSetup) {
      const queryData: QueryDataType = {
        url: `${API_BASE}/api/v1/comment-mentions/`,
        contentType,
        objectPk,
      };

      import("tributejs").then((Tribute) => {
        getMentionTribute(Tribute.default, queryData).then((tribute) => {
          if (tribute) {
            tribute.attach(commentInput.current);
          }
        });
        getEmojiTribute(Tribute.default).then((tributeEmoji) => {
          if (tributeEmoji) {
            tributeEmoji.attach(commentInput.current);
          }
        });
        setCommentFormSetup(true);
      });
    }
  });

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true);
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.contentType = contentType;
    formDataObj.objectPk = String(objectPk);

    const form = event.target;
    postRequest(`${API_BASE}/api/v1/comments/`, formDataObj as ParamsType).then(
      () => {
        form.reset();
        refreshForNewComment();
        setIsPosting(false);
      }
    );
  };

  if (displayCommentForm) {
    return (
      <div className="mb-4">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              htmlFor="user_name"
            >
              Username
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                id="user_name"
                name="user_name"
                type="text"
                placeholder="Username"
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              htmlFor="user_email"
            >
              Email
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                id="user_email"
                name="user_email"
                type="email"
                placeholder="Email"
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              htmlFor="comment"
            >
              Comment
              <textarea
                id="comment"
                name="comment"
                rows={6}
                ref={commentInput}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </label>
          </div>

          <button
            type="submit"
            className={classNames(
              isPosting ? "pointer-events-none" : "",
              "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg "
            )}
            onClick={() => setDisplayCommentForm(true)}
          >
            {isPosting ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg "
        onClick={() => setDisplayCommentForm(true)}
      >
        Write Comment
      </button>
    </div>
  );
}

export default CommentForm;