/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [userDocument, setUserDocument] = useState('');

  return (
    <UserContext.Provider value={{ userDocument, setUserDocument }}>
      {children}
    </UserContext.Provider>
  );
};
