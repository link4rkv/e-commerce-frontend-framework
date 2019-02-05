import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import ImageSlideShowCarousel from './'
import ImageCard from '../ImageSlideShowCard'
import {
  TABLET,
  mockScreenSize,
  restoreScreenSize,
} from './../../lib/jest/matchMedia'

import { createImageCarouselCard } from '../../mocks'

const skipSomeTime = delayMs =>
  new Promise(resolve => setTimeout(resolve, delayMs))

const skipSomeTimeAfterMount = (delayMs = 50) => skipSomeTime(delayMs)

const createMockElementWidth = function() {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetLeft: {
      get: function() {
        return 0
      },
    },
    offsetTop: {
      get: function() {
        return 0
      },
    },
    offsetHeight: {
      get: function() {
        return 200
      },
    },
    offsetWidth: {
      get: function() {
        return 300
      },
    },
    currentStyle: {
      get: function() {
        return {
          marginLeft: 10,
          marginRight: 10,
        }
      },
    },
    clientWidth: {
      get: function() {
        return window.innerWidth
      },
    },
  })
}

if (!window.HTMLElement.prototype.currentStyle) {
  createMockElementWidth()
}

describe('desktop', () => {
  beforeAll(mockScreenSize())
  afterEach(restoreScreenSize)

  it('carousel has mounted', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, getAllByTestId } = render(
      <ImageSlideShowCarousel>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </ImageSlideShowCarousel>
    )

    expect(getByTestId('image-carousel')).toBeInTheDocument()
    expect(getAllByTestId('image-card')).toHaveLength(5)
  })

  it('arrow onClick working properly', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, getAllByTestId } = render(
      <ImageSlideShowCarousel>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </ImageSlideShowCarousel>
    )

    skipSomeTimeAfterMount(500)

    fireEvent.click(getByTestId('arrow'))

    skipSomeTimeAfterMount(500)

    expect(getAllByTestId('arrow')).toHaveLength(2)
  })

  it('reset position prop works properly', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, rerender } = render(
      <ImageSlideShowCarousel>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </ImageSlideShowCarousel>
    )

    skipSomeTimeAfterMount(500)

    fireEvent.click(getByTestId('arrow'))

    skipSomeTimeAfterMount(500)

    expect(getByTestId('arrow')).toHaveAttribute('direction', 'left')

    rerender(
      <ImageSlideShowCarousel resetPosition>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </ImageSlideShowCarousel>
    )

    skipSomeTimeAfterMount(500)

    expect(getByTestId('arrow')).toHaveAttribute('direction', 'right')
  })
})

describe('tablet', () => {
  beforeAll(mockScreenSize(TABLET))
  afterAll(restoreScreenSize)

  it('carousel has mounted', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, getAllByTestId } = render(
      <ImageSlideShowCarousel>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </ImageSlideShowCarousel>
    )

    expect(getByTestId('image-carousel')).toBeInTheDocument()
    expect(getAllByTestId('image-card')).toHaveLength(5)

    skipSomeTimeAfterMount(500)

    expect(getByTestId('arrow')).not.toBeVisible()
    expect(getAllByTestId('arrow')).toHaveLength(1)
  })
})
