import React from 'react'
import { render } from 'react-testing-library'
import { createProduct } from '../../mocks'
import DroppedProduct from './'

const product = createProduct({ description: 'dropped-product-image' })

it('should render a DroppedProduct product', () => {
  const itemCount = 10
  const { getByText, getByAltText } = render(
    <DroppedProduct details={product} itemCount={itemCount} />
  )

  expect(getByAltText('dropped-product-image')).toBeInTheDocument()
  expect(getByText(/Rokeby/)).toBeInTheDocument()
  expect(getByText(/10/)).toBeInTheDocument()
})
