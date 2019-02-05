import 'jest-dom/extend-expect'

import { setConfig } from 'next/config'
import { publicRuntimeConfig } from './next.config'

// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each'

import 'jest-localstorage-mock'

global.fetch = require('jest-fetch-mock')

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig })
