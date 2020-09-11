

# Printy

Printy is a React web app with full CRUD functionality that allows users to assign colors to a t-shirt, assign colors to a inked design on a t-shirt, and upload their own design to put on a t-shirt. 


## Database sample
Create a json file named database.json with the provided sample data and run a json server watching database.json on port 8088

```JSON
{
  "users": [],
  "pets": [],
  "chores": [
    {
      "id": 1,
      "name": "Take pet for walk"
    },
    {
      "id": 2,
      "name": "Feed pet"
    },
    {
      "id": 3,
      "name": "Clean cage"
    },
    {
      "id": 4,
      "name": "Brush pet"
    },
    {
      "id": 5,
      "name": "Clean tank"
    },
    {
      "id": 6,
      "name": "Play with pet"
    },
    {
      "id": 7,
      "name": "Clean box"
    },
    {
      "name": "Give treat",
      "id": 12
    }
  ],
"kidPetChores": []
}

```

## Installation
In your terminal run git clone SSH KEY HERE

cd into the project directory

From the main directory, run npm install to install dependencies

npm start


## Usage

1. Click on "Make a shirt" button 
2. Register a new user
3. Navigate to the shirt color dropdown to choose a shirt color
4. Navigate to the ink color dropdown to choose an ink color
5. Navigate to the design dropdown to choose a design or Hit upload to upload your own SVG file off of your own computer.  You must ad the id="beer" to the SVG file to make it respond to the color changes in ink.
5. Click "Add favorite" button once you have a shirt that you like.
6. Click on favorites in the navbar and you can see a list of potential shirt designs and colors that you might like to order.
7. Click the edit or delete button if you'd like to change one of your favorites

