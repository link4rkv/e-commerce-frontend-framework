import React from 'react'
import { render } from 'react-testing-library'
import ProductDescription from './ProductDescription'
import { ProductDescription as data } from '../../mocks'
let Dummydata = data()

it('should render a product', () => {
  let { title, data } = Dummydata
  const { getByText, getByTitle } = render(
    <ProductDescription title={title} data={data} />
  )

  expect(getByText('Description')).toBeInTheDocument()
  expect(
    getByText(
      '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA'
    )
  ).toBeInTheDocument()
  expect(getByText(/•/)).toBeInTheDocument()
  expect(getByText(/Scientifically/)).toBeInTheDocument()

  expect(getByTitle('Description')).toBeInTheDocument()
})

let userDefinedData = data({ title: 'title testing' })

it('should render a product with user defined title', () => {
  let { title, data } = userDefinedData
  const { getByText, getByTitle } = render(
    <ProductDescription title={title} data={data} />
  )

  expect(
    getByText(
      '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA'
    )
  ).toBeInTheDocument()
  expect(getByText(/•/)).toBeInTheDocument()
  expect(getByText(/Scientifically/)).toBeInTheDocument()

  expect(getByTitle('title testing')).toBeInTheDocument()
})
