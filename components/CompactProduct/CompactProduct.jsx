import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { InlineBlock } from 'reakit'

import Price from './../Price'
import Text from './../Text'
import CartCounter from './../CartCounter'
import { CartConsumer } from './../CartProvider'
import { WishlistConsumer } from './../WishlistProvider'
import Image from './../Image'

import FavouriteInactiveIcon from '../icons/FavouriteInactive'
import FavouriteActiveIcon from '../icons/FavouriteActive'
import DeleteIcon from '../icons/Delete'
import NoImg from '../icons/NoImg'
import { from } from '../../lib/Media'

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  backdrop-filter: blur(2.8px);
  background-color: #ffffff;
  width: ${props =>
    props.variant === 'checkout' || props.variant === 'wishlist'
      ? '100%'
      : '20rem'};

  display: flex;
  align-items: flex-start;

  border-width: ${props =>
    props.variant === 'checkout' || props.variant === 'wishlist'
      ? '1px'
      : '2px'};
  border-style: solid;
  border-color: ${props =>
    props.variant === 'checkout' || props.variant === 'wishlist'
      ? '#eaeaea'
      : props.inCart
      ? '#1557bf'
      : '#eaeaea'};
  padding: 1rem 0.75rem 0.75rem 0.5rem;
  min-height: ${props =>
    props.variant === 'checkout' || props.variant === 'wishlist'
      ? props.variant === 'checkout'
        ? '8rem'
        : '7.5rem'
      : '9.375rem'};
  margin-right: 0.75rem;
  margin-bottom: ${props =>
    props.variant === 'checkout' || props.variant === 'wishlist'
      ? '0.5rem'
      : '0'};
  ${from('tablet')} {
    margin-right: 1rem;
    width: ${props =>
      props.variant === 'checkout' || props.variant === 'wishlist'
        ? '100%'
        : '21.5rem'};
  }
`

const StyledText = styled(Text)`
  ${props =>
    (props.variant === 'checkout' || props.variant === 'wishlist') &&
    'margin-right: 2rem'};
  color: ${props => props.color};
`

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  justify-content: space-between;
`

const StyledSaveButton = styled.button`
  top: 1rem;
  right: 0.65rem;
  position: absolute;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`

const StyledDeleteButton = styled.button`
  border: none;
  background-color: white;
  color: #696969;
  position: absolute;
  right: 0.3rem;
  cursor: pointer;
`
const StyledA = styled.a`
  text-decoration: none;
  color: currentColor;
`

const StyledCartCounter = styled(CartCounter)`
  position: absolute;
  ${({ variant }) =>
    variant === 'wishlist'
      ? 'right: 0.3rem'
      : variant === 'checkout'
      ? 'left : 5.5rem'
      : 'right: 0.5rem'};
  bottom: 0.9rem;
`
const StyledInlineBlock = styled(InlineBlock)`
  display: inline-flex;
  align-items: center;
  > span {
    margin-right: 0.3rem;
    position: ${props =>
      props.variant === 'checkout' ? 'absolute' : 'static'};
    right: ${props => (props.variant == 'checkout' ? '0.3rem' : 'unset')};
    bottom: 0.9rem;
  }
`
const StyledNoImageIcon = styled(NoImg)`
  width: 5rem;
  height: 5rem;
  display: inline-block;
  padding: 0.5rem;
`

class CompactProduct extends React.Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.onDelete({ product: this.props.details })
  }

  render() {
    const { details, onSave, onDelete, variant, className } = this.props
    const { name, description, images, id, slug } = details

    const { storeSpecificData } = details

    const price = storeSpecificData && storeSpecificData[0].mrp
    const discount = storeSpecificData && storeSpecificData[0].discount

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
                    data-testid="compact-product"
                    variant={variant}
                    className={className}
                  >
                    {images && images.length > 0 ? (
                      <Image
                        alt={description || 'product-image'}
                        src={images[0]}
                        width="72"
                        height="72"
                      />
                    ) : (
                      <StyledNoImageIcon />
                    )}
                    {onSave && (
                      <StyledSaveButton
                        onClick={e => {
                          e.preventDefault()
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

                    {onDelete && (
                      <StyledDeleteButton onClick={this.handleDelete}>
                        <DeleteIcon height="24" width="24" title="bin" />
                      </StyledDeleteButton>
                    )}

                    <StyledInfo>
                      <StyledInlineBlock>
                        {variant !== 'checkout' && (
                          <Text size="xl" weight="black">
                            <Price amount={price} discount={discount} />
                          </Text>
                        )}

                        {variant !== 'checkout' && hasDiscount && (
                          <Text size="small">
                            <Price outdated amount={price} />
                          </Text>
                        )}

                        {variant !== 'checkout' && hasDiscount && (
                          <Text size="small" color="#ea6100" weight="bold">
                            Save <Price amount={discount} />
                          </Text>
                        )}
                      </StyledInlineBlock>
                      <StyledText
                        size="medium"
                        weight="regular"
                        variant={variant}
                        color="#333333"
                      >
                        {name}
                      </StyledText>
                    </StyledInfo>

                    <StyledCartCounter
                      key={`${details.id}-${countOf(details)}`}
                      defaultValue={countOf(details)}
                      onValueChange={({ delta }) => update(details, delta)}
                      variant={variant}
                    />

                    {variant === 'checkout' && (
                      <StyledInlineBlock variant={variant}>
                        {variant === 'checkout' && (
                          <Text size="xl" weight="black">
                            <Price amount={price} discount={discount} />
                          </Text>
                        )}
                      </StyledInlineBlock>
                    )}
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

CompactProduct.defaultProps = {}

export default CompactProduct
