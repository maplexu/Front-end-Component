module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0, "error", "window"],
    'import/no-unresolved': 'off',
    'import/extensions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
