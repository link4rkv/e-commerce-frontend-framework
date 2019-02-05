import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

import { ServerStyleSheet } from 'styled-components'

const {
  publicRuntimeConfig: { GOOGLE_MAPS_API_KEY },
} = getConfig()

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {this.props.styleTags}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href="https://storage.googleapis.com/zopsmart-uploads-thor/originals/20190116/zs-20190116-065518.png"
            type="image/x-icon"
          />
          <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,drawing`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
