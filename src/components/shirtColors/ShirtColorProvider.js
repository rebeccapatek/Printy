import React, { useState, useEffect } from "react"

export const ShirtColorContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ShirtColorProvider = (props) => {
    const [shirtColors, setShirtColors] = useState([])

    const getShirtColors = () => {

        return fetch("http://localhost:8088/shirtColors")
            .then(res => res.json())
            .then(setShirtColors)
    }

    const addShirtColor = shirtColor => {
        return fetch("http://localhost:8088/shirtColors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shirtColor)
        })
        
            .then(getShirtColors)
    }





    /*
        Load all shirtColors when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getShirtColors()
    }, [])

    useEffect(
        () => {
            console.log("**** shirtColor APPLICATION STATE CHANGED  ****")
            console.log(shirtColors)
        },
        [shirtColors])

   
    return (
        <ShirtColorContext.Provider value={{
            // rememeber to send the deleteEvent for the DELETE
            // need to send the editEvent for the EDIT
            shirtColors, addShirtColor 
        }}>
            {props.children}
        </ShirtColorContext.Provider>
    )
}