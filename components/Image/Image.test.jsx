import React from 'react'
import { render } from 'react-testing-library'
import Image from './'

it('renders an image with alt and src', () => {
  // An abstraction for <Image /> HTML element for now because
  // in the future it should be possible to optimize the loading
  // internally without having to change all the <Image />.
  const { getByAltText } = render(
    <Image alt="product-image" src="https://via.placeholder.com/350x150" />
  )

  expect(getByAltText('product-image')).toBeInTheDocument()

  // the alt text test is repeated intentionally because the alt
  // text MUST be there.
  expect(getByAltText('product-image')).toHaveAttribute(
    'src',
    'https://via.placeholder.com/350x150'
  )
})

it('renders caption when caption is provided', () => {
  const { getByText } = render(
    <Image
      alt="product-image"
      src="https://via.placeholder.com/350x150"
      caption="Fresh food"
    />
  )
  expect(getByText('Fresh food')).toBeInTheDocument()
})
