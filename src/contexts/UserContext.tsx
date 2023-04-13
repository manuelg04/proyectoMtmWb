import { createContext, useContext, useState } from 'react';

interface UserContextValue {
  userDocument: string;
  setUserDocument: (document: string) => void;
}

const UserContext = createContext<UserContextValue>({
  userDocument: '',
  setUserDocument: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
  const [userDocument, setUserDocument] = useState('');

  return (
    <UserContext.Provider value={{ userDocument, setUserDocument }}>
      {children}
    </UserContext.Provider>
  );
};
