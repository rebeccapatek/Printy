

# Printy

Printy is a React web app with full CRUD functionality that allows users to assign colors to a t-shirt, assign colors to a inked design on a t-shirt, and upload their own design to put on a t-shirt. 


## Database sample
Create a json file named database.json with the provided sample data and run a json server watching database.json on port 8088

```JSON
{
  "users": [],
  "shirtColors": 
  [
  {
    "colorName": "black",
    "hexcolor": "#000000",
    "id": 1
  },
  {
    "colorName": "white",
    "hexcolor": "#ffffff",
    "id": 2
  },
  {
    "colorName": "navy",
    "hexcolor": "#000080",
    "id": 3
  },
  {
    "colorName": "grey",
    "hexcolor": "#D3D3D3",
    "id": 4
  }
],
  "inks":[
  {
    "colorName": "black",
    "hexcolor": "#000000",
    "id": 1
  },
  {
    "colorName": "white",
    "hexcolor": "#ffffff",
    "id": 2
  },
  {
    "colorName": "navy",
    "hexcolor": "#000080",
    "id": 3
  },
  {
    "colorName": "goldenrod",
    "hexcolor": "#daa520",
    "id": 4
  }
] 
,
"images": 
[
  {
    "img": "Lagunitaslogo.svg",
    "id": 1,
    "imgName": "Lagunitas",
    "svgid": "#beer",
    "userId": 2,
    "local": true
  },
  {
    "img": "Heart.svg",
    "id": 2,
    "svgid": "#heart",
    "imgName": "Heart",
    "userId": 2,
    "local": true
  },
  {
    "userId": 3,
    "img": "https://firebasestorage.googleapis.com/v0/b/printy-cd05c.appspot.com/o/Logos%2Fresult.svg?alt=media&token=342b125e-4c22-4c7e-8687-82cb1f2994d8",
    "imgName": "result.svg",
    "svgid": "#result",
    "local": false,
    "id": 3
  },
  {
    "userId": 3,
    "img": "https://firebasestorage.googleapis.com/v0/b/printy-cd05c.appspot.com/o/Logos%2FBecca-Banjo-Fiddle-12-x-12.svg?alt=media&token=6a163a03-ce67-4ee8-9e75-d93b93529194",
    "imgName": "Becca-Banjo-Fiddle-12-x-12.svg",
    "local": false,
    "svgid": "#Becca-Banjo-Fiddle-12-x-12",
    "id": 4
  },
  {
    "userId": 3,
    "img": "https://firebasestorage.googleapis.com/v0/b/printy-cd05c.appspot.com/o/Logos%2Fwolf.svg?alt=media&token=e0d3cb0d-5c4b-4342-8d2b-06a5600d14ce",
    "imgName": "wolf.svg",
    "local": false,
    "svgid": "#wolf",
    "id": 5
  },
  {
    "userId": 3,
    "img": "https://firebasestorage.googleapis.com/v0/b/printy-cd05c.appspot.com/o/Logos%2F70sboombox.svg?alt=media&token=8063cec3-04f5-4539-82e9-df31f3e41a3f",
    "imgName": "70sboombox.svg",
    "local": false,
    "svgid": "#70sboombox",
    "id": 6
  }
],
"favorites": [],
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

