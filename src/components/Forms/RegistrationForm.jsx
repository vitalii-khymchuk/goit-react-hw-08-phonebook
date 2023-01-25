import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
  InputLabel,
  Input,
  ErrorMsgStyled,
} from 'components/Forms/FormStyles.styled';
import { Box } from 'components/reusableComponents';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(30)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Please enter name'),
  email: yup
    .string()
    .min(5)
    .max(30)
    .matches(
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must to match next format: example@mail.com'
    )
    .required('Please enter email'),
  password: yup
    .string()
    .min(3)
    .max(14)
    .matches(
      /^[a-zA-Z]\w{3,14}$/,
      "The password's first character must be a letter, it must contain at least 4 characters and no more than 15 characters and no characters other than letters, numbers and the underscore may be used"
    )
    .required('Please enter password'),
});

const RegistrationForm = ({ onFormSubmit }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const onSubmit = (values, { resetForm }) => {
    onFormSubmit(values);
    resetForm();
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" id="regForm">
          <InputLabel>
            Name
            <Input type="text" name="name" />
          </InputLabel>
          <ErrorMsgStyled component="span" name="name" />
          <InputLabel>
            Email
            <Input type="email" name="email" />
          </InputLabel>
          <ErrorMsgStyled component="span" name="email" />
          <InputLabel>
            Password
            <Input type="password" name="password" />
          </InputLabel>
          <ErrorMsgStyled component="span" name="password" />
        </Form>
      </Formik>
    </Box>
  );
};

RegistrationForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
