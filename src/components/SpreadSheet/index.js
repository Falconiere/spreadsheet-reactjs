import React from 'react'

import { LETTERS } from '../../constants'
import { SpreadSheetProvider } from '../../context/SpreadSheetProvider'

import Cell from '../Cell'
import FormulaBar from '../FormulaBar'

import { SpreadSheetWrapper, Table, TD, Header } from './styles'

function SpreadSheet () {
  return (
    <SpreadSheetProvider>
      <SpreadSheetWrapper>
        <Header>
          <h1>Minimal SpreadSheet</h1>
          <p>
            To use the formula, do a double click in the cell and then write the
            formula with the selected positions
          </p>
          <span>Available formulas: </span>
          <ul>
            <li>SUM: ex.: =SUM(A2,A3)</li>
            <li>SUBTRACT: ex.: =SUBTRACT(A2,A3)</li>
          </ul>
        </Header>
        <FormulaBar />
        <Table>
          <thead>
            <tr>
              <th></th>
              {LETTERS.map((letter, index) => (
                <TD key={index * 2} isGray>
                  <Cell canBeEditable={false} defaultValue={letter}/>
                </TD>
              ))}
            </tr>
          </thead>
          <tbody>
            {LETTERS.map((letter, rowNumber) => (
              <tr key={rowNumber * 2}>
                <TD key={Math.random()} isGray>
                  <Cell canBeEditable={false} defaultValue={rowNumber + 1}/>
                </TD>
                {LETTERS.map((letter, columnNumber) => (
                  <TD key={columnNumber * 2}>
                    <Cell position={letter + (rowNumber + 1)} />
                  </TD>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </SpreadSheetWrapper>
    </SpreadSheetProvider>
  )
}
export default SpreadSheet
