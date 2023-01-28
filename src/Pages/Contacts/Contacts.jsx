import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';
import Error from 'components/Error';
import { useSelector } from 'react-redux';
import { Box } from 'components/reusableComponents';
import { selectFilter } from 'redux/filter/selectors';
import { useFetchContactsQuery } from 'redux/contacts/contactsAPI';

const Contacts = () => {
  const filter = useSelector(selectFilter);
  const { data: contacts = [], error = '' } = useFetchContactsQuery();
  const filteredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(filter) || number.includes(filter)
  );
  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Filter />
          <Box height="700px" overflowY="scroll">
            {contacts.length > 0 ? (
              <ContactsList contacts={filteredContacts} />
            ) : (
              <>
                <h2>There are no contacts here</h2>
                <h3>You can create the first...</h3>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Contacts;
