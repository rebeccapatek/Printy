import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Make a New Shirt</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/favorites">Favorites</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/shoppingcart">Shopping Cart</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/orders">Orders</Link>
            </li>
            

                {
            localStorage.getItem("printy_user")
            ? <li className="navbar__item">
            <Link className="navbar__link"
                to=""
                onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("printy_user")
                    props.history.push("/login")
                }}
                >Log off</Link>
            </li>
                : ""
            }
        </ul>
    )

}
//checks to see if printy user in in local storage if so have link that will say logout and will remove printyuser from local storage and push you to the logout screen.