import React, {createContext, useState} from "react";  
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (item) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.some((fav) => fav.word === item.word)) {
                return prevFavorites; 
            }
            return [...prevFavorites, item];
        });
    };

    const removeFromFavorites = (word) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.word !== word)
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};