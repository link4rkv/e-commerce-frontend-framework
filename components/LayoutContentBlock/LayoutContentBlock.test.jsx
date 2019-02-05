import React from 'react'
import { render } from 'react-testing-library'
import LayoutContentBlock from '.'

const LayoutContentdata = {
  text: 'LayoutContent Mock Data',
}
it(`renders a paragraph with a span if data props is present with 'text' Property`, () => {
  const { getByTestId } = render(
    <LayoutContentBlock data={LayoutContentdata} />
  )
  expect(getByTestId('LayoutText')).toBeInTheDocument()
})

it('does not render TextComponent present within if data props is undefined', () => {
  let { queryByTestId } = render(<LayoutContentBlock data={undefined} />)

  expect(queryByTestId('LayoutText')).not.toBeInTheDocument()
})

it('does not render TextComponent present within LayoutContentBlock component if data props is null', () => {
  let { queryByTestId } = render(<LayoutContentBlock data={null} />)

  expect(queryByTestId('LayoutText')).not.toBeInTheDocument()
})

it(`does not render TextComponent present within LayoutContentBlock component if data props does not have 'text' Property`, () => {
  let { queryByTestId } = render(
    <LayoutContentBlock data={{ name: 'TextualPart' }} />
  )

  expect(queryByTestId('LayoutText')).not.toBeInTheDocument()
})
