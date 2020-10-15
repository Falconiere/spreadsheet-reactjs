import React, { memo, useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { CellWrapper, Input } from './styles'

import { SpreadSheetContext } from '../../context/SpreadSheetProvider'

function Cell ({ defaultValue, canBeEditable, position }) {
  const inputRef = useRef(null)
  const [isEditable, setIsEditable] = useState(false)

  const spreadCtx = useContext(SpreadSheetContext)
  const { rows, setState } = spreadCtx

  const isSum = value => value.match(/=sum/i)
  const isSubtract = value => value.match(/=subtract/i)
  const isNumber = value => (/^[0-9]*$/).test(value)

  const hasDefinedCell = value => value.match(/(?<=\()(.*)(?=\))/)
  const getCellToFormula = definedCells => Array.isArray(definedCells) && definedCells[0].split(',')

  const getRealNumberToCalculate = (key) => {
    return !rows[key] && !isNumber(key) ? 0 : isNumber(key) ? key : getValue(rows[key])
  }

  const doSum = (value, cellsToSum) => {
    return cellsToSum.reduce((acc, p) => {
      const key = p.toUpperCase()
      const realNumber = getRealNumberToCalculate(key)
      return parseFloat(acc) + parseFloat(realNumber)
    }, 0)
  }

  const doSubtract = (value, cellsToSum) => {
    return cellsToSum.reduce((acc, p) => {
      const key = p.toUpperCase()
      const realNumber = getRealNumberToCalculate(key)
      return acc === null ? parseFloat(realNumber) : parseFloat(acc) - parseFloat(realNumber)
    }, null)
  }

  const getValue = value => {
    if (!value) return null
    const definedCells = hasDefinedCell(value)
    const cells = getCellToFormula(definedCells)
    if (isSum(value) && Array.isArray(cells)) return doSum(value, cells)
    if (isSubtract(value) && Array.isArray(cells)) return doSubtract(value, cells)
    return value
  }

  const handleDoubleClick = e => {
    if (!canBeEditable) return null
    setIsEditable(true)
    if (inputRef.current) { inputRef.current.focus() }
  }

  const handleOnChange = e => {
    setState({ rows: { ...rows, [position]: e.target.value }, currentCellPosition: position })
  }

  const handleOnBlur = e => {
    setIsEditable(false)
    getValue(e.target.value)
    if (inputRef.current) { inputRef.current.blur() }
  }

  return (
    <CellWrapper
      isEditable={isEditable}
      onDoubleClick={handleDoubleClick}
    >
      {!canBeEditable
        ? defaultValue
        : isEditable
          ? <Input ref={inputRef} defaultValue={rows[position]} onChange={handleOnChange} onBlur={handleOnBlur}/>
          : getValue(rows[position]) }

    </CellWrapper>
  )
}

Cell.defaultProps = {
  defaultValue: '',
  canBeEditable: true,
  position: undefined

}

Cell.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  canBeEditable: PropTypes.bool,
  position: PropTypes.string
}

export default memo(Cell)
