import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

const config = new ZTypedocConfigBuilder()
  .web()
  .entry("../*")
  .favicon("public/svg/cirque.svg")
  .build();

export default config;
