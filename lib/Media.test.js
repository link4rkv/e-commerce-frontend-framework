import visible, { only, from, below, between } from './Media'

describe('visible(...)', () => {
  it("visible(only('mobile')) to show for mobile and hide for others", () => {
    expect(visible(only('mobile'))).toMatchInlineSnapshot(`
Array [
  "display:block;",
  "@media screen and (min-width: 48em)",
  "{display:none;}",
]
`)
  })

  it('visible(<others> to show for others and hide for mobile', () => {
    // The exact args to `visible` is not important here because it
    // just generates the media query with whatever is passed.
    expect(visible('others')).toMatchInlineSnapshot(`
Array [
  "display:none;",
  "others",
  "{display:block;}",
]
`)
  })
})

describe('only(...), below(...), between(...,...), from(...)', () => {
  it("only('mobile')", () => {
    expect(only('mobile')).toMatchInlineSnapshot(
      `"@media screen and (min-width: 0.0625em) and (max-width: 47.99875em)"`
    )
  })

  it("from('mobile')", () => {
    expect(from('mobile')).toMatchInlineSnapshot(
      `"@media screen and (min-width: 0.0625em)"`
    )
  })

  it("below('tablet')", () => {
    expect(below('tablet')).toMatchInlineSnapshot(
      `"@media screen and (max-width: 63.99875em)"`
    )
  })

  it("between('tablet', 'desktop')", () => {
    expect(between('tablet', 'desktop')).toMatchInlineSnapshot(
      `"@media screen and (min-width: 48em) and (max-width: 85.37375em)"`
    )
  })
})
