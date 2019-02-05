import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'
import Filter from './Filter'

let filterDummyData = {
  Brands: [
    { label: 'A jemina', checked: false, group: 'Brands' },
    { label: 'A/Nat Bake', checked: false, group: 'Brands' },
    { label: 'Absolute Organic', checked: false, group: 'Brands' },
    { label: 'Adams', checked: false, group: 'Brands' },
  ],
  Price: [
    { label: '< $3', checked: false, group: 'Price' },
    { label: '$3 - $5', checked: false, group: 'Price' },
  ],
  Dieatry: [
    { label: 'Organic', checked: false, group: 'Dieatry' },
    { label: 'Halal', checked: false, group: 'Dieatry' },
    { label: 'Vegetarian', checked: false, group: 'Dieatry' },
  ],
  Country: [
    { label: 'Australia', checked: false, group: 'Country' },
    { label: 'Singapore', checked: false, group: 'Country' },
  ],
}

it('should render filter component', () => {
  const { getByText } = render(<Filter data={filterDummyData} />)

  expect(getByText('< $3')).toBeInTheDocument()
  expect(getByText('Australia')).toBeInTheDocument()
  expect(getByText('Organic')).toBeInTheDocument()
  expect(getByText('Adams')).toBeInTheDocument()
  expect(getByText('Vegetarian')).toBeInTheDocument()
  expect(getByText('A/Nat Bake')).toBeInTheDocument()
  expect(getByText('Filter')).toBeInTheDocument()
  expect(getByText('Clear all filters')).toBeInTheDocument()
  expect(getByText('Country')).toBeInTheDocument()
})

it('On click scrolling should be done', async () => {
  const { getByText } = render(<Filter data={filterDummyData} />)
  const scrollToSpy = jest.fn()
  global.scrollTo = scrollToSpy

  expect(getByText('Brands').offsetHeight).toBe(0)

  let element = await waitForElement(() => getByText('Filter'))

  fireEvent.click(element)

  expect(scrollToSpy).toHaveBeenCalled()
})
