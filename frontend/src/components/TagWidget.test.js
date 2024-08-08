import React from "react";
import { render, screen } from "@testing-library/react";
import camelcaseKeys from "camelcase-keys";
import { MemoryRouter } from "react-router-dom";
import { TagWidget } from "./TagWidget";
import { blogPageData } from "./mockData";

test("TagWidget Test", () => {
  const data = camelcaseKeys(blogPageData, { deep: true });

  const { asFragment } = render(
    <MemoryRouter>
      <TagWidget {...data} />
    </MemoryRouter>
  );

  const { tagsList } = data;

  const el = screen.getByText(tagsList[0].name);
  expect(el.tagName).toEqual("SPAN");

  tagsList.map((tag) => expect(screen.getByText(tag.name)).toBeInTheDocument());

  expect(asFragment()).toMatchSnapshot();
});
