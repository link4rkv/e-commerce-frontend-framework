import React from 'react'
import { render } from 'react-testing-library'
import ImageSlideShow from './'
import { createImageCarouselCard } from '../../mocks'

const imgData = createImageCarouselCard()
const data = {
  images: Array(5).fill(imgData),
}

it('carousel and images are rendered properly', () => {
  const { getByTestId, getAllByTestId } = render(<ImageSlideShow data={data} />)

  expect(getByTestId('image-carousel')).toBeInTheDocument()
  expect(getAllByTestId('image')).toHaveLength(5)
})
