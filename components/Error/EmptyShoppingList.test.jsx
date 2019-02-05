import React from 'react'
import { render } from 'react-testing-library'
import EmptyShoppingList from './EmptyShoppingList'
import MockNextContext from '../../lib/jest/mockNextContext'

it('should render Empty search result component', () => {
  const { getByText } = render(
    <MockNextContext>
      <EmptyShoppingList />
    </MockNextContext>
  )
  expect(getByText('Your shopping list is empty')).toBeInTheDocument()
  expect(
    getByText(
      `Start adding items you love in the shopping list. Lorem ipsum dolor set amet consectur.`
    )
  ).toBeInTheDocument()
  expect(getByText('Start shopping')).toBeInTheDocument()
})
