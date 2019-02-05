import React from 'react'
import PropTypes from 'prop-types'

// Copied from https://github.com/zeit/next.js/issues/5205#issuecomment-422846339
export default class MockNextContext extends React.Component {
  getChildContext() {
    const { headManager, router } = this.props
    return {
      headManager: {
        updateHead() {},
        ...headManager,
      },
      router: {
        asPath: '/',
        route: '/',
        pathname: '/',
        query: {},
        // TODO: Properly mock the following methods
        back() {},
        beforePopState() {},
        prefetch() {},
        push() {},
        reload() {},
        replace() {},
        events: {
          // TODO: Implement EventEmitter
          on() {},
          off() {},
          trigger() {},
        },
        ...router,
      },
    }
  }

  render() {
    return this.props.children
  }
}

MockNextContext.childContextTypes = {
  headManager: PropTypes.object,
  router: PropTypes.object,
}
