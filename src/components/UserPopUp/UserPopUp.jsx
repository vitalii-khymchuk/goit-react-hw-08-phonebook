import { selectUserData } from 'redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  PopupStyled,
  AccountBtn,
  CloseBtn,
  LogOutBtn,
  Title,
} from './UserPopUp.styled';
import 'reactjs-popup/dist/index.css';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Box } from 'components/reusableComponents';
import auth from 'redux/auth/operations';

const UserPopUp = () => {
  const { name, email } = useSelector(selectUserData);
  const userFirstLetter = name ? name[0].toUpperCase() : 'E';
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    dispatch(auth.logOut());
  };
  return (
    <PopupStyled
      trigger={open => (
        <AccountBtn className="button">{userFirstLetter}</AccountBtn>
      )}
      position="left top"
      closeOnDocumentClick
    >
      {close => (
        <>
          <CloseBtn className="close" onClick={close}>
            <AiOutlineClose size={20} />
          </CloseBtn>
          <Title>Account information</Title>
          <p>
            <b>name: </b>
            {name}
          </p>
          <p>
            <b>email: </b> {email}
          </p>
          <Box display="flex" justifyContent="center">
            <LogOutBtn type="button" onClick={onLogOutClick}>
              <BiLogOut size={24} />
            </LogOutBtn>
          </Box>
        </>
      )}
    </PopupStyled>
  );
};

export default UserPopUp;
