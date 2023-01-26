import styled from '@emotion/styled';

const ContactsItemStyled = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 4px 8px;
  font-size: 20px;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 40px;
`;

const ContactName = styled.span`
  display: block;
  font-weight: 600;
  font-size: 24px;
`;

export { ContactsItemStyled, Avatar, ContactName };
