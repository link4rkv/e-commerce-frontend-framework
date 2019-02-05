require('dotenv-safe').config()
const withCSS = require('@zeit/next-css')

const { ANALYZE } = process.env

module.exports = withCSS({
  // Will only be available on the server side
  serverRuntimeConfig: {},
  // Will be available on both server and client
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },

  webpack: function(config, { isServer }) {
    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      )
    }

    return config
  },
})
