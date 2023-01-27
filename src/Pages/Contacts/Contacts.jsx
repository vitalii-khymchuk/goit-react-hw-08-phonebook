import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';
import Error from 'components/Error';
import { useSelector } from 'react-redux';
import { Box } from 'components/reusableComponents';
import {
  selectContactsError,
  selectFilteredContacts,
} from 'redux/contacts/selectors';
import { selectFilter } from 'redux/filter/selectors';
import { useFetchContactsQuery } from 'redux/contacts/operations';

const Contacts = () => {
  const filter = useSelector(selectFilter);
  const { data: contacts, error } = useFetchContactsQuery();
  const filteredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(filter) || number.includes(filter)
  );
  console.log(error);
  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Filter />
          <Box height="700px" overflowY="scroll">
            <ContactsList contacts={filteredContacts} />
          </Box>
        </>
      )}
    </>
  );
};

export default Contacts;
