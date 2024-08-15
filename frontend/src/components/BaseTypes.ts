import { StreamFieldType } from "./StreamField/StreamField";
import { ImageType } from "./BaseImage";

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
