import React from 'react'
import size from 'lodash/size'
import isEmpty from 'lodash/isEmpty'

const MIN_AMOUNT_ALLOWED = 1

const Context = React.createContext({
  items: {},
  count: 0,
  includes: () => {},
  update: () => {},
  destroy: () => {},
  countOf: () => {},
  totalPrice: () => {},
})

export const store = key => () => {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch (error) {
    return {}
  }
}

class CartProvider extends React.Component {
  constructor(props) {
    super(props)

    const { defaultItems } = props
    this.state = {
      // When it's a function it will be invoked only at
      // client-side so local storage can be used for hydrating.
      items: typeof defaultItems === 'function' ? {} : defaultItems,
    }

    this.update = this.update.bind(this)
    this.countOf = this.countOf.bind(this)
    this.destroy = this.destroy.bind(this)
    this.includes = this.includes.bind(this)
    this.totalPrice = this.totalPrice.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items !== this.state.items) {
      window.localStorage.setItem('cart', JSON.stringify(this.state.items))
    }
  }

  componentDidMount() {
    const { defaultItems } = this.props
    if (typeof defaultItems === 'function') {
      this.setState({ items: defaultItems() })
    }
  }

  destroy(product) {
    const { id } = product
    this.setState(({ items }) => {
      // eslint-disable-next-line no-unused-vars
      const { [id]: value, ...others } = items
      return {
        items: others,
      }
    })
  }

  countOf(product) {
    const { id } = product
    if (this.state.items[id] === undefined) {
      return 0
    }
    return this.state.items[id].count
  }

  includes(product) {
    return this.state.items[product.id] !== undefined
  }

  update(product, count = 0) {
    if (count === 0) return
    count < 0 ? this.remove(product, Math.abs(count)) : this.add(product, count)
  }

  add(product, count = 1) {
    const { id } = product

    this.setState(({ items }) => {
      if (items[id]) {
        return {
          items: {
            ...items,
            [id]: { ...items[id], ...product, count: items[id].count + count },
          },
        }
      }

      return {
        items: { ...items, [id]: { ...product, count } },
      }
    })
  }

  totalPrice() {
    const { items } = this.state
    if (!isEmpty(items)) {
      return Object.keys(items)
        .filter(
          item =>
            items[item].storeSpecificData &&
            items[item].storeSpecificData.length
        )
        .reduce((total, key) => {
          let price,
            discount,
            count = 0
          price = items[key].storeSpecificData[0].mrp
          discount = items[key].storeSpecificData[0].discount
          count = items[key].count
          return total + (price - discount) * count
        }, 0)
    }
    return 0
  }

  remove(product, count = 0) {
    const { id } = product

    this.setState(({ items }) => {
      if (!items[id]) return null

      if (
        count < MIN_AMOUNT_ALLOWED ||
        items[id].count - count < MIN_AMOUNT_ALLOWED
      ) {
        // eslint-disable-next-line no-unused-vars
        const { [id]: value, ...others } = items

        return {
          items: others,
        }
      }

      return {
        items: {
          ...items,
          [id]: {
            ...items[id],
            count: items[id].count - count,
          },
        },
      }
    })
  }

  render() {
    const { children } = this.props
    return (
      <Context.Provider
        value={{
          update: this.update,
          items: this.state.items,
          count: size(this.state.items),
          includes: this.includes,
          countOf: this.countOf,
          destroy: this.destroy,
          totalPrice: this.totalPrice,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

CartProvider.defaultProps = {
  defaultItems: {},
}

export default CartProvider

export const CartConsumer = Context.Consumer
