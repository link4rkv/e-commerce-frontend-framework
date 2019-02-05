import React from 'react'

import Header from '../containers/Header/index'
import Footer from '../containers/Footer/index'

// This is meant to be used by external sites like Recipes or JWC.
const External = () => (
  <React.Fragment>
    <div className="external-header">
      <Header />
    </div>
    <div className="external-footer" style={{ display: 'none' }}>
      <Footer />
    </div>
  </React.Fragment>
)

export default External
