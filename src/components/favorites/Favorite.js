import React, { useContext } from "react"
import { Samy, SvgProxy } from 'react-samy-svg'
import { FavoriteContext } from "./FavoriteProvider";
import "./Favorite.css"
//this checks to see if the image is local to the app or hosted on firebase and provides a different path for the image source depending on which 

//This is the function that that deletes a favorite when you click the button 
//This is the component that describes and displays each favorite
//Had to create a unique classname name for each image because otherwise it was stacking all of the images on the first shirt
export default ({ favorite, history }) => {
  const { deleteFavorite } = useContext(FavoriteContext)
  


  const loadedFile = favorite.image.local === true ? 
      require(`../../images/${favorite.image.img}`) :
      `${favorite.image.img}`


  return (
    <section className="FavoriteCard">
      <div>Name: {favorite.name} </div>
      <div>Shirt Color: {favorite.shirtColor.colorName}</div>
      <div>Ink Color: {favorite.ink.colorName} </div>
      <div>Image: {favorite.image.imgName} </div>
      
      <div className="fav">
      <Samy className ="tee" path = {require('../../images/Black-T-shirt.svg')}>
            <SvgProxy selector="#shirt" fill={favorite.shirtColor.hexcolor} stroke={"black"}/>
      </Samy>
      <Samy className ={'logo__'+favorite.image.id} id="logo" path={loadedFile}>
            <SvgProxy selector="#beer" fill={favorite.ink.hexcolor} stroke={"black"}/>
      </Samy>
      </div>
     
      
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
      <button className="btn--cart" onClick={()=> {
        history.push(`/shoppingcart/${favorite.id}`)
      }}>Add to Cart</button>
    </section>
  );
};