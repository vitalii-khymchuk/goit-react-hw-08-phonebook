import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ProfileAvatar,
  Name,
  Info,
  CallEmailBtn,
  NavBar,
  NavItem,
} from './ContactInfo.styled';
import { IoCallOutline } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { makeCall, writeEmail } from 'utils/phoneAPI';
import { Box } from 'components/reusableComponents';
import avatarPlaceholder from 'photos/avatarIsLoading.gif';
import Error from 'components/Error';
import {
  useGetContactInfoQuery,
  useDeleteContactsInfoMutation,
} from 'redux/contactsInfo/contactsInfoAPI';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from 'redux/contacts/contactsAPI';

import { toast } from 'react-toastify';

const formateDate = date => new Date(date).toLocaleString();

const ContactInfo = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id: extraId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: contacts = [] } = useFetchContactsQuery();
  const {
    data: contactInfo = {},
    isFetching,
    error,
  } = useGetContactInfoQuery({ extraId });

  const baseId =
    contacts.length > 0
      ? contacts.find(item => item.extraId === extraId).id
      : '';

  const [
    deleteContactFromList,
    { isSuccess: isSuccess1, isLoading: isLoading1, isError: isError1 },
  ] = useDeleteContactMutation(baseId);
  const [
    deleteContactInfo,
    // { isSuccess: isSuccess2, isLoading: isLoading2, isError: isError2 },
  ] = useDeleteContactsInfoMutation(extraId);

  //При видаленні чомусь на mockapi робиться 2 запити, один з них на неправельну адресу
  // тому ми отримуємо сповіщення що контакт не видалено, хоча насправді видалено
  // неправелі сповіщення будуть якщо розкоментувати рядки нижче

  // !isLoading2 &&
  // isSuccess2 &&
  !isLoading1 &&
    isSuccess1 &&
    toast.success('Contact deleted!', {
      toastId: '3',
    });
  // (!isLoading2 && isError2) ||
  !isLoading1 &&
    isError1 &&
    toast.error("Contact was'nt deleted...", {
      toastId: '4',
    });

  const { avatar, createdAt, email, name, phone } = contactInfo;

  const profileAvatar = isFetching || !avatar ? avatarPlaceholder : avatar;
  const backPath = location.state?.from ?? '/';

  const onCallClick = () => makeCall(phone);
  const onEmailClick = () => writeEmail(email);
  const onDeleteClick = async () => {
    setIsDeleting(true);
    await deleteContactInfo(extraId);
    await deleteContactFromList(baseId);
    navigate(backPath, { replace: true, state: location.state });
  };
  const onBackClick = () => {
    navigate(backPath, { state: location.state });
  };

  const onEditClick = () => {
    navigate(`/edit/${extraId}`, {
      state: { ...location.state, contactsInfo: contactInfo, baseId },
    });
  };

  return (
    <Box
      display="grid"
      gridTemplateRows="200px 1fr"
      width={480}
      height={800}
      border="1px solid black"
      mx="auto"
    >
      <>
        <Box bg="grey" position="relative">
          <NavBar>
            <NavItem type="button" onClick={onEditClick}>
              Edit
            </NavItem>
            <NavItem type="button" onClick={onDeleteClick}>
              Delete
            </NavItem>
            <NavItem type="button" onClick={onBackClick}>
              Back
            </NavItem>
          </NavBar>
          <ProfileAvatar src={profileAvatar} alt={`${name}'s avatar`} />
        </Box>
        {error && <Error error={error} />}
        {isDeleting && <h2>Deleting...</h2>}
        {!error && !isDeleting && (
          <Box mt="10px" px="15px">
            <Name>{name}</Name>
            <CallEmailBtn onClick={onCallClick}>
              <Info>{phone}</Info>
              <IoCallOutline size={24} />
            </CallEmailBtn>
            {email && (
              <CallEmailBtn onClick={onEmailClick}>
                <Info>{email}</Info>
                <AiOutlineMail size={24} />
              </CallEmailBtn>
            )}
            <Info>
              Created at: <br /> {formateDate(createdAt)}
            </Info>
          </Box>
        )}
      </>
    </Box>
  );
};

export default ContactInfo;
