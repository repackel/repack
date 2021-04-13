module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "parser": "vue-eslint-parser",
  "extends": ["plugin:vue/base"],
  "parserOptions": {
    "parser": 'babel-eslint',
    "ecmaVersion": 6
  },
  "rules": {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}