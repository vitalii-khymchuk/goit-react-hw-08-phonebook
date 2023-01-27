import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContactsError } from 'redux/contacts/selectors';
import { useNavigate } from 'react-router-dom';
import { LogInNav, NavItem } from './Login.styled';
import { Box, Title } from 'components/reusableComponents';
import auth from 'redux/auth/operations';

import LogInForm from 'components/Forms/LogInForm';
import Error from 'components/Error';

const LogIn = () => {
  const error = '';
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFormSubmit = values => {
    dispatch(auth.logIn(values));
  };

  const onRegBtnClick = () => navigate('/registration');
  return (
    <Box display="grid" gridTemplateRows="50px 1fr">
      <LogInNav CreateContNav>
        <NavItem type="submit" form="logInForm">
          Next
        </NavItem>
        <NavItem type="button" onClick={onRegBtnClick}>
          Registration
        </NavItem>
      </LogInNav>
      <Title>Sign In</Title>
      {error && <Error msg={error} />}
      {!error && (
        <>
          <LogInForm onFormSubmit={onFormSubmit} />
        </>
      )}
    </Box>
  );
};

export default LogIn;
