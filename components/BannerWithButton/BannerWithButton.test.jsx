import React from 'react'
import { render } from 'react-testing-library'
import BannerWithButton from './'
import { createImageCarouselCard } from '../../mocks'

const imgData = createImageCarouselCard()

it('component is rendered properly', () => {
  const { getByTestId, getByText } = render(
    <BannerWithButton image={imgData} />
  )

  expect(getByTestId('image')).toBeInTheDocument()
  expect(getByText(/Image Dummy Title/)).toBeInTheDocument()
  expect(getByText(/Image Dummy Subtitle/)).toBeInTheDocument()

  expect(getByTestId('image')).toHaveStyle(
    'background-image: https://via.placeholder.com/300'
  )
})
