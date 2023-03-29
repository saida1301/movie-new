import {useState, createContext, useEffect} from 'react';
export const favoritesContext = createContext();
import axios from "axios";

export const FavoritesProvider = ({children})=> {
 const [favorites, setfavorites] = useState([]);

  const values = {
    favorites,
    setfavorites,
  };
  
    useEffect(() => {
    axios.get().then(data => {
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
    
