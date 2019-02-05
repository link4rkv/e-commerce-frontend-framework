import React, { Component } from 'react'
import styled from 'styled-components'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import fetch from 'isomorphic-unfetch'
import Input from '../Input/Input'
import Text from '../Text/Text'
import { InlineBlock } from 'reakit'
import StoreSelector from '../StoreSelector/StoreSelector'
import MyAddress from '../MyAddress'

const Container = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  opacity: ${({ expanded, valid }) => (expanded || valid ? '1' : '0.5')};
  pointer-events: ${({ valid }) => (valid ? 'auto' : 'none')};
`
const Heading = styled.h3`
  font-weight: bold;
  color: #1557bf;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    color: #333333;
  }
`

const StyledContent = styled.form`
  margin-top: 1.5rem;
`

const StyledText = styled(Text)`
  display: block;
  margin-top: 0.75rem;
`

// const StyledContactText = styled(Text)`
//   display: block;
//   margin-bottom: 0.7rem;
// `

// const StyledBuildingText = styled(Text)`
//   display: block;
// `

const StyledInputWrapper = styled.div`
  width: 100%;
  display: inline-block;
`

// const SelectedStoreText = styled(Text)`
//   display: block;
// `
const StyledSubmit = styled.input`
  display: none;
`

const StyledRadioInput = styled.input`
  display: none;

  + label {
    display: inline-block;
    color: ${({ checked }) => (checked ? '#ffffff' : '#1557bf')};
    background-color: ${({ checked }) => (checked ? '#1557bf' : '#ffffff')};
    margin-right: 0.5rem;
    padding: 0.63rem 0.75rem;
    text-align: center;
    border-radius: 4px;
    font-size: 0.875rem;
    border: 1px solid #eaeaea;
    font-weight: ${({ checked }) => (checked ? 'bold' : 'normal')};
    cursor: pointer;
  }
`

// const SelectedStorePreview = styled.div`
//   margin-bottom: 2rem;
// `

const StyledAddress = styled.div`
  margin-top: 1rem;
`

const RadioButton = ({ label, value, checked, onChange }) => (
  <React.Fragment>
    <StyledRadioInput
      type="radio"
      id={label}
      name="type"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={label}>{label}</label>
  </React.Fragment>
)

class Content extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSetLocation = this.handleSetLocation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    this.props.onChange(['deliveryPickup', 'values', name], value)
  }

  handleSetLocation(location) {
    this.props.setLocation(location)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render() {
    const {
      pickupLocations,
      checkoutAddress,
      values,
      error,
      accountData,
    } = this.props
    let { type } = checkoutAddress
    let { addresses } = accountData
    return (
      <StyledContent onSubmit={this.handleSubmit} noValidate>
        <RadioButton
          onChange={() =>
            this.handleSetLocation({ ...checkoutAddress, type: 'delivery' })
          }
          checked={type === 'delivery'}
          value="delivery"
          label="Home delivery"
        />
        <RadioButton
          onChange={() =>
            this.handleSetLocation({ ...checkoutAddress, type: 'pickup' })
          }
          checked={type === 'pickup'}
          value="pickup"
          label="Click & Collect"
        />
        {type === 'delivery' ? (
          !isEmpty(addresses) ? (
            <StyledAddress>
              <MyAddress
                accountData={accountData}
                selectedAddress={values}
                onChange={this.props.onChange}
              />
            </StyledAddress>
          ) : (
            <React.Fragment>
              <StyledText size="large" weight="bold" color="#333333">
                Delivery address
              </StyledText>
              <StyledInputWrapper>
                <Input
                  label="Postal code"
                  type="tel"
                  name="pincode"
                  onChange={this.handleChange}
                  value={values.pincode}
                  variant="black"
                  required
                  invalid={error['pincode']}
                />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <Input
                  label="Building name (Optional)"
                  type="tel"
                  name="building"
                  onChange={this.handleChange}
                  value={values.building}
                  variant="black"
                  invalid={error['building']}
                  required
                />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <Input
                  label="Address"
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  value={values.address}
                  variant="black"
                  invalid={error['address']}
                  required
                />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <InlineBlock
                  width="calc((100% - 0.5rem) * 0.25)"
                  margin="0 0.5rem 0 0"
                >
                  <Input
                    label="Floor"
                    type="tel"
                    name="floor"
                    onChange={this.handleChange}
                    value={values.floor}
                    variant="black"
                    invalid={error['floor']}
                    required
                  />
                </InlineBlock>
                <InlineBlock width="calc((100% - 0.5rem) * 0.5)">
                  <Input
                    label="Unit number"
                    type="tel"
                    name="unit"
                    onChange={this.handleChange}
                    value={values.unit}
                    variant="balck"
                    invalid={error['unit']}
                    required
                  />
                </InlineBlock>
              </StyledInputWrapper>
              <StyledInputWrapper>
                <Input
                  label="Additional information (Optional)"
                  type="text"
                  name="additional"
                  onChange={this.handleChange}
                  value={values.additional}
                  variant="balck"
                  required
                />
              </StyledInputWrapper>
            </React.Fragment>
          )
        ) : (
          type === 'pickup' && (
            <React.Fragment>
              <StyledText size="large" weight="bold" color="#333333">
                Collect from:
              </StyledText>
              <StoreSelector
                showSelectedStore
                address={checkoutAddress}
                pickupLocations={pickupLocations}
                setLocation={location => this.handleSetLocation(location)}
              />
            </React.Fragment>
          )
        )}
        {(isEmpty(addresses) || type === 'pickup') && (
          <React.Fragment>
            <StyledText size="large" weight="bold" color="#333333">
              Contact details
            </StyledText>
            <div>
              <StyledInputWrapper>
                <Input
                  label="Name"
                  type="tel"
                  name="contactName"
                  value={values.contactName}
                  onChange={this.handleChange}
                  invalid={error['contactName']}
                  required
                />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <Input
                  label="Mobile number"
                  type="tel"
                  name="contactPhone"
                  value={values.contactPhone}
                  onChange={this.handleChange}
                  invalid={error['contactPhone']}
                  required
                />
              </StyledInputWrapper>
            </div>
            <StyledSubmit type="submit" />
          </React.Fragment>
        )}
      </StyledContent>
    )
  }
}

