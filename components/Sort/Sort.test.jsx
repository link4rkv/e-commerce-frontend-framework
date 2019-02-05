import React from 'react'
import { render } from 'react-testing-library'
import Sort from '../Sort/Sort'

const sortDummyData = [
  'Relevancy',
  'Newest',
  'Top rated',
  'Price: Low to high',
  'Price: High to low',
  'Brand A-Z',
  'Brand Z-A',
]

it('should render sort component', () => {
  const { getByText } = render(<Sort data={sortDummyData} />)

  expect(getByText('SORT BY')).toBeInTheDocument()
  expect(getByText('Relevancy')).toBeInTheDocument()
  expect(getByText('Brand A-Z')).toBeInTheDocument()
  expect(getByText('Newest')).toBeInTheDocument()
  expect(getByText('Top rated')).toBeInTheDocument()
  expect(getByText('Price: High to low')).toBeInTheDocument()
})
