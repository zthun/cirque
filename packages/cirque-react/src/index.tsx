import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ZTodoApp } from "./todo/todo-app.js";

const root = document.getElementById("zthunworks-circus") as HTMLElement;

const container = createRoot(root);

container.render(
  <StrictMode>
    <ZTodoApp />
  </StrictMode>,
);
