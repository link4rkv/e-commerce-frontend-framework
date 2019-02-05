import React from 'react'
import styled from 'styled-components'
import { from } from '../../lib/Media'
import Text from '../Text'
import Link from 'next/link'
import { CheckoutAddressConsumer } from '../CheckoutAddressProvider'
import PromocodePopup from '../PromocodePopup'
import Popup from '../Popup'
import Remove from '../icons/Remove'
import { PromocodeConsumer } from '../PromocodeProvider/PromocodeProvider'

const StyledList = styled.ul`
  list-style: none;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: #ffffff;
  margin-bottom: 1rem;
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
  position: relative;
  flex: 0;
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
`

const Total = styled.div`
  display: flex;
  flex: 1;
  border-radius: 2px;
  background-color: #f3f5f7;
  padding: 1rem;
`

const StyledInput = styled.input`
  display: none;

  &:checked + label::before {
    background-color: #0d3578;
  }
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1px solid #1557bf;
    margin-right: 0.56rem;
  }
`

const PayableAmount = styled(Row)`
  border-radius: 4px;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
  background-color: #1557bf;
  margin: 0 -0.5rem;
  text-decoration: none;
  cursor: pointer;
  border: none;

  width: 100%; /* IE11 */
  width: fill-available;

  ${from('tablet')} {
    margin: 0;
  }
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

class CheckoutDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPromoCodePopupVisible: false,
      delivery: true,
      pickup: false,
    }

    this.handleShowPromoCodePopup = this.handleShowPromoCodePopup.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleShowPromoCodePopup() {
    this.setState({
      isPromoCodePopupVisible: true,
    })
  }

  handleClose() {
    this.setState({
      isPromoCodePopupVisible: false,
    })
  }

  render() {
    const { totalPrice } = this.props
    const promocodes = ['HELLBOY', 'RAVAN'] // Will change when data avilable
    const { isPromoCodePopupVisible } = this.state
    return (
      <CheckoutAddressConsumer>
        {({ checkoutAddress, update }) => {
          let { type } = checkoutAddress
          return (
            <React.Fragment>
              <StyledList>
                <Row>
                  <ColumnLeft>
                    <Text size="large" weight="bold" color="#333333">
                      Subtotal
                    </Text>
                  </ColumnLeft>
                  <ColumnRight>
                    <Text size="large" align="right" weight="black">
                      {totalPrice.currency + totalPrice.amount}
                    </Text>
                  </ColumnRight>
                </Row>
                <StyledRow>
                  <Row as="div" padding="none" borderBottom="none">
                    <ColumnLeft padding={'.5rem 0'}>
                      <Text size="large" weight="bold" color="#333333">
                        Promo code
                      </Text>
                    </ColumnLeft>
                    {isPromoCodePopupVisible ? (
                      <Popup onClose={this.handleClose} bgColor={'#f3f5f7e6'}>
                        <PromocodePopup
                          title="Cart"
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
                              -{totalPrice.currency + 27}
                            </Text>
                            <Text
                              as="p"
                              size="small"
                              color="#ea6100"
                              weight="bold"
                            >
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
                    <StyledInput
                      type="radio"
                      name="radioButton"
                      id="delivery"
                      checked={type === 'delivery'}
                      onChange={() =>
                        update({ ...checkoutAddress, type: 'delivery' })
                      }
                    />
                    <StyledLabel htmlFor="delivery">
                      <Text size="medium" weight="regular" color="#333333">
                        Delivery
                      </Text>
                    </StyledLabel>
                  </Column>
                  <Column>
                    <StyledInput
                      type="radio"
                      name="radioButton"
                      id="pickup"
                      checked={type === 'pickup'}
                      onChange={() =>
                        update({ ...checkoutAddress, type: 'pickup' })
                      }
                    />
                    <StyledLabel htmlFor="pickup">
                      <Text size="medium" weight="regular" color="#333333">
                        Pick up
                      </Text>
                    </StyledLabel>
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
                        {totalPrice.currency + totalPrice.amount}
                      </Text>
                    </ColumnRight>
                  </Total>
                </Row>
              </StyledList>
              <Link href="/checkout" passHref>
                <PayableAmount as="a">
                  <Column>
                    <div>
                      <Text size="large" color="#ffffff" weight="bold">
                        Total
                      </Text>
                      {/* update when value availabel*/}
                      {/* <Text size='small' weight='bold' color='#ffffff'>7% GST include</Text> */}
                    </div>
                  </Column>
                  <ColumnRight>
                    <Text
                      size="large"
                      align="right"
                      weight="black"
                      color="#ffffff"
                    >
                      {totalPrice.currency + totalPrice.amount}
                    </Text>
                  </ColumnRight>
                </PayableAmount>
              </Link>
            </React.Fragment>
          )
        }}
      </CheckoutAddressConsumer>
    )
  }
}

export default CheckoutDetails
