import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import {
  TABLET,
  mockScreenSize,
  restoreScreenSize,
} from './../../lib/jest/matchMedia'
import Carousel from './'
import ImageCard from '../ImageSlideShowCard'

import { createImageCarouselCard } from '../../mocks'

const skipSomeTime = delayMs =>
  new Promise(resolve => setTimeout(resolve, delayMs))

const skipSomeTimeAfterMount = (delayMs = 50) => skipSomeTime(delayMs)

const createMockElementWidth = function() {
  global.window = true
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetLeft: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).marginLeft) || 0
      },
    },
    offsetTop: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).marginTop) || 0
      },
    },
    offsetHeight: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).height) || 200
      },
    },
    offsetWidth: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).width) || 300
      },
    },
    currentStyle: {
      get: function() {
        return {
          marginLeft:
            parseFloat(window.getComputedStyle(this).marginLeft) || 10,
          marginRight:
            parseFloat(window.getComputedStyle(this).marginRight) || 10,
        }
      },
    },
    clientWidth: {
      get: function() {
        return (
          parseFloat(window.getComputedStyle(this).width) || window.innerWidth
        )
      },
    },
  })
}

if (!window.HTMLElement.prototype.currentStyle) {
  createMockElementWidth()
}

describe('desktop', () => {
  beforeAll(mockScreenSize())
  afterAll(restoreScreenSize)

  it('carousel has mounted', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, getAllByTestId } = render(
      <Carousel>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </Carousel>
    )

    expect(getByTestId('carousel')).toBeInTheDocument()
    expect(getAllByTestId('image-card')).toHaveLength(5)
  })

  it('left arrow appears once there is something to scroll left', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, getAllByTestId } = render(
      <Carousel>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </Carousel>
    )

    skipSomeTimeAfterMount(500)

    fireEvent.click(getByTestId('arrow'))

    skipSomeTimeAfterMount(500)

    expect(getAllByTestId('arrow')).toHaveLength(1)
    expect(getByTestId('arrow')).toHaveAttribute('direction', 'left')

    fireEvent.click(getByTestId('arrow'))

    skipSomeTimeAfterMount(500)

    expect(getAllByTestId('arrow')).toHaveLength(1)
    expect(getByTestId('arrow')).toHaveAttribute('direction', 'right')
  })

  it('reset position prop works properly', () => {
    const mockData = Array(5).fill(createImageCarouselCard())
    const { getByTestId, rerender } = render(
      <Carousel infiniteScrolling={false}>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </Carousel>
    )

    fireEvent.click(getByTestId('arrow'))

    expect(getByTestId('arrow')).toHaveAttribute('direction', 'left')

    rerender(
      <Carousel infiniteScrolling={false} resetPosition>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </Carousel>
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
      <Carousel infiniteScrolling={false}>
        {mockData.map((data, index) => (
          <div
            style={{ display: 'inline-block' }}
            key={'image-card' + index}
            data-testid="image-card"
          >
            <ImageCard image={data} />
          </div>
        ))}
      </Carousel>
    )

    expect(getByTestId('carousel')).toBeInTheDocument()
    expect(getAllByTestId('image-card')).toHaveLength(5)

    skipSomeTimeAfterMount(500)

    expect(getByTestId('arrow')).not.toBeVisible()
    expect(getAllByTestId('arrow')).toHaveLength(1)
  })
})
