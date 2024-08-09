import React from "react";
import { screen, render } from "@testing-library/react";
import camelcaseKeys from "camelcase-keys";
import { MemoryRouter } from "react-router-dom";
import BlogPage from "./BlogPage.jsx";
import blogPageData from "./mockData.js";
import PostPageCardContainer from "./PostPageCardContainer.jsx";
import SideBar from "./SideBar.jsx";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("./PostPageCardContainer.jsx", () => ({
  PostPageCardContainer: jest.fn(({ children }) => (
    <div data-testid="PostPageCardContainer">{children}</div>
  )),
}));

jest.mock("./SideBar.jsx", () => ({
  SideBar: jest.fn(({ children }) => (
    <div data-testid="SideBar">{children}</div>
  )),
}));

test("BlogPage Test", () => {
  const data = camelcaseKeys(blogPageData, { deep: true });

  const { asFragment } = render(
    <MemoryRouter>
      <BlogPage {...data} />
    </MemoryRouter>
  );

  expect(screen.queryByTestId("PostPageCardContainer")).toBeInTheDocument();
  expect(PostPageCardContainer).toHaveBeenCalledWith(data, expect.anything());

  expect(screen.queryByTestId("SideBar")).toBeInTheDocument();
  expect(SideBar).toHaveBeenCalledWith(data, expect.anything());

  expect(asFragment()).toMatchSnapshot();
});
