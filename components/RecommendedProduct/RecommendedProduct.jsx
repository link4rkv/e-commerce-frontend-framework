import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import CartCounter from './../CartCounter'
import Price from './../Price'
import Text from './../Text'
import Image from './../Image'
import { CartConsumer } from './../CartProvider'
import { WishlistConsumer } from './../WishlistProvider'

import FavouriteInactiveIcon from '../icons/FavouriteInactive'
import FavouriteActiveIcon from '../icons/FavouriteActive'
import NoImageIcon from '../icons/NoImg'

import { from, only } from '../../lib/Media'

const StyledA = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: currentColor;
  background-color: #d8d8d8;
  width: 100%;
  height: 23rem;
  ${from('tablet')} {
    height: 27.5rem;
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 4px;
  background-color: white;
  outline: ${({ inCart }) =>
    inCart ? '0 solid transparent' : '1px solid #eaeaea'};
  border: ${({ inCart }) =>
    inCart ? '2px solid #1557bf' : '2px solid transparent'};
`

const StyledImage = styled(Image)`
  ${only('mobile')} {
    height: 10rem;
  }
  ${from('tablet')} {
    height: 14rem;
  }
`

const StyledNoImageIcon = styled(NoImageIcon)`
  width: 80%;
  ${only('mobile')} {
    height: 10rem;
  }
  ${from('tablet')} {
    height: 14rem;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledTitle = styled.div`
  text-align: left;
  margin-bottom: 0.6rem;
`

const StyledInfo = styled.div`
  padding: 0.5rem 0rem 0.5rem 0.5rem;
  ${only('mobile')} {
    height: 10rem;
  }
  ${from('tablet')} {
    height: 11rem;
  }
`

const StyledSaveButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: #1557bf;
  cursor: pointer;
`

const StyledCartCounter = styled(CartCounter)`
  padding: 0 0.375rem 1rem 0.375rem;
`

const Div = styled.div`
  display: flex;
  align-items: center;
  > span:not(:first-child) {
    margin-left: 0.25rem;
  }
`

const PriceAndSaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PlainDiv = styled.div`
  display: block;
  position: relative;
`
const Gradient = styled.div`
  width: 100%;
  height: 2rem;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.11)
  );
  position: absolute;
  bottom: 0;
`

class RecommendedProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { details, onSave } = this.props
    if (!details) {
      return null
    }

    let { name, images, id, slug } = details
    name = name.length > 1 ? name[0] + name.substr(1).toLowerCase() : name
    let price =
      (details.storeSpecificData &&
        details.storeSpecificData.length > 0 &&
        details.storeSpecificData[0].mrp) ||
      0
    let discount =
      (details.storeSpecificData &&
        details.storeSpecificData.length > 0 &&
        details.storeSpecificData[0].discount) ||
      0

    const hasDiscount = discount > 0
    return (
      <CartConsumer>
        {({ update, includes, countOf }) => (
          <WishlistConsumer>
            {wishlistConsumer => (
              <Link href={`/product/${slug}`} passHref>
                <StyledA>
                  <StyledContainer
                    inCart={includes({ id })}
                    data-testid="product"
                    parent
                  >
                    {images && images.length > 0 ? (
                      <PlainDiv>
                        <StyledImage
                          alt={name || 'product-image'}
                          title={name}
                          src={images[0]}
                        />
                        <Gradient />
                      </PlainDiv>
                    ) : (
                      <StyledNoImageIcon />
                    )}
                    <StyledInfo>
                      <PriceAndSaveButton>
                        <Div padding>
                          <Text size="xl" weight="black">
                            <Price amount={price} discount={discount} />
                          </Text>
                          {hasDiscount && (
                            <Text size="small">
                              <Price outdated amount={price} />
                            </Text>
                          )}
                        </Div>
                        <Div>
                          {onSave && (
                            <StyledSaveButton
                              onClick={event => {
                                event.preventDefault()
                                wishlistConsumer.update(details)
                              }}
                            >
                              {wishlistConsumer.includes(details) ? (
                                <FavouriteActiveIcon
                                  height="24"
                                  width="24"
                                  title="favourited"
                                />
                              ) : (
                                <FavouriteInactiveIcon
                                  height="24"
                                  width="24"
                                  title="favourite"
                                />
                              )}
                            </StyledSaveButton>
                          )}
                        </Div>
                      </PriceAndSaveButton>
                      <StyledTitle>
                        <Text size="medium" weight="normal">
                          {name}
                        </Text>
                      </StyledTitle>
                      {/* <StyledContainer
                        style={{
                          border: 'none',
                          outline: 'none',
                          marginBottom: '.63rem',
                        }}
                      > */}
                      {/* <StyledList>
                          <li>2L</li>
                          <li>Orange</li>
                          <li>No Sugar</li>
                        </StyledList> */}
                      {/* </StyledContainer> */}
                    </StyledInfo>
                    <StyledCartCounter
                      key={`${details.id}-${countOf(details)}`}
                      defaultValue={countOf(details)}
                      onValueChange={({ delta }) => update(details, delta)}
                    />
                  </StyledContainer>
                </StyledA>
              </Link>
            )}
          </WishlistConsumer>
        )}
      </CartConsumer>
    )
  }
}

RecommendedProduct.defaultProps = {
  defaultQuantity: 1,
}

export default RecommendedProduct
