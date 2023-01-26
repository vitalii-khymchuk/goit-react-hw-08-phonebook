const { useSelector } = require('react-redux');
const { Navigate } = require('react-router-dom');
const { selectAuthData } = require('redux/auth/selectors');

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useSelector(selectAuthData);
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} replace /> : Component;
};

export default PrivateRoute;
