import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const ButtonEdit = styled.button`
  height: 42px;
  width: 116px;
  background: #4dbaf9;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${darken(0.05, '#4dbaf9')};
  }
`;

export const ButtonCancel = styled.button`
  margin-left: 10px;
  height: 42px;
  width: 116px;
  background: #f94d6a;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${darken(0.05, '#f94d6a')};
  }
`;

export const MeetupDetail = styled.div`
  margin-top: 50px;

  img {
    width: 940px;
    height: 300px;
  }

  p {
    margin-top: 25px;
    font-size: 18px;
    font-weight: normal;
    color: #fff;
  }
`;
export const MeetupFooter = styled.div`
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  margin-top: 30px;
  opacity: 0.6;

  span {
    margin-right: 30px;
  }
`;
