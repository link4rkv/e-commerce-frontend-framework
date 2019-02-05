import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import CategoryDetails from './'
import { CategoryDetailsData } from '../../mocks'

it('menus are rendered properly', () => {
  const { getByText, getByTestId } = render(
    <CategoryDetails subCategories={CategoryDetailsData} />
  )

  expect(getByTestId('category-menu')).toBeInTheDocument()
  expect(getByText(/Dairy/)).toBeInTheDocument()
  expect(getByText(/Milk/)).toBeInTheDocument()
  expect(getByText(/Cheese/)).toBeInTheDocument()
  expect(getByText(/Dairy Spreads/)).toBeInTheDocument()
  expect(getByText(/Cream/)).toBeInTheDocument()
})

it('menu toggles properly', () => {
  const { queryByText } = render(
    <CategoryDetails subCategories={CategoryDetailsData} />
  )

  fireEvent.click(queryByText(/Milk/))

  expect(queryByText(/Fresh Milk/)).toBeInTheDocument()
  expect(queryByText(/Cultured Milk/)).toBeInTheDocument()
  expect(queryByText(/Soya Milk/)).toBeInTheDocument()

  fireEvent.click(queryByText(/Milk/))

  expect(queryByText(/Fresh Milk/)).not.toBeInTheDocument()
  expect(queryByText(/Cultured Milk/)).not.toBeInTheDocument()
  expect(queryByText(/Soya Milk/)).not.toBeInTheDocument()
})

it('does not render menu if name is not present', () => {
  const { queryByText } = render(
    <CategoryDetails subCategories={{ ...CategoryDetailsData, name: '' }} />
  )

  expect(queryByText('Dairy')).not.toBeInTheDocument()
})
