import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_GETPETAPP } from '../utils/queries';
import { QUERY_GETPET } from '../utils/queries';
import { useParams } from "react-router-dom";

export default function  Pethistory() {
//Getting the id from the params in the URL
const { petID } = useParams();

//Importing the appointment query using the pet id
const { loading1, appData} = useQuery(QUERY_GETPETAPP, {variable : {petID: petID}})
const appointmentsList = appData?.appointmentsList || [];

//Importing the pet query using the pet id
const { loading, petData} = useQuery(QUERY_GETPET, {variable : {petID: petID}})
const pet = petData?.pet || [];

let history = useHistory();

if (loading || loading1) {
    return <div>...loading</div>
}

//Go to the book appointment page, with the pet id inserted in the params
const makeApp = (e, id) => {
    history.push(`/appointment/${id}`);
}

return (
    <div className="container col-12" >
    <div class="container col-6" id="Petprofile">
        <div class="container-fluid">
         <h1>{pet.petName}</h1>
         <h3>{pet.petType}</h3>
         <h3>{pet.birthday}</h3>
         <h3>{pet.breed}</h3>
         <h3>{pet.weigth}</h3>
         <h3>{pet.gender}</h3>
        </div>
    </div>
    <div class="container col-6" id="allappointment">
     {appointmentsList.map((appointment) => {
     //Getting all the appointment history of the pet
        if (appointmentsList.length===0) {
            return (
            <div> 
             <h1>Your pet has never visited the vet :(</h1>
             <button className="btn btn-primary"  onClick={(e) => makeApp(e, pet._id)}>{`Make a new appointment for ${pet.petName}`}</button>  
            </div>
            )}
        else {
        return (
            <div key={appointment._id} class="container-fluid">
            <h1>{appointment.date}</h1>
            {appointment.services.map((service) => {
            return <h3 key={service_id} >{service.name}</h3> })}
            <button className="btn btn-primary"  onClick={(e) => makeApp(e, pet._id)}>{`Make a new appointment for ${pet.petName}`}</button>
            </div>
            )}
     })}
    </div>              
   </div> 
)
}
