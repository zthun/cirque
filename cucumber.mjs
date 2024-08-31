import { register } from "node:module";
import { pathToFileURL } from "node:url";
register("ts-node/esm", pathToFileURL("./"));

export default {
  import: ["packages/**/features/**/*.mts"],
  paths: ["packages/**/features/**/*.feature"],
};
