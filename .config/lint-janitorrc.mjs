const generated = [
  "**/CHANGELOG.md",
  "packages/**/dist/**",
  "packages/**/docs/**",
  "node_modules/**",
  "packages/**/node_modules/**",
  "package-lock.json",
  ".yarnrc.yml",
];
const partialGenerated = ["cspell.json", "lerna.json"];

const esFiles = [
  "*.ts",
  "packages/**/src/**/*.ts",
  "packages/**/src/**/*.tsx",
  "packages/**/src/**/*.mts",
];
const htmlFiles = ["packages/**/*.html"];
const markdownFiles = ["*.md", "packages/**/*.md"];
const jsonFiles = ["*.json", "packages/**/*.json"];
const yamlFiles = [".circleci/config.yml"];
const prettyFiles = []
  .concat(esFiles)
  .concat(htmlFiles)
  .concat(markdownFiles)
  .concat(jsonFiles)
  .concat(yamlFiles);
const spellingFiles = []
  .concat(esFiles)
  .concat(htmlFiles)
  .concat(markdownFiles)
  .concat(jsonFiles)
  .concat(yamlFiles);

const esFilesExclude = generated;
const htmlFilesExclude = generated;
const markdownFilesExclude = generated;
const jsonFilesExclude = generated;
const yamlFilesExclude = generated;
const prettyFilesExclude = generated.concat(partialGenerated);
const spellingFilesExclude = generated.concat(partialGenerated);

export default {
  esFiles,
  esFilesExclude,
  htmlFiles,
  htmlFilesExclude,
  jsonFiles,
  jsonFilesExclude,
  markdownFiles,
  markdownFilesExclude,
  prettyFiles,
  prettyFilesExclude,
  spellingFiles,
  spellingFilesExclude,
  yamlFiles,
  yamlFilesExclude,
};
