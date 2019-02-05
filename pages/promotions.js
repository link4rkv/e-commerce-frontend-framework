import React from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'
import Head from 'next/head'
import Link from 'next/link'

import Filter from '../components/Filter/Filter'
import Sort from '../components/Sort/Sort'
import Layout from '../components/Layout'
import ProductCollection from '../components/ProductCollection'
import Carousel from './../components/Carousel'
import Text from './../components/Text'
import { from } from '../lib/Media'

import {
  filterDummyData,
  sortDummyData,
  createPromotionalFilters,
} from '../mocks'

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

const FilterAndSortContainer = styled.div`
  display: flex;
  margin: 1.125rem 0rem;
  ${from('desktop')} {
    flex-direction: column;
    margin: 0rem;
    > div:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`

const PlainDiv = styled.div`
  width: 100%; /* IE 11 */
  display: block;
  padding-top: 2rem;
  padding-right: 2rem;
  padding-left: 2rem;
  overflow-y: hidden;
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

const StyledPromotions = styled.ul`
  a {
    text-decoration: none;

    background-color: white;
    color: #1557bf;

    display: block;
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;

    border-radius: 4px;
    border-color: #eaeaea;
  }

  li {
    display: inline-block;
    white-space: normal;
    vertical-align: top;
  }
`

export const PromotionalCarousel = ({
  promotions = createPromotionalFilters(),
}) => (
  <section data-testid="promotions">
    <StyledPromotionsTitle>
      <Text size="xl">Promotions</Text>
    </StyledPromotionsTitle>
    <StyledPromotions>
      <Carousel infiniteScrolling hasMore>
        {promotions.map(({ slug, name }) => (
          <li key={slug}>
            <Link href={`/promotions?promo=${slug}`} passHref>
              <a>
                <Text size="medium">{name}</Text>
              </a>
            </Link>
          </li>
        ))}
      </Carousel>
    </StyledPromotions>
  </section>
)

const StyledPromotionsTitle = styled.h2`
  margin-bottom: 1rem;
`

export default class SearchPage extends React.Component {
  static async getInitialProps({ query }) {
    const resp = await fetch(`${API_URL}/product?q=milk`)
    const data = await resp.json()
    return { data, query }
  }

  render() {
    const { data, organizationData, query } = this.props

    const content = data && data.data && data.data.product
    console.log(data)
    console.log(content)
    return (
      <React.Fragment>
        <Head>
          <title>Search:{query.query} | FairPrice</title>
        </Head>
        <StyledLayout
          organizationData={organizationData}
          noWrapper="fromDesktop"
          hideCheckoutAddress
        >
          <PlainDivForMobileAndTablet>
            <PromotionalCarousel />
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
              <PromotionalCarousel />
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
    )
  }
}

SearchPage.defaultProps = { data: {} }
