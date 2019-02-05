import React from 'react'
import { render } from 'react-testing-library'
import ProductCollection from './ProductCollection'

import { createProductCollection } from '../../mocks'

it('all products are shown', () => {
  const mockData = createProductCollection()
  const { getAllByTestId } = render(
    <ProductCollection data={mockData} infiniteScrolling={false} />
  )

  expect(getAllByTestId('product')).toHaveLength(10)
})

it('horizontal product collection is rendered based on props', () => {
  const mockData = createProductCollection()
  const { getByTestId, getAllByTestId } = render(
    <ProductCollection
      data={{ ...mockData, horizontal: true }}
      infiniteScrolling={false}
    />
  )

  expect(getAllByTestId('product')).toHaveLength(10)
  expect(getByTestId('carousel')).toBeInTheDocument()
})

it('proper product component is rendered based on type prop', () => {
  const mockData = createProductCollection()
  const { getAllByTestId, rerender, queryAllByTestId } = render(
    <ProductCollection
      data={{ ...mockData, horizontal: true }}
      infiniteScrolling={false}
    />
  )

  expect(getAllByTestId('product')).toHaveLength(10)

  rerender(
    <ProductCollection
      data={{ ...mockData, horizontal: true }}
      infiniteScrolling={false}
      type="compact"
    />
  )

  expect(getAllByTestId('compact-product')).toHaveLength(10)
  expect(queryAllByTestId('product')).toHaveLength(0)
})

it('products with no storeSpecificData are skipped', () => {
  let mockData = Object.assign({}, createProductCollection())
  let mockDataProds = JSON.parse(JSON.stringify(mockData.collection.product))
  mockData.collection.product = mockDataProds
  mockData.collection.product[0].storeSpecificData = null
  const { getAllByTestId } = render(
    <ProductCollection data={{ ...mockData }} infiniteScrolling={false} />
  )

  expect(getAllByTestId('product')).toHaveLength(9)
})
