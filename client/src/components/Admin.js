import React, { useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_GET_SERVICES} from '../utils/queries';
import {CREATE_SERVICE, DELETE_SERVICE} from '../utils/mutations';
import '../components/Header.css'
import noservices from '../assets/noservices.jpg'

export default function Admin() {

const [price, setPrice] = useState();
const [name, setName] = useState();
const [description, setDescription] = useState();
const [messageToUser, setMessageToUser] = useState();
// const [availableServices, setAvailableServices] = useState();
const [createService, {error}] = useMutation(CREATE_SERVICE);
const [deleteService] = useMutation(DELETE_SERVICE);

const servicesData = useQuery(QUERY_GET_SERVICES);
const servicesList = (servicesData && servicesData.data?.getServices) || [];
// setAvailableServices(servicesList);


if (servicesData.loading) {
 return <div>...loading</div>
};

const handleInputChange = (e) => {
  if (e.target.name === "name") {
    setName(e.target.value);
  };
   if (e.target.name === "price") {
    setPrice(e.target.value);
  };
   if (e.target.name === "description") {
    setDescription(e.target.value);
  };
  console.log(name);
  console.log(price);
  console.log(description);
}

//Function to handle the form submission with the new service
const addService = async (e) => {
  e.preventDefault();
    try {
      const newService = await createService({
        variables: {
            name: name,
            price: parseInt(price),
            description: description
        }
      });
      console.log(newService);
      setTimeout(msg('Service added!'),3000);
      window.location.reload();
      if(error) console.log(error);
    } catch (err) {
      console.log(err);
    }
  };

//Function to show messages to the user
function msg(text) {
  setMessageToUser(text);
};

//Function to delete a service
const deleteSrv = async (serviceID, serviceName) => {
  try {
    const delete_srv = await deleteService({variables: {serviceID}});
    console.log(delete_srv);
    setTimeout(msg(`${serviceName} has been deleted!`),3000);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

 return (
 <div className="container-fluid text-center servicesTop">
    <h1>{messageToUser}</h1>
    <div className={"col-12 container-fluid block row"}>
    <h2 className={"col-12 text-center"}>Available services</h2>
    {servicesList.length?servicesList.map((service) => {
      return (
      <div className={"containerStyle col-3 topText"}  key={service._id}>
       <h2>{service.name}</h2>
       <h3>{service.description}</h3>
       <button className={"btn btn-danger col-5"} onClick={() => deleteSrv(service._id, service.name)}>Delete</button>  
      </div>
      )},
    ):<div className={"bg-light text-dark col-6 text-center container-fluid row centered"}>
      <img  className={"img-fluid topText"} src={noservices} width="200" height="200"/>
      <h3>Oooops! You don't have any services created, please add some services in the link below</h3></div>}  
    </div>
    <div class="accordion centeredAdd accordion-flush col-4 text-center acordion" id="accordionFlushExample">
    <div class="accordion-item text center">
    <h1 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      <h3 className="text-success text-center">Add a service here!</h3>
      </button>
    </h1>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    <form class="accordion-body" >
      <div className="input-group mb-3">
      <span class="input-group-text">Name</span>
      <input type="text" class="form-control" name="name" value={name} onChange={handleInputChange}></input>
      </div>
      <div className="input-group mb-3">
      <span class="input-group-text">$</span>
      <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" name="price" value={price} onChange={handleInputChange}></input>
      </div>
      <div className="input-group mb-3">
      <span class="input-group-text">Description</span>
      <input type="text" class="form-control" name="description" value={description} onChange={handleInputChange}></input>
      </div>
      <button className={"btn btn-success col-6"} onClick={addService}>Create service</button>
    </form>
    </div>
  </div>
 </div>
</div>
 )
}
