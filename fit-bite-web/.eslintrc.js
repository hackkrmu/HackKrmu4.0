module.exports = {
  env: {
    browser:true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "next/core-web-vitals"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["*.mjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react"],
  rules: { 
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
     // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],},
  settings: {
    react: {
      version: "detect",
    },
  },
};
