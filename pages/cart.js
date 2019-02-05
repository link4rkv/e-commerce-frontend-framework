import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout/Layout'
import CompactProduct from '../components/CompactProduct/CompactProduct'
import { CartConsumer } from '../components/CartProvider/CartProvider'
import { WishlistConsumer } from '../components/WishlistProvider'
import { from } from '../lib/Media'
import CheckoutDetails from '../components/CheckoutDetails/CheckoutDetails'
import Text from '../components/Text'
import EmptyCart from '../components/Error/EmptyCart'

const StyledLayout = styled(Layout)`
  > main {
    margin-top: 4rem;
    ${from('desktop')} {
      margin-top: 0;
    }
  }
`

const Container = styled.div`
  ${from('tablet')} {
    display: flex;
    justify-content: center;
  }
`

const WrpDiv = styled.div`
  ${from('tablet')} {
    flex: 1;
    margin-right: 1rem;
  }

  ${from('desktop')} {
    flex: 0;
    flex-basis: 36.5rem;
  }
`

const CheckoutDetailsWrp = styled.div`
  margin-top: 2rem;
  flex: 1;

  ${from('tablet')} {
    margin-top: 4.5rem;
    flex: 0;
    flex-basis: 21.5rem;
  }
`

const StyledHeading = styled.h2`
  margin-bottom: 1rem;

  &:first-child {
    margin-top: 1rem;
  }

  &:not(:first-child) {
    margin-top: 3rem;
  }
`

const Checkout = props => {
  const { organizationData } = props
  if (!organizationData) {
    return null
  }
  const { currency } = organizationData
  return (
    <CartConsumer>
      {({ items, destroy, totalPrice }) => {
        const cartItemsCount = Object.keys(items).length
        const totalAmount = {
          currency: currency.symbol,
          amount: totalPrice().toFixed(2),
        }
        return (
          <WishlistConsumer>
            {({ wishlist }) => {
              const wishlistItemsCount = Object.keys(wishlist).length
              return cartItemsCount > 0 ? (
                <StyledLayout organizationData={organizationData}>
                  <Container>
                    <WrpDiv>
                      {//Show only when there is product in cart
                      cartItemsCount > 0 && (
                        <>
                          <StyledHeading>
                            <Text size="xl" color="#333333" weight="bold">
                              Shopping Cart
                            </Text>
                            <div>
                              <Text size="small" color="#696969" weight="bold">
                                {cartItemsCount +
                                  (cartItemsCount > 1 ? ' items' : 'item')}
                              </Text>
                            </div>
                          </StyledHeading>
                          {Object.keys(items).map(key => {
                            return (
                              <CompactProduct
                                key={items[key].id}
                                details={items[key]}
                                variant="checkout" // this variable is used to style the compact product accoding to checkout page style
                                onDelete={({ product }) => {
                                  destroy(product)
                                }}
                              />
                            )
                          })}
                        </>
                      )}
                      {//Show only when there is product in wishlist
                      wishlistItemsCount > 0 && (
                        <>
                          <StyledHeading>
                            <Text size="xl" color="#333333" weight="bold">
                              Shopping List
                            </Text>
                            <div>
                              <Text size="small" color="#696969" weight="bold">
                                {wishlistItemsCount +
                                  (wishlistItemsCount > 1 ? ' items' : ' item')}
                              </Text>
                            </div>
                          </StyledHeading>
                          {Object.keys(wishlist).map(key => {
                            return (
                              <CompactProduct
                                key={wishlist[key].id}
                                details={wishlist[key]}
                                variant="wishlist" // this variable is used to style the compact product accoding to wishlist style
                                onSave
                              />
                            )
                          })}
                        </>
                      )}
                    </WrpDiv>
                    {//Show only when there is product in cart
                    cartItemsCount > 0 && (
                      <CheckoutDetailsWrp>
                        <CheckoutDetails totalPrice={totalAmount} />
                      </CheckoutDetailsWrp>
                    )}
                  </Container>
                </StyledLayout>
              ) : (
                <EmptyCart />
              )
            }}
          </WishlistConsumer>
        )
      }}
    </CartConsumer>
  )
}

export default Checkout
