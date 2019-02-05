module.exports = {
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    development: {
      presets: ['next/babel'],
    },
    production: {
      presets: ['next/babel'],
    },
    test: {
      presets: ['@babel/preset-env', '@babel/react'],
    },
  },
}
