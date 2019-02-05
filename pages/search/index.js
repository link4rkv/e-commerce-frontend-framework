import React from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'
import Head from 'next/head'
import Filter from '../../components/Filter/Filter'
import Sort from '../../components/Sort/Sort'
import Layout from '../../components/Layout'
import ProductCollection from '../../components/ProductCollection'
import EmptySearch from '../../components/Error/EmptySearchResult'
import { from } from '../../lib/Media'

import { filterDummyData, sortDummyData } from '../../mocks'

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
const StyledHeader = styled.h2`
  color: #333333;
  font-size: 1.1rem;
  line-height: 1.33;
  font-weight: bold;
`

const StyledProductCount = styled.span`
  color: #696969;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1.33;
  display: block;
  margin-bottom: 0.5rem;
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
  padding-top: 2rem;
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

export default class SearchPage extends React.Component {
  static async getInitialProps({ query }) {
    if (Object.keys(query).length && query.query) {
      const resp = await fetch(`${API_URL}/product?q=${query.query}`)
      const data = await resp.json()
      return { data, query }
    } else {
      return { data: {}, query }
    }
  }

  render() {
    const { data, organizationData, query } = this.props

    const content = data && data.data && data.data.product
    const productCount = (data && data.data && data.data.count) || 0
    return productCount ? (
      <React.Fragment>
        <Head>
          <title>Search:{query.query} | FairPrice</title>
        </Head>
        <StyledLayout
          organizationData={organizationData}
          noWrapper="fromDesktop"
        >
          <PlainDivForMobileAndTablet>
            <StyledHeader>Results for &ldquo;{query.query}&rdquo;</StyledHeader>
            <StyledProductCount>{`${productCount} ${
              productCount > 1 ? 'items' : 'item'
            }`}</StyledProductCount>
            <FilterAndSortContainer>
              <Filter data={filterDummyData} />
              <Sort data={sortDummyData} />
            </FilterAndSortContainer>
            {content && (
              <ProductCollection
                data={{ collection: data.data }}
                hideSeeAllButton
                infiniteScrolling={false}
                config={{
                  layoutType: 'GRID',
                }}
              />
            )}
          </PlainDivForMobileAndTablet>
          <PlainDivForDesktopAndHd>
            <FilterAndSortContainer>
              <Sort data={sortDummyData} />
              <Filter data={filterDummyData} />
            </FilterAndSortContainer>
            <PlainDiv>
              <StyledHeader>
                Results for &ldquo;{query.query}&rdquo;
              </StyledHeader>
              <StyledProductCount>{`${productCount} ${
                productCount > 1 ? 'items' : 'item'
              }`}</StyledProductCount>
              {content && (
                <ProductCollection
                  data={{ collection: data.data }}
                  hideSeeAllButton
                  infiniteScrolling={false}
                  config={{
                    layoutType: 'GRID',
                  }}
                />
              )}
            </PlainDiv>
          </PlainDivForDesktopAndHd>
        </StyledLayout>
      </React.Fragment>
    ) : (
      <EmptySearch />
    )
  }
}

SearchPage.defaultProps = { data: {} }
