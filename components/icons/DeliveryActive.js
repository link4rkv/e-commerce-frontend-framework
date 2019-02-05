import React from 'react'

const SvgDeliveryActive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#5CC151"
        d="M16 17.5h5.999v-4H16zM16 17.5H4a2 2 0 0 1-2-2v-9h14v11z"
      />
      <path
        d="M16 17.5H4a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10zM21.39 13.5H2M21 17.5h-5v-8h2.3c.304 0 .59.137.779.373l2.7 3.353a.993.993 0 0 1 .22.627V16.5a1 1 0 0 1-1 1z"
        stroke="#0B8043"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.868 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
        fill="#0B8043"
      />
      <path
        d="M8.618 17.5a1.251 1.251 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0"
        fill="#FFF"
      />
      <path d="M21.5 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" fill="#0B8043" />
      <path
        d="M20.25 17.5a1.25 1.25 0 1 1-2.501 0 1.25 1.25 0 0 1 2.5 0"
        fill="#FFF"
      />
      <path
        stroke="#FFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.5 9l-4.125 4L6.5 11.182"
      />
    </g>
  </svg>
)

export default SvgDeliveryActive
