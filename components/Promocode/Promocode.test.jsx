import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Promocode from './'

it('should render a promocode', () => {
  const { getByText } = render(<Promocode promocode="Test1" />)
  expect(getByText('Test1')).toBeInTheDocument()
})

it('should render a promocode with red border', () => {
  const { getByTestId } = render(
    <Promocode promocode="Test1" borderColor="red" />
  )
  expect(getByTestId('promocode')).toHaveStyle('border: 1px solid red;')
})

it('on click it should call onApply function', () => {
  const handleApply = jest.fn()
  const { getByTestId } = render(
    <Promocode promocode="Test1" borderColor="red" onApply={handleApply} />
  )
  fireEvent.click(getByTestId('promocode'))
  expect(handleApply).toHaveBeenCalledTimes(1)
})

it('on click it should call onRemove function', () => {
  const handleRemove = jest.fn()
  const { getByTestId } = render(
    <Promocode promocode="Test1" borderColor="red" onRemove={handleRemove} />
  )
  fireEvent.click(getByTestId('removePromocode'))
  expect(handleRemove).toHaveBeenCalledTimes(1)
})
