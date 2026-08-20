import { extensionLibrary, projectDom } from "@zthun/janitor-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [projectDom(), extensionLibrary()],
});
