import styled from 'styled-components'

export const SpreadSheetWrapper = styled.div``
export const Table = styled.table.attrs({ cellSpacing: 0, cellPadding: 0 })`
  border-collapse: collapse;
  border-spacing: 0;
  
`
export const TD = styled.td`
  position: relative;
  border: 1px solid #222;
  background-color: ${({ isGray }) => !isGray ? 'none' : '#eeeeee'};
  min-width: 150px;
  min-height: 40px;
  width: 100%;
  height: 100%;
`

export const Header = styled.div`
  padding: 20px;
`
