import React, { Component } from 'react'
import throttle from 'lodash/throttle'
import RecommendedProduct from '../RecommendedProduct/RecommendedProduct'
import CompactProduct from '../CompactProduct/CompactProduct'
import Carousel from '../Carousel'
import { store } from '../CartProvider'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import styled from 'styled-components'
import { from, only } from '../../lib/Media'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const StyledProductCollection = styled.div`
  padding: 0;
  margin: 0 0 2rem;
  ${props => props.horizontal && `position: relative;`}
`

const HorizontalProductCollection = styled.div`
  display: inline-block;
  white-space: normal;
  vertical-align: top;
`

const RecommendedProductHorizontal = styled(HorizontalProductCollection)`
  :not(:last-child) {
    margin-right: 1rem;
  }
  > a {
    width: 10rem;
  }
  ${from('tablet')} {
    > a {
      width: 14rem;
      height: 27.5rem;
    }
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  flex: 1;
  text-align: center;
  padding-right: -0.375rem;
  ${only('mobile')} {
    > a {
      margin: 0 1rem 1rem 0rem;
      width: calc((100% - 2rem) / 2);
    }
  }
  ${only('tablet')} {
    > a {
      margin: 0 1rem 2rem 0rem;
      width: calc((100% - 3rem) / 3);
    }
  }
  ${only('desktop')} {
    > a {
      margin: 0 1rem 1rem 0rem;
      width: calc((100% - 4rem) / 4);
    }
  }
  ${from('hd')} {
    > a {
      margin: 0 1rem 1rem 0rem;
      width: calc((100% - 5rem) / 5);
    }
  }
  ${from('uhd')} {
    > a {
      margin: 0 1rem 1rem 0rem;
      width: calc((100% - 6rem) / 6);
    }
  }
`

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const StyledTitle = styled.div`
  font-weight: 700;
  color: #333333;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
`
const StyledLink = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #1557bf;
  margin-left: auto;
  line-height: 1.5rem;
