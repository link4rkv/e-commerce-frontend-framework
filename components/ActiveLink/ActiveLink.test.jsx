import React from 'react'
import { render } from 'react-testing-library'
import ActiveLink, { matchPathname } from './'
import MockNextContext from './../../lib/jest/mockNextContext'

it('renders a standard link', () => {
  const { getByText } = render(
    <MockNextContext>
      <ActiveLink href="/test">Normal link</ActiveLink>
    </MockNextContext>
  )
  expect(getByText(/Normal link/)).toHaveAttribute('href', '/test')
})

it('renders an anchored link by id', () => {
  const { getByText } = render(
    <MockNextContext>
      <ActiveLink href="#test">Anchor link</ActiveLink>
    </MockNextContext>
  )
  expect(getByText(/Anchor link/)).toHaveAttribute('href', '#test')
})

it('renders active when the pathname matches href', () => {
  const { getByText } = render(
    <MockNextContext router={{ pathname: '/test' }}>
      <ActiveLink href="/test" active="Active link" activeWhen={matchPathname}>
        Normal Link
      </ActiveLink>
    </MockNextContext>
  )
  expect(getByText(/Active link/)).toHaveAttribute('href', '/test')
})
