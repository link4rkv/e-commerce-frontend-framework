import React from 'react'
import { render } from 'react-testing-library'
import LayoutImage from './'

const LayoutImagedata = {
  imageUrl: 'https://via.placeholder.com/350x150',
}
it('renders a div with a backgroundImage ', () => {
  const { container } = render(<LayoutImage data={LayoutImagedata} />)
  expect(container).toBeInTheDocument()
  expect(container).toHaveStyle(`
  background-image: 'https://via.placeholder.com/350x150'
  `)
})

it('does not render div if Image Url is not there', () => {
  const { queryByTestId } = render(<LayoutImage data={undefined} />)

  expect(queryByTestId('LayoutImageContainer')).not.toBeInTheDocument()
})
