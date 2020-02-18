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
    //sets initial image to heart so that it is not undefinied
    const [ image, setImage ] = useState({img: 'Heart.svg', local: true})
    const [ actualImage, setActualImage ] = useState(require(`../../images/Heart.svg`))
    const [ ink, setInk ] = useState({})
    //this sets a key for the logo image so that is recreates a new key with random math each time the form is altered
    const [ compId, setcompId ] = useState(1)
//this is setting the URL for the firebase image
    const [URL, setURL] = useState("");
//this is the function that is uploading new logos from firebase and adding an image to the json database
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
                local: false,
                svgid: "#" + filename.split(".",1)
              })
            })
        }


    useEffect(()=> {
//this is finding the shirt color that was selected in the drop down and then creating a const to set change the shirt colo to selected color in the SVG element        
        const chosenShirtColor = shirtColors.find((c) => c.id === parseInt(favorite.shirtColorId)
        ) || {}
        setShirt(chosenShirtColor)
        
        const chosenImage = images.find((img) => img.id === parseInt(favorite.imageId)) || {img: 'Heart.svg', local: true}
        // const loadedFile = require(`../../images/${chosenImage.img}`)
        


 //decides if it is a local or firebase file and then creates an path according to use in SVG element      
        const loadedFile = chosenImage.local === true ? 
            require(`../../images/${chosenImage.img}`) :
            //is not available yet so 
            `${chosenImage.img}`


        
        setActualImage(loadedFile)
        setImage(chosenImage)
    
        const chosenInk = inks.find(i => i.id === parseInt(favorite.inkId)
        ) || {}
        setInk(chosenInk)
//sets the key of the image to math.random so that the logo is recreated everytime input is changed on form
        setcompId(Math.random())

    }, [favorite])
    


    const handleControlledInputChange = (event) => {
 //anytime there is a change to the favorite change the state on the dom   
        const newShirt = Object.assign({}, favorite);
		newShirt[event.target.name] = event.target.value;
        setFavorite(newShirt);
        
	};
//if it is edit mode set favorite on form to the the favorite that was selected from the favorite list
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
            //after you have created or edited a faovrite then send the user to the list of favorites
            .then(() => props.history.push("/favorites"))
        }
    }

//The Samy elements was a plugin I downloaded to be able to dynamically change the elements of the SVG files like color.  I did need to embed the id=beer into any svg file I wanted to use for it to work.

    return (
        <>
        <div className="spacer">
            
        </div>
        <div className="fun">
        <Samy className ="tee" path = {require('../../images/Black-T-shirt.svg')}>
            <SvgProxy selector="#shirt" fill={shirt.hexcolor} stroke={"black"}/>
        </Samy>
        <Samy key={compId} className ="logo" path={actualImage}>
            <SvgProxy selector="#beer" fill={ink.hexcolor} stroke={"black"}/>
        </Samy>
        </div>
        

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
                    defaultValue={favorite.name}
                    onChange={handleControlledInputChange}
                    required autoFocus
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
                    required

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
                    required
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
                    required
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
                        if (inkChoice.current.value === "0") {
                            window.alert("Please add an ink color")
                            evt.preventDefault()
                        }
                        else if (imageChoice.current.value === "0") {
                            window.alert("Please choose an image")
                            evt.preventDefault()
                        }
                        else if (shirtColorChoice.current.value === "0") {
                            window.alert("Please choose a color for your shirt")
                            evt.preventDefault()
                        }
                        else if (favoriteName.current.value === "") {
                            window.alert("Please name this favorite deisgn")
                            evt.preventDefault()
                        }
                    else {
                    evt.preventDefault() 
                    constructNewFavorite()}
                    }}
                     className="btn btn-primary">
                         {editMode ? 'Save Updated Favorite' : 'Make Favorite'}
			</button>{' '}
        </form>
    </>
    )
}