import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";

import success from "./success.tsx";
import cancel from "./cancel.tsx";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/success" Component={success} />
          <Route path="/cancel" Component={cancel} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
