import React from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'
import { from } from '../lib/Media'

import getConfig from 'next/config'
import Head from 'next/head'

import Layout from '../components/Layout/Layout'
import CategoryCollection from '../components/CategoryCollection/CategoryCollection'
import ProductCollection from '../components/ProductCollection'
import ImageSlideShow from '../components/ImageSlideShow'
import LayoutImage from '../components/LayoutImage'
import LayoutContentBlock from '../components/LayoutContentBlock'

/**
 * Todo use dynamic import
 */

const components = {
  ProductCollection: ProductCollection,
  CategoryCollection: CategoryCollection,
  ImageSlideShow: ImageSlideShow,
  MarketingBanners: ImageSlideShow,
  Image: LayoutImage,
  ContentBlock: LayoutContentBlock,
}

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

const ComponetAdditionalProps = [
  {},
  {},
  {},
  {
    type: 'compact',
  },
  {},
  {},
]

export default class Index extends React.Component {
  static async getInitialProps() {
    const resp = await fetch(`${API_URL}/layout/home`)
    const data = await resp.json()
    return { data }
  }

  constructor(props) {
    super(props)
  }

  getComponent(component) {
    return components[component]
  }

  renderComponent(name, data, config, index) {
    let Comp = this.getComponent(name)
    if (name === 'ImageSlideShow') {
      // additional config needed for customized ImageSlideShow
      config = {
        ...config,
        dots: {
          hideDots: true,
        },
        arrow: {
          hide: true,
          displayFromDesktop: true,
        },
      }
      const Wrapper = styled.div`
        margin-bottom: 2.25rem;
      `
      return (
        <Wrapper>
          <Comp
            data={data}
            config={config}
            {...ComponetAdditionalProps[index]}
          />
        </Wrapper>
      )
    } else if (Comp) {
      return (
        <Comp data={data} config={config} {...ComponetAdditionalProps[index]} />
      )
    }
  }

  render() {
    const { data, organizationData } = this.props

    const content = data.data.page.layouts
    return (
      <React.Fragment>
        <Head>
          <title>
            FairPrice: Online Grocery Shopping & Delivery in Singapore
          </title>
        </Head>
        <StyledLayout organizationData={organizationData}>
          {!content ? (
            <div>Loading...</div>
          ) : (
            content.map((layout, index) => (
              <React.Fragment key={'layout' + index}>
                {this.renderComponent(
                  layout.name,
                  layout.value,
                  layout.data,
                  index
                )}
              </React.Fragment>
            ))
          )}
        </StyledLayout>
      </React.Fragment>
    )
  }
}

Index.defaultProps = { data: {} }

export { components }
