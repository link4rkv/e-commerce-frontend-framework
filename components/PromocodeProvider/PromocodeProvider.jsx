import React from 'react'
import cloneDeep from 'lodash/cloneDeep'

const Context = React.createContext({
  promocodes: [],
  apply: () => {},
  remove: () => {},
})

class PromocodeProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promocodes: [],
    }

    this.apply = this.apply.bind(this)
    this.remove = this.remove.bind(this)
  }

  remove(value) {
    this.setState(prevState => {
      const index = prevState.promocodes.indexOf(value)
      let newPromocodes = cloneDeep(prevState.promocodes)
      newPromocodes.splice(index, 1)
      return {
        promocodes: newPromocodes,
      }
    })
  }

  apply(promocode) {
    this.setState(prevState => {
      const updatedPromocodes = cloneDeep(prevState.promocodes)
      const index = updatedPromocodes.indexOf(promocode)
      if (index === -1) {
        updatedPromocodes.push(promocode)
      }

      return {
        promocodes: updatedPromocodes,
      }
    })
  }

  render() {
    const { children } = this.props
    return (
      <Context.Provider
        value={{
          apply: this.apply,
          promocodes: this.state.promocodes,
          remove: this.remove,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default PromocodeProvider

export const PromocodeConsumer = Context.Consumer
