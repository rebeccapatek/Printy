import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const FavoriteContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const FavoriteProvider = (props) => {
    const [favorites, setFavorites] = useState([])

    const getFavorites = () => {
        return fetch("http://localhost:8088/favorites") 
           
        
            .then(res => res.json())
            .then(setFavorites)
    }

    const addFavorite = favorite => {
        return fetch("http://localhost:8088/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favorite)
        })
            .then(getFavorites)
    }
    const deleteFavorite = favorite => {
        return fetch(`http://localhost:8088/favorites/${favorite.id}`, {
            method: "DELETE"
        })
        .then(getFavorites)
    }
    const editFavorite = favorite => {
        return fetch(`http://localhost:8088/favorites/${favorite.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favorite)
        })
            .then(getFavorites)
    }

   
    /*
        Load all favorites when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        console.log("****  Favorite APPLICATION STATE CHANGED  ****")
    }, [favorites])


 



    return (
        <FavoriteContext.Provider value={{
            favorites, addFavorite, deleteFavorite, editFavorite
        }}>
            {props.children}
        </FavoriteContext.Provider>
    )
}