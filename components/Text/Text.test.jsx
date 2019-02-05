import React from 'react'
import { render } from 'react-testing-library'
import Text from './'

it('renders children', () => {
  const { getByText } = render(<Text>Something goes here</Text>)
  expect(getByText(/Something goes here/)).toBeInTheDocument()
})
