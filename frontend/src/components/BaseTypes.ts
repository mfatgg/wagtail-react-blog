export type DictionaryType = { [key: string]: string };

export type ImageType = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type ImageTextType = {
  text: string;
  image: ImageType;
  reverse: boolean;
};

export type StreamFieldType = {
  type: string;
  value: string | ImageType[] | ImageTextType;
  id: string;
};

export type PageContentType = {
  id: number;
  slug: string;
  title: string;
  url: string;
  lastPublishedAt: string;

  tags: {
    name: string;
    slug: string;
    id: number;
  }[];
  categories: {
    name: string;
    slug: string;
    id: number;
  }[];

  body: StreamFieldType[];
  headerImage: ImageType;
  contentTypeStr: string;
};

export type PaginatorType = {
  currentPage: number;
  numPages: number;
};

export type FilterMetaType = {
  filterType: string | null;
  filterTerm: string | null;
};

export type TagType = {
  name: string;
  slug: string;
  url: string;
};

export type TagsListType = {
  tagsList: TagType[];
};

export type CategoryType = {
  name: string;
  slug: string;
  url: string;
};

export type CategoriesListType = {
  categoriesList: CategoryType[];
};
