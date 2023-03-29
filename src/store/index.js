import {useState, createContext, useEffect} from 'react';
export const favoritesContext = createContext();
import axios from "axios";
import fetchData from "../api/dataFetching"
export const FavoritesProvider = ({children})=> {
 const [favorites, setfavorites] = useState([]);

  const values = {
    favorites,
    setfavorites,
  };
  
    useEffect(() => {
    fetchData('http://192.168.0.105:3000/favorites/').then(data => {
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
    
