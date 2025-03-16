const { createContext, useReducer, useContext } = require("react");

const PoinsContext = createContext();

const initialState = {
    models : []
 }

 const poinsReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

const PoinsProvider = ({children}) => {
    const [poinsState, PoinsDispatch] = useReducer(poinsReducer, initialState);
    return (
        <PoinsContext.Provider value={{poinsState, PoinsDispatch}}>
            {children}
        </PoinsContext.Provider>
    )
}

const usePoins = () => useContext(PoinsContext);

export {PoinsProvider, usePoins}