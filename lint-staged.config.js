module.exports = {
  linters: {
    '**/*.+(js|jsx|css|sass|less|yml|yaml|scss)': [
      'eslint --fix',
      'prettier --write',
      'stylelint',
      'git add',
    ],
    '**/*.+(md)': ['prettier --write', 'git add'],
  },
}
