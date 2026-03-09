import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    "rules": {
      "no-unused-vars": "off", // Ignore unused variables
      "@typescript-eslint/no-unused-vars": "off", // Ignore TypeScript unused vars
      "quotes": "off", // Ignore single/double quotes
      "react/no-unescaped-entities": "off" // Ignore unescaped characters like apostrophes
    },
  }),
]

export default eslintConfig