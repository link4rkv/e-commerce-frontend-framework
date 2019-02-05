import React from 'react'

const SvgPromotionsActive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <defs>
      <path
        d="M2.041.87C1.395.87.87 1.395.87 2.041v6.628c0 .311.123.609.343.829l9.29 9.289a1.17 1.17 0 0 0 1.656 0l6.628-6.628a1.17 1.17 0 0 0 0-1.656L9.498 1.214A1.168 1.168 0 0 0 8.669.87H2.041z"
        id="promotions-active_svg__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M20.787 14.16l-6.628 6.627a1.17 1.17 0 0 1-1.656 0l-9.29-9.289a1.175 1.175 0 0 1-.343-.829V4.041a1.17 1.17 0 0 1 1.171-1.17h6.628c.311 0 .608.122.83.343l9.288 9.29a1.17 1.17 0 0 1 0 1.655"
        fill="currentColor"
      />
      <g transform="translate(2 2)">
        <mask id="promotions-active_svg__b" fill="#fff">
          <use xlinkHref="#promotions-active_svg__a" />
        </mask>
        <path
          fill="#00CEE6"
          mask="url(#promotions-active_svg__b)"
          d="M-2 22V-2h24z"
        />
      </g>
      <path
        d="M19.473 3.82a.5.5 0 0 1 .707.707l-1.427 1.427a.5.5 0 0 1-.707-.707l1.427-1.427zM22 7.587a.5.5 0 1 1 0 1h-2.018a.5.5 0 1 1 0-1H22zM15.413 2a.5.5 0 1 1 1 0v2.018a.5.5 0 1 1-1 0V2zM4.527 20.18a.5.5 0 0 1-.707-.707l1.427-1.427a.5.5 0 0 1 .707.707L4.527 20.18zM2 16.413a.5.5 0 1 1 0-1h2.018a.5.5 0 1 1 0 1H2zM8.587 22a.5.5 0 1 1-1 0v-2.018a.5.5 0 1 1 1 0V22z"
        fill="#0D3578"
        fillRule="nonzero"
      />
      <path
        d="M5.86 5.86a1.305 1.305 0 1 0 1.845 1.846A1.305 1.305 0 0 0 5.86 5.86"
        fill="#0D3578"
      />
      <path
        d="M14.513 21.14a1.67 1.67 0 0 1-2.363 0l-9.291-9.289a1.675 1.675 0 0 1-.489-1.182V4.041a1.67 1.67 0 0 1 1.671-1.67h6.628c.444 0 .868.175 1.183.49l9.288 9.288a1.67 1.67 0 0 1 0 2.364l-6.627 6.627zm5.92-8.283l-9.288-9.29a.67.67 0 0 0-.476-.197H4.041a.67.67 0 0 0-.67.671v6.628c0 .178.07.35.196.476l9.29 9.289a.67.67 0 0 0 .949 0l6.628-6.628a.67.67 0 0 0 0-.95z"
        fill="#0D3578"
        fillRule="nonzero"
      />
    </g>
  </svg>
)

export default SvgPromotionsActive
