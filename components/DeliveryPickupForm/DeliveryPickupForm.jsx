import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Button, Popover, InlineBlock } from 'reakit'
import LocationSearch from '../LocationSearch'
import StoreSelector from '../StoreSelector'
import styled from 'styled-components'
import { from } from '../../lib/Media'

import { store } from '../CartProvider'
import Expand from '../icons/Expand'
import Collapse from '../icons/Collapse'
import DroppedProductsPopup from '../DroppedProductsPopup'

const StyledDeliveryPickupForm = styled.div`
  position: absolute;
  top: 9.375rem;
  left: 0.95rem;
  display: ${props => (props.hideCheckoutAddress ? 'none' : 'initial')};

  ${from('tablet')} {
    left: 2rem;
    display: ${props => (props.hideCheckoutAddress ? 'none' : 'initial')};
  }

  ${from('desktop')} {
    position: static;
    display: initial;
  }
`
const ToggleButton = styled(Button)`
  outline: none;

  /* IE11 */
  border: none;
  background: none;
  /* end IE11 */
`

const SelectContainer = styled.div`
  font-size: 0.85em;
  font-weight: bold;
  padding: 1rem 2rem 1rem 0.63rem;
  color: #ffffff;
  background-color: #1557bf;
  border: 1px solid #eaeaea;
  border-radius: 0.2rem;
  width: calc(100vw - 2.9rem);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${from('tablet')} {
    width: 17rem;
    padding-right: 3rem;
  }

  ${from('desktop')} {
    padding: 0.8rem 3rem 0.8rem 0.63rem;
  }

  > span {
    color: #ffffff;
  }

  > span b {
    color: #ffffff;
    margin-right: 3px;
  }
`

const StyledPopover = styled(Popover)`
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid #eaeaea;
  padding: 1.25rem 1rem;
  top: -5px;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
`

const ToggleIcon = styled.div`
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: #ffffff;
  top: 0.7rem;
  right: 1rem;
  color: #1557bf;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${from('desktop')} {
    top: 0.5rem;
    right: 0.8rem;
  }
`
const OrderTypeButton = styled(Button)`
  margin-right: 4px;
  font-size: 0.8rem;
  padding: 0.63rem 0.75rem;
  text-align: center;
  border-radius: 0.3rem;
  border: 1px solid #eaeaea;
  outline: none;
  cursor: pointer;

  color: ${({ selected }) => (selected ? '#ffffff' : '#1557bf')};
  background-color: ${({ selected }) => (selected ? '#1557bf' : '#ffffff')};
`

class Content extends Component {
  constructor(props) {
    super(props)
    this.selectOrderType = this.selectOrderType.bind(this)
  }
  selectOrderType(type) {
    this.setState({ type })
  }
  render() {
    const { address, pickupLocations, popover } = this.props
    let { type } = this.state || this.props
    return (
      <React.Fragment>
        <OrderTypeButton
          onClick={() => this.selectOrderType('delivery')}
          selected={type === 'delivery'}
        >
          Home Delivery
        </OrderTypeButton>
        <OrderTypeButton
          onClick={() => this.selectOrderType('pickup')}
          selected={type === 'pickup'}
        >
          Click & Collect
        </OrderTypeButton>
        {type === 'delivery' ? (
          <LocationSearch
            setLocation={location =>
              this.props.setLocation(location, popover.toggle)
            }
            address={address}
            type={this.props.type}
          />
        ) : (
          <StoreSelector
            pickupLocations={pickupLocations}
            setLocation={location =>
              this.props.setLocation(location, popover.toggle)
            }
          />
        )}
      </React.Fragment>
    )
  }
}

class DeliveryPickupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'delivery',
      showPopup: false,
    }

    this.setLocation = this.setLocation.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleClose() {
    this.setState({
      showPopup: false,
    })
  }

  handleUpdate() {
    this.setState({
      showPopup: false,
    })
    this.updateLocation(this.location)
  }

  updateLocation(location) {
    this.props.updateCheckoutAddress &&
      this.props.updateCheckoutAddress(location)
  }

  setLocation(location, toggle) {
    const cart = store('cart')()
    this.location = location
    location.address && toggle()
    if (isEmpty(this.props.checkoutAddress) || isEmpty(cart)) {
      this.updateLocation(location)
    } else if (location.storeId !== this.props.checkoutAddress.storeId) {
      this.setState({
        showPopup: true,
      })
    }
  }

  render() {
    const {
      organizationData,
      checkoutAddress,
      hideCheckoutAddress,
    } = this.props
    let { type, address } = checkoutAddress
    const { pickupLocations } = organizationData || {}
    const { showPopup } = this.state

    if (!type) {
      type = this.state.type
    }

    if (!address) {
      address = this.state.address
    }

    return (
      <Popover.Container>
        {popover => (
          <>
            <StyledDeliveryPickupForm hideCheckoutAddress={hideCheckoutAddress}>
              <InlineBlock relative>
                <ToggleButton as={Popover.Toggle} {...popover}>
                  <SelectContainer>
                    {address ? (
                      <span>
                        <b>
                          {type === 'delivery' ? 'Deliver to:' : 'Collect at:'}
                        </b>
                        {address}
                      </span>
                    ) : (
                      'How would you like to receive your order?'
                    )}
                  </SelectContainer>
                  <ToggleIcon>
                    {popover.visible ? (
                      <Collapse width="22" height="22" />
                    ) : (
                      <Expand width="22" height="22" />
                    )}
                  </ToggleIcon>
                </ToggleButton>
                <StyledPopover
                  hideOnClickOutside
                  placement="bottom"
                  {...popover}
                >
                  {popover.visible && (
                    <Content
                      setLocation={this.setLocation}
                      type={type}
                      address={address}
                      pickupLocations={pickupLocations}
                      popover={popover}
                    />
                  )}
                </StyledPopover>
              </InlineBlock>
            </StyledDeliveryPickupForm>
            {showPopup && (
              <DroppedProductsPopup
                onUpdate={this.handleUpdate}
                onClose={this.handleClose}
              />
            )}
          </>
        )}
      </Popover.Container>
    )
  }
}

DeliveryPickupForm.defaultProps = {
  checkoutAddress: {},
}

export default DeliveryPickupForm

export { Content }
