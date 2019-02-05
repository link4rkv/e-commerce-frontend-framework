import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import Input from '../Input'
import CreditCard from '../icons/CreditCard'
import Button from '../Button'
import isEqual from 'lodash/isEqual'

const MainContainer = styled.div`
  text-align: center;
  width: fit-content;
`

const StyledContainer = styled.div`
  width: 20.5rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #ffffff;
  min-height: 25.75rem;
`
const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`
const DefaultText = styled(Text)`
  margin-right: 0.5rem;
`
const StyledInput = styled.input`
  display: none;

  &:checked + label::after {
    background-color: #0d3578;
  }
`
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1px solid #1557bf;
  }
`
const InputWrapper = styled.div`
  margin-bottom: 1rem;
`

const ExpiryDateWrp = styled(InputWrapper)`
  margin-right: 0.5rem;
`

const CardSecurity = styled.div`
  display: flex;
`
const CardImages = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
const CreditCardImage = styled(CreditCard)`
  height: 2.4375rem;
  width: 3.53125rem;
`
const DoneButton = styled(Button)`
  height: 2.25rem;
  border-radius: 1.125rem;
  width: 12.5rem;
  display: block;
  margin: 1.5rem auto 0.5rem;
  cursor: pointer;
  outline: none;
`

const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1557bf;
  border-radius: 16rem;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
  }
`

class EditPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.cardDetails,
      error: {},
      valid: false,
    }
    this.length = 0
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  paymentInfoValidation(values) {
    let isValid = false
    let error = Object.assign({}, this.state.error)
    let visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
    let masterCardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
    let amexPattern = /^3[47][0-9]{13}$/

    let cardNumber = values.cardNumber && values.cardNumber.split(' ').join('')
    let date = values.date && values.date.split('/').join('')

    if (
      cardNumber &&
      !(
        cardNumber.match(visaPattern) ||
        cardNumber.match(masterCardPattern) ||
        cardNumber.match(amexPattern)
      )
    ) {
      error.cardNumber = 'Invalid'
    } else if (cardNumber && error.cardNumber) {
      delete error.cardNumber
    }

    if (date && !date.match(/^0[1-9]|^(11)|^(12)[0-9][0-9]$/)) {
      error.date = 'Invalid'
    } else if (date && error.date) {
      delete error.date
    }

    if (values.cvv && !values.cvv.match(/^[0-9]{3,4}$/)) {
      error.cvv = 'Invalid'
    } else if (values.cvv && error.cvv) {
      delete error.cvv
    }

    if (values.name && cardNumber && date && values.cvv) {
      isValid = true
    }

    isValid = isValid && !Object.keys(error).length

    if (!isEqual(error, this.state.error)) {
      this.setState({ error })
    }

    return isValid
  }

  handleChange(e) {
    let { name, value } = e.target

    if (name === 'cardNumber') {
      const newValue = value.split('').filter(item => {
        return item != ' '
      })
      if (this.length < newValue.length) {
        let temp = ''
        for (let i = 0; i < newValue.length; i++) {
          if (i != 0 && i % 4 === 0) {
            temp = temp + ' ' + newValue[i]
          } else {
            temp = temp + newValue[i]
          }
        }
        value = temp
      }
      this.length = newValue.length
    }

    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState[name] = value
      return newState
    })
  }

  handleSubmit() {
    const { name, cardNumber, date, cvv } = this.state
    const cardDetails = { name, cardNumber, date, cvv }
    const index = this.props.index
    const validCardDetails =
      name &&
      cardNumber &&
      cardNumber.split(' ').join('').length === 16 &&
      date &&
      cvv // All values are required
    if (typeof this.props.onSubmit === 'function' && validCardDetails) {
      if (index >= 0) {
        this.props.onSubmit(cardDetails, index)
      } else {
        this.props.onSubmit(cardDetails)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      let isValid = this.paymentInfoValidation(this.state)
      if (isValid) {
        !prevState.valid && this.setState({ valid: true })
      } else {
        prevState.valid && this.setState({ valid: false })
      }
    }
  }

  render() {
    const { title, onClose } = this.props
    const { name, cardNumber, date, cvv, error } = this.state
    return (
      <MainContainer data-testid="editPayment">
        <CloseButton onClick={onClose}>
          <Text size="large" weight="bold" color="#ffffff">
            ⨉
          </Text>
        </CloseButton>
        <StyledContainer>
          <CardTitle>
            <Text size="medium" weight="bold" color="#333333">
              {title} Payment
            </Text>
            <StyledInput
              type="radio"
              name="radioButton"
              id="delivery"
              //checked
            />
            <StyledLabel htmlFor="delivery">
              <DefaultText size="small" weight="bold" color="#333333">
                Default
              </DefaultText>
            </StyledLabel>
          </CardTitle>
          <InputWrapper>
            <Input
              label="Name"
              value={name}
              name="name"
              required
              onChange={this.handleChange}
              invalid={error.name}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Credit card number"
              value={cardNumber}
              name="cardNumber"
              required
              onChange={this.handleChange}
              invalid={error.cardNumber}
            />
          </InputWrapper>
          <CardSecurity>
            <ExpiryDateWrp>
              <Input
                label="Expiry MM/YY"
                value={date}
                name="date"
                required
                onChange={this.handleChange}
                invalid={error.date}
              />
            </ExpiryDateWrp>
            <InputWrapper>
              <Input
                label="CVV"
                value={cvv}
                name="cvv"
                required
                onChange={this.handleChange}
                invalid={error.cvv}
              />
            </InputWrapper>
          </CardSecurity>
          <div>
            <Text size="small" weight="bold" color="#333333">
              We accept these payments method
            </Text>
          </div>
          <CardImages>
            <CreditCardImage />
            <CreditCardImage />
            <CreditCardImage />
          </CardImages>
          <DoneButton onClick={this.handleSubmit} disabled={!this.state.valid}>
            <Text size="medium" weight="bold" color="#">
              {title === 'Edit' ? 'Done' : 'Add payment'}
            </Text>
          </DoneButton>
        </StyledContainer>
      </MainContainer>
    )
  }
}

export default EditPayment
