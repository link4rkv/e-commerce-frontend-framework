// example of a protected page
import React, { Component } from 'react'
import { AccountConsumer, withAccount } from '../components/AccountProvider'

class Dashboard extends Component {
  render() {
    return (
      <AccountConsumer>
        {({ accountData }) => {
          return <div>Current user: {accountData.name}</div>
        }}
      </AccountConsumer>
    )
  }
}

export default withAccount(Dashboard)
