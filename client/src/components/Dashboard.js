import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import { useQuery } from '../utils/queries';
import { QUERY_GETPETS } from '../../utils/queries';
import { QUERY_GETUSER } from '../../utils/queries';


export default function Dashboard() {
//Ask to Fulton/Nelio
const { loading, userData } = useQuery(QUERY_GETUSER);
const user = userData?.user || [];

const { loading, petData} = useQuery(QUERY_GETPETS);
const petList = petData?.user || [];

const [petID, setPetID] = useState(0);

//Ask to Fulton/Nelio
const getHistory = (event) => {
    setPetID(event.target.value);
    return <Redirect to={this.setState({ redirect: `/pethistory/${petID}`})} />
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
         <button className="btn btn-primary" value={pet._id} onClick={getHistory()}>{`See ${pet.petName} history`}</button>
         </div>
        )
    })}
    </div>
   </div>
   ) 
}

