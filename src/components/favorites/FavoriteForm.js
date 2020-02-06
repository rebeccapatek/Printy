import React, { useContext,useRef, useState, useEffect } from "react"

import { FavoriteContext } from "./FavoriteProvider"
import { InkContext } from "../inks/InkProvider"
import {ShirtColorContext} from "../shirtColors/ShirtColorProvider"
import { ImageContext } from "../../images/ImageProvider"


export default props => {
    const { addFavorite, editFavorite, favorites } = useContext(FavoriteContext)
    const { inks } = useContext(InkContext)
    const { shirtColors } = useContext(ShirtColorContext)
    const { images } = useContext(ImageContext)
    const [ favorite, setFavorite ] = useState({});
    const favoriteName = useRef(null)
    const shirtColorChoice = useRef(null)
    const inkChoice = useRef(null)
    const imageChoice = useRef(null)
    const editMode = props.match.params.hasOwnProperty('favoriteId');
    let chosenShirtColor=""
    let chosenInkColor=""
    let chosenImage=""

    useEffect(()=> {
        chosenShirtColor = shirtColors.find(c => {
            return c.id === parseInt(favorite.shirtColor)
        })
        console.log(chosenShirtColor)
    })
    useEffect(()=> {
        chosenInkColor = inks.find(i => {
            return i.id === parseInt(favorite.inkColor)
        })
        console.log(chosenInkColor)
    })
    useEffect(()=> {
        chosenImage = images.find(img => {
            return img.id === parseInt(favorite.image)
        })
        console.log(chosenImage)
    })

    const handleControlledInputChange = (event) => {
		const newShirt = Object.assign({}, favorite);
		newShirt[event.target.name] = event.target.value;
        setFavorite(newShirt);
        console.log(favorite)
        
	};

	const setDefaults = () => {
		if (editMode) {
			const favoriteId = parseInt(props.match.params.favoriteId);
            const selectedFavorite = favorites.find((f) => f.id === favoriteId) || {};
			setFavorite(selectedFavorite);
		}
	};

	useEffect(
		() => {
			setDefaults();
		},
		[ favorites ]
	);

    // //Construct a new object representation of the new employee from the user input
    const constructNewFavorite = () => {
        
        const shirtColorId = parseInt(shirtColorChoice.current.value)
        const inkId = parseInt(inkChoice.current.value)
        const imageId = parseInt(imageChoice.current.value)    
        if (editMode) {
			editFavorite({
                name: favorite.name,
				id: favorite.id,
				userId: parseInt(localStorage.getItem("printy_user")),
                shirtColorId : shirtColorId,
                inkId : inkId,
                imageId : imageId,
			}).then(() => props.history.push('/favorites'));
        } else {
            addFavorite({
                name: favoriteName.current.value,
                shirtColorId : shirtColorId,
                inkId : inkId,
                imageId : imageId,
                userId: parseInt(localStorage.getItem("printy_user"))
            })
            //Immediately update the application state with the new array of employees that are in the API
            .then(() => props.history.push("/favorites"))
        }
    }


    return (
        <>
        <img src= {require("../../images/Black-T-shirt.svg")} ></img>
        <h1 className="explainShirt">
            <div>
            your shirt color will be {
            (shirtColors.find(c => {
                return c.id === parseInt(favorite.shirtColor)
            }) || {}).colorName
            }
            </div>
            <div>
            your ink color will be {
            (inks.find(i => {
                return i.id === parseInt(favorite.inkColor)
            }) || {}).colorName
            }
            </div>
            <div>
            your image will be {
            (images.find(img => {
                return img.id === parseInt(favorite.image)
            }) ||  {}).imgName
            }
            </div>
        </h1>
        <form className="favoriteForm">
            <h2 className="favoriteForm__title">New Shirt</h2>
            <div className="form-group">
                <label htmlFor="favoriteName">Name this Design</label>
                <input
                    type="text"
                    name="favoriteName"
                    id="favoriteName"
                    ref={favoriteName}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Name of this design!"
                    value={favorite.name}
                    onChange={handleControlledInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="shirtColor">Assign a shirt color</label>
                <select
                    
                    name="shirtColor"
                    ref={shirtColorChoice}
                    id="shirtColorChoice"
                    className="form-control"
                    value={favorite.shirtColorId}
                    onChange={handleControlledInputChange}

                >
                    <option value="0">Select a Color</option>
                    {shirtColors.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.colorName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="image">Assign an image</label>
                <select
                    name="image"
                    ref={imageChoice }
                    id="imageChoice"
                    className="form-control"
                    value={favorite.imageId}
                    onChange={handleControlledInputChange}
                >
                    <option value="0">Select an Image</option>
                    {images.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.imgName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="inkColor">Assign an ink color</label>
                <select
                    name="inkColor"
                    ref={inkChoice}
                    id="inkChoice"
                    className="form-control"
                    value={favorite.inkId}
                    onChange={handleControlledInputChange}
                >
                    <option value="0">Select a Color</option>
                    {inks.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.colorName}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit"
                    onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                    constructNewFavorite()
                     }
                    }
                     className="btn btn-primary"
                     >
                         {editMode ? 'Save Updated Favorite' : 'Make Favorite'}
			</button>{' '}
        </form>
    </>
    )
}