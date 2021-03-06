import styled from 'styled-components';
import { darken, opacify } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin: 5px 0 0;
      height: 42px;
      width: 162px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }
  }

  ul {
    margin-top: 50px;
  }
`;

export const MeetupButton = styled.button`
  width: 100%;
  border: none;
  padding: 20px;
  border-radius: 4px;
  background: ${opacify(0.1, 'rgba(0, 0, 0, 0.1)')};
  margin-bottom: 10px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    div {
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 16px;
        color: #fff;
        opacity: 0.6;
        margin-right: 30px;
      }
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 18px;
`;
