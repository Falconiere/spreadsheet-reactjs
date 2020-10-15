import styled from 'styled-components'

export const CellWrapper = styled.div`
  display: block;
  min-width:150px;
  min-height: 40px;
  height: 100%;
  width: auto;   
  overflow: hidden;
  position: relative;
  padding: ${({ isEditable }) => isEditable ? '0' : '10px'};
  font-size: 18px;
`

export const Input = styled.textarea`
  display: block;
  padding: 0;
  margin: 0;
  width: 150px;
  height:  40px;
  border: 0;
  padding: 10px;
  font-size: 18px;
  &:active {
    width: auto;   
  }
`
