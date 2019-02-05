import React from 'react'
import { render } from 'react-testing-library'
import TextIcon from './'

import Camera from './../icons/Camera'

it('renders children with prefix and/or suffix', () => {
  const { getByText, getByTitle } = render(
    <TextIcon
      prefix={<Camera title="camera-prefix" />}
      suffix={<Camera title="camera-suffix" />}
    >
      Something goes here
    </TextIcon>
  )

  expect(getByTitle(/camera-prefix/)).toBeInTheDocument()
  expect(getByTitle(/camera-suffix/)).toBeInTheDocument()
  expect(getByText(/Something goes here/)).toBeInTheDocument()
})
