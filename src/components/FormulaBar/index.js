import React, { useContext } from 'react'

import { SpreadSheetContext } from '../../context/SpreadSheetProvider'

import { FormulaBarWrapper, CurrentValue, Label } from './styles'
export default function FormulaBar () {
  const spreadCtx = useContext(SpreadSheetContext)
  const { rows, currentCellPosition } = spreadCtx
  const getValue = () => {
    if (!currentCellPosition) return null
    return rows[currentCellPosition]
  }
  return (
    <FormulaBarWrapper>
      <Label>Current Value:</Label>
      <CurrentValue>{getValue()}</CurrentValue>
    </FormulaBarWrapper>
  )
}
