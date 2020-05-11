import React, { createContext, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  userDetails: {},
};
const store = createContext(initialState);

const { Provider } = store;

function reducer(state, action){
  switch (action.type) {
    case 'auth':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        userDetails: action.payload.userDetails,
      };
    case 'logout':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        userDetails: {},
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  };

};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ 
    isAuthenticated: state.isAuthenticated,
    userDetails: state.userDetails,
    dispatch }}>{children}</Provider>;
};

export { store, StateProvider } ;
