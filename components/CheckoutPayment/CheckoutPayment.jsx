import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../Input'
import { InlineBlock } from 'reakit'
import Text from '../Text'
import isEqual from 'lodash/isEqual'

const Container = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  overflow: hidden;
  opacity: ${({ valid, expanded }) => (valid || expanded ? '1' : '0.5')};
  pointer-events: ${({ valid, expanded }) =>
    valid || expanded ? 'auto' : 'none'};
`
const Heading = styled.h3`
  color: #1557bf;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledInlineBlockFull = styled(InlineBlock)`
  width: 100%;
`
const StyledInlineBlockLarge = styled(InlineBlock)`
  width: calc((100% - 0.5rem) * 0.75);
`

const StyledInlineBlockSmall = styled(InlineBlock)`
  width: calc((100% - 0.5rem) * 0.25);
`

const PaymentFormContainer = styled.form`
  margin-bottom: 0.5rem;
`

const HiddenSubmit = styled.input`
  display: none;
`

const CardPreview = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.7rem;
`

const StyledCardType = styled(Text)`
  color: #1557bf;
  font-weight: bold;
  font-size: 0.85rem;
  font-style: italic;
  display: inline-block;
  margin-right: 0.5rem;
`

const StyledBullets = styled(Text)`
  color: #333333;
`

const StyledCardEnding = styled(Text)`
  color: #333333;
  font-weight: normal;
  font-size: 0.875rem;
`

class CheckoutPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.paymentInfoValidation = this.paymentInfoValidation.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target

    if (name === 'card' || name === 'expiry' || name === 'cvv') {
      value = value.replace(/\D/g, '')
    }

    if (name === 'expiry') {
      value = value.substr(0, 4)
    }

    if (name === 'cvv') {
      value = value.substr(0, 4)
    }

    this.props.onChange(['payment', 'values', name], value)
  }

  paymentInfoValidation(values) {
    let isValid = false
    let error = Object.assign({}, this.state.error)
    let visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
    let masterCardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
    let amexPattern = /^3[47][0-9]{13}$/

    if (
      values.card &&
      !(
        values.card.match(visaPattern) ||
        values.card.match(masterCardPattern) ||
        values.card.match(amexPattern)
      )
    ) {
      error.card = 'Invalid'
    } else if (values.card && error.card) {
      delete error.card
    }

    if (
      values.expiry &&
      !values.expiry.match(/^0[1-9]|^(11)|^(12)[0-9][0-9]$/)
    ) {
      error.expiry = 'Invalid'
    } else if (values.expiry && error.expiry) {
      delete error.expiry
    }

    if (values.cvv && !values.cvv.match(/^[0-9]{3,4}$/)) {
      error.cvv = 'Invalid'
    } else if (values.cvv && error.cvv) {
      delete error.cvv
    }

    if (values.acc_name && values.card && values.expiry && values.cvv) {
      isValid = true
    }

    isValid = isValid && !Object.keys(error).length

    if (!isEqual(error, this.state.error)) {
      this.setState({ error })
    }

    return isValid
  }

  handleSubmit(e) {
    e.preventDefault()

    let error = {},
      { data } = this.props

    if (!data.values.acc_name) {
      error.acc_name = '*Required'
    }
    if (!data.values.card) {
      error.card = '*Required'
    }
    if (!data.values.expiry) {
      error.expiry = '*Required'
    }
    if (!data.values.cvv) {
      error.cvv = '*Required'
    }

    this.setState({ error: { ...this.state.error, ...error } })
  }

  formatCardNumber(number) {
    let visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
    let masterCardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
    let amexPattern = /^3[47][0-9]{13}$/

    let type

    if (number.match(visaPattern)) {
      type = 'Visa'
    } else if (number.match(masterCardPattern)) {
      type = 'MasterCard'
    } else if (number.match(amexPattern)) {
      type = 'AmEx'
    } else {
      type = 'Others'
    }

    return (
      <CardPreview>
        <StyledCardType>{type}</StyledCardType>
        <StyledBullets>&bull;&bull;&bull;&bull;</StyledBullets>
        <StyledCardEnding>{number.slice(-4)}</StyledCardEnding>
      </CardPreview>
    )
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data.values, this.props.data.values)) {
      let isValid = this.paymentInfoValidation(this.props.data.values)
      if (isValid) {
        !prevProps.data.valid && this.props.onChange(['payment', 'valid'], true)
      } else {
        prevProps.data.valid && this.props.onChange(['payment', 'valid'], false)
      }
    }
  }

  render() {
    let { data, activeChild, onClick } = this.props
    let expanded = activeChild === 'payment'
    let formattedCardNumber =
      data.values.card &&
      data.values.card
        .replace(/\W/gi, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    let formattedExpiry =
      data.values.expiry &&
      data.values.expiry
        .replace(/\W/gi, '')
        .replace(/(.{2})/, '$1 / ')
        .trim()

    let { error } = this.state
    return (
      <Container
        expanded={expanded}
        onClick={() => data.valid && onClick('payment')}
        valid={data.valid}
      >
        <Heading>
          <Text size="large" color="#333333" weight="bold">
            Payment method
          </Text>
          {!expanded && data.valid && (
            <Text color="#1557bf" weight="bold">
              Change
            </Text>
          )}
        </Heading>
        {!(data.valid && activeChild !== 'payment') && (
          <React.Fragment>
            <PaymentFormContainer
              expanded={expanded}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <StyledInlineBlockFull>
                <Input
                  name="acc_name"
                  label="Name"
                  onChange={this.handleChange}
                  value={data.values.acc_name}
                  variant="black"
                  invalid={error.acc_name}
                  required
                />
              </StyledInlineBlockFull>
              <StyledInlineBlockFull>
                <Input
                  name="card"
                  label="Credit card number"
                  onChange={this.handleChange}
                  value={formattedCardNumber}
                  variant="black"
                  invalid={error.card}
                  required
                />
              </StyledInlineBlockFull>
              <StyledInlineBlockLarge margin="0 0.5rem 0 0">
                <Input
                  name="expiry"
                  label="Expiry MM/YY"
                  onChange={this.handleChange}
                  value={formattedExpiry}
                  variant="black"
                  invalid={error.expiry}
                  required
                />
              </StyledInlineBlockLarge>
              <StyledInlineBlockSmall>
                <Input
                  name="cvv"
                  label="CVV"
                  onChange={this.handleChange}
                  value={data.values.cvv}
                  type="password"
                  variant="black"
                  invalid={error.cvv}
                  required
                  hideToggleButton
                />
              </StyledInlineBlockSmall>
              <HiddenSubmit type="submit" />
            </PaymentFormContainer>
            <Text size="small" weight="bold" color="#696969">
              We accept these payment methods
            </Text>
          </React.Fragment>
        )}
        {data.valid &&
          activeChild !== 'payment' &&
          this.formatCardNumber(data.values.card)}
      </Container>
    )
  }
}

export default CheckoutPayment
