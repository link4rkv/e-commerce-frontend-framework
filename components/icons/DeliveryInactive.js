import React from 'react'

const SvgDeliveryInactive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#EAEAEA"
        d="M16 17.5h6v-4h-6zM16 17.5H4a2 2 0 0 1-2-2v-9h14v11z"
      />
      <path
        d="M16 17.5H4a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10zM16 13.5v-4h2.779l3.22 4z"
        stroke="#696969"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path fill="#EAEAEA" d="M16 13.5v-4h2.779l3.22 4z" />
      <path
        d="M21 17.5h-5v-8h2.3c.303 0 .59.137.779.373l2.7 3.353a.999.999 0 0 1 .22.627V16.5a1 1 0 0 1-1 1zM22 13.5H2"
        stroke="#696969"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.867 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
        fill="#696969"
      />
      <path
        d="M8.617 17.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0"
        fill="#EAEAEA"
      />
      <path d="M21.5 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" fill="#696969" />
      <path
        d="M20.25 17.5a1.25 1.25 0 1 1-2.501 0 1.25 1.25 0 0 1 2.5 0"
        fill="#EAEAEA"
      />
    </g>
  </svg>
)

export default SvgDeliveryInactive
