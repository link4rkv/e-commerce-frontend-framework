import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Popup from './Popup'

it('Basic Popup should be render', () => {
  const { getByText } = render(
    <Popup>
      <h1>Heading</h1>
      <p>paragraph</p>
    </Popup>
  )

  expect(getByText('Heading')).toBeInTheDocument()
  expect(getByText('paragraph')).toBeInTheDocument()
})

it('on clicking outside of child, should call close function', () => {
  const close = jest.fn()

  const { getByTestId } = render(
    <Popup onClose={close}>
      <h1>Heading</h1>
      <p>Paragraph</p>
    </Popup>
  )

  fireEvent.click(getByTestId('popup'))
  expect(close).toHaveBeenCalledTimes(1)
})

it('on clicking inside of child, should not call close function', () => {
  const close = jest.fn()

  const { getByText } = render(
    <Popup onClose={close}>
      <h1>Heading</h1>
      <p>Paragraph</p>
    </Popup>
  )

  fireEvent.click(getByText('Heading'))
  expect(close).toHaveBeenCalledTimes(0)
  fireEvent.click(getByText('Paragraph'))
  expect(close).toHaveBeenCalledTimes(0)
})

it('on pressing esc key, should call close function', () => {
  const close = jest.fn()
  const ele = (
    <Popup onClose={close}>
      <h1>Heading</h1>
      <p>Paragraph</p>
    </Popup>
  )
  const { getByTestId } = render(ele)

  fireEvent.keyDown(getByTestId('popup'), { keyCode: 27 })
  expect(close).toHaveBeenCalledTimes(1)
})
