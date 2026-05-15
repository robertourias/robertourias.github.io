/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default config;
