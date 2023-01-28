import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from 'redux/contacts/operations';
import { selectContactsError } from 'redux/contacts/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateContNav, NavItem } from './CreateContact.styled';
import { Box, Title } from 'components/reusableComponents';
import base64userAvatar from 'photos/base64userAvatar';
import Uploader from 'components/Uploader';
import ContactsForm from 'components/Forms/CreateContactForm';
import Error from 'components/Error';
import { useAddContactsInfoMutation } from 'redux/contactsInfo/contactsInfoAPI';
import { useAddContactMutation } from 'redux/contacts/operations';
import twoInOne from 'utils/twoInOne';
import { toast } from 'react-toastify';

const CreateContact = () => {
  const [photo, setPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const error = '';
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onPhotoUpload = base64Photo => setPhoto(base64Photo);
  const [
    addContactInfo,
    { isSuccess: isSuccess1, isLoading: isLoading1, isError: isError1 },
  ] = useAddContactsInfoMutation();
  const [
    addContactToList,
    { isSuccess: isSuccess2, isLoading: isLoading2, isError: isError2 },
  ] = useAddContactMutation();

  !isLoading1 &&
    isSuccess1 &&
    !isLoading2 &&
    isSuccess2 &&
    toast.success('Contact created!');

  !isLoading1 &&
    isError1 &&
    !isLoading2 &&
    isError2 &&
    toast.error("Contact was'nt created...");

  const onFormSubmit = async values => {
    setIsSaving(true);
    const avatar = photo ?? base64userAvatar;
    const contactData = { ...values, avatar };
    const { data: res1 } = await addContactInfo(contactData);
    // тут в одну строку number я зберігаю і номер і id за яким можна добути ще інформації про контакт
    const shortContactData = {
      name: values.name,
      number: twoInOne.save(values.phone, res1.id),
    };
    await addContactToList(shortContactData);
    navigate(`/contacts/${res1.id}`, { replace: true });
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
