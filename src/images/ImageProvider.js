import React, { useState, useEffect } from "react"

export const ImageContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ImageProvider = (props) => {
    const [images, setImages] = useState([])

    const getImages = () => {
        return fetch("http://localhost:8088/images") 
           
        
            .then(res => res.json())
            .then(setImages)
    }

    const addImage = image => {
        return fetch("http://localhost:8088/images", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
            .then(getImages)
    }
    const deleteImage = image => {
        return fetch(`http://localhost:8088/images/${image.id}`, {
            method: "DELETE"
        })
        .then(getImages)
    }


   
    /*
        Load all images when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getImages()
    }, [])

    useEffect(() => {
        console.log("****  IMAGE APPLICATION STATE CHANGED  ****")
    }, [images])


 



    return (
        <ImageContext.Provider value={{
            images, addImage, deleteImage
        }}>
            {props.children}
        </ImageContext.Provider>
    )
}