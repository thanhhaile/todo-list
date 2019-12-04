// import React from 'react';
import styled from 'styled-components';

export const ResizeNoteItem = styled.div`
  grid-row-end: span ${props => props.rowNum};
`;

// export const StyleNoteItem = (props) => {
//   console.log('dasdfasdkfjnasdkjf',props);
//   return <ResizeNoteItem >{props.children}</ResizeNoteItem>
// }
