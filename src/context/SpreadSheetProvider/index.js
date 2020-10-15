import React, { useState } from 'react'
import PropTypes from 'prop-types'

const initState = {
  rows: {},
  currentCellPosition: null,
  setState: () => {
    throw new Error('SpreadSheetProvider was not initialized ')
  }
}

export const SpreadSheetContext = React.createContext(initState)

export function SpreadSheetProvider ({ children }) {
  const [state, setState] = useState(initState)

  const handleNewState = (newState) => {
    setState({ ...state, ...newState })
  }

  return (
    <SpreadSheetContext.Provider value={{ ...state, setState: handleNewState }}>
      {children}
    </SpreadSheetContext.Provider>
  )
}

SpreadSheetProvider.propTypes = {
  children: PropTypes.node.isRequired
}
