import camelcaseKeys from "camelcase-keys";
import querystring from "query-string";
import snakecaseKeys from "snakecase-keys";

const API_BASE = process.env.REACT_APP_API_BASE;

type HeadersType = {
  [key: string]: string;
};

export type ParamsType = Record<string, string | number | undefined>;

type OptionsType = {
  headers: HeadersType;
};

export async function getRequest(
  url: string,
  params?: ParamsType,
  options?: OptionsType
) {
  let paramsOrEmpty = params || {};
  paramsOrEmpty = snakecaseKeys(paramsOrEmpty, { deep: true });

  let headers = options?.headers || {};
  headers = {
    "Content-Type": "application/json",
    ...headers,
  };
  const queryString = querystring.stringify(paramsOrEmpty);
  const res = await fetch(`${url}?${queryString}`, { headers });

  const data = await res.json();
  return camelcaseKeys(data, { deep: true });
}

export async function getPage(
  path?: string,
  params?: ParamsType,
  options?: OptionsType
) {
  const paramsOrEmpty = params || {};
  let relativePath = path;
  if (relativePath?.indexOf("/") !== 0) {
    relativePath = `/${relativePath}`;
  }

  return getRequest(`${API_BASE}${relativePath}`, paramsOrEmpty, options);
}

export async function getPagePreview(
  contentType: string,
  token: string,
  params: ParamsType,
  options: OptionsType
) {
  let paramsOrEmpty = params || {};
  paramsOrEmpty = {
    contentType,
    token,
    ...paramsOrEmpty,
  };

  return getRequest(
    `${API_BASE}/api/v1/cms/page_preview/`,
    paramsOrEmpty,
    options
  );
}

export async function postRequest(
  url: string,
  params?: ParamsType,
  options?: OptionsType
) {
  let paramsOrEmpty = params || {};
  paramsOrEmpty = snakecaseKeys(paramsOrEmpty, { deep: true });

  let headers = options?.headers || {};
  headers = {
    "Content-Type": "application/json",
    ...headers,
  };
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(paramsOrEmpty),
  });

  const data = await res.json();
  return camelcaseKeys(data, { deep: true });
}

export function convertWagtailUrlToRelative(url: string) {
  if (API_BASE) {
    return url.replace(API_BASE, "");
  }
  return url;
}

export function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}
