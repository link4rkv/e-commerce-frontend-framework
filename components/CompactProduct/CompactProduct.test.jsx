import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { createProduct } from '../../mocks'
import CompactProduct from './'
import CartProvider, { CartConsumer } from '../CartProvider/CartProvider'
import WishlistProvider from '../WishlistProvider'

const product = createProduct({ description: 'compact-product-image' })

it('should render a compact product', () => {
  const { getByText, getByAltText, getByTitle } = render(
    <CompactProduct details={product} />
  )

  expect(getByAltText('compact-product-image')).toBeInTheDocument()

  expect(getByText(/Rokeby/)).toBeInTheDocument()

  expect(getByText(/7.95/)).toBeInTheDocument()
  expect(getByText(/8.95/)).toBeInTheDocument()

  expect(getByText(/Save/)).toBeInTheDocument()
  expect(getByText(/\$1.00/)).toBeInTheDocument(0)

  expect(getByTitle('add to cart')).toBeInTheDocument()
})

it('adding and removing from cart should update cart provider', () => {
  const { getByText, queryByTitle, getByTitle, getByTestId } = render(
    <CartProvider>
      <CompactProduct details={product} />
      <CartConsumer>
        {({ count }) => <p data-testid="count">{count}</p>}
      </CartConsumer>
    </CartProvider>
  )

  fireEvent.click(getByTitle('add to cart'))
  expect(getByTestId('count')).toHaveTextContent(1)
  expect(queryByTitle('add to cart')).not.toBeInTheDocument()
  expect(getByTestId('compact-product')).toHaveStyle(`border-color: #1557bf;`)

  fireEvent.click(getByText('-'))
  expect(getByTitle('add to cart')).toBeInTheDocument()
  expect(getByTestId('count')).toHaveTextContent(0)
  expect(getByTestId('compact-product')).toHaveStyle(`border-color: #eaeaea;`)
})

it('identical product rendered in multiple places should always show the same quantity count in cart', () => {
  const { getByTitle, queryByTitle } = render(
    <CartProvider>
      <CompactProduct details={product} />
      <CompactProduct details={product} />
    </CartProvider>
  )

  fireEvent.click(getByTitle('add to cart'))
  expect(queryByTitle('add to cart')).not.toBeInTheDocument()
})

describe('trash icon', () => {
  it('should appear if onDelete is provided', () => {
    const handleDelete = jest.fn()
    const { getByTitle } = render(
      <CompactProduct details={product} onDelete={handleDelete} />
    )
    expect(getByTitle('bin')).toBeInTheDocument()
  })

  it('should not appear if onDelete is not provided', () => {
    const { queryByTitle } = render(<CompactProduct details={product} />)
    expect(queryByTitle('bin')).not.toBeInTheDocument()
  })

  it('should invoke onDelete when deleting a product ', () => {
    const handleDelete = jest.fn()
    const { getByTitle } = render(
      <CompactProduct details={product} onDelete={handleDelete} />
    )

    fireEvent.click(getByTitle('bin'))
    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleDelete).toHaveBeenCalledWith({ product })
  })
})

describe('save icon', () => {
  it('should appear if onSave is provided', () => {
    const handleSave = jest.fn()
    const { getByTitle } = render(
      <CompactProduct details={product} onSave={handleSave} />
    )
    expect(getByTitle('favourite')).toBeInTheDocument()
  })

  it('should be toggled on/off when saving/unsaving', () => {
    const handleSave = jest.fn()
    const { getByTitle } = render(
      <WishlistProvider>
        <CompactProduct details={product} onSave={handleSave} />
      </WishlistProvider>
    )

    fireEvent.click(getByTitle('favourite'))
    expect(getByTitle('favourited')).toBeInTheDocument()

    fireEvent.click(getByTitle('favourited'))
    expect(getByTitle('favourite')).toBeInTheDocument()
  })

  it('should not appear if onSave is not provided', () => {
    const { queryByTitle } = render(<CompactProduct details={product} />)
    expect(queryByTitle('favourite')).not.toBeInTheDocument()
  })
})
