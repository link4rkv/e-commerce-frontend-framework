import React from 'react'
import { render } from 'react-testing-library'

import MockNextContext from './../lib/jest/mockNextContext'
import { PromotionalCarousel } from './promotions'

describe('promotional filters', () => {
  it('should render as links under Promotions title', () => {
    const { getByTestId } = render(
      <MockNextContext router={{ query: { query: '' } }}>
        <PromotionalCarousel />
      </MockNextContext>
    )

    expect(getByTestId('promotions')).toMatchInlineSnapshot(`
<section
  data-testid="promotions"
>
  <h2
    class="promotions__StyledPromotionsTitle-sc-1nqq6rf-6 hfBLpw"
  >
    <span
      class="Text-sc-1bsd7ul-0 bsVrSO"
    >
      Promotions
    </span>
  </h2>
  <ul
    class="promotions__StyledPromotions-sc-1nqq6rf-5 xaLUg"
  >
    <div
      class="horizontal-carousel Carousel__StyledCarouselWrapper-sc-9ouat3-0 cuICZg"
    >
      <div
        class="Carousel__CarouselContainer-sc-9ouat3-2 gvyyDn"
      >
        <div
          class="elements-div content-not-overflow"
          data-testid="carousel"
          style="position: relative; left: 0px;"
        >
          <li>
            <a
              href="/promotions?promo=all"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                All
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=seasonal"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Seasonal
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=must-buy"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Must Buy
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=purchase-with-purchase"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Purchase with Purchase
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=clearance"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Clearance
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=carton-deals"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Carton Deals
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=all"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                All
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=seasonal"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Seasonal
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=must-buy"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Must Buy
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=purchase-with-purchase"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Purchase with Purchase
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=clearance"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Clearance
              </span>
            </a>
          </li>
          <li>
            <a
              href="/promotions?promo=carton-deals"
            >
              <span
                class="Text-sc-1bsd7ul-0 fBfRIl"
              >
                Carton Deals
              </span>
            </a>
          </li>
        </div>
      </div>
    </div>
  </ul>
</section>
`)
  })
})
