import { fetchAllImagesUpgrade, fetchFirestoreDataUpgrade } from "./backendUtilities";

const { createContext, useReducer, useContext, useEffect } = require("react");

const UpgradeContext = createContext();

const initialState = {
   pages : []
}

const upgradeReducer = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return { ...state, pages: action.payload };
      default:
        return state;
    }
  };

const UpgradeProvider = ({children}) => {
    const [upgradeState, UpgradeDispatch] = useReducer(upgradeReducer, initialState);

    useEffect(()=>{
      const fetchData = async() =>{
        const images = await fetchAllImagesUpgrade();
        const data = await fetchFirestoreDataUpgrade();

        const dataArray = images.map((image) => {
          // Check if Firestore has data for this image
          const matchedData = data.find((doc) => doc.imageUrl === (image.name));
    
          // Combine Firestore data if available, or initialize blank data
          return matchedData
            ? { ...matchedData, pageUrl: image.url } // Include Firestore data with pageUrl
            : {id: image.name, imageUrl: image.name, pageNumber: Number(image.name)+5, models: [], pageUrl: image.url }; // Blank data
        });
        UpgradeDispatch({type: 'SET_DATA', payload: dataArray});
        console.log("data dispatched");
        console.log(dataArray);
      }

      fetchData();
    },[]);

    return (
        <UpgradeContext.Provider value={{upgradeState, UpgradeDispatch}}>
            {children}
        </UpgradeContext.Provider>
    )
}

const useUpgrade = () => useContext(UpgradeContext);

export {UpgradeProvider, useUpgrade}