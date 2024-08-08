import React, { useState, useEffect } from "react";
import { postRequest, getRequest, classNames } from "../utils";

const API_BASE = process.env.REACT_APP_API_BASE;

async function getMentionTribute(Tribute, queryData) {
  const { url, ...params } = queryData;
  let tribute;

  try {
    const data = await getRequest(url, params);

    const values = [];
    for (const index in data.result) {
      const userValue = data.result[index];
      values.push({
        key: userValue.userName,
        value: userValue.userName,
      });
    }

    tribute = new Tribute({
      values,
    });
  } catch (error) {
    console.error(error);
  }

  return tribute;
}

async function getEmojiTribute(Tribute) {
  const url = "https://api.github.com/emojis";
  let tribute;

  try {
    const data = await getRequest(url);

    const values = [];
    for (const key in data) {
      const value = data[key];
      values.push({
        key,
        value,
      });
    }
    tribute = new Tribute({
      trigger: ":",
      values,
      menuItemTemplate(item) {
        return `<img src="${item.original.value}"/>&nbsp;<small>:${item.original.key}:</small>`;
      },
      selectTemplate(item) {
        return `:${item.original.key}:`;
      },
      menuItemLimit: 5,
    });
  } catch (error) {
    console.error(error);
  }

  return tribute;
}

function CommentForm(props) {
  const { pageContent, refreshForNewComment } = props;
  const { id: objectPk, contentTypeStr: contentType } = pageContent;

  const commentInput = React.useRef();
  const [displayCommentForm, setDisplayCommentForm] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [commentFormSetup, setCommentFormSetup] = useState(false);

  useEffect(() => {
    if (displayCommentForm && !commentFormSetup) {
      const queryData = {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.contentType = contentType;
    formDataObj.objectPk = objectPk;

    const form = e.target;
    postRequest(`${API_BASE}/api/v1/comments/`, formDataObj).then((data) => {
      form.reset();
      refreshForNewComment();
      setIsPosting(false);
    });
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
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
              dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              id="user_name"
              name="user_name"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              htmlFor="user_email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
              dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              id="user_email"
              name="user_email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="6"
              ref={commentInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none
              dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
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
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg "
        onClick={() => setDisplayCommentForm(true)}
      >
        Write Comment
      </button>
    </div>
  );
}

export { CommentForm };
