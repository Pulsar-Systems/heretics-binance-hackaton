module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: ["standard", "plugin:node/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
    "node/no-missing-import": "off",
    "node/no-unpublished-import": "off",
    "promise/param-names": "off",
    "spaced-comment": "off",
    "no-process-exit": "off",
    "no-unused-vars": "off",
    "node/no-extraneous-import": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
};
