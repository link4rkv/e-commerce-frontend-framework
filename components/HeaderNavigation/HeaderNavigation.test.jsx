import React from 'react'
import { render } from 'react-testing-library'
import HeaderNavigation from './'
import MockNextContext from './../../lib/jest/mockNextContext'
import { mockScreenSize, restoreScreenSize } from './../../lib/jest/matchMedia'

describe('mobile', () => {
  beforeAll(mockScreenSize())
  afterAll(restoreScreenSize)

  it('renders the whole menu', () => {
    const { getByText } = render(
      <MockNextContext>
        <HeaderNavigation />
      </MockNextContext>
    )

    expect(getByText(/Home/)).toBeInTheDocument()
    expect(getByText(/Categories/)).toBeInTheDocument()
    expect(getByText(/Promotions/)).toBeInTheDocument()
    // expect(getByText(/Notifications/)).toBeInTheDocument()
    expect(getByText(/Orders/)).toBeInTheDocument()

    expect(getByText(/Coupon/)).toBeInTheDocument()
    expect(getByText(/Shopping List/)).toBeInTheDocument()
    expect(getByText(/Membership/)).toBeInTheDocument()
    expect(getByText(/e-Lucky Draw/)).toBeInTheDocument()
    expect(getByText(/Store Locator/)).toBeInTheDocument()
    expect(getByText(/Events/)).toBeInTheDocument()
  })
})

it('renders a list of navigation menu', () => {
  const { getByText } = render(
    <MockNextContext>
      <HeaderNavigation />
    </MockNextContext>
  )

  expect(getByText(/Home/)).toBeInTheDocument()
  expect(getByText(/Categories/)).toBeInTheDocument()
  expect(getByText(/Promotions/)).toBeInTheDocument()
  // expect(getByText(/Notifications/)).toBeInTheDocument()
  expect(getByText(/Orders/)).toBeInTheDocument()
})
