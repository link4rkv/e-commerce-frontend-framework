import React from 'react'

const SvgHomeActive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <defs>
      <path
        d="M9.322.384L.113 9.631a.384.384 0 0 0 .271.656h3.028v8.853a.96.96 0 0 0 .958.962h11.379a.961.961 0 0 0 .959-.962v-8.853h2.908a.385.385 0 0 0 .271-.656L10.677.384a.954.954 0 0 0-1.355 0z"
        id="home-active_svg__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M21.887 11.631l-9.21-9.247a.955.955 0 0 0-1.354 0l-9.21 9.247a.385.385 0 0 0 .27.656h3.029v8.853a.96.96 0 0 0 .958.962h11.379a.96.96 0 0 0 .959-.962v-8.853h2.908a.385.385 0 0 0 .27-.656"
        fill="currentColor"
      />
      <g transform="translate(2 2)">
        <mask id="home-active_svg__b" fill="#fff">
          <use xlinkHref="#home-active_svg__a" />
        </mask>
        <path
          fill="#00CEE6"
          mask="url(#home-active_svg__b)"
          d="M-2 22V-2h24z"
        />
      </g>
      <path
        d="M21.887 11.631l-9.21-9.247a.955.955 0 0 0-1.354 0l-9.21 9.247a.385.385 0 0 0 .27.656h3.029v8.853a.96.96 0 0 0 .958.962h11.379a.96.96 0 0 0 .959-.962v-8.853h2.908a.385.385 0 0 0 .27-.656z"
        stroke="#0D3578"
      />
      <path fill="#FFF" d="M14.616 15.183v6.919H9.448V15.183z" />
      <path
        stroke="#0D3578"
        strokeLinejoin="round"
        d="M14.616 15.183v6.919H9.448V15.183z"
      />
    </g>
  </svg>
)

export default SvgHomeActive
