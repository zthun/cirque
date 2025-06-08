import {
  ZJanitorOptionsBuilder,
  ZJanitorOptionsLintBuilder,
} from "@zthun/janitor-options";

const lint = new ZJanitorOptionsLintBuilder()
  .esFile("*.{js,cjs,mjs,ts,mts,tsx}")
  .esFile("packages/**/src/**/*.{js,cjs,mjs,ts,mts,tsx}")
  .htmlFile("packages/**/*.html")
  .markdownFile("*.md")
  .markdownFile("packages/**/*.md")
  .jsonFile("*.json")
  .jsonFile("packages/**/*.json")
  .yamlFile(".circleci/config.yml")
  .generateSpellingFiles()
  .generatePrettyFiles()
  .excludeAll("**/CHANGELOG.md")
  .excludeAll("packages/**/dist/**")
  .excludeAll("packages/**/docs/**")
  .excludeAll("node_modules/**")
  .excludeAll("packages/**/node_modules/**")
  .excludeAll(".yarnrc.yml")
  .excludeAll("yarn.lock")
  .excludeAll("lerna.json")
  .excludeAll(".config/cspell.json")
  .build();

export default new ZJanitorOptionsBuilder().lint(lint).build();
