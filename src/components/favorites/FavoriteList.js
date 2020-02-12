import React, { useContext } from 'react';

import { FavoriteContext } from './FavoriteProvider';
import Favorite from './Favorite';
// import '.Favorite.css';

export default (props) => {

	const { favorites } = useContext(FavoriteContext);
	const favoritesOfActiveUser = favorites.filter(f => f.userId === parseInt(localStorage.getItem("printy_user"), 10))
	
	return (
<>

		<h1>Favorites</h1>

		<div className="favorites">
			
		{favoritesOfActiveUser.map(favorite => {
				
			
    return <Favorite {...props} key={favorite.id} favorite={favorite}  />
})}
		</div>
		
		</>
	);
};