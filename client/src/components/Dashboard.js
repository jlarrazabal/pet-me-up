import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_GETPETSBYOWNER } from '../../utils/queries';
import { QUERY_GETUSER } from '../../utils/queries';

export default function Dashboard() {
let history = useHistory();

//Importing the user query
const { loading, userData } = useQuery(QUERY_GETUSER);
const user = userData?.user || [];

const ownerID = user._id;

//Importing all the user's pets using the user ID
const { loading, petData} = useQuery(QUERY_GETPETSBYOWNER, {variables: {ownerID: ownerID}});
const petList = petData?.petList || [];

//Seting the petID as a state variable
const [petID, setPetID] = useState(0);

//Function to get the user this the pet history, adding the pet ID as a param
const getHistory = (event, id) => {
    setPetID(id);
   history.push( `/pethistory/${petID}`);
};

//Function to get the user to the appointment page, to book for that specific pet, adding the pet ID as a param
const makeApp = (event, id) => {
   setPetID(id);
   history.push( `/appointment/${petID}`);
}

return (
    <div className="container col-12" >
    <div class="container col-6" id="userProfile">
        <div class="container-fluid">
         <h1>{`${user.firstName} ${user.lastName}`} </h1>
         <h3>{user.email}</h3>
         </div>
    </div>
    <div class="container col-6" id="petList">
    {petList.map((pet) => {
        return (
        <div class="container-fluid">
         <h1>{pet.petName}</h1>
         <h3>{pet.petType}</h3>
         <h3>{pet.birthday}</h3>
         <h3>{pet.breed}</h3>
         <h3>{pet.weigth}</h3>
         <h3>{pet.gender}</h3>
         <button className="btn btn-primary"  onClick={(e) => getHistory(e, pet._id)}>{`See ${pet.petName} history`}</button>
         <button className="btn btn-primary"  onClick={(e) => makeApp(e, pet._id)}>{`Make appointment for ${pet.petName}`}</button> 
         </div>
        )
    })}
    </div>
   </div>
   ) 
}

