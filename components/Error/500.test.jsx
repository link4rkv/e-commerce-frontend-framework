import React from 'react'
import { render } from 'react-testing-library'
import Error500 from './500'
import MockNextContext from '../../lib/jest/mockNextContext'

it('should render Error 500 component', () => {
  const { getByText } = render(
    <MockNextContext>
      <Error500 />
    </MockNextContext>
  )
  expect(getByText('ERROR CODE: 500')).toBeInTheDocument()
  expect(getByText('Oh no, something went wrong')).toBeInTheDocument()
  expect(
    getByText(
      `Sorry! We encountered an error while loading this page. Please try again.`
    )
  ).toBeInTheDocument()
  expect(getByText('Reload page')).toBeInTheDocument()
})
