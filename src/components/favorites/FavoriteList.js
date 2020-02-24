import React, { useContext } from 'react';
import { FavoriteContext } from './FavoriteProvider';
import Favorite from './Favorite';
import "./FavoriteList.css"


export default (props) => {
//this filters for only favorites of the active user then maps through the favorites and lists them all.
	const { favorites } = useContext(FavoriteContext);
	const favoritesOfActiveUser = favorites.filter(f => f.userId === parseInt(localStorage.getItem("printy_user"), 10))
	
	return (
<>

		<h1 className="header">Favorite Shirts</h1>

		<div className="favorites">
			
		{favoritesOfActiveUser.map(favorite => {
				
			
    return <Favorite {...props} key={favorite.id} favorite={favorite}  />
})}
		</div>
		
		</>
	);
};