class CheckoutDeliveryPickup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {},
    }
    this.nodeRef = React.createRef()

    this.deliveryPickupValidation = this.deliveryPickupValidation.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  deliveryPickupValidation(values) {
    let isValid = false,
      error = Object.assign({}, this.state.error)
    if (values.type === 'delivery') {
      if (
        values.pincode &&
        !values.pincode.toString().match(/^[1-9][0-9]{5}$/)
      ) {
        error.pincode = 'Invalid'
      } else if (
        values.pincode &&
        values.pincode.toString().match(/^[1-9][0-9]{5}$/) &&
        error.pincode !== 'Sorry, this area is not serviceable'
      ) {
        delete error.pincode
      }

      if (values.address && values.address.startsWith(' ')) {
        error.address = 'Invalid'
      } else if (values.address && error.address) {
        delete error.address
      }

      if (values.floor && values.floor.startsWith(' ')) {
        error.floor = 'Invalid'
      } else if (values.floor && error.floor) {
        delete error.floor
      }

      if (values.unit && values.unit.startsWith(' ')) {
        error.unit = 'Invalid'
      } else if (values.unit && error.unit) {
        delete error.unit
      }

      if (values.pincode && values.address && values.floor && values.unit) {
        isValid = true
      }
    } else if (values.type === 'pickup') {
      if (!Number.isInteger(values.storeId)) {
        error.storeId = 'Please select a valid store'
      } else if (Number.isInteger(values.storeId) && error.storeId) {
        delete error.storeId
      }

      if (values.storeId) {
        isValid = true
      }
    }

    if (values.contactName && values.contactName.startsWith(' ')) {
      error.contactName = 'Invalid'
    } else if (values.contactName && error.contactName) {
      delete error.contactName
    }

    // Generic regex for international phone number
    if (
      values.contactPhone &&
      !values.contactPhone.match(
        /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
      )
    ) {
      error.contactPhone = 'Invalid'
    } else if (values.contactPhone && error.contactPhone) {
      delete error.contactPhone
    }

    if (!(values.contactName && values.contactPhone)) {
      isValid = false
    }

    if (this.props.isLoggedIn() && values.type === 'delivery') {
      isValid = true
      delete error.pincode
      delete error.floor
      delete error.unit
      delete error.address
      delete error.contactName
      delete error.contactPhone
    }

    if (!isEqual(error, this.state.error)) {
      this.setState({ error })
    }

    let modifiedError = Object.assign({}, error)

    if (values.type === 'pickup') {
      delete modifiedError.pincode
      delete modifiedError.floor
      delete modifiedError.unit
      delete modifiedError.address
    }

    if (values.type === 'delivery') {
      delete modifiedError.storeId
    }

    isValid = isValid && !Object.keys(modifiedError).length

    return isValid
  }

  handleFormSubmit() {
    let error = {},
      { data } = this.props

    if (!data.values.contactName) {
      error.contactName = '*Required'
    }
    if (!data.values.contactPhone) {
      error.contactPhone = '*Required'
    }

    if (data.values.type === 'delivery') {
      if (!data.values.pincode) {
        error.pincode = '*Required'
      }
      if (!data.values.address) {
        error.address = '*Required'
      }
      if (!data.values.floor) {
        error.floor = '*Required'
      }
      if (!data.values.unit) {
        error.unit = '*Required'
      }
    }

    this.setState({ error: { ...this.state.error, ...error } })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.activeChild !== this.props.activeChild &&
      this.props.activeChild === 'deliveryPickup'
    ) {
      window.scrollTo(0, this.nodeRef.current.offsetTop - 20)
    }
    // Update valid state
    if (prevProps.data.values !== this.props.data.values) {
      let isValid = this.deliveryPickupValidation(this.props.data.values)
      if (isValid) {
        !this.props.data.valid &&
          this.props.onChange(['deliveryPickup', 'valid'], true)
      } else {
        this.props.data.valid &&
          this.props.onChange(['deliveryPickup', 'valid'], false)
      }
    }

    // Update delivery charge on address or store change
    if (
      this.props.data.values.type === 'delivery' &&
      this.state.deliveryFee !== prevState.deliveryFee
    ) {
      this.props.onChange(
        ['deliveryPickup', 'values', 'deliveryFee'],
        this.state.deliveryFee
      )
    }
    // Check serviceability of entered pincode
    if (
      prevProps.data.values.pincode !== this.props.data.values.pincode &&
      this.props.data.values.pincode.toString().match(/^[1-9][0-9]{5}$/)
    ) {
      let error = Object.assign({}, this.state.error)
      try {
        let { API_URL } = this.props
        let response = await (await fetch(
          `${API_URL}/serviceable-area?pincode=${
            this.props.data.values.pincode
          }`
        )).json()
        if (!(response.data && response.status === 'SUCCESS')) {
          error.pincode = 'Sorry, this area is not serviceable'
          this.props.onChange(['deliveryPickup', 'valid'], false)
        } else {
          this.props.onChange(
            ['deliveryPickup', 'values', 'deliveryFee'],
            response.data.deliveryCharge
          )
          this.props.onUpdate({
            ...this.props.checkoutAddress,
            storeId: response.data.store.id,
          })
          if (
            this.props.data.values.pincode.toString().match(/^[1-9][0-9]{5}$/)
          ) {
            delete error.pincode
          }
        }
        this.setState({ error })
      } catch (error) {
        this.setState({
          error: { ...this.state.error, pincode: error.message },
        })
      }
    }
  }

  render() {
    const {
      data,
      pickupLocations,
      onChange,
      activeChild,
      onClick,
      checkoutAddress,
      onUpdate,
      accountData,
    } = this.props

    // let selectedStore =
    //   data.values.type === 'pickup' &&
    //   pickupLocations &&
    //   pickupLocations.filter(({ Store }) => Store.id === data.values.storeId)[0]
    return (
      <Container
        expanded={activeChild === 'deliveryPickup'}
        onClick={() => data.valid && onClick('deliveryPickup')}
        valid={data.valid || activeChild === 'deliveryPickup'}
        ref={this.nodeRef}
      >
        <Heading>
          <span>How would you like to receive your order?</span>
        </Heading>
        <Content
          checkoutAddress={checkoutAddress}
          pickupLocations={pickupLocations}
          setLocation={onUpdate}
          onChange={onChange}
          values={data.values}
          error={this.state.error}
          onSubmit={this.handleFormSubmit}
          accountData={accountData}
        />
      </Container>
    )
  }
}

export default CheckoutDeliveryPickup
