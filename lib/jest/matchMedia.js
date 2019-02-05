import mediaQuery from 'css-mediaquery'
import { breakpoints } from './../Media'

const matches = (query, breakpoint) =>
  mediaQuery.match(query, { width: breakpoint })

module.exports = {
  // Export screen sizes as UPPERCASE.
  ...Object.keys(breakpoints).reduce(
    (acc, key) => ({
      ...acc,
      [key.toUpperCase()]: breakpoints[key],
    }),
    {}
  ),

  // This is an escape-hatch.
  MOBILE: 767,

  // When `breakpoint` is not provided, the media
  // query will always match, i.e. acts as a generic
  // matchMedia.
  mockScreenSize: breakpoint => () => {
    window.matchMedia = jest.fn(query => ({
      matches: breakpoint ? matches(query, breakpoint) : true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }))
  },
  restoreScreenSize: () => {
    window.matchMedia = undefined
  },
}
