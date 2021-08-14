import React, { useState } from 'react';


export default function Dashboard() {

// Above the petList comes from the global state, just adding some format
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
         <h1>{pet.name}</h1>
         <h3>{pet.pet}</h3>
         <h3>{pet.birthday}</h3>
         <h3>{pet.breed}</h3>
         <h3>{pet.weigth}</h3>
         <h3>{pet.gender}</h3>
         </div>
        )
    })}
    </div>
   </div>
   ) 
}

