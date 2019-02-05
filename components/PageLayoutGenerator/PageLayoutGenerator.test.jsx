import React from 'react'
import { render } from 'react-testing-library'
import PageLayoutGenerator from './'

const Pagedata = [
  {
    data: {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181109/IMG_20180708_122923-20181109-112339.jpg',
    },
    name: 'Image',
    value: {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181109/IMG_20180708_122923-20181109-112339.jpg',
    },
  },
  {
    data: {
      text:
        'Farm Store -- is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet. These business transactions occur either as business-to-business, business-to-consumer, consumer-to-consumer or consumer-to-business...\nThese business transactions occur either as business-to-business, business-to-consumer, consumer-to-consumer or consumer-to-business...\n\nThese business transactions occur either as business-to-business, business-to-consumer, consumer-to-consumer or consumer-to-business...',
    },
    name: 'ContentBlock',
    value: {
      text:
        'Farm Store -- is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet. These business transactions occur either as business-to-business, business-to-consumer, consumer-to-consumer or consumer-to-business...\nThese business transactions occur either as business-to-business, business-to-consumer, consumer-to-consumer or consumer-to-business...\n\nThese business transactions occur either as business-to-business, business-to-consumer, consumer-to-consumer or consumer-to-business...',
    },
  },
]

it(`Running Component with normal Data props`, () => {
  const { getByTestId } = render(
    <PageLayoutGenerator data={Pagedata} title="title" />
  )
  expect(getByTestId('LayoutContainer')).toBeInTheDocument()
  expect(getByTestId('StaticPageHeading')).toBeInTheDocument()
})

it(`Running Component with undefined Data props and defined title`, () => {
  const { queryByTestId, getByTestId } = render(
    <PageLayoutGenerator data={undefined} title="title" />
  )
  expect(queryByTestId('LayoutContainer')).not.toBeInTheDocument()
  expect(getByTestId('StaticPageHeading')).toBeInTheDocument()
})

it(`Running Component without title props but well defined data`, () => {
  const { queryByTestId, getByTestId } = render(
    <PageLayoutGenerator data={Pagedata} />
  )
  expect(queryByTestId('StaticPageHeading')).not.toBeInTheDocument()
  expect(getByTestId('LayoutContainer')).toBeInTheDocument()
})
