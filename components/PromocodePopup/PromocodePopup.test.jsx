import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'
import PromocodePopup from './PromocodePopup'

it('should render a promocode popup component with zero available and applied promocode', () => {
  const { getByText } = render(<PromocodePopup title="Cart" />)
  expect(getByText(/Cart/)).toBeInTheDocument()
})

it('should render a promocode popup component available promocodes', () => {
  const promocodes = [
    'promocode1',
    'promocode2',
    'promocode3',
    'promocode4',
    'promocode5',
  ]
  const { getByText } = render(
    <PromocodePopup title="Cart" promocodes={promocodes} />
  )

  expect(getByText(/promocode1/)).toBeInTheDocument()
  expect(getByText(/promocode2/)).toBeInTheDocument()
  expect(getByText(/promocode3/)).toBeInTheDocument()
  expect(getByText(/promocode4/)).toBeInTheDocument()
  expect(getByText(/promocode5/)).toBeInTheDocument()
})

it('should apply promocode on clicking on any available promocode', () => {
  const promocodes = [
    'promocode1',
    'promocode2',
    'promocode3',
    'promocode4',
    'promocode5',
  ]

  const { getByTestId, getAllByTestId } = render(
    <PromocodePopup title="Cart" promocodes={promocodes} />
  )

  fireEvent.click(getAllByTestId('promocode')[0])

  wait(() => {
    expect(getByTestId('promocodeWrp')).toBeInTheDocument()
  }, 1000)
  // expect(getByTestId('promocodeWrp'))
  // expect(getByTestId('promocodeWrp')).toBeInTheDocument()
})

/*
it('should remove promocode on clicking on any applied promocode', () => {
  const promocodes = ['promocode1', 'promocode2', 'promocode3', 'promocode4', 'promocode5']
  
  const { getAllByTestId, queryAllByTestId } = render(<PromocodePopup title='Cart' promocodes={promocodes}/>)
  
  fireEvent.click(getAllByTestId('promocode')[0]) // To add promocode
  fireEvent.click(getAllByTestId('promocode')[1]) // To add promocode
  fireEvent.click(getAllByTestId('promocode')[2]) // To add promocode
  fireEvent.click(getAllByTestId('promocode')[3]) // To add promocode
  fireEvent.click(getAllByTestId('promocode')[4]) // To add promocode

  wait(() => (
    expect(getAllByTestId('removePromocode')).toBeInTheDocument() // To check where value added to dom or not
  ))
  
  fireEvent.click(getAllByTestId('removePromocode')[0]) // to remove promocode
})
*/
