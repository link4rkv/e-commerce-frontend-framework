import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import fetch from 'isomorphic-unfetch'
import update from 'immutability-helper'

import getConfig from 'next/config'
import Head from 'next/head'

import CheckoutHeader from '../../components/CheckoutHeader'
import CheckoutAccount from '../../components/CheckoutAccount'
import CheckoutDeliveryPickup from '../../components/CheckoutDeliveryPickup'
import DroppedProductsPopup from '../../components/DroppedProductsPopup'
import SlotSelector from '../../components/SlotSelector'
import CheckoutPayment from '../../components/CheckoutPayment'
import CheckoutSummary from '../../components/CheckoutSummary'
import CheckoutCartList from '../../components/CheckoutCartList'
import { CheckoutAddressConsumer } from '../../components/CheckoutAddressProvider'
import { AccountConsumer } from '../../components/AccountProvider'
import { WrpDiv } from '../../containers/Main'
import Text from '../../components/Text'
import ProgressBar from '../../components/ProgressBar'
import { from } from '../../lib/Media'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const StyledWrpDiv = styled(WrpDiv)`
  padding: 1rem;
  max-width: 25rem;
  margin: 0 auto;

  ${from('tablet')} {
    padding: 2rem;
    max-width: none;
  }

  ${from('desktop')} {
    padding: 2.5rem 0;
    max-width: 44rem;
  }
`
const StyledSubmitButton = styled.button`
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #1557bf;
  padding: 0.5rem 1rem 1.5rem;
  position: fixed;
  bottom: 1rem;
  left: 0.5rem;
  text-align: left;
  width: calc(100% - 1rem);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);

  :disabled {
    background-color: #eaeaea;
    color: #696969;
    cursor: auto;
  }

  ${from('tablet')} {
    position: ${({ active }) =>
      active === 'slotSelector' ? 'fixed' : 'relative'};
    left: ${({ active }) => (active === 'slotSelector' ? '0.5rem' : 'unset')};
    bottom: ${({ active }) => (active === 'slotSelector' ? '1rem' : 'unset')};
    width: ${({ active }) =>
      active === 'slotSelector' ? 'calc(100% - 1rem)' : '100%'};
  }

  ${from('desktop')} {
    position: relative;
    width: 100%;
    left: 0;
  }
`

const StyledText = styled(Text)`
  color: ${({ disabled }) => (disabled ? '#696969' : '#ffffff')};
  display: block;
`

const LeftColumn = styled.div`
  ${from('tablet')} {
    float: left;
    width: calc((100% - 1rem) * 0.5);
  }
`

const RightColumn = styled.div`
  margin-bottom: 5rem;

  ${from('tablet')} {
    float: right;
    margin-left: 1rem;
    margin-bottom: 0;
    width: calc((100% - 1rem) * 0.5);
  }
`

const StyledProgressBar = styled(ProgressBar)`
  position: absolute;
  bottom: 0;
  left: 0;
`

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #f3f5f7;
  }
