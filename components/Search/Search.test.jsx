import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'

import MockNextContext from './../../lib/jest/mockNextContext'
import Search from './'

beforeEach(() => {
  localStorage.clear()
})

it('renders a default input with search icon', () => {
  const { getByTitle, getByPlaceholderText } = render(
    <MockNextContext>
      <Search />
    </MockNextContext>
  )
  expect(getByTitle('Search')).toBeInTheDocument()
  expect(getByPlaceholderText(/I am looking for/)).toBeInTheDocument()
})

it('renders with default value if term is present', () => {
  const searchTerm = 'lol'
  const { getByTestId } = render(
    <MockNextContext router={{ query: { query: searchTerm } }}>
      <Search />
    </MockNextContext>
  )
  expect(getByTestId('search-form')).toHaveFormValues({ query: searchTerm })
})

it('fetches and renders results from server when value changes', async () => {
  fetch.resetMocks()

  const response = {
    code: 200,
    status: 'SUCCESS',
    data: {
      product: ['First', 'Second', 'Third'],
    },
  }

  fetch.mockResponseOnce(JSON.stringify(response))

  const Results = ({ items }) => (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )

  const { getByText, getByPlaceholderText } = render(
    <MockNextContext>
      <Search renderResults={results => <Results items={results} />} />
    </MockNextContext>
  )

  fireEvent.change(getByPlaceholderText(/I am looking for/), {
    target: {
      value: 'some',
    },
  })

  await waitForElement(() => getByText(/First/))
  await waitForElement(() => getByText(/Second/))
  await waitForElement(() => getByText(/Third/))

  expect(fetch.mock.calls.length).toEqual(1)
  expect(fetch.mock.calls[0][0]).toEqual(
    'https://fairprice.smartstore.express/api/product?q=some'
  )
})

it('recent search terms are shown', async () => {
  fetch.resetMocks()

  const response = {
    code: 200,
    status: 'SUCCESS',
    data: {
      product: ['First', 'Second', 'Third'],
    },
  }

  fetch.mockResponseOnce(JSON.stringify(response))

  const { getByPlaceholderText, getByText } = render(
    <MockNextContext router={{ query: { query: 'search term' } }}>
      <Search />
    </MockNextContext>
  )

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'search',
    JSON.stringify(['search term'])
  )

  fireEvent.change(getByPlaceholderText(/I am looking for/), {
    target: {
      value: 'some',
    },
  })

  await waitForElement(() => getByText(/search term/))
})

it('recent search items are updated if search query changes', async () => {
  fetch.resetMocks()

  const response = {
    code: 200,
    status: 'SUCCESS',
    data: {
      product: ['First', 'Second', 'Third'],
    },
  }

  fetch.mockResponseOnce(JSON.stringify(response))

  const { getByPlaceholderText, getByText, rerender } = render(
    <MockNextContext router={{ query: { query: 'search term' } }}>
      <Search />
    </MockNextContext>
  )

  rerender(
    <MockNextContext router={{ query: { query: 'new search term' } }}>
      <Search />
    </MockNextContext>
  )

  fireEvent.change(getByPlaceholderText(/I am looking for/), {
    target: {
      value: 'some',
    },
  })

  await waitForElement(() => getByText(/search term/))
  await waitForElement(() => getByText(/new search term/))
})
