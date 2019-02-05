import React from 'react'
import PageHeader from '../../components/PageHeader'
import { AccountConsumer } from '../../components/AccountProvider'
import { CheckoutAddressConsumer } from '../../components/CheckoutAddressProvider/CheckoutAddressProvider'

const Header = ({ organizationData, hideCheckoutAddress }) => (
  <CheckoutAddressConsumer>
    {({ checkoutAddress }) => (
      <AccountConsumer>
        {({ isLoggedIn }) => (
          <header>
            <PageHeader
              currentSpend={0}
              organizationData={organizationData}
              hideCheckoutAddress={hideCheckoutAddress}
              isLoggedIn={isLoggedIn}
              checkoutAddress={checkoutAddress}
            />
          </header>
        )}
      </AccountConsumer>
    )}
  </CheckoutAddressConsumer>
)

export default Header
