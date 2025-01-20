module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prettier/prettier': 'error',
    'no-multiple-empty-lines': ['error', { max: 2 }],
  },
  ignorePatterns: ['03-files-in-folder/secret-folder/**/*.js'],
}