`

class Checkout extends React.Component {
  async componentDidMount() {
    try {
      let { checkoutAddress } = this.props
      let { storeId, type } = checkoutAddress
      if (storeId || type) {
        let data = await this.fetchCheckoutData(storeId)
        this.setState(prevState => {
          let newState = update(prevState, {
            checkoutData: {
              $set: data.data,
            },
            childrenState: {
              deliveryPickup: {
                values: {
                  type: {
                    $set: type,
                  },
                  storeId: {
                    $set: storeId,
                  },
                },
              },
            },
          })

          if (this.props.isLoggedIn && this.props.isLoggedIn()) {
            newState = update(newState, {
              childrenState: {
                deliveryPickup: {
                  values: {
                    $merge: this.props.accountData.defaultAddress,
                  },
                },
              },
            })
          }

          return newState
        })
      }
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      showDroppedItemsPopup: false,
      childrenState: {
        account: {
          name: 'Account',
          valid: false,
          values: {
            type: 'register',
          },
        },
        deliveryPickup: {
          name: 'Delivery address',
          valid: false,
          values: {},
        },
        slotSelector: {
          name: 'Timeslot',
          valid: false,
          values: {},
        },
        payment: {
          name: 'Payment',
          valid: false,
          values: {},
        },
        cart: {
          name: 'Cart',
          valid: false,
        },
      },
      activeChild: 'account',
    }

    this.accountRef = React.createRef()

    this.handleChange = this.handleChange.bind(this)
    this.handleActiveChildUpdate = this.handleActiveChildUpdate.bind(this)
    this.handleNextStep = this.handleNextStep.bind(this)
    this.getNextStepName = this.getNextStepName.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleUpdateLocation = this.handleUpdateLocation.bind(this)
  }

  handleChange(keys = [], value) {
    let newState
    if (keys.length === 3) {
      newState = update(this.state.childrenState, {
        [keys[0]]: {
          [keys[1]]: {
            [keys[2]]: {
              $set: value,
            },
          },
        },
      })
    } else if (keys.length === 2) {
      newState = update(this.state.childrenState, {
        [keys[0]]: {
          [keys[1]]: {
            $set: value,
          },
        },
      })
    }

    this.setState({ childrenState: newState })
  }

  handleNextStep(e) {
    e.preventDefault()
    let { activeChild, childrenState } = this.state
    let allSteps = Object.keys(childrenState)
    let activeIndex = allSteps.indexOf(activeChild)
    if (activeIndex > -1 && activeIndex < allSteps.length) {
      let nextChild = allSteps.findIndex(
        name => !childrenState[name].valid && name !== activeChild
      )
      if (
        activeChild === 'account' &&
        allSteps[nextChild] === 'deliveryPickup'
      ) {
        let { username, password } = childrenState.account.values
        this.props
          .login(username, password)
          .then(() => {
            this.handleActiveChildUpdate(
              nextChild > -1 ? allSteps[nextChild] : 'account'
            )
          })
          .catch(error => {
            this.setState(prevState => {
              let newState = update(prevState, {
                childrenState: {
                  account: {
                    error: {
                      $set: error.message,
                    },
                  },
                },
              })

              return newState
            })
          })
      } else {
        this.handleActiveChildUpdate(
          nextChild > -1 ? allSteps[nextChild] : 'account'
        )
      }
    } else {
      // Proceed to place order
    }
  }

  handleActiveChildUpdate(name) {
    this.setState({ activeChild: name })
  }

  getNextTimeSlot(slots = {}) {
    let nextDate, nextSlot
    for (let key in slots) {
      for (let i = 0; i < slots[key].length; i++) {
        if (slots[key][i].available) {
          nextDate = key
          nextSlot = slots[key][i].id
          return {
            nextDate,
            nextSlot,
          }
        }
      }
    }
    return {}
  }

  getNextStepName() {
    let { activeChild, childrenState } = this.state
    let allSteps = Object.keys(childrenState)
    let activeIndex = allSteps.indexOf(activeChild)
    if (activeIndex > -1 && activeIndex < allSteps.length) {
      let nextChild = allSteps.findIndex(
        name => !childrenState[name].valid && name !== activeChild
      )
      return nextChild > -1
        ? childrenState[allSteps[nextChild]].name
        : 'Pay & Place order'
    } else {
      return 'Account'
    }
  }

  handleUpdateLocation(checkoutAddress) {
    this.checkoutAddress = checkoutAddress
    if (this.props.checkoutAddress.storeId != checkoutAddress.storeId) {
      this.setState({
        showDroppedItemsPopup: true,
      })
    } else {
      this.props.update(checkoutAddress)
    }
  }

  handleClose() {
    this.setState(prevState => {
      let newState = update(prevState, {
        childrenState: {
          deliveryPickup: {
            values: {
              pincode: {
                $set: this.props.checkoutAddress.pincode || '',
              },
            },
          },
        },
        showDroppedItemsPopup: {
          $set: false,
        },
      })

      return newState
    })
  }

  async handleUpdate() {
    this.props.update(this.checkoutAddress)
    let { storeId, type } = this.checkoutAddress
    if (storeId) {
      try {
        let data = await this.fetchCheckoutData(storeId)

        this.setState(prevState => {
          let newState = update(prevState, {
            showDroppedItemsPopup: {
              $set: false,
            },
            checkoutData: {
              $set: data.data,
            },
            childrenState: {
              deliveryPickup: {
                values: {
                  storeId: {
                    $set: storeId,
                  },
                  type: {
                    $set: type,
                  },
                  $unset: ['preferredDate', 'preferredSlotId'],
                },
              },
            },
          })

          return newState
        })
      } catch (error) {
        this.setState({
          error: error.message,
          showDroppedItemsPopup: false,
        })
      }
    }
  }

  async fetchCheckoutData(storeId) {
    if (storeId && Number.isInteger(storeId)) {
      try {
        let checkoutData = await (await fetch(
          `${API_URL}/checkout?storeId=${storeId}`
        )).json()

        return checkoutData
      } catch (error) {
        throw new Error('Unable to fetch slots')
      }
    } else {
      return {}
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      /* If serving store changes */
      prevProps.checkoutAddress.storeId &&
      prevProps.checkoutAddress.storeId !== this.props.checkoutAddress.storeId
    ) {
      this.setState({
        showDroppedItemsPopup: true,
      })
    } else if (
      /* When storeId is read from localStorage */
      !prevProps.checkoutAddress.type &&
      this.props.checkoutAddress.type
    ) {
      let data = await this.fetchCheckoutData(
        this.props.checkoutAddress.storeId
      )

      this.setState(prevState => {
        let newState = update(prevState, {
          checkoutData: {
            $set: data.data,
          },
          childrenState: {
            deliveryPickup: {
              values: {
                type: {
                  $set: this.props.checkoutAddress.type,
                },
                storeId: {
                  $set: this.props.checkoutAddress.storeId,
                },
              },
            },
          },
        })

        return newState
      })
    }

    /* Update address if login status changes */
    if (
      prevProps.isLoggedIn() !== this.props.isLoggedIn() ||
      (this.props.isLoggedIn() && !this.state.accountDataLoaded)
    ) {
      this.setState(prevState => {
        let newState = update(prevState, {
          childrenState: {
            deliveryPickup: {
              values: {
                $merge: this.props.accountData.defaultAddress,
              },
            },
            account: {
              valid: {
                $set: true,
              },
            },
          },
          accountDataLoaded: {
            $set: true,
          },
        })

        return newState
      })
    }

    /* Update orderType from context */
    if (
      prevProps.checkoutAddress.type !== this.props.checkoutAddress.type &&
      prevProps.checkoutAddress.storeId === this.props.checkoutAddress.storeId
    ) {
      this.setState(prevState => {
        let newState = update(prevState, {
          childrenState: {
            deliveryPickup: {
              values: {
                type: {
                  $set: this.props.checkoutAddress.type,
                },
              },
            },
          },
        })

        return newState
      })
    }
  }

  render() {
    const {
      childrenState,
      activeChild,
      checkoutData,
      showDroppedItemsPopup,
    } = this.state
    const {
      account,
      deliveryPickup,
      slotSelector,
      payment,
      cart,
    } = childrenState
    const {
      organizationData,
      checkoutAddress,
      isLoggedIn,
      accountData,
    } = this.props
    const { pickupLocations } = organizationData
    const nextStep = this.getNextStepName()
    return (
      <React.Fragment>
        <GlobalStyle />
        <Head>
          <title>
            Checkout | FairPrice: Online Grocery Shopping & Delivery in
            Singapore
          </title>
        </Head>
        <CheckoutHeader />
        {showDroppedItemsPopup && (
          <DroppedProductsPopup
            onClose={this.handleClose}
            onUpdate={this.handleUpdate}
          />
        )}
        <StyledWrpDiv>
          <LeftColumn>
            <CheckoutAccount
              data={account}
              onChange={this.handleChange}
              activeChild={activeChild}
              onClick={this.handleActiveChildUpdate}
              isLoggedIn={isLoggedIn}
            />
            <CheckoutDeliveryPickup
              data={deliveryPickup}
              pickupLocations={pickupLocations}
              onChange={this.handleChange}
              activeChild={activeChild}
              onClick={this.handleActiveChildUpdate}
              API_URL={API_URL}
              checkoutAddress={checkoutAddress}
              onUpdate={this.handleUpdateLocation}
              accountData={accountData}
              isLoggedIn={isLoggedIn}
            />
            <SlotSelector
              data={slotSelector}
              slotData={checkoutData}
              onChange={this.handleChange}
              orderType={this.state.childrenState.deliveryPickup.values.type}
              activeChild={activeChild}
              onClick={this.handleActiveChildUpdate}
            />
            <CheckoutPayment
              data={payment}
              onChange={this.handleChange}
              activeChild={activeChild}
              onClick={this.handleActiveChildUpdate}
            />
            <CheckoutCartList
              data={cart}
              activeChild={activeChild}
              onClick={this.handleActiveChildUpdate}
              onChange={this.handleChange}
            />
          </LeftColumn>
          <RightColumn>
            <CheckoutSummary
              currency={organizationData.currency}
              orderType={{
                type: this.state.childrenState.deliveryPickup.values.type,
                deliveryFee: this.state.childrenState.deliveryPickup.values
                  .deliveryFee,
              }}
            />
            <StyledSubmitButton
              disabled={!childrenState[activeChild].valid}
              onClick={this.handleNextStep}
              active={activeChild}
            >
              <StyledText
                size="small"
                weight="bold"
                disabled={!childrenState[activeChild].valid}
              >
                NEXT
              </StyledText>
              <StyledText
                size="xl"
                weight="bold"
                disabled={!childrenState[activeChild].valid}
              >
                {nextStep}
              </StyledText>
              <StyledProgressBar
                steps={Object.keys(childrenState).length}
                currentPos={
                  Object.values(childrenState).filter(child => child.valid)
                    .length
                }
                color={
                  !childrenState[activeChild].valid ? '#696969' : '#5cc151'
                }
              />
            </StyledSubmitButton>
          </RightColumn>
        </StyledWrpDiv>
      </React.Fragment>
    )
  }
}

Checkout.defaultProps = { data: {}, checkoutAddress: {} }

const CheckoutPageContainer = props => (
  <CheckoutAddressConsumer>
    {({ checkoutAddress, update }) => {
      return (
        <AccountConsumer>
          {({ isLoggedIn, login, accountData }) => (
            <Checkout
              checkoutAddress={checkoutAddress}
              update={update}
              isLoggedIn={isLoggedIn}
              login={login}
              accountData={accountData}
              {...props}
            />
          )}
        </AccountConsumer>
      )
    }}
  </CheckoutAddressConsumer>
)

export default CheckoutPageContainer
