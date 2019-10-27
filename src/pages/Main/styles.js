import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const RepoInput = styled.input`
  flex: 1;
  border: 1px solid ${props => (props.hasError ? '#f00' : '#eee')};
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  ${props =>
    props.hasError &&
    css`
      box-shadow: 2px 2px 10px rgba(255, 0, 0, 0.3);
    `}
`;

const rotates = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(300deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.isLoading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0px 5px 0px 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    margin: 0;
    ${props =>
      props.isLoading &&
      css`
        animation: ${rotates} 2s linear infinite;
      `}
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
