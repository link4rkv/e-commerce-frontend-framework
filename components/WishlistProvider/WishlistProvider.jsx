import React from 'react'
import isEqual from 'lodash/isEqual'

const Context = React.createContext({
  wishlist: {},
  includes: () => {},
  update: () => {},
  add: () => {},
  remove: () => {},
})

class WishlistProvider extends React.Component {
  constructor(props) {
    super(props)

    const { defaultItems } = props
    this.state = {
      // When it's a function it will be invoked only at
      // client-side so local storage can be used for hydrating.
      wishlist: typeof defaultItems === 'function' ? {} : defaultItems,
    }

    this.includes = this.includes.bind(this)
    this.update = this.update.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.wishlist, this.state.wishlist)) {
      window.localStorage.setItem(
        'wishlist',
        JSON.stringify(this.state.wishlist)
      )
    }
  }

  componentDidMount() {
    const { defaultItems } = this.props
    if (typeof defaultItems === 'function') {
      this.setState({ wishlist: defaultItems() })
    }
  }

  includes(product) {
    const { id } = product
    const { wishlist } = this.state
    return wishlist[id] !== undefined
  }

  update(product) {
    const { id } = product
    const wishlist = { ...this.state.wishlist }
    !wishlist[id] ? this.add(product) : this.remove(id)
  }

  add(product) {
    const { id } = product
    this.setState(({ wishlist }) => {
      return {
        wishlist: {
          ...wishlist,
          [id]: { ...wishlist[id], ...product },
        },
      }
    })
  }

  remove(id) {
    this.setState(({ wishlist }) => {
      // eslint-disable-next-line no-unused-vars
      const { [id]: values, ...others } = wishlist
      return {
        wishlist: others,
      }
    })
  }

  render() {
    const { children } = this.props
    return (
      <Context.Provider
        value={{
          wishlist: this.state.wishlist,
          includes: this.includes,
          update: this.update,
          add: this.add,
          remove: this.remove,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

WishlistProvider.defaultProps = {
  defaultItems: {},
}

export default WishlistProvider

export const WishlistConsumer = Context.Consumer
