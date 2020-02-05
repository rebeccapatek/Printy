import React from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "./auth/UserProvider";
import { InkProvider } from "./inks/InkProvider";
import { ShirtColorProvider } from "./shirtColors/ShirtColorProvider";
import { FavoriteProvider } from "./favorites/FavoriteProvider";
import FavoriteForm from "./favorites/FavoriteForm";
import { ImageProvider } from "../images/ImageProvider";




export default props => {
    return (
      <>
        <ShirtColorProvider>
          <InkProvider>
            <FavoriteProvider>
              <ImageProvider>
          <Route
            path="/favorites/create"
            render={props => <FavoriteForm {...props} />}
          />
          </ImageProvider>
          </FavoriteProvider>

          </InkProvider>
        </ShirtColorProvider>
      </>
    );
  };