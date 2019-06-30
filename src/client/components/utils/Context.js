import * as React from 'react';

export const StateContext = React.createContext({
  openChats: [],
});


export const SetStateContext = React.createContext({
  setState: () => {},
});

export const ContextProvider = ({ state, setState, children }) => (
  <StateContext.Provider value={state}>
    <SetStateContext.Provider value={{ setState }}>
      {children}
    </SetStateContext.Provider>
  </StateContext.Provider>
);
