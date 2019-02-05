import React, { Component } from 'react'
import PageLayoutGenerator from '../../components/PageLayoutGenerator'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const StaticPageStyle = styled(Layout)`
  main > div {
    padding: 0;
  }
`

class StaticPages extends Component {
  static async getInitialProps({ query }) {
    let response = await fetch(`${API_URL}/layout/page?url=${query.title}`)
    response = await response.json()
    const data = response.data.page.layouts
    const title = response.data.page.name
    return { data, title }
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StaticPageStyle noWrapper="fromDesktop">
        <React.Fragment>
          <PageLayoutGenerator
            data={this.props.data}
            title={this.props.title}
          />
        </React.Fragment>
      </StaticPageStyle>
    )
  }
}

export default StaticPages
