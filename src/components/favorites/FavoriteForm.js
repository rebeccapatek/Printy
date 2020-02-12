import React, { useContext,useRef, useState, useEffect } from "react"
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";

import { FavoriteContext } from "./FavoriteProvider"
import { InkContext } from "../inks/InkProvider"
import {ShirtColorContext} from "../shirtColors/ShirtColorProvider"
import { ImageContext } from "../../images/ImageProvider"
import { Samy, SvgProxy } from 'react-samy-svg'
import "./FavoriteForm.css"

export default props => {
    const { addFavorite, editFavorite, favorites } = useContext(FavoriteContext)
    const { inks } = useContext(InkContext)
    const { shirtColors } = useContext(ShirtColorContext)
    const { addImage, images } = useContext(ImageContext)
    const [ favorite, setFavorite ] = useState({});
    const favoriteName = useRef(null)
    const shirtColorChoice = useRef(null)
    const inkChoice = useRef(null)
    const imageChoice = useRef(null)
    const editMode = props.match.params.hasOwnProperty('favoriteId');

    const [ shirt, setShirt ] = useState({})
    const [ image, setImage ] = useState({img: 'Heart.svg', local: true})
    const [ actualImage, setActualImage ] = useState(require(`../../images/Heart.svg`))
    const [ ink, setInk ] = useState({})
    const [ compId, setcompId ] = useState(1)
    const [URL, setURL] = useState("");

    const photoUploader = filename => {
        console.log("filename", filename);
        firebase
          .storage()
          .ref("Logos")
          .child(filename)
          .getDownloadURL()
            .then(firebaseUrl => {
              setURL(firebaseUrl)
              addImage({
                userId: parseInt(localStorage.getItem("printy_user")),
                img: firebaseUrl,
                imgName: filename,
                local: false
              })
            })
        }


    useEffect(()=> {
        const chosenShirtColor = shirtColors.find((c) => c.id === parseInt(favorite.shirtColorId)
        ) || {}
        setShirt(chosenShirtColor)
        
        const chosenImage = images.find((img) => img.id === parseInt(favorite.imageId)) || {img: 'Heart.svg', local: true}
        // const loadedFile = require(`../../images/${chosenImage.img}`)
        


       
        const loadedFile = chosenImage.local === true ? 
            require(`../../images/${chosenImage.img}`) :
            //is not available yet so 
            `${chosenImage.img}`


        
        setActualImage(loadedFile)
        setImage(chosenImage)
    
        const chosenInk = inks.find(i => i.id === parseInt(favorite.inkId)
        ) || {}
        setInk(chosenInk)

        setcompId(Math.random())

    }, [favorite])
    


    const handleControlledInputChange = (event) => {
    
        const newShirt = Object.assign({}, favorite);
		newShirt[event.target.name] = event.target.value;
        setFavorite(newShirt);
        
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
        <Samy className ="tee" path = {require('../../images/Black-T-shirt.svg')}>
            <SvgProxy selector="#shirt" fill={shirt.hexcolor} stroke={"black"}/>
        </Samy>
        <Samy key={compId} className ="logo" path={actualImage}>
            <SvgProxy selector="#beer" fill={ink.hexcolor} stroke={"black"}/>
        </Samy>
        

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
                    
                    name="shirtColorId"
                    ref={shirtColorChoice}
                    id="shirtColorChoice"
                    className="form-control"
                    value={favorite.shirtColorId }
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
                    name="imageId"
                    ref={imageChoice}
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
            <div>
                <label><img src={URL} /></label>
                    <FileUploader
                    accept="image/*"
                    name="photo"
                    filename={file => file.name.split(".")[0]}
                    storageRef={firebase.storage().ref("Logos")}
                    onUploadSuccess={photoUploader}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="inkColor">Assign an ink color</label>
                <select
                    name="inkId"
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