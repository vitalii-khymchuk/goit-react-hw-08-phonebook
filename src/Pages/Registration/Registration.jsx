import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegNav, NavItem } from './Registration.styled';
import { Box, Title } from 'components/reusableComponents';
import auth from 'redux/auth/operations';
import RegistrationForm from 'components/Forms/RegistrationForm';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = values => {
    dispatch(auth.registration(values));
  };

  const onSignInClick = () => navigate('/login');
  return (
    <Box display="grid" gridTemplateRows="50px 1fr">
      <RegNav CreateContNav>
        <NavItem type="submit" form="regForm">
          Save
        </NavItem>
        <NavItem type="button" onClick={onSignInClick}>
          Sign In
        </NavItem>
      </RegNav>
      <Title>Registration</Title>
      <RegistrationForm onFormSubmit={onFormSubmit} />
    </Box>
  );
};

export default Registration;
