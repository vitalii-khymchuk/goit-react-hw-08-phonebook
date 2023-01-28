import PropTypes from 'prop-types';
import { Box } from 'components/reusableComponents';

const Error = ({ error }) => {
  const errorMsg = `${error?.data} (status: ${error?.status})`;
  return (
    <Box p={15}>
      <h1>OOOPS...</h1>
      <h2>Something went wrong</h2>
      <h2>Please reload page or check URL</h2>
      <p>Info: {errorMsg}</p>
    </Box>
  );
};

Error.propTypes = {
  msg: PropTypes.string,
};
export default Error;
