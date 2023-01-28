import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CreateContNav,
  NavItem,
} from 'Pages/CreateContact/CreateContact.styled';
import { Box, Title } from 'components/reusableComponents';
import base64userAvatar from 'photos/base64userAvatar';
import Uploader from 'components/Uploader';
import ContactsInput from 'components/Forms/CreateContactForm';
import { useEffect } from 'react';
import { useEditContactMutation } from 'redux/contacts/contactsAPI';
import { useUpdateContactsInfoMutation } from 'redux/contactsInfo/contactsInfoAPI';
import twoInOne from 'utils/twoInOne';
import { toast } from 'react-toastify';

const CreateContact = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [initData, setInitData] = useState(null);
  const [
    updContactInList,
    { isSuccess: isSuccess1, isLoading: isLoading1, isError: isError1 },
  ] = useEditContactMutation();
  const [
    updContactInfo,
    { isSuccess: isSuccess2, isLoading: isLoading2, isError: isError2 },
  ] = useUpdateContactsInfoMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const initContactInfo = location.state.contactsInfo;
  const baseId = location.state.baseId;

  !isLoading1 &&
    isSuccess1 &&
    !isLoading2 &&
    isSuccess2 &&
    toast.success('Contact changed!', {
      toastId: '1',
    });

  !isLoading1 &&
    isError1 &&
    !isLoading2 &&
    isError2 &&
    toast.error("Contact was'nt changed...", {
      toastId: '2',
    });

  useEffect(() => {
    setPhoto(initContactInfo.avatar);
    setInitData(initContactInfo);
  }, [initContactInfo]);

  const onFormSubmit = async values => {
    setIsSaving(true);
    const avatar = photo ?? base64userAvatar;
    const contactData = { ...initData, ...values, avatar };
    const shortContactData = {
      name: contactData.name,
      number: twoInOne.save(contactData.phone, contactData.id),
    };
    await updContactInfo({
      body: contactData,
      extraId: contactData.id,
    });
    await updContactInList({ data: shortContactData, id: baseId });

    navigate(`/contacts/${contactData.id}`, {
      state: location.state,
      replace: true,
    });
  };

  const onPhotoUpload = base64Photo => setPhoto(base64Photo);

  const onCancelClick = () =>
    navigate(`/contacts/${initData.id}`, {
      state: location.state,
      replace: true,
    });
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
      <Title>Edit contact</Title>
      {isSaving && <h2>Saving... </h2>}
      {!isSaving && initData && (
        <>
          <Uploader onPhotoUpload={onPhotoUpload} preloadPhoto={photo} />
          <ContactsInput onFormSubmit={onFormSubmit} initData={initData} />
        </>
      )}
    </Box>
  );
};

export default CreateContact;
