import {useState, createContext, useEffect} from 'react';
export const favoritesContext = createContext();

import {favoritesStorageHelper} from "../helpers/FavoritesStorageHelper"

export const FavoritesProvider = ({children})=> {
 const [favorites, setfavorites] = useState([]);

  const values = {
    favorites,
    setfavorites,
  };
  
    useEffect(() => {
      favoritesStorageHelper.get().then(data => {
        setfavorites(data);
      });
  }, []);
  
  const value = {
     favorites,
    setfavorites,
  }
  
  return (
    <favoritesContext.Provider value={value}> {children}</favoritesContext.Provider>
)
};
    
