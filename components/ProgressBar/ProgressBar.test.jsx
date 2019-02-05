import React from 'react'
import ProgressBar from '../ProgressBar'
import { render } from 'react-testing-library'

it('progress bar width is changing properly', () => {
  const { getByTestId } = render(<ProgressBar />)

  expect(getByTestId('progress-bar')).toBeInTheDocument()
})
