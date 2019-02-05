import React from 'react'
import { render } from 'react-testing-library'
import Price from './'

it('should render price', () => {
  const { getByText } = render(<Price amount={2.5} />)
  expect(getByText('$2.50')).toBeInTheDocument()
})

it('should render free when price is 0', () => {
  const { getByText } = render(<Price amount={0.0} />)
  expect(getByText('Free')).toBeInTheDocument()
})

it('should render negative price', () => {
  const { getByText } = render(<Price amount={-10.0} />)
  expect(getByText('-$10.00')).toBeInTheDocument()
})

it('should render as discounted price when discount is available', () => {
  const { getByText } = render(<Price amount={2.5} discount={1.0} />)
  expect(getByText('$1.50')).toBeInTheDocument()
})

it('should render as <del></del> when outdated is used', () => {
  render(<Price amount={2.5} outdated />)
  expect(document.querySelector('del')).toBeInTheDocument()
})

it('should always show number if forceDigits is on', () => {
  const { getByText } = render(<Price amount={0.0} forceDigits />)
  expect(getByText('$0.00')).toBeInTheDocument()
})
