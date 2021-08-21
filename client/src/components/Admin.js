import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_GET_SERVICES} from '../utils/queries';
import {CREATE_SERVICE, DELETE_SERVICE} from '../utils/mutations';

export default function Admin() {

const [price, setPrice] = useState();
const [name, setName] = useState();
const [description, setDescription] = useState();
const [messageToUser, setMessageToUser] = useState();
const [createService, {error}] = useMutation(CREATE_SERVICE);
const [deleteService] = useMutation(DELETE_SERVICE);

const servicesData = useQuery(QUERY_GET_SERVICES);
const servicesList = (servicesData && servicesData.data?.getServices) || [];

if (servicesData.loading) {
 return <div>...loading</div>
};

//Function to handle the form submission with the new service
const addService = async (e) => {
  e.preventDefault();
    try {
      if (e.target.name === "name") {
        setName(e.target.value)
        console.log(name);
      };
       if (e.target.name === "price") {
        setPrice(e.target.value);
        console.log(price);
      };
       if (e.target.name === "description") {
        setDescription(e.target.value);
        console.log(description);
      };
      const newService = await createService({
        name: name,
        price: price,
        description: description,
      });
      console.log(newService);
      setTimeout(msg('Service added!'),3000);
      if(error) console.log(error)
    } catch (err) {
      console.log(err);
    }
  };

//Function to show messages to the user
const msg = (text) => {
  setMessageToUser(text);
};

//Function to delete a service
const deleteSrv = async (id) => {
  try {
    const delete_srv = await deleteService(id);
    console.log(delete_srv);
  } catch (err) {
    console.log(err);
  }
}

 return (
 <div className="container-fluid text-center">
    <h1>{messageToUser}</h1>
    <h2 className={"col-12 text-center"}>Available services</h2>
    <div className={"col-12 container-fluid block row"}>
    {servicesList.map((service) => {
      return (
      <div className={"containerStyle col-3 topText"}  key={service._id}>
       <h2>{service.name}</h2>
       <h3>{service.description}</h3>
       <button className={"btn btn-danger col-5"} onClick={() => deleteSrv(service._id)}>Delete</button>  
      </div>
      )},
    )}   
    </div>
    <div class="accordion accordion-flush col-4 text-center acordion" id="accordionFlushExample">
    <div class="accordion-item">
    <h1 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      <h3 className="text-success text-star">Add a service here!</h3>
      </button>
    </h1>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    <form class="accordion-body"  onSubmit={addService}>
      <div className="input-group mb-3">
      <span class="input-group-text">Name</span>
      <input type="text" class="form-control" name="name" value={name}></input>
      </div>
      <div className="input-group mb-3">
      <span class="input-group-text">$</span>
      <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" name="price" value={price}></input>
      </div>
      <div className="input-group mb-3">
      <span class="input-group-text">Description</span>
      <input type="text" class="form-control" name="description" value={description}></input>
      </div>
      <button className={"btn btn-success col-6"}>Create service</button>
    </form>
    </div>
  </div>
 </div>
</div>
 )
}
