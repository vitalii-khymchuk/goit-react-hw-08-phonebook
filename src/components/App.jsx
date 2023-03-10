import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from 'redux/auth/operations';
import { selectAuthData } from 'redux/auth/selectors';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import Layout from './Layout';
import Registration from 'Pages/Registration';
import LogIn from 'Pages/Login';

const Dialer = lazy(() => import('Pages/Dialer'));
const Contacts = lazy(() => import('Pages/Contacts'));
const CreateContact = lazy(() => import('Pages/CreateContact'));
const ContactInfo = lazy(() => import('Pages/ContactInfo'));
const EditContact = lazy(() => import('Pages/EditContact'));

const App = () => {
  const { isRefreshing } = useSelector(selectAuthData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth.refresh());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute redirectTo="/login" component={<Dialer />} />
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
          <Route
            path="new"
            element={
              <PrivateRoute redirectTo="/login" component={<CreateContact />} />
            }
          />
          <Route
            path="contacts/:id"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactInfo />} />
            }
          />
          <Route
            path="edit/:id"
            element={
              <PrivateRoute redirectTo="/login" component={<EditContact />} />
            }
          />

          <Route
            path="registration"
            element={<RestrictedRoute component={<Registration />} />}
          />
          <Route
            path="login"
            element={<RestrictedRoute component={<LogIn />} />}
          />
        </Route>
      </Routes>
    )
  );
};

export default App;
