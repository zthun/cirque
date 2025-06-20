import {
  ZJanitorOptionsBuilder,
  ZJanitorOptionsLintBuilder,
} from "@zthun/janitor-options";

const lint = new ZJanitorOptionsLintBuilder()
  .commonEsFiles()
  .commonHtmlFiles()
  .commonMarkdownFiles()
  .commonJsonFiles()
  .commonYamlFiles()
  .generateSpellingFiles()
  .generatePrettyFiles()
  .commonExcludes()
  .build();

export default new ZJanitorOptionsBuilder().lint(lint).build();
