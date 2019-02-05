import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import CartProvider, { CartConsumer, store } from './'

beforeEach(() => {
  localStorage.clear()
})

it('renders 0 if nothing is in cart', () => {
  const { getByText } = render(
    <CartProvider>
      <CartConsumer>{({ count }) => <p>{count}</p>}</CartConsumer>
    </CartProvider>
  )

  expect(getByText(/0/)).toBeInTheDocument()
})

it('should store cart info in local storage', () => {
  const { getByText } = render(
    <CartProvider>
      <CartConsumer>
        {({ update }) => (
          <button onClick={() => update({ id: 124 }, 1)}>Add</button>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Add/))
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'cart',
    JSON.stringify({ 124: { id: 124, count: 1 } })
  )
})

it('should restore cart info from local storage', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  localStorage.setItem('cart', JSON.stringify(items))

  const { getByText } = render(
    <CartProvider defaultItems={store('cart')}>
      <CartConsumer>
        {({ items }) => (
          <ul>
            {Object.keys(items).map(key => (
              <li key={key}>{items[key].count}</li>
            ))}
          </ul>
        )}
      </CartConsumer>
    </CartProvider>
  )

  expect(getByText(/2/)).toBeInTheDocument()
  expect(getByText(/4/)).toBeInTheDocument()
})

it('removing everything from cart should make local storage save as {}', () => {
  const items = { 123: { count: 1 } }

  localStorage.setItem('cart', JSON.stringify(items))

  const { getByText } = render(
    <CartProvider defaultItems={store('cart')}>
      <CartConsumer>
        {({ items, update }) => (
          <React.Fragment>
            <ul>
              {Object.keys(items).map(key => (
                <li key={key}>{items[key].count}</li>
              ))}
              <button onClick={() => update({ id: 123 }, -1)}>Remove</button>
            </ul>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Remove/))
  expect(localStorage.__STORE__.cart).toBe('{}')
})

it('renders the unique items count in cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>{({ count }) => <p>{count}</p>}</CartConsumer>
    </CartProvider>
  )

  expect(getByText(/2/)).toBeInTheDocument()
})

it('adds an unique item to cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ count, update }) => (
          <React.Fragment>
            <p>{count}</p>
            <button onClick={() => update({ id: 124 }, 1)}>Add</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Add/))
  expect(getByText(/3/)).toBeInTheDocument()
})

it('removes an unique item from cart', () => {
  const items = { 123: { count: 1 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ count, update }) => (
          <React.Fragment>
            <p>{count}</p>
            <button onClick={() => update({ id: 123 }, -1)}>Remove</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Remove/))
  expect(getByText(/1/)).toBeInTheDocument()
})

it('adds more than 1 to item NOT in cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ items, update }) => (
          <React.Fragment>
            <p>{items['124'] && items['124'].count}</p>
            <button onClick={() => update({ id: 124 }, 12)}>Add</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Add/))
  expect(getByText(/12/)).toBeInTheDocument()
})

it('adds more than 1 to item ALREADY in cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ items, update }) => (
          <React.Fragment>
            <p>{items['123'] && items['123'].count}</p>
            <button onClick={() => update({ id: 123 }, 12)}>Add</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Add/))
  expect(getByText(/14/)).toBeInTheDocument()
})

it('does nothing if removing items NOT in cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ items, update }) => (
          <React.Fragment>
            <p>{items['123'].count}</p>
            <p>{items['449'].count}</p>
            <button onClick={() => update({ id: 448 }, -3)}>Remove</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Remove/))
  expect(getByText(/2/)).toBeInTheDocument()
  expect(getByText(/4/)).toBeInTheDocument()
})

it('removes more than 1 from items ALREADY in cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ items, update }) => (
          <React.Fragment>
            <p>{items['449'] && items['449'].count}</p>
            <button onClick={() => update({ id: 449 }, -3)}>Remove</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Remove/))
  expect(getByText(/1/)).toBeInTheDocument()
})

it('removing more than the amount ALREADY in cart just removes the unique item', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { getByText, queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ items, update }) => (
          <React.Fragment>
            <p>{items['449'] && items['449'].count}</p>
            <button onClick={() => update({ id: 449 }, -10)}>Remove</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByText(/Remove/))
  expect(queryByText(/-6/)).not.toBeInTheDocument()
})

it('should check if a product (by id) is already added to cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ includes }) => (
          <React.Fragment>
            {includes({ id: 123 }) && <p>Added</p>}
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  expect(queryByText(/Added/)).toBeInTheDocument()
})

it('should check if a product (by id) is not added to cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ includes }) => (
          <React.Fragment>
            {includes({ id: 124 }) && <p>Added</p>}
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  expect(queryByText(/Added/)).not.toBeInTheDocument()
})

it('provides the quantity of each product in cart', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ countOf }) => (
          <React.Fragment>
            <p>{countOf({ id: 449 })}</p>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  expect(queryByText(/4/)).toBeInTheDocument()
})

it('provides the quantity of each product in cart as 0 if it is not added', () => {
  const items = { 123: { count: 2 }, 449: { count: 4 } }

  const { queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ countOf }) => (
          <React.Fragment>
            <p>{countOf({ id: 448 })}</p>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  expect(queryByText(/0/)).toBeInTheDocument()
})

it('provides the total price of products in cart', () => {
  const items = {
    123: {
      storeSpecificData: [{ mrp: 123.23, discount: 23 }],
      count: 1,
    },
    449: {
      storeSpecificData: [{ mrp: 130, discount: 10 }],
      count: 2,
    },
  }

  const { queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ totalPrice }) => (
          <React.Fragment>
            <p>{totalPrice()}</p>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )
  expect(queryByText(/340.23/)).toBeInTheDocument()
})

it('it should provides the total price 0, if cart is empty', () => {
  const items = {}

  const { queryByText } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ totalPrice }) => (
          <React.Fragment>
            <p>{totalPrice()}</p>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )
  expect(queryByText(/0/)).toBeInTheDocument()
})

it('deletes the entire unique item at once regardless of quantity', () => {
  const items = { 123: { count: 2 }, 448: { count: 4 } }

  const { getByText, getByTestId } = render(
    <CartProvider defaultItems={items}>
      <CartConsumer>
        {({ countOf, destroy }) => (
          <React.Fragment>
            <p data-testid="count">{countOf({ id: 448 })}</p>
            <button onClick={() => destroy({ id: 448 })}>Destroy</button>
          </React.Fragment>
        )}
      </CartConsumer>
    </CartProvider>
  )

  expect(getByTestId('count')).toHaveTextContent(4)
  fireEvent.click(getByText(/Destroy/))

  expect(getByTestId('count')).toHaveTextContent(0)
})
