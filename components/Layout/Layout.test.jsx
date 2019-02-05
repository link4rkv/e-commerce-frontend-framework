import React from 'react'
import { render } from 'react-testing-library'
import Layout from './'
import MockNextContext from '../../lib/jest/mockNextContext'

it('Layout is rendered with child', () => {
  const { getByTestId } = render(
    <MockNextContext>
      <Layout>
        <div data-testid="dummy-child" />
      </Layout>
    </MockNextContext>
  )

  let header = document.querySelector('header')
  let main = document.querySelector('main')
  let footer = document.querySelector('footer')

  expect(getByTestId('layout')).toBeInTheDocument()
  expect(getByTestId('layout')).toContainElement(header)
  expect(getByTestId('layout')).toContainElement(main)
  expect(getByTestId('layout')).toContainElement(footer)
  expect(getByTestId('layout')).toContainElement(getByTestId('dummy-child'))
})
