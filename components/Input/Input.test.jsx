import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Input from './'

it('should render properly', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <Input value="Demo input" onChange={onChange} label="Demo" />
  )

  expect(getByTestId('input')).toBeInTheDocument()
  expect(getByTestId('input')).toHaveAttribute('value', 'Demo input')
  expect(getByTestId('input-label')).toBeInTheDocument()
  expect(getByTestId('input-label')).toHaveTextContent('Demo')
})

it('should call the clear function is prop is passed', () => {
  const onChange = jest.fn()
  const clear = jest.fn()

  const { getByTestId } = render(
    <Input value="Demo input" onChange={onChange} clear={clear} label="Demo" />
  )

  expect(getByTestId('remove-icon')).toBeInTheDocument()

  fireEvent.click(getByTestId('remove-icon'))

  expect(clear).toHaveBeenCalledTimes(1)
})
