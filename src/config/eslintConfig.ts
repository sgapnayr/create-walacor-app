export const eslintConfig = {
  extends: ["next/core-web-vitals"],
  rules: {
    eqeqeq: "error",
    curly: "error",
    "no-unused-vars": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "jsx-a11y/accessible-emoji": "warn",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/no-unresolved": "error",
    "no-warning-comments": [
      "warn",
      { terms: ["todo", "fixme", "commented-out"], location: "start" },
    ],
  },
};
