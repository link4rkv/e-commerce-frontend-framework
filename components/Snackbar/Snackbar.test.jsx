import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Snackbar from './'

it('should render a snackbar', () => {
  const { queryByTestId } = render(<Snackbar message="promocode applied" />)

  expect(queryByTestId('message')).toHaveTextContent('promocode applied')
})

it('should call close function on click', () => {
  const handleClose = jest.fn()

  const { getByTestId } = render(
    <Snackbar message="promocode applied" onClick={handleClose} />
  )

  fireEvent.click(getByTestId('closeSnackbar'))
  expect(handleClose).toHaveBeenCalledTimes(1)
})
