import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 18px;
  }

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background-color: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 12px;
          height: 20px;
          padding: 2px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssuesFilters = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const IssuesFiltersButton = styled.button.attrs({
  type: 'button',
})`
  background-color: #7159c1;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  border: 0px;
  padding: 5px;
  margin: 0;
  width: 100px;
  height: 40px;
  border: 1px solid #fff;
  ${props =>
    props.isSelected &&
    css`
      background-color: #000;
      border-style: inset;
    `}

  &:first-child {
    border-radius: 4px 0px 0px 4px;
  }
  &:last-child {
    border-radius: 0px 4px 4px 0px;
  }

  &:hover {
    background-color: #3a2970;
  }
`;

export const IssueListPagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const IssueListPaginationButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  color: #000;
  border-style: none;

  &:hover {
    color: #7159c1;
  }

  &[disabled] {
    cursor: not-allowed;
    color: #000;
  }
`;
