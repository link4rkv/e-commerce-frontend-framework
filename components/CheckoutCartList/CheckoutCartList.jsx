import React, { Component } from 'react'
import styled from 'styled-components'
import { CartConsumer } from '../CartProvider'
import CompactProduct from '../CompactProduct'
import Text from '../Text'
import Collapse from '../icons/Collapse'
import Expand from '../icons/Expand'
import isEmpty from 'lodash/isEmpty'

const Container = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  max-height: ${({ expanded }) => (expanded ? '90rem' : '4rem')};
  overflow: hidden;
  opacity: ${({ active }) => (active ? '1' : '0.5')};
  transition: max-height 0.4s ease-in-out;
`
const Heading = styled.h3`
  font-weight: bold;
  color: #1557bf;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #333333;
  }
`

const CartListContainer = styled.div`
  margin-top: '0';
`

const StyledText = styled(Text)`
  display: block;
  margin-bottom: 1rem;
`

class CheckoutCartList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.stopPropagation()
    if (this.props.activeChild !== 'cart') {
      this.props.onClick('cart')
    }
    this.setState({ expanded: !this.state.expanded })
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.items) && !this.props.data.valid) {
      this.props.onChange(['cart', 'valid'], true)
    } else if (isEmpty(this.props.items) && this.props.data.valid) {
      this.props.onChange(['cart', 'valid'], false)
    }
  }

  render() {
    const { data, activeChild, items, destroy } = this.props
    const cartItemsCount = Object.keys(items).length
    let expanded = activeChild === 'cart' && this.state.expanded
    return (
      <Container active={activeChild === 'cart'} expanded={expanded}>
        <Heading>
          <span>{data.expanded ? 'Shopping Cart' : 'Cart'}</span>
          {expanded ? (
            <Collapse
              width="30"
              height="30"
              onClick={e => this.handleClick(e, true)}
            />
          ) : (
            <Expand
              width="30"
              height="30"
              onClick={e => this.handleClick(e, true)}
            />
          )}
        </Heading>
        {expanded && (
          <CartListContainer expanded={expanded}>
            <StyledText size="small" color="#696969" weight="bold">
              {cartItemsCount + (cartItemsCount > 1 ? ' items' : ' item')}
            </StyledText>
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
          </CartListContainer>
        )}
      </Container>
    )
  }
}

const CheckoutCartListContainer = props => (
  <CartConsumer>
    {({ items, destroy }) => (
      <CheckoutCartList items={items} destroy={destroy} {...props} />
    )}
  </CartConsumer>
)

export default CheckoutCartListContainer
