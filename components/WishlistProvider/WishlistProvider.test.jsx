import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import WishlistProvider, { WishlistConsumer } from './'
import { store } from '../CartProvider'

beforeEach(() => {
  localStorage.clear()
})

it('should store wishlist info in local storage', () => {
  const { getByText } = render(
    <WishlistProvider>
      <WishlistConsumer>
        {({ update }) => (
          <button onClick={() => update({ id: 124 })}>Add</button>
        )}
      </WishlistConsumer>
    </WishlistProvider>
  )

  fireEvent.click(getByText(/Add/))
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'wishlist',
    JSON.stringify({ 124: { id: 124 } })
  )
})

it('should restore wishlist info from local storage', () => {
  const wishlist = { 123: { saved: 'true' }, 449: { saved: 'false' } }

  localStorage.setItem('wishlist', JSON.stringify(wishlist))

  const { getByText } = render(
    <WishlistProvider defaultItems={store('wishlist')}>
      <WishlistConsumer>
        {({ wishlist }) => (
          <ul>
            {Object.keys(wishlist).map(key => (
              <li key={key}>{wishlist[key].saved}</li>
            ))}
          </ul>
        )}
      </WishlistConsumer>
    </WishlistProvider>
  )

  expect(getByText('true')).toBeInTheDocument()
  expect(getByText('false')).toBeInTheDocument()
})

it('removing everything from wishlist should make local storage save as {}', () => {
  const wishlistItem = {
    123: { saved: 'true' },
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlistItem))
  const { getByText } = render(
    <WishlistProvider defaultItems={store('wishlist')}>
      <WishlistConsumer>
        {({ wishlist, update }) => (
          <React.Fragment>
            <ul>
              {Object.keys(wishlist).map(key => (
                <li key={key}>{wishlist[key].saved}</li>
              ))}
              <button onClick={() => update({ id: 123 })}>Remove</button>
            </ul>
          </React.Fragment>
        )}
      </WishlistConsumer>
    </WishlistProvider>
  )

  fireEvent.click(getByText(/Remove/))
  expect(localStorage.__STORE__.wishlist).toBe('{}')
})
