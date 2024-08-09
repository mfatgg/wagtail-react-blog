import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import PageProxy from "./components/PageProxy.jsx";
import SearchPage from "./components/SearchPage.jsx";
import PreviewPage from "./components/PreviewPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search/" element={<SearchPage />} />
        <Route path="/_preview/" element={<PreviewPage />} />
        <Route path="*" element={<PageProxy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
