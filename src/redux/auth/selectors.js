const selectAuthData = state => state.authData;
const selectUserData = state => state.authData.user;

export { selectAuthData, selectUserData };
