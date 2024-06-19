import React, { ReactNode, createContext, useState } from 'react';
import { UserInterface } from '../interfaces/User';

interface UserContextType {
    user: UserInterface | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>;
}

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setUser: () => { },
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInterface | undefined>(undefined);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };