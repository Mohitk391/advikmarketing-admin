const { createContext, useReducer, useContext } = require("react");

const UpgradeContext = createContext();

const initialState = {
   models : []
}

const upgradeReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

const UpgradeProvider = ({children}) => {
    const [upgradeState, UpgradeDispatch] = useReducer(upgradeReducer, initialState);
    return (
        <UpgradeContext.Provider value={{upgradeState, UpgradeDispatch}}>
            {children}
        </UpgradeContext.Provider>
    )
}

const useUpgrade = () => useContext(UpgradeContext);

export {UpgradeProvider, useUpgrade}