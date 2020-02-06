import React, { useContext } from "react"

import { FavoriteContext } from "./FavoriteProvider";

export default ({ favorite, history }) => {
  const { deleteFavorite } = useContext(FavoriteContext)
   


  return (
    <section className="FavoriteCard">
      <div>Name: {favorite.name} </div>
      <div>Shirt Color: {favorite.shirtColor.colorName}</div>
      <div>Ink Color: {favorite.ink.colorName} </div>
      <div>Image: {favorite.image.imgName} </div>
      
      
      <button className="btn--edit" onClick={() => {
          history.push(`/favorites/editFavorites/${favorite.id}`)
        }}>edit</button>
        <button className="btn--delete"

          onClick={() => {
            // Code to delete animal from database
            deleteFavorite(favorite).then(() => {
              history.push("/favorites");
            });
          }}>delete</button>
    </section>
  );
};