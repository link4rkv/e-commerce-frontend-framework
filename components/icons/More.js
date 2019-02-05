import React from 'react'

const SvgMore = ({ title, ...props }) => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    {/* <path
      d="M12 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      fill="currentColor"
      fillRule="evenodd"
    /> */}
    <g
      id="system-icons/more"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <path
        d="M12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z M12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 Z"
        id="Combined-Shape"
        fill="#1557BF"
      />
    </g>
  </svg>
)

export default SvgMore
