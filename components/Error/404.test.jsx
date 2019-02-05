import React from 'react'
import { render } from 'react-testing-library'
import Error404 from './404'
import MockNextContext from '../../lib/jest/mockNextContext'

it('should render Error 404 component', () => {
  const { getByText } = render(
    <MockNextContext>
      <Error404 />
    </MockNextContext>
  )
  expect(getByText('ERROR CODE: 404')).toBeInTheDocument()
  expect(
    getByText('Opps. Seems like you are lost in space')
  ).toBeInTheDocument()
  expect(getByText('Jump to these page instead:')).toBeInTheDocument()
  expect(getByText('Home')).toBeInTheDocument()
})
