import React, { useState, useEffect } from "react"

export const InkContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const InkProvider = (props) => {
    const [inks, setInks] = useState([])

    const getInks = () => {

        return fetch("http://localhost:8088/inks")
            .then(res => res.json())
            .then(setInks)
    }

    const addInk = ink => {
        return fetch("http://localhost:8088/inks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ink)
        })
        
            .then(getInks)
    }





    /*
        Load all inks when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getInks()
    }, [])

    useEffect(
        () => {
            console.log("**** Ink APPLICATION STATE CHANGED  ****")
            console.log(inks)
        },
        [inks])

   
    return (
        <InkContext.Provider value={{
            // rememeber to send the deleteEvent for the DELETE
            // need to send the editEvent for the EDIT
            inks, addInk 
        }}>
            {props.children}
        </InkContext.Provider>
    )
}