import React from 'react'
import Counter from './../Counter'
import styled from 'styled-components'
import Text from '../Text/Text'
import { only, from } from '../../lib/Media'

import CartIcon from './../icons/Cart'

const VALUE_TO_SHOW_CART_IMAGE = 0

const StyledCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${only('mobile')} {
    background: ${props =>
      props.customize ? props.customize.counter.background : 'inherit'};
    box-shadow: ${props =>
      props.customize ? props.customize.counter.boxShadow : 'none'};
    height: ${props =>
      props.customize ? props.customize.counter.height : 'inherit'};
    width: ${props =>
      props.customize ? props.customize.counter.width : 'inherit'};
  }
`

const StyledCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const CartButton = styled.button`
  background-color: #1557bf;
  border: 0;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${from('tablet')} {
    width: ${props => props.width || 'auto'};
    border-radius: ${props =>
      props.buttonType === 'capsule' ? '2rem' : '50%'};
  }
  ${only('mobile')} {
    border-radius: 50%;
    text-align: center;
    height: ${props =>
      (props.customize && props.customize.button.height) || 'auto'};
    width: ${props =>
      (props.customize && props.customize.button.width) || 'auto'};
  }
  ${props =>
    props.paddedName
      ? `> *{
    margin: 0rem 0.35rem;
  }`
      : ''};
`
const OnlyFromTablet = styled.div`
  display: inline-flex;
  ${only('mobile')} {
    display: none;
  }
`

const StyledText = styled(Text)`
  height: 1.2rem;
`

class CartCounter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      const prevValue = prevState.value
      const nextValue = this.state.value
      const delta = this.state.value - prevState.value

      this.props.onValueChange({
        prevValue,
        nextValue,
        delta,
      })
    }
  }

  render() {
    let { className } = this.props
    return (
      <div className={className}>
        {this.state.value === VALUE_TO_SHOW_CART_IMAGE ? (
          <StyledCart>
            <CartButton
              width={this.props.width}
              onClick={event => {
                event.preventDefault()
                this.setState({
                  value: VALUE_TO_SHOW_CART_IMAGE + 1,
                })
              }}
              buttonType={this.props.buttonType}
              paddedName={this.props.paddedName}
              customize={this.props.customize}
            >
              <CartIcon width="25" height="25" title="add to cart" />
              <OnlyFromTablet>
                <StyledText size="large" weight="bold">
                  {this.props.name || ''}
                </StyledText>
              </OnlyFromTablet>
            </CartButton>
          </StyledCart>
        ) : (
          <StyledCounter customize={this.props.customize}>
            <Counter
              defaultValue={this.state.value}
              onChange={({ nextValue }) => {
                this.setState({
                  value: nextValue,
                })
              }}
            />
          </StyledCounter>
        )}
      </div>
    )
  }
}

CartCounter.defaultProps = {
  defaultValue: 0,
  onValueChange: () => {},
}

export default CartCounter
