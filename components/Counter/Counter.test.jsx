import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Counter from './Counter'

it('should start with 0 as initial value if defaultValue is undefined', () => {
  const { getByText } = render(<Counter />)
  expect(getByText('0')).toBeInTheDocument()
})

it('should start with defined initial value', () => {
  const { getByText } = render(<Counter defaultValue={5} />)
  expect(getByText('5')).toBeInTheDocument()
})

it('clicking on + button should increase by 1', () => {
  const { getByText } = render(<Counter defaultValue={2} />)
  fireEvent.click(getByText('+'))
  expect(getByText('3')).toBeInTheDocument()
})

it('clicking on + button 3x should increase by 3', () => {
  const { getByText } = render(<Counter />)
  fireEvent.click(getByText('+'))
  fireEvent.click(getByText('+'))
  fireEvent.click(getByText('+'))
  expect(getByText('3')).toBeInTheDocument()
})

it('clicking on + button 3x should increase by 3 with initial value', () => {
  const { getByText } = render(<Counter defaultValue={2} />)
  fireEvent.click(getByText('+'))
  fireEvent.click(getByText('+'))
  fireEvent.click(getByText('+'))
  expect(getByText('5')).toBeInTheDocument()
})

it('clicking on - button should decrease by 1', () => {
  const { getByText } = render(<Counter defaultValue={2} />)
  fireEvent.click(getByText('-'))
  expect(getByText('1')).toBeInTheDocument()
})

it('clicking on - button should never decrease below 0', () => {
  const { getByText } = render(<Counter defaultValue={2} />)
  fireEvent.click(getByText('-'))
  fireEvent.click(getByText('-'))
  fireEvent.click(getByText('-'))
  expect(getByText('0')).toBeInTheDocument()
})

it('clicking on -/+ button should trigger onChange event', () => {
  const handleChange = jest.fn()
  const { getByText } = render(
    <Counter defaultValue={5} onChange={handleChange} />
  )

  fireEvent.click(getByText('-'))
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith({
    prevValue: 5,
    nextValue: 4,
    delta: -1,
  })

  handleChange.mockClear()

  fireEvent.click(getByText('+'))
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith({
    prevValue: 4,
    nextValue: 5,
    delta: 1,
  })
})

it('clicking on - button without value change should not trigger onChange event', () => {
  const handleChange = jest.fn()
  const { getByText } = render(<Counter onChange={handleChange} />)

  fireEvent.click(getByText('-'))
  fireEvent.click(getByText('-'))
  fireEvent.click(getByText('-'))
  expect(handleChange).toHaveBeenCalledTimes(0)
})
