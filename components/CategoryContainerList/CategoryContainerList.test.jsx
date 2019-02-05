import React from 'react'
import { render } from 'react-testing-library'
import CategoryContainerList from './CategoryContainerList'
import { CategoryList } from '../../mocks'

const categories = {
  category: CategoryList,
}

it('should render categories', () => {
  const { getByText } = render(<CategoryContainerList data={categories} />)

  expect(getByText('frozen')).toBeVisible()
  expect(getByText('chilled')).toBeInTheDocument()
  expect(getByText('dairy')).toBeInTheDocument()
  expect(getByText('tesco')).toBeInTheDocument()
  expect(getByText('fresh produce')).toBeInTheDocument()
  expect(getByText('housebrand')).toBeInTheDocument()
  expect(getByText('baby & child')).toBeInTheDocument()
})

it('should show category image othewise default no-img should be shown', () => {
  const { getAllByTestId } = render(<CategoryContainerList data={categories} />)

  expect(getAllByTestId('no-img')).toHaveLength(6)
  expect(getAllByTestId('category-img')).toHaveLength(1)
})

it('should return null if categories are empty', () => {
  const { queryByTestId } = render(
    <CategoryContainerList data={{ category: [] }} />
  )

  expect(queryByTestId('no-img')).not.toBeInTheDocument()
  expect(queryByTestId('category-img')).not.toBeInTheDocument()
})
