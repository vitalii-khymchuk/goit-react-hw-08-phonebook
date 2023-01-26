const { useSelector } = require('react-redux');
const { Navigate } = require('react-router-dom');
const { selectAuthData } = require('redux/auth/selectors');

const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useSelector(selectAuthData);
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : Component;
};

export default RestrictedRoute;
