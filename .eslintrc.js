const config = require('@zthun/lint-janitor-config/eslint-react');
config.rules['@typescript-eslint/no-empty-interface'] = 'off';
config.rules['@typescript-eslint/no-non-null-assertion'] = 'off';
module.exports = config;
