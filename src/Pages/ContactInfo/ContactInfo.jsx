import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { getContactInfo, deleteContact } from 'redux/contacts/operations';
import { clearContactsInfo } from 'redux/contacts/contactsSlice';
import {
  selectContactInfo,
  selectIsContactsLoading,
  selectContactsError,
  selectFilteredContacts,
} from 'redux/contacts/selectors';
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
import { useGetContactInfoQuery } from 'redux/contactsInfo/contactsInfoAPI';
import { useFetchContactsQuery } from 'redux/contacts/operations';
import { useDeleteContactsInfoMutation } from 'redux/contactsInfo/contactsInfoAPI';
import { useDeleteContactMutation } from 'redux/contacts/operations';

const formateDate = date => new Date(date).toLocaleString();

const ContactInfo = () => {
  const { id: extraId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: contacts = [] } = useFetchContactsQuery();
  const baseId =
    contacts.length > 0
      ? contacts.find(item => item.extraId === extraId).id
      : '';
  const { data = {}, isFetching, error } = useGetContactInfoQuery({ extraId });

  const [deleteContactFromList] = useDeleteContactMutation(baseId);
  const [deleteContactInfo] = useDeleteContactsInfoMutation(extraId);
  const { avatar, createdAt, email, name, phone } = data;
  const profileAvatar = isFetching || !avatar ? avatarPlaceholder : avatar;
  const backPath = location.state?.from ?? '/';
  const onCallClick = () => makeCall(phone);
  const onEmailClick = () => writeEmail(email);
  const onDeleteClick = () => {
    deleteContactInfo(extraId);
    deleteContactFromList(baseId);
    navigate(backPath, { replace: true, state: location.state });
  };
  const onBackClick = () => {
    navigate(backPath, { state: location.state });
  };

  const onEditClick = () => {
    navigate(`/edit/${extraId}`, {
      state: { ...location.state, contactsInfo: data, baseId },
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
        {!isFetching && !error && (
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
