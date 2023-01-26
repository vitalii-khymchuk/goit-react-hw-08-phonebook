import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContactsError } from 'redux/contacts/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateContNav, NavItem } from './CreateContact.styled';
import { Box, Title } from 'components/reusableComponents';
import base64userAvatar from 'photos/base64userAvatar';
import Uploader from 'components/Uploader';
import ContactsForm from 'components/Forms/CreateContactForm';
import Error from 'components/Error';
import { useAddContactsInfoMutation } from 'redux/contactsInfo/contactsInfoAPI';
import twoInOne from 'utils/twoInOne';

const CreateContact = () => {
  const [photo, setPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const error = useSelector(selectContactsError);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onPhotoUpload = base64Photo => setPhoto(base64Photo);
  const [addContactInfo, { isLoading }] = useAddContactsInfoMutation();

  const onFormSubmit = async values => {
    setIsSaving(true);
    const avatar = photo ?? base64userAvatar;
    const contactData = { ...values, avatar };
    const { data } = await addContactInfo(contactData);
    // тут в одну строку number я зберігаю і номер і id за яким можна добути ще інформації про контакт
    const shortContactData = {
      name: values.name,
      number: twoInOne.save(values.phone, data.id),
    };
    const { payload } = await dispatch(addContact(shortContactData));
    navigate(`/contacts/${payload.id}`, { replace: true });
  };

  const onCancelClick = () => navigate('/');
  const numberToSave = location.state?.number ?? '';
  return (
    <Box display="grid" gridTemplateRows="50px 1fr">
      <CreateContNav CreateContNav>
        <NavItem type="submit" form="createContactForm">
          Save
        </NavItem>
        <NavItem type="button" onClick={onCancelClick}>
          Cancel
        </NavItem>
      </CreateContNav>
      <Title>Create contact</Title>
      {isSaving && <h2>Saving... </h2>}
      {error && <Error msg={error} />}
      {!isSaving && !error && (
        <>
          <Uploader onPhotoUpload={onPhotoUpload} />
          <ContactsForm
            onFormSubmit={onFormSubmit}
            initData={{ phone: numberToSave }}
          />
        </>
      )}
    </Box>
  );
};

export default CreateContact;
