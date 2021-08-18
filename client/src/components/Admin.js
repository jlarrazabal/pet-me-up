import React, { useState } from 'react'

const [price, setPrice] = useState(25);
const [name, setName] = useState(25);
const [description, setDescription] = useState(25);
const [messageToUser, setMessageToUser] = useState()

const [createService, {error}] = useMutation(CREATE_SERVICE);

const addService = async (e) => {
    e.preventDefault();
    try {
      const newService = await createService({
        name: name,
        price: price,
        description: description,
      });
      messageToUser('Service added!')
    } catch (err) {
      console.log(err);
    }
  };
export default function Admin() {
 return (
 <div>
    <h1>Available Services</h1>
    <ul>
    {servicesList.map((service) => {
       <li key={service._id}>{service.name}</li> 
    })}   
    </ul>
    <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      Add a service here!
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    <form class="accordion-body" onSubmit={addService()}>
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
    </form>
    </div>
  </div>
 </div>
</div>
 )
}