`

class ProductCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      products:
        (this.props.data &&
          this.props.data.collection &&
          this.props.data.collection.product) ||
        [],
    }

    this.productsCount =
      this.props.data &&
      this.props.data.collection &&
      this.props.data.collection.count

    this.page = 1

    this.onScroll = throttle(this.onScroll, 300)
  }

  componentDidMount() {
    if (
      this.props.config.layoutType !== 'SCROLLER' &&
      this.props.infiniteScrolling
    ) {
      window.addEventListener('scroll', this.onScroll, false)
    }
    if (!this.props.infiniteScrolling) {
      let prods =
        this.state.products &&
        this.state.products.filter(product =>
          product.hasVariants && product.variants[0]
            ? product.variants[0].storeSpecificData
            : product.storeSpecificData
        )
      if (
        prods &&
        prods.length === 0 &&
        this.productsCount &&
        this.state.hasMore
      ) {
        this.loadProducts()
      }
    }
  }

  componentWillUnmount() {
    if (
      this.props.config.layoutType !== 'SCROLLER' &&
      this.props.infiniteScrolling
    ) {
      window.removeEventListener('scroll', this.onScroll, false)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps &&
      prevProps.data &&
      JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
    ) {
      this.setState({
        products:
          this.props.data &&
          this.props.data.collection &&
          this.props.data.collection.product,
      })
    }
    let lastIndex = prevState.products ? prevState.products.length : 0
    let prods =
      this.state.products &&
      this.state.products
        .slice(lastIndex)
        .filter(product =>
          product.hasVariants && product.variants[0]
            ? product.variants[0].storeSpecificData
            : product.storeSpecificData
        )
    if (
      prods &&
      prods.length === 0 &&
      lastIndex !== this.state.products.length &&
      !this.state.isLoading &&
      this.state.hasMore &&
      this.props.infiniteScrolling
    ) {
      this.loadProducts()
    }
  }

  buildQueryString(page, additionalQuery, storeId) {
    let queryString = ''
    queryString += Object.keys(additionalQuery)
      .map(queryParams => `${queryParams}=${additionalQuery[queryParams]}`)
      .join('&')

    queryString += `&page=${page}`

    if (storeId) {
      queryString += `&storeId=${storeId}`
    }

    return queryString
  }

  onScroll = () => {
    const {
      state: { error, isLoading, hasMore },
    } = this

    if (error || isLoading || !hasMore) return null
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      this.setState({ isLoading: true }, this.loadProducts)
    }
  }

  async loadProducts() {
    const page = ++this.page
    let url = this.props.url || 'product'
    let additionalQuery = { ...this.props.config, ...this.props.query }
    let { storeId } = store('checkoutAddress')()

    // query params can be modified from props
    let queryString = this.props.transformConfig
      ? this.props.transformConfig({ ...additionalQuery, page, storeId })
      : this.buildQueryString(page, additionalQuery, storeId)

    try {
      const resp = await fetch(`${API_URL}/${url}?${queryString}`)
      const results = await resp.json()
      const nextProducts =
        results.data.product ||
        results.data.page.layouts.filter(
          layout => layout.name === 'ProductCollection'
        )[0].value.collection.product

      if (nextProducts.length > 0) {
        this.setState({
          hasMore: this.state.products.length <= this.productsCount,
          isLoading: false,
          products: [...this.state.products, ...nextProducts],
        })
      } else {
        this.setState({
          hasMore: false,
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({
        hasMore: false,
        isLoading: false,
      })
    }
  }

  render() {
    const { error, hasMore, isLoading, products } = this.state
    const { type, hideSeeAllButton } = this.props
    const Product = type === 'compact' ? CompactProduct : RecommendedProduct
    let productList =
      products &&
      products.filter(product =>
        product.hasVariants && product.variants[0]
          ? product.variants[0].storeSpecificData
          : product.storeSpecificData
      )
    let productsContainer = ''
    if (this.props.config.layoutType === 'SCROLLER') {
      let WrapperComponent =
        type === 'compact'
          ? HorizontalProductCollection
          : RecommendedProductHorizontal
      productsContainer = (
        <Carousel
          loadChildren={this.loadProducts}
          hasMore={hasMore}
          infiniteScrolling={this.props.infiniteScrolling}
        >
          {productList &&
            productList.map((product, index) => (
              <WrapperComponent key={'product-' + index}>
                <Product
                  data={product}
                  updateCart={this.props.updateCart}
                  cart={this.props.cart}
                  updateIsAddressPresent={this.props.updateIsAddressPresent}
                  details={product}
                  onSave={val => val}
                />
              </WrapperComponent>
            ))}
        </Carousel>
      )
    } else {
      productsContainer = (
        <div>
          <StyledContainer>
            {productList &&
              productList.map((product, index) => (
                <Product
                  key={'product-' + index}
                  data={product}
                  updateCart={this.props.updateCart}
                  cart={this.props.cart}
                  updateIsAddressPresent={this.props.updateIsAddressPresent}
                  details={product}
                  onSave={val => val}
                />
              ))}
          </StyledContainer>
          {error && <div>{error}</div>}
          {isLoading && (
            <div style={{ textAlign: 'center', margin: '.5rem auto' }}>
              Loading More Items...
            </div>
          )}
        </div>
      )
    }
    return !(productList && productList.length) ? null : (
      <StyledProductCollection
        horizontal={this.props.config.layoutType === 'SCROLLER'}
        compType={type}
        data-testid="product-collection"
      >
        {this.props.data && this.props.data.collection && (
          <StyledHeaderContainer>
            <StyledTitle>{this.props.data.title}</StyledTitle>
            {!hideSeeAllButton && <StyledLink>See all</StyledLink>}
          </StyledHeaderContainer>
        )}
        {productsContainer}
      </StyledProductCollection>
    )
  }
}

ProductCollection.defaultProps = {
  hideSeeAllButton: false,
  infiniteScrolling: true,
  config: {
    layoutType: 'SCROLLER',
  },
}

export default ProductCollection
