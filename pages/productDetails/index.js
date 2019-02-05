import React from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'
import Head from 'next/head'

import Layout from '../../components/Layout/Layout'

import ProductDetails from '../../components/ProductDetails/ProductDetails'

import { from } from '../../lib/Media'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const StyledLayout = styled(Layout)`
  > main {
    margin-top: 4rem;
    ${from('desktop')} {
      margin-top: 0;
    }
  }
`

class Product extends React.Component {
  static async getInitialProps({ query }) {
    const product = await (await fetch(
      `${API_URL}/layout/product?url=${query.slug}`
    )).json()
    const category = product.data.page.layouts[0].value.categories[0].slug
    const similar = await (await fetch(
      `${API_URL}/product?category=${category}`
    )).json()
    return { product, similar }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { product, organizationData } = this.props
    const details = product.data.page.layouts[0].value
    const { name, description, images } = details

    return (
      <React.Fragment>
        <Head>
          <title>{name} | FairPrice Singapore</title>
          <meta name="description" content={description} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${name} | FairPrice Singapore`} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={images[0]} />
          <meta property="og:site_name" content="FairPrice" />
        </Head>

        <StyledLayout
          organizationData={organizationData}
          noWrapper="fromMobile"
        >
          <ProductDetails data={this.props} />
        </StyledLayout>
      </React.Fragment>
    )
  }
}

Product.defaultProps = {}

export default Product
