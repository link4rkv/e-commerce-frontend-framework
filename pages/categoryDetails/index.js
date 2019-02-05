import React, { Component } from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Text from '../../components/Text/Text'
import { components } from '../index'

import Filter from '../../components/Filter/Filter'
import Sort from '../../components/Sort/Sort'
import { filterDummyData, sortDummyData } from '../../mocks'

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
const Heading = styled.h1`
  margin-bottom: 1rem;
  text-transform: capitalize;
`

const FilterAndSortContainer = styled.div`
  display: flex;
  margin: 1.125rem 0rem;
  ${from('desktop')} {
    flex-direction: column;
    margin: 0rem;
    margin-right: 2rem;
    > div:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`

const PlainDiv = styled.div`
  width: 100%; /* IE 11 */
  display: block;
  ${from('desktop')} {
    padding-top: 2rem;
  }
`

const PlainDivForMobileAndTablet = styled.div`
  display: block;
  ${from('desktop')} {
    display: none;
  }
`

const PlainDivForDesktopAndHd = styled.div`
  display: none;
  ${from('desktop')} {
    display: flex;
  }
`

class CategoryDetails extends Component {
  static async getInitialProps({ query }) {
    const layouts = await (await fetch(
      `${API_URL}/layout/category?url=${query.slug}`
    )).json()
    return { layouts }
  }

  constructor(props) {
    super(props)
    this.renderComponent = this.renderComponent.bind(this)
  }

  renderComponent(component, data, config) {
    let Component = components[component]
    if (Component) {
      return <Component data={data} config={config} hideSeeAllButton />
    }
  }

  render() {
    const { layouts, organizationData } = this.props
    const details = layouts.data.page.layouts || []
    const name = layouts.data.page.layouts[0].data.category
    return (
      <React.Fragment>
        <Head>
          <title>{name} | FairPrice Singapore</title>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${name} | FairPrice Singapore`} />
          <meta property="og:site_name" content="FairPrice" />
        </Head>
        <StyledLayout organization={organizationData} noWrapper="fromDesktop">
          <PlainDivForMobileAndTablet>
            <Heading>
              <Text size="xl" weight="bold">
                {name && name.toLowerCase()}
              </Text>
            </Heading>
            <FilterAndSortContainer>
              <Filter data={filterDummyData} />
              <Sort data={sortDummyData} />
            </FilterAndSortContainer>
            <PlainDiv>
              {details &&
                details.map((layout, i) => (
                  <React.Fragment key={`category-layout-${i}`}>
                    {this.renderComponent(
                      layout.name,
                      layout.value,
                      layout.data
                    )}
                  </React.Fragment>
                ))}
            </PlainDiv>
          </PlainDivForMobileAndTablet>
          <PlainDivForDesktopAndHd>
            <FilterAndSortContainer>
              <Sort data={sortDummyData} />
              <Filter data={filterDummyData} />
            </FilterAndSortContainer>
            <PlainDiv>
              <Heading>
                <Text size="xl" weight="bold">
                  {name && name.toLowerCase()}
                </Text>
              </Heading>
              <div>
                {details &&
                  details.map((layout, i) => (
                    <React.Fragment key={`category-layout-${i}`}>
                      {this.renderComponent(
                        layout.name,
                        layout.value,
                        layout.data
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </PlainDiv>
          </PlainDivForDesktopAndHd>
        </StyledLayout>
      </React.Fragment>
    )
  }
}

export default CategoryDetails
