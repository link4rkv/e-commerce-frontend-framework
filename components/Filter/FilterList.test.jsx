import React from 'react'
import FilterList from './FilterList'
import { render } from 'react-testing-library'

let tempData = {
  data: [
    {
      label: 'A jemina',
      checked: false,
      group: 'Brands',
    },
    {
      label: 'A/Nat Bake',
      checked: false,
      group: 'Brands',
    },
    {
      label: 'Absolute Organic',
      checked: false,
      group: 'Brands',
    },
    {
      label: 'Adams',
      checked: false,
      group: 'Brands',
    },
  ],
  checkedFilters: [],
}

it('should render a filter list', () => {
  const { getByText, getByTestId } = render(<FilterList data={tempData.data} />)

  expect(getByText('A/Nat Bake')).toBeInTheDocument()
  expect(getByText('A jemina')).toBeInTheDocument()
  expect(getByText('Absolute Organic')).toBeInTheDocument()
  expect(getByText('Adams')).toBeInTheDocument()

  expect(getByTestId('container')).toBeInTheDocument()
  expect(getByTestId('checkbox-0')).toBeInTheDocument()
  expect(getByTestId('unchecked-svg-0')).toBeInTheDocument()
})
