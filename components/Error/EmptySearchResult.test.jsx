import React from 'react'
import { render } from 'react-testing-library'
import EmptySearchResult from './EmptySearchResult'
import MockNextContext from '../../lib/jest/mockNextContext'

it('should render Empty search result component', () => {
  const { getByText } = render(
    <MockNextContext>
      <EmptySearchResult />
    </MockNextContext>
  )
  expect(getByText('No search results found')).toBeInTheDocument()
  expect(
    getByText(
      `Try using other search terms to improve your results or choose from our latest deals and promotions.`
    )
  ).toBeInTheDocument()
  expect(getByText('Deals & promotions')).toBeInTheDocument()
})
