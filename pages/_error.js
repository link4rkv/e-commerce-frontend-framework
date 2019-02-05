import React from 'react'
import Error404 from '../components/Error/404'
import Error500 from '../components/Error/500'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.statusCode === 404 && <Error404 />}
        {this.props.statusCode === 500 && <Error500 />}
      </React.Fragment>
    )
  }
}
