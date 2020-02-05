import React, { useContext,useRef, useState } from "react"
// import { EmployeeContext } from "./EmployeeProvider"
// import { LocationContext } from "../location/LocationProvider"
import { FavoriteContext } from "./FavoriteProvider"
import { InkContext } from "../inks/InkProvider"
import {ShirtColorContext} from "../shirtColors/ShirtColorProvider"
import { ImageContext } from "../../images/ImageProvider"


export default props => {
    const { addFavorite, updateFavorite, favorites } = useContext(FavoriteContext)
    const { inks } = useContext(InkContext)
    const { shirtColors } = useContext(ShirtColorContext)
    const { images } = useContext(ImageContext)
    const [ favorite, setFavorite ] = useState({});
    const favoriteName = useRef(null)
    const shirtColorId = useRef(null)
    const inkId = useRef(null)
    const imageId = useRef(null)

    const handleControlledInputChange = (event) => {
		const newShirt = Object.assign({}, favorite);
		newShirt[event.target.name] = event.target.value;
		setFavorite(newShirt);
	};

	// const setDefaults = () => {
	// 	if (editMode) {
	// 		const taskId = parseInt(props.match.params.taskId);
	// 		const selectedTask = tasks.find((t) => t.id === taskId) || {};
	// 		setTask(selectedTask);
	// 	}
	// };

	// useEffect(
	// 	() => {
	// 		setDefaults();
	// 	},
	// 	[ tasks ]
	// );

    // //Construct a new object representation of the new employee from the user input
    const constructNewFavorite = () => {
        
        const shirtColorId = parseInt(shirtColorId.current.value)
        const inkId = parseInt(inkId.current.value)
        // const imageId = parseInt(imageId.current.value)    
        if (shirtColorId=== 0) {
            window.alert("Please select a shirt color")
        } else {
            addFavorite({
                name: favoriteName.current.value,
                shirtColorId : shirtColorId,
                inkId : inkId,
                imageId : true,
                userId: parseInt(localStorage.getItem("printy_user"))
            })
            //Immediately update the application state with the new array of employees that are in the API
            .then(() => props.history.push("/favorites"))
        }
    }


    return (
        <>
        <img src= {require("../../images/Black-T-shirt.svg")} ></img>
        <form className="favoriteForm">
            <h2 className="favoriteForm__title">New Shirt</h2>
            <div className="form-group">
                <label htmlFor="favoriteName">Name this Design</label>
                <input
                    type="text"
                    id="favoriteName"
                    ref={favoriteName}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Name of this design!"
                    onChange={handleControlledInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="shirtColor">Assign a shirt color</label>
                <select
                    defaultValue=""
                    name="shirtColor"
                    ref={shirtColorId}
                    id="shirtColorId"
                    className="form-control"
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
                <label htmlFor="inkColor">Assign an ink color</label>
                <select
                    defaultValue=""
                    name="inkColor"
                    ref={inkId}
                    id="inkId"
                    className="form-control"
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
            <div className="form-group">
                <label htmlFor="image">Assign an image</label>
                <select
                    defaultValue=""
                    name="image"
                    ref={imageId}
                    id="imageId"
                    className="form-control"
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
            <button type="submit"
                    onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                    constructNewFavorite()
                     }
                    }
                     className="btn btn-primary">
                    Save Favorite
            </button>
        </form>
    </>
    )
}