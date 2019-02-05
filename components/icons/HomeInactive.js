import React from 'react'

const SvgHomeInactive = ({ title, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <title>{title}</title>
    <path
      d="M15.116 21.5h2.633a.46.46 0 0 0 .459-.462v-8.853a.5.5 0 0 1 .5-.5h2.628l-9.013-9.05a.455.455 0 0 0-.646 0l-9.014 9.05h2.749a.5.5 0 0 1 .5.5v8.853a.46.46 0 0 0 .458.462h2.578v-6.419a.5.5 0 0 1 .5-.5h5.168a.5.5 0 0 1 .5.5v6.42zM4.912 12.685H2.384c-.787 0-1.18-.952-.626-1.509l9.21-9.246a1.455 1.455 0 0 1 2.064 0l9.209 9.246c.555.557.161 1.51-.625 1.51h-2.408v8.352a1.46 1.46 0 0 1-1.46 1.462H6.37a1.46 1.46 0 0 1-1.458-1.462v-8.353zm5.036 2.896v5.92h4.168v-5.92H9.948z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default SvgHomeInactive
