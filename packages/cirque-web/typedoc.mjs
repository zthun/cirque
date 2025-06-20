import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

const config = new ZTypedocConfigBuilder()
  .web()
  .entry("../*")
  .favicon("public/svg/cirque.svg")
  .name("Circus")
  .exclude("../cirque-react")
  .build();

export default config;
