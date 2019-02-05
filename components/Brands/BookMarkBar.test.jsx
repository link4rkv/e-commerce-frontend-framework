import React from 'react'
import { render } from 'react-testing-library'
import BookMarkBar from './BookMarkBar'
import { brandDummyData } from '../../mocks'

it('should render a Bookmark bar', () => {
  const { getByText, getByTestId, asFragment } = render(
    <BookMarkBar data={brandDummyData} />
  )
  expect(getByTestId('bookmarkbar')).toBeInTheDocument()
  expect(getByTestId('bookmarkbar')).toHaveTextContent('A')
  expect(getByText('A')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})
