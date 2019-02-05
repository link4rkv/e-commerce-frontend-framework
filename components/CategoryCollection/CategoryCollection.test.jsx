import React from 'react'
import { render } from 'react-testing-library'
import CategoryCollection from './CategoryCollection'
import { dataCategory } from '../../mocks'

it('should render a product', () => {
  const { getByText, getByAltText, getByTitle } = render(
    <CategoryCollection data={dataCategory} />
  )

  expect(getByText('Top Categories')).toBeInTheDocument()
  expect(getByText('Meat Balls')).toBeInTheDocument()
  expect(getByText('Beancurd & Tofu')).toBeInTheDocument()
  expect(getByText('Juices')).toBeInTheDocument()
  expect(getByText('Frozen Fruits')).toBeInTheDocument()
  // expect(getByText('Till 29 Nov 2018')).toBeInTheDocument()
  expect(getByAltText('Meat Balls')).toBeInTheDocument()
  expect(getByTitle('Top Categories')).toBeInTheDocument()
})
