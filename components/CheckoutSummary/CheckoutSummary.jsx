import React from 'react'
import styled from 'styled-components'
import { CartConsumer } from '../CartProvider'
import { PromocodeConsumer } from '../PromocodeProvider'
import Text from '../Text'
import Remove from '../icons/Remove'

import { from } from '../../lib/Media'
import Popup from '../Popup'
import PromocodePopup from '../PromocodePopup'

const StyledList = styled.ul`
  list-style: none;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: #ffffff;
  margin: 0 0 1rem 0;

  ${from('tablet')} {
    margin: 0 0 1rem 0;
  }
`

const Row = styled.li`
  display: flex;
  padding: ${props => props.padding || '1rem'};
  align-items: stretch;

  :not(:last-child) {
    border-bottom: ${props => props.borderBottom || '1px solid #eaeaea'};
  }
`
const StyledRow = styled(Row)`
  display: block;
`

const Column = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const ColumnLeft = styled.div`
  flex: 1;
  padding: ${props => props.padding || '0'};
`

const ColumnRight = styled(ColumnLeft)`
  text-align: right;
`

const Button = styled(ColumnRight)`
  cursor: pointer;
  flex: 0;
  border: none;
  background: none;
  outline: none;
`

const Total = styled.div`
  display: flex;
  flex: 1;
  border-radius: 2px;
  background-color: #f3f5f7;
  padding: 1rem;
`

const PromocodesWrp = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const StyledPromocode = styled.div`
  padding: 0.5rem;
  border: 1px solid #ea6100;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PromocodeDiscount = styled.div`
  text-align: right;
`

const RemovePromocodeButton = styled.button`
  border: none;
  padding: 0;
  line-height: 0;
  background: none;
  margin-left: 0.5rem;
  max-height: 2.5rem;
  display: inline-block;

  &:focus {
    outline: none;
  }
`

class CheckoutSummary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPromoCodeInputVisible: false,
    }

    this.handleShowPromoCodePopup = this.handleShowPromoCodePopup.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleShowPromoCodePopup() {
    this.setState({
      isPromoCodeInputVisible: true,
    })
  }

  handleClose() {
    this.setState({
      isPromoCodeInputVisible: false,
    })
  }

  render() {
    const { currency, orderType } = this.props
    const promocodes = ['HELLBOY', 'RAVAN'] // Will change when data avilable
    const { isPromoCodeInputVisible } = this.state
    let deliveryCharge =
      orderType.type === 'delivery' ? parseFloat(orderType.deliveryFee || 0) : 0
    return (
      <CartConsumer>
        {({ totalPrice }) => (
          <StyledList>
            <Row>
              <ColumnLeft>
                <Text size="large" weight="bold" color="#333333">
                  Subtotal
                </Text>
              </ColumnLeft>
              <ColumnRight>
                <Text size="large" align="right" weight="black">
                  {currency.symbol + totalPrice().toFixed(2)}
                </Text>
              </ColumnRight>
            </Row>
            <StyledRow>
              <Row as="div" borderBottom="none" padding="none">
                <ColumnLeft padding={'.5rem 0'}>
                  <Text size="large" weight="bold" color="#333333">
                    Promo code
                  </Text>
                </ColumnLeft>
                {isPromoCodeInputVisible ? (
                  <Popup onClose={this.handleClose} bgColor={'#f3f5f7e6'}>
                    <PromocodePopup
                      title="Checkout"
                      promocodes={promocodes}
                      onClose={this.handleClose}
                    />
                  </Popup>
                ) : (
                  <Button
                    as="button"
                    padding={'.5rem 0'}
                    onClick={this.handleShowPromoCodePopup}
                  >
                    <Text size="medium" weight="black" color="#1557bf">
                      Add
                    </Text>
                  </Button>
                )}
              </Row>
              {/* TO display available promo code */}
              <PromocodeConsumer>
                {PromocodeProvider =>
                  PromocodeProvider.promocodes.map((promocode, index) => (
                    <PromocodesWrp key={promocode + index}>
                      <StyledPromocode>
                        <Text size="medium" weight="bold" color="#ea6100">
                          {promocode}
                        </Text>
                        <RemovePromocodeButton
                          onClick={() => {
                            PromocodeProvider.remove(promocode)
                          }}
                        >
                          <Remove height="16" width="16" />
                        </RemovePromocodeButton>
                      </StyledPromocode>
                      <PromocodeDiscount>
                        <Text size="medium" color="#ea6100" weight="black">
                          -{currency.symbol + 27}
                        </Text>
                        <Text as="p" size="small" color="#ea6100" weight="bold">
                          (Free delivery)
                        </Text>
                      </PromocodeDiscount>
                    </PromocodesWrp>
                  ))
                }
              </PromocodeConsumer>
            </StyledRow>
            <Row>
              <Column>
                <ColumnLeft>
                  {orderType.type === 'delivery' ? (
                    <Text size="large" weight="bold" color="#333333">
                      Delivery
                    </Text>
                  ) : (
                    <Text size="large" weight="bold" color="#333333">
                      Pickup
                    </Text>
                  )}
                </ColumnLeft>
                <ColumnRight>
                  <Text size="large" weight="black" color="#333333">
                    {currency.symbol + deliveryCharge}
                  </Text>
                </ColumnRight>
              </Column>
              {/* update when value availabel*/}
              {/* <ColumnRight>{currency.symbol + '7.00'}</ColumnRight> */}
            </Row>
            <Row>
              <Total>
                <ColumnLeft>
                  <Text size="large" weight="bold" color="#333333">
                    Total
                  </Text>
                  {/* update when value availabel*/}
                  {/* <Text size='small' weight='bold' color='#696969'>7% GST included</Text> */}
                </ColumnLeft>
                <ColumnRight>
                  <Text
                    size="large"
                    align="right"
                    weight="black"
                    color="#333333"
                  >
                    {currency.symbol}
                    {(totalPrice() + deliveryCharge).toFixed(2)}
                  </Text>
                </ColumnRight>
              </Total>
            </Row>
          </StyledList>
        )}
      </CartConsumer>
    )
  }
}

export default CheckoutSummary
