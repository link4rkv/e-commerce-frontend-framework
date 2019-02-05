import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import {
  TABLET,
  mockScreenSize,
  restoreScreenSize,
} from './../../lib/jest/matchMedia'
import MockNextContext from './../../lib/jest/mockNextContext'

import PageHeader from './'

describe('mobile', () => {
  beforeAll(mockScreenSize())
  afterAll(restoreScreenSize)

  it('renders the default', () => {
    const { getByTitle, getByText, getByPlaceholderText, getByTestId } = render(
      <MockNextContext>
        <PageHeader />
      </MockNextContext>
    )

    expect(getByTitle(/logo/)).toBeInTheDocument()
    expect(getByPlaceholderText(/I am looking for/)).toBeInTheDocument()

    expect(getByText(/\$99.90/)).toBeInTheDocument()
    expect(getByText(/for FREE delivery/)).toBeInTheDocument()
    expect(getByTitle(/No free delivery/)).toBeInTheDocument()

    expect(getByTitle(/Shopping cart/)).toBeInTheDocument()
    expect(getByText('0')).toBeInTheDocument()

    expect(getByTestId('mobile-nav-toggle')).toBeVisible()
    expect(getByTestId('mobile-logo')).toBeVisible()
  })

  it('renders free delivery when min spend is met', () => {
    const { getByTitle, getByText } = render(
      <MockNextContext>
        <PageHeader minSpendForFreeDelivery={10} currentSpend={10} />
      </MockNextContext>
    )

    expect(getByText(/FREE Delivery!/)).toBeInTheDocument()
    expect(getByTitle(/Free delivery/)).toBeInTheDocument()
  })

  it('shows nav menu when clicked on logo', () => {
    const { getByTestId } = render(
      <MockNextContext>
        <PageHeader />
      </MockNextContext>
    )
    const button = getByTestId('mobile-logo')

    fireEvent.click(button)
    expect(getByTestId('mobile-nav')).toBeInTheDocument()
  })
})

describe('tablet onwards', () => {
  beforeAll(mockScreenSize(TABLET))
  afterAll(restoreScreenSize)

  it('renders the default', () => {
    const { getByTitle, getByText, getByPlaceholderText } = render(
      <MockNextContext>
        <PageHeader />
      </MockNextContext>
    )

    expect(getByTitle(/logo/)).toBeInTheDocument()
    expect(getByPlaceholderText(/I am looking for/)).toBeInTheDocument()

    expect(getByText(/\$99.90/)).toBeInTheDocument()
    expect(getByText(/for FREE delivery/)).toBeInTheDocument()
    expect(getByTitle(/No free delivery/)).toBeInTheDocument()

    expect(getByTitle(/Shopping cart/)).toBeInTheDocument()
    expect(getByText('0')).toBeInTheDocument()

    expect(getByText(/Home/)).toBeInTheDocument()
    expect(getByText(/Categories/)).toBeInTheDocument()
    expect(getByText(/Promotions/)).toBeInTheDocument()
    // expect(getByText(/Notifications/)).toBeInTheDocument()
    expect(getByText(/Orders/)).toBeInTheDocument()

    expect(getByTitle(/More/)).toBeInTheDocument()
  })

  it('renders free delivery when min spend is met', () => {
    const { getByTitle, getByText } = render(
      <MockNextContext>
        <PageHeader minSpendForFreeDelivery={10} currentSpend={10} />
      </MockNextContext>
    )

    expect(getByText(/FREE Delivery!/)).toBeInTheDocument()
    expect(getByTitle(/Free delivery/)).toBeInTheDocument()
  })

  it('shows additional items when more is clicked', () => {
    const { getByTitle, getByText } = render(
      <MockNextContext>
        <PageHeader />
      </MockNextContext>
    )

    const moreMenu = getByTitle(/More/)

    fireEvent.click(moreMenu)

    expect(getByText(/Coupon/)).toBeInTheDocument()
    expect(getByText(/Shopping List/)).toBeInTheDocument()
    expect(getByText(/Membership/)).toBeInTheDocument()
    expect(getByText(/e-Lucky Draw/)).toBeInTheDocument()
    expect(getByText(/Store Locator/)).toBeInTheDocument()
    expect(getByText(/Events/)).toBeInTheDocument()
  })
})
