import PropTypes from 'prop-types';
import { ContactsItemStyled, Avatar, ContactName } from './ContactsItem.styled';
import LinkToContact from 'components/LinkToContact';

const ContactsItem = ({ data: { name, number, extraId } }) => {
  const avatarLetter = name[0].toUpperCase();
  return (
    <>
      <LinkToContact id={extraId}>
        <ContactsItemStyled>
          <Avatar>
            <span>{avatarLetter}</span>
          </Avatar>
          <div>
            <ContactName>{name}</ContactName>
            <span>{number}</span>
          </div>
        </ContactsItemStyled>
      </LinkToContact>
    </>
  );
};

ContactsItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    extraId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactsItem;
