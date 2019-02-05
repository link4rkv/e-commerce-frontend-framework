import React from 'react'

const SvgEdit = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M19.5 14.66a.5.5 0 1 1 1 0V20a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 20V6A2.5 2.5 0 0 1 4 3.5h5.34a.5.5 0 0 1 0 1H4A1.5 1.5 0 0 0 2.5 6v14A1.5 1.5 0 0 0 4 21.5h14a1.5 1.5 0 0 0 1.5-1.5v-5.34zM18 2.707l-9.5 9.5V15.5h3.293l9.5-9.5L18 2.707zm.354-1.06l4 4a.5.5 0 0 1 0 .707l-10 10A.5.5 0 0 1 12 16.5H8a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .146-.354l10-10a.5.5 0 0 1 .708 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgEdit
