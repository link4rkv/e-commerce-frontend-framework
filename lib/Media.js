import { css } from 'styled-components'
import { createBreakpoints } from 'styled-breakpoints'

export const breakpoints = {
  // tl;dr Avoid using `from('mobile')` and only use `only('mobile')` as an escape hatch to avoid
  // unnecessary unsetting of styles in a bigger viewport.

  // All CSS here are usually implemented in a mobile-first fashion. Which means that there is
  // really no point in using `from('mobile')` because everything is assumed to for mobile
  // viewport unless scoped with media queries.
  mobile: 1,
  tablet: 768,
  desktop: 1024,
  hd: 1366,
  uhd: 1440,
}

export const { above: from, below, between, only } = createBreakpoints(
  breakpoints
)

export const visible = query =>
  query === only('mobile')
    ? css`
        display: block;

        ${from('tablet')} {
          display: none;
        }
      `
    : css`
        display: none;

        ${query} {
          display: block;
        }
      `

export default visible
