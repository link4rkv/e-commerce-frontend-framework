import React from 'react'
import { render } from 'react-testing-library'
import Brands from './Brands'
import { brandDummyData } from '../../mocks'

it('should render brands component', () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <Brands data={brandDummyData} />
  )

  expect(getByText(/ALAMARCA/i)).toBeInTheDocument()
  expect(getByTestId(`A`)).toBeInTheDocument()
  expect(getByTestId(`A`)).toHaveTextContent(/ALAMARCA/i)
  expect(queryByTestId(`#`)).not.toBeInTheDocument()
  expect(getByTestId('brands')).toBeInTheDocument()
  expect(getByTestId('brands').childElementCount).toBe(26)
  expect(getByTestId('brands').firstChild).toHaveTextContent(/ALAMARCA/i)
})
