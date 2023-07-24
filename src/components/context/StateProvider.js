import React, { createContext, useContext, useReducer } from "react";


// create a context
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    // create a context provider and put the children inside of it
    <StateContext.Provider value={ useReducer(reducer, initialState) }>
        { children }
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);