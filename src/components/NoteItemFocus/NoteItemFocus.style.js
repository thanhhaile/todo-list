import styled, {keyframes} from 'styled-components';

const appear = keyframes`
  from {
    top: ${props => props.position.top};
    left: ${props => props.position.left};
    width: ${props => props.position.width};
    heigth: ${props => props.position.height};
  }

  to {
    top: 40%;
    left: 50%;
    transform: translate(-50%, -43%);
    width: 50%;
    height: auto;
  }
`;

export const EditItem = styled.div`
  display: ${props => (props.isEditing ? 'flex' : 'none')};
  position: absolute;
  top: '40%';
  left: '50%'
  transform: translate(-50%, -43%);
  width: '50%'
  background-color: white;
  height: 'auto'
  
  transition: width 5s linear;
  `;
