import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import Popup from '../Popup'
import Input from '../Input'
import update from 'immutability-helper'

import { from } from '../../lib/Media'

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 1rem;
`

const AddressCardContainer = styled.div`
  margin-top: 0.5rem;
`

const StyledAddressCardContainer = styled(AddressCardContainer)`
  border: 1px solid ${({ selected }) => (selected ? '#1557bf' : '#eaeaea')};
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
`

const StyledPhoneNumber = styled(Text)`
  display: block;
  margin-left: 1rem;
  margin-right: auto;
`

const Address = styled.div`
  margin-top: 0.3rem;
`

const StyledLandMark = styled(Text)`
  display: block;
`

const Container = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;

  ${from('tablet')} {
    bottom: auto;
    box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
  }
`

const CheckBox = styled.span`
  display: block;
  height: 0.9rem;
  width: 0.9rem;
  border-radius: 50%;
  background-color: ${({ selected }) => (selected ? '#1557bf' : '#eaeaea')};
`

const Button = styled(Text)`
  cursor: pointer;
`

const StyledInputWrapper = styled.div`
  width: 100%;
  display: inline-block;
`
const InlineBlock = styled.div`
  display: inline-block;
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || 0};
`

const StyledText = styled(Text)`
  display: block;
  margin-top: 0.75rem;
`

const StyledSubmit = styled.input`
  display: block;
  padding: 1rem 0;
  width: 100%;
  border-radius: 2rem;
  border: none;
  outline: none;
  color: #ffffff;
  background-color: #1557bf;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1rem;
`

const StyledForm = styled.form`
  max-height: 88vh;
  overflow: auto;
`

const Wrapper = styled.div`
  position: relative;
`

const StyledPopup = styled(Popup)`
  ${from('tablet')} {
    display: none;
  }
`

const Popover = styled.div`
  display: none;
  ${from('tablet')} {
    position: absolute;
    display: block;
    width: 21.5rem;
    left: -4px;
    z-index: 99;
    top: calc(100% + 0.5rem);
  }
`

const Content = ({
  showAddressForm,
  accountData,
  selectedAddress,
  values,
  error,
  onHandleToggleAddressForm,
  onSubmit,
  onChange,
  onAddressChange,
}) => {
  return (
    <Container>
      <StyledHeading>
        <Text color="#333333" weight="bold" size="large">
          {showAddressForm
            ? 'Add new delivery address'
            : 'Select delivery address'}
        </Text>
        <Button
          color="#1557bf"
          weight="bold"
          size="large"
          onClick={onHandleToggleAddressForm}
        >
          {showAddressForm ? 'Cancel' : '+'}
        </Button>
      </StyledHeading>
      {!showAddressForm &&
        accountData.addresses &&
        accountData.addresses.map(address => (
          <StyledAddressCardContainer
            key={address.id}
            selected={address.id === selectedAddress.id}
            onClick={() => onAddressChange(address)}
          >
            <Heading>
              <Text color="#333333">{accountData.name}</Text>
              <StyledPhoneNumber color="#333333">
                {accountData.phones && accountData.phones[0].phone}
              </StyledPhoneNumber>
              <CheckBox selected={address.id === selectedAddress.id} />
            </Heading>
            <Address>
              <Text color="#1557bf">{address.address},&nbsp;</Text>
              <Text color="#1557bf">{address.city}</Text>
              <StyledLandMark color="#1557bf">
                {address.landmark}
              </StyledLandMark>
            </Address>
          </StyledAddressCardContainer>
        ))}
      {showAddressForm && (
        <StyledForm onSubmit={onSubmit} noValidate>
          <StyledInputWrapper>
            <Input
              label="Postal code"
              type="tel"
              name="pincode"
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
              onChange={onChange}
              value={values.additional}
              variant="balck"
              required
            />
          </StyledInputWrapper>
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
                onChange={onChange}
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
                onChange={onChange}
                invalid={error['contactPhone']}
                required
              />
            </StyledInputWrapper>
          </div>
          <StyledSubmit type="submit" value="Add new address" />
        </StyledForm>
      )}
    </Container>
  )
}

class MyAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddressList: false,
      showAddressForm: false,
      values: {},
      error: {},
    }
    this.handleToggleAddressChange = this.handleToggleAddressChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleToggleAddressForm = this.handleToggleAddressForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleToggleAddressChange() {
    this.setState({
      showAddressList: !this.state.showAddressList,
      showAddressForm: false,
    })
  }

  handleToggleAddressForm() {
    this.setState({ showAddressForm: !this.state.showAddressForm })
  }

  handleAddressChange(address) {
    this.props.onChange(['deliveryPickup', 'values'], {
      ...this.props.selectedAddress,
      ...address,
    })
    this.handleToggleAddressChange()
  }

  handleChange(e) {
    let { name, value } = e.target
    this.setState(prevState => {
      let newState = update(prevState, {
        values: {
          [name]: {
            $set: value,
          },
        },
      })

      return newState
    })
  }

  handleFormSubmit(e) {
    e && e.preventDefault()
    let error = {},
      { values } = this.state

    if (!values.contactName) {
      error.contactName = '*Required'
    }
    if (!values.contactPhone) {
      error.contactPhone = '*Required'
    }

    if (!values.pincode) {
      error.pincode = '*Required'
    }
    if (!values.address) {
      error.address = '*Required'
    }
    if (!values.floor) {
      error.floor = '*Required'
    }
    if (!values.unit) {
      error.unit = '*Required'
    }

    this.setState({ error: { ...this.state.error, ...error } })
  }

  render() {
    let { accountData, selectedAddress } = this.props
    let { showAddressList, showAddressForm, values, error } = this.state
    return (
      <React.Fragment>
        <Heading>
          <Text color="#333333" weight="bold" size="large">
            Deliver to:
          </Text>
          <Wrapper>
            <Button
              color="#1557bf"
              weight="bold"
              onClick={this.handleToggleAddressChange}
            >
              Change
            </Button>
            {showAddressList && (
              <React.Fragment>
                <StyledPopup
                  onClose={this.handleToggleAddressChange}
                  bgColor="rgba(243, 245, 247, 0.9)"
                >
                  <Content
                    accountData={accountData}
                    selectedAddress={selectedAddress}
                    showAddressForm={showAddressForm}
                    values={values}
                    error={error}
                    onChange={this.handleChange}
                    onHandleToggleAddressForm={this.handleToggleAddressForm}
                    onSubmit={this.handleFormSubmit}
                  />
                </StyledPopup>
                <Popover>
                  <Content
                    accountData={accountData}
                    selectedAddress={selectedAddress}
                    showAddressForm={showAddressForm}
                    values={values}
                    error={error}
                    onChange={this.handleChange}
                    onHandleToggleAddressForm={this.handleToggleAddressForm}
                    onSubmit={this.handleFormSubmit}
                    onAddressChange={this.handleAddressChange}
                  />
                </Popover>
              </React.Fragment>
            )}
          </Wrapper>
        </Heading>
        <AddressCardContainer>
          <Heading>
            <Text color="#333333">{accountData.name}</Text>
            <StyledPhoneNumber color="#333333">
              {accountData.phones && accountData.phones[0].phone}
            </StyledPhoneNumber>
          </Heading>
          <Address>
            <Text color="#333333">{selectedAddress.address},&nbsp;</Text>
            <Text color="#333333">{selectedAddress.city}</Text>
            <StyledLandMark color="#333333">
              {selectedAddress.landmark}
            </StyledLandMark>
          </Address>
        </AddressCardContainer>
      </React.Fragment>
    )
  }
}

export default MyAddress
