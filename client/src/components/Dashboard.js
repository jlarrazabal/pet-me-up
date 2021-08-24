import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GETPETSBYOWNER } from '../utils/queries';
import { QUERY_GETUSER } from '../utils/queries';
import { DELETE_PET } from '../utils/mutations';

export default function Dashboard() {
let history = useHistory();

const [deletePet] = useMutation(DELETE_PET);

//Importing the user query
// const userData = useQuery(QUERY_GETUSER);
// const user = (userData && userData.data?.getUser) || null;

const user = {
   firstName: "Periquito",
   lastName: "Perez",
   email: "pp@gmail.com"
}

const petList =[
   {
      _id: "6121301529bc1c67c45b366c",
      petName: "Daiquiri",
      petType: "Dog",
      birthday: "06/14/2020",
      breed: "Chihuahua",
      weigth: "5 pounds",
      gender: "Male"
   },
   {
      _id: 8,
      petName: "Chispita",
      petType: "Cat",
      birthday: "08/14/2020",
      breed: "Mix",
      weigth: "8 pounds",
      gender: "Female"
   },
   {
      _id: 8,
      petName: "Manuelita",
      petType: "Turtle",
      birthday: "08/14/2018",
      breed: "Green turtle",
      weigth: "2 pounds",
      gender: "Female"
   }
]

// // const ownerID = user._id;
// const ownerID = "611da7e48c78b43fbc3c6240";

// //Importing all the user's pets using the user ID
// const petData = useQuery(QUERY_GETPETSBYOWNER, {variables: {ownerID: ownerID}});
// const petList = (petData && petData.data?.getPets) || [];

//Seting the petID as a state variable
const [petID, setPetID] = useState(0);

// if (petList.loading || petData.loading) {
//    return <div>...loading</div>
// };

// console.log(userData);

//Function to get the user this the pet history, adding the pet ID as a param
const getHistory = (event, id) => {
   setPetID(id);
   history.push( `/pethistory/${petID}`);
};

//Function to get the user to the appointment page, to book for that specific pet, adding the pet ID as a param
const makeApp = (event, id) => {
   setPetID(id);
   history.push( `/appointment/${id}`);
};

const register = (event) => {
   history.push( `/pet-registration/`);
};

//Function to delete a service
const deletePetbyID = async (event, petID) => {
   try {
     const delete_pet = await deletePet({variables: {petID}});
     console.log(delete_pet);
     window.location.reload();
   } catch (err) {
     console.log(err);
   }
 }

return (
    <div className={"container-fluid row col-12"} >
    <div className={"container-fluid col-11 text-dark containerStyle"} id="userProfile">
         <div className={"text-start container"}>
         <h1>Your Dashboard!</h1>
         <h1 className="text-warning text-start">{`${user.firstName} ${user.lastName}`} </h1>
         <h5>{user.email}</h5>
        </div>
    </div>
    <div className={"container-fluid row"} id="petList">
    {petList.map((pet) => {
        return (
        <div key={pet._id} className={"containerStyle container col-3 text-center"}>
         <h1>{pet.petName}</h1>
         <h3>{pet.petType}</h3>
         <h5>Born in {pet.birthday}</h5>
         <h5>Breed: {pet.breed}</h5>
         <h5>Weigth: {pet.weigth}</h5>
         <h5>Gender: {pet.gender}</h5>
         <button className={"btn btn-secondary col-8"}  onClick={(e) => getHistory(e, pet._id)}>{`See ${pet.petName} history`}</button>
         <button className={"btn btn-secondary btn-margin col-9"}  onClick={(e) => makeApp(e, pet._id)}>{`Make appointment for ${pet.petName}`}</button>
         <button className={"btn btn-danger btn-margin col-6"}  onClick={(e) => deletePetbyID(e, pet._id)}>{`Delete ${pet.petName}`}</button>
         </div>
        )
    })}
    </div>
    <button className={"btn btn-success btn-margin col-2 btn-left"}  onClick={(e) => register(e)}>{`Register a new pet`}</button>
   </div>
   )
}
