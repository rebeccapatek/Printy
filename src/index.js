import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter as Router } from 'react-router-dom';
import Printy from "./components/Printy"
// import firebaseConfig from './config/firebaseConfig';
// import * as firebase from "firebase/app"

// firebase.initializeApp(firebaseConfig)

ReactDOM.render(
<Router>
		<Printy />
        
	</Router>,
 document.getElementById('root'));


