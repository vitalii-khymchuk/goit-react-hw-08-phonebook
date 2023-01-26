import { Box } from 'components/reusableComponents';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Header, MainNavigation, NavLinkStyled } from './Layout.styled';
import { useDispatch } from 'react-redux';
import auth from 'redux/auth/operations';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const shouldShowNav =
    location.pathname === '/' || location.pathname === '/contacts';
  const onLogOutClick = () => {
    dispatch(auth.logOut());
  };
  return (
    <Box
      display="grid"
      gridTemplateRows="50px 1fr"
      width={480}
      height={800}
      border="1px solid black"
      mx="auto"
    >
      {shouldShowNav && (
        <Header>
          <Box display="grid" gridTemplateColumns="1fr 70px" width="100%">
            <MainNavigation>
              <li>
                <NavLinkStyled to="/" end>
                  Dialer
                </NavLinkStyled>
              </li>
              <li>
                <NavLinkStyled to="contacts">Contacts</NavLinkStyled>
              </li>
              <li>
                <NavLinkStyled to="new">
                  <AiOutlineUserAdd size={24} />
                </NavLinkStyled>
              </li>
            </MainNavigation>
            <NavLinkStyled as="button" type="button" onClick={onLogOutClick}>
              Exit
            </NavLinkStyled>
          </Box>
        </Header>
      )}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default Layout;
