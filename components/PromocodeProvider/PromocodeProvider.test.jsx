import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import PromocodeProvider, { PromocodeConsumer } from './PromocodeProvider'

it('initial it should render zero promocode applied', () => {
  const { getByTestId } = render(
    <PromocodeProvider>
      <PromocodeConsumer>
        {({ promocodes }) => (
          <div data-testid="length">{promocodes.length}</div>
        )}
      </PromocodeConsumer>
    </PromocodeProvider>
  )

  expect(getByTestId('length')).toBeInTheDocument()
  expect(getByTestId('length')).toHaveTextContent(0)
})

it('on calling apply function with promo code value should add that value to promocodes', () => {
  const { getByText, queryByTestId, getByTestId } = render(
    <PromocodeProvider>
      <PromocodeConsumer>
        {({ promocodes, apply }) => (
          <>
            <ul>
              {promocodes.map((promocode, index) => (
                <li key={promocode + index} data-testid="promocode">
                  {promocode}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                apply('promocode1')
              }}
            >
              Click me
            </button>
          </>
        )}
      </PromocodeConsumer>
    </PromocodeProvider>
  )

  expect(queryByTestId('promocode')).not.toBeInTheDocument()
  expect(getByText('Click me')).toBeInTheDocument()
  fireEvent.click(getByText('Click me'))
  expect(getByTestId('promocode')).toHaveTextContent('promocode1')
})

it('on calling remove function with promo code value should remove that value from promocodes', () => {
  const { getByText, queryByTestId, getByTestId } = render(
    <PromocodeProvider>
      <PromocodeConsumer>
        {({ promocodes, apply, remove }) => (
          <>
            <ul>
              {promocodes.map((promocode, index) => (
                <li key={promocode + index} data-testid="promocode">
                  {promocode}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                apply('promocode1')
              }}
            >
              Apply
            </button>
            <button
              onClick={() => {
                remove('promocode1')
              }}
            >
              Remove
            </button>
          </>
        )}
      </PromocodeConsumer>
    </PromocodeProvider>
  )

  expect(queryByTestId('promocode')).not.toBeInTheDocument()
  fireEvent.click(getByText('Apply'))
  expect(getByTestId('promocode')).toHaveTextContent('promocode1')
  fireEvent.click(getByText('Remove'))
  expect(queryByTestId('promocode')).not.toBeInTheDocument()
})
