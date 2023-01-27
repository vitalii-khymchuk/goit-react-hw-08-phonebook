import styled from '@emotion/styled';
import Popup from 'reactjs-popup';

const PopupStyled = styled(Popup)`
  [data-popup='tooltip']&-overlay {
    backdrop-filter: blur(3px);
  }
  &-content {
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #fff;
    color: #000;
    border: 1px solid #d7d7d7;
  }
`;

const AccountBtn = styled.button`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  align-self: center;
  background-color: orange;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 500;
  &:hover,
  &:focus {
    background-color: #ffc14d;
  }
`;

const PopUpBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const CloseBtn = styled(PopUpBtn)`
  &:hover,
  &:focus {
    color: #990033;
  }
`;

const LogOutBtn = styled(PopUpBtn)`
  margin-left: auto;
  margin-right: auto;
  color: #33adff;
  &:hover,
  &:focus {
    color: #99d6ff;
  }
`;

const Title = styled.p`
  font-size: 20px;
`;

export { PopupStyled, AccountBtn, CloseBtn, LogOutBtn, Title };
