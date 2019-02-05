import React from 'react'
import { render } from 'react-testing-library'
import ImageSlideShowCard from './'
import { createImageCarouselCard } from '../../mocks'

const imgData = createImageCarouselCard()

it('component is rendered properly', () => {
  const { getByTestId, getByText } = render(
    <ImageSlideShowCard image={imgData} />
  )

  expect(getByText(/Image Dummy Title/)).toBeInTheDocument()
  expect(getByText(/Image Dummy Subtitle/)).toBeInTheDocument()
  expect(getByTestId('image')).toBeInTheDocument()
  expect(getByTestId('image')).toHaveStyle(
    'background-image: https://via.placeholder.com/300'
  )
})
