import { register } from "tsx/esm/api";

register();

export default {
  import: ["packages/**/features/**/*.mts"],
  paths: ["packages/**/features/**/*.feature"],
};
