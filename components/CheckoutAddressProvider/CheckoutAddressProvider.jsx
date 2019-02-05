import React from 'react'

const Context = React.createContext({
  checkoutAddress: {},
  update: () => {},
})

class CheckoutAddressProvider extends React.Component {
  constructor(props) {
    super(props)

    const { defaultAddress } = props
    this.state = {
      // When it's a function it will be invoked only at
      // client-side so local storage can be used for hydrating.
      checkoutAddress:
        typeof defaultAddress === 'function' ? {} : defaultAddress,
    }

    this.update = this.update.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.checkoutAddress !== this.state.checkoutAddress) {
      window.localStorage.setItem(
        'checkoutAddress',
        JSON.stringify(this.state.checkoutAddress)
      )
    }
  }

  componentDidMount() {
    const { defaultAddress } = this.props
    if (typeof defaultAddress === 'function') {
      this.setState({ checkoutAddress: defaultAddress() })
    }
  }

  update(address) {
    if (address) {
      this.setState({ checkoutAddress: address })
    }
  }

  render() {
    const { children } = this.props
    return (
      <Context.Provider
        value={{
          ...this.state,
          update: this.update,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

CheckoutAddressProvider.defaultProps = {
  defaultAddress: {},
}

export default CheckoutAddressProvider

export const CheckoutAddressConsumer = Context.Consumer
