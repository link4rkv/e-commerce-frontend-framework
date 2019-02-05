import React from 'react'
import styled from 'styled-components'
import { from } from '../../lib/Media'
import Text from '../Text'
import Promocode from '../Promocode'
import Input from '../Input'
import CheckoutHeader from '../CheckoutHeader'
import { PromocodeConsumer } from '../PromocodeProvider'
import Snackbar from '../Snackbar'

const StyledPromocodePopup = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3f5f7;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  position: relative;
`

const PromocodesBody = styled.div`
  padding: 1rem;
  margin-bottom: auto;
  overflow-y: auto;

  ${from('tablet')} {
    padding: 2rem 0.75rem;
  }

  ${from('hd')} {
    padding: 2rem 3.5rem;
  }
`

const PromocodeHeading = styled(Text)`
  margin: 0 0 0.5rem 0;
`

const PromocodesWrp = styled.div`
  margin-bottom: 0.5rem;

  ${from('tablet')} {
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
  }
`

const PromocodeWrp = styled.div`
  margin-bottom: 0.5rem;

  ${from('tablet')} {
    margin-bottom: 1rem;
    margin-right: 1rem;
    width: calc((100% - 1rem) / 2);

    &:nth-child(2n + 2) {
      margin-right: 0;
    }
  }

  ${from('desktop')} {
    width: calc((100% - 2rem) / 3);

    &:nth-child(2n + 2) {
      margin-right: 1rem;
    }

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }

  ${from('hd')} {
    width: calc((100% - 3rem) / 4);

    &:nth-child(2n + 2) {
      margin-right: 1rem;
    }

    &:nth-child(3n + 3) {
      margin-right: 1rem;
    }

    &:nth-child(4n + 4) {
      margin-right: 0;
    }
  }
`

const InputWrp = styled.div`
  margin-bottom: 2rem;

  ${from('tablet')} {
    margin-top: -0.6rem;
    width: calc((100% - 1rem) / 2);
  }

  ${from('desktop')} {
    width: calc((100% - 2rem) / 3);
  }

  ${from('hd')} {
    width: calc((100% - 3rem) / 4);
  }
`

const ApplyPromocodeButton = styled.button`
  max-width: 21.5rem;
  width: 100%;
  min-height: 3.5rem;
  border-radius: 1.75rem;
  background-color: #1557bf;
  padding: 1rem;
  border: none;
  margin: 0.5rem auto;
  cursor: pointer;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);

  &:focus {
    outline: none;
  }

  ${from('tablet')} {
    margin: 0.5rem auto 2rem auto;
  }

  ${from('desktop')} {
    margin: 0.5rem auto 2.5rem auto;
  }
`

class PromocodePopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userEnteredPromocodeValue: '',
      promocodes: props.promocodes,
      notification: {
        show: false,
        message: '',
      },
      addPromocode: {
        add: false,
        value: '',
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleApplyPromocode = this.handleApplyPromocode.bind(this)
    this.handleClosoNotification = this.handleClosoNotification.bind(this)
    this.handleRemovePromocode = this.handleRemovePromocode.bind(this)
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({
      userEnteredPromocodeValue: value,
    })
  }

  handleApplyPromocode(promocode, promocodeProvider) {
    const index = promocodeProvider.promocodes.indexOf(promocode)
    // TO check promo code already applied or not
    if (index != -1) {
      this.setState({
        notification: {
          show: true,
          message: 'Promo code already applied',
        },
      })
      return
    }
    if (promocode && typeof promocodeProvider.apply === 'function') {
      this.setState({
        notification: {
          show: true,
          message: 'Promo code applied',
        },
      })
      promocodeProvider.apply(promocode)
    }
  }

  handleRemovePromocode(promocode, remove) {
    if (promocode && typeof remove === 'function') {
      this.setState({
        notification: {
          show: true,
          message: 'Promo code removed',
        },
      })
      remove(promocode)
    }
  }

  handleClosoNotification() {
    this.setState({
      notification: {
        show: false,
        message: '',
      },
    })
  }

  render() {
    const { notification, userEnteredPromocodeValue } = this.state
    const { onClose, promocodes, title } = this.props
    const availablePromocodes = promocodes
    const isPromocodeAvailable =
      availablePromocodes && availablePromocodes.length > 0
    return (
      <PromocodeConsumer>
        {PromocodeProvider => (
          <StyledPromocodePopup>
            <CheckoutHeader title={title} onClose={onClose} />
            <PromocodesBody>
              {PromocodeProvider.promocodes.length > 0 && (
                <PromocodeHeading
                  as="h1"
                  size="large"
                  weight="bold"
                  color="#333333"
                >
                  Applied promotions
                </PromocodeHeading>
              )}
              {PromocodeProvider.promocodes.length > 0 && (
                <PromocodesWrp data-testid="promocodeWrp">
                  {PromocodeProvider.promocodes.map((promocode, index) => (
                    <PromocodeWrp key={promocode + index}>
                      <Promocode
                        promocode={promocode}
                        onRemove={e => {
                          e.stopPropagation()
                          this.handleRemovePromocode(
                            promocode,
                            PromocodeProvider.remove
                          )
                        }}
                        borderColor="#ea6100"
                      />
                    </PromocodeWrp>
                  ))}
                </PromocodesWrp>
              )}
              <InputWrp>
                <Input
                  label="Enter promo code"
                  value={userEnteredPromocodeValue}
                  onChange={this.handleChange}
                  required
                />
              </InputWrp>
              {/* Show only when ther is any promocode available to apply */}
              {isPromocodeAvailable && (
                <PromocodeHeading
                  as="h1"
                  size="large"
                  weight="bold"
                  color="#333333"
                >
                  Available promotions
                </PromocodeHeading>
              )}
              {/* To display available promo codes */}
              {isPromocodeAvailable && (
                <PromocodesWrp>
                  {availablePromocodes.map((promocode, index) => (
                    <PromocodeWrp key={promocode + index}>
                      <Promocode
                        promocode={promocode}
                        onApply={() => {
                          this.handleApplyPromocode(
                            promocode,
                            PromocodeProvider
                          )
                        }}
                      />
                    </PromocodeWrp>
                  ))}
                </PromocodesWrp>
              )}
            </PromocodesBody>
            {notification.show && (
              <Snackbar
                message={notification.message}
                onClick={this.handleClosoNotification}
                bottom="7rem"
              />
            )}
            <ApplyPromocodeButton onClick={onClose}>
              <Text size="large" color="#ffffff" weight="bold">
                Back to {title}
              </Text>
            </ApplyPromocodeButton>
          </StyledPromocodePopup>
        )}
      </PromocodeConsumer>
    )
  }
}

export default PromocodePopup
