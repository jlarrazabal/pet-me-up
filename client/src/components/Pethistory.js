import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_GETPETAPP, QUERY_GETPET } from '../utils/queries';
import noapp from '../assets/noapp.jpg'
import '../components/Header.css'

export default function  Pethistory() {
//Getting the id from the params in the URL
const { petID } = useParams();
// const { petID } = "611f05b3f479290874815a49"

//Importing the appointment query using the pet id
const appData = useQuery(QUERY_GETPETAPP, {
 variables : {petID: petID}
});
const appointmentsList = (appData && appData.data?.getAllPetAppointments) || [];
console.log(appointmentsList);

//Importing the pet query using the pet id
const petData = useQuery(QUERY_GETPET,{
 variables : {petID: petID}
});
const pet = (petData && petData.data?.getPet) || null;
console.log(pet);

let history = useHistory();

if (appData.loading || petData.loading) {
    return <div>...loading</div>
}

//Go to the book appointment page, with the pet id inserted in the params
const makeApp = (e, id) => {
    history.push(`/appointment/${id}`);
}

return (
    <div className="row container col-12" >
    <div class="row container-fluid col-12 text-center  centered " id="allappointment">
     {appointmentsList.length?appointmentsList.map((appointment) => {
        return (
            <div key={appointment._id} class="container-fluid">
            <div class="container col-12 containerStyle topText" id="Petprofile">
            <div class="container-fluid">
            <h1>{pet.petName}</h1>
            <h3>{pet.petType.petTypeName}</h3>
            <h5>Born in {pet.birthday}</h5>
            <h5>Breed: {pet.breed}</h5>
            <h5>Gender: {pet.gender}</h5>
            </div>
            </div>
            <h1>{appointment.date}</h1>
            {appointment.services.map((service) => {
            return <h3 key={service._id} >{service.name}</h3> })}
            <button className="btn btn-secondary"  onClick={(e) => makeApp(e, pet._id)}>{`Make a new appointment for ${pet.petName}`}</button>
            </div>
            )}):<div className={'container-fluid row col-7'}>
            <img  className={"img-fluid topText"} src={noapp} width="200" height="200"/>
            <h2 className="text-center topText">Your pet has never visited the vet :(</h2>
            <button className="btn btn-success col-6 btn-left"  onClick={(e) => makeApp(e, pet._id)}>{`Make a new appointment for ${pet.petName}`}</button>  
           </div>}
    </div>              
   </div> 
)};
