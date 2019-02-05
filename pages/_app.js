import App, { Container } from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'

import GlobalContext from './../components/GlobalContext'
import CartProvider, { store } from './../components/CartProvider'
import WishlistProvider from './../components/WishlistProvider'
import PromocodeProvider from '../components/PromocodeProvider'
import CheckoutAddressProvider from '../components/CheckoutAddressProvider'
import AccountProvider from '../components/AccountProvider'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');

  * { box-sizing: border-box; }
  img { vertical-align: bottom; }
  html { font-family: 'Lato', sans-serif; background-color: #f5f5f5; }
`

class MyApp extends App {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ Component, ctx }) {
    let orgData = {},
      pageProps = {}
    try {
      let orgDataRes = await fetch(`${API_URL}/organization`)
      orgData = await orgDataRes.json()

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
    } catch (error) {
      /* Handle the error */
    }

    return { organizationData: orgData.data, pageProps }
  }

  render() {
    const { Component, pageProps, organizationData } = this.props
    return (
      <Container>
        <GlobalStyle />
        <GlobalContext.Provider value={{ API_URL }}>
          <CartProvider defaultItems={store('cart')}>
            <WishlistProvider defaultItems={store('wishlist')}>
              <CheckoutAddressProvider
                defaultAddress={store('checkoutAddress')}
              >
                <PromocodeProvider>
                  <AccountProvider defaultAccountData={store('profile')}>
                    <Component
                      {...pageProps}
                      organizationData={organizationData}
                    />
                  </AccountProvider>
                </PromocodeProvider>
              </CheckoutAddressProvider>
            </WishlistProvider>
          </CartProvider>
        </GlobalContext.Provider>
      </Container>
    )
  }
}

export default MyApp
