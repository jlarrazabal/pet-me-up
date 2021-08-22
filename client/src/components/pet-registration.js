import { useQuery,useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { QUERY_GET_PET_TYPES } from '../utils/queries';
import {ADD_PET} from '../utils/mutations';
import './pet-registration.css';

export default function PetRegistration() {
    const [addPet, {error}] = useMutation(ADD_PET);
    const servicesData = useQuery(QUERY_GET_PET_TYPES);
    const petTypes = (servicesData && servicesData.data?.getPetTypes) || [];
    const history = useHistory();
    function generatePetTypeList(){
        return petTypes.map(item => <option key={item.id} id={item._id} value={item.petTypeName}>{item.petTypeName}</option>);
    }
    function generateGenderList(){
        return ['male','female'].map(item => <option key={item} value={item}>{item}</option>);
    }
    async function handleFormSubmit(){
        console.log(gender, petName, petType);
        const data = {
            variables: {
              input: {
                  petName: petName,
                  birthday: bday,
                  petType: {
                    _id: petTypes.find(item => item.petTypeName === petType)._id,
                    petTypeName: petType
                  },
                  breed: breed,
                  gender: gender,
                  weight: parseFloat(weight),
                  owner: '6122895fd0a8a60aed75f06c' // Temporal value until I get the owner add done.
                }
            }
          };
        try {
            const newPet = await addPet(data);
        
            console.log("Pet was registered Info:", newPet);
        
            if(error) {
              console.log(error);
            }
            history().push('/');
          } catch (err) {
            console.log(err);
          }
    }
    const [petName, setPetName] = useState("");
    const [bday, setBday] = useState("");
    const [petType, setPetType] = useState("");
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");

    const handlePetNameChange = (e) => {
        setPetName(e.target.value);
    };
    const handleBDayChange = (e) => {
        setBday(e.target.value);
    };
    const handleBreedChange = (e) => {
        setBreed(e.target.value);
    };
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };
    const handlePetTypeChange = (e) =>{
        setPetType(e.target.value);
    }

   return (
        <section id="container">
                <h1>Register your Pet</h1>
                <label for="petname">Name</label >
                <input id='petname' value={petName} onChange={handlePetNameChange}/>
                <label for="bday">Birthday</label >
                <input id='bday' value={bday} onChange={handleBDayChange} type="date"/>
                <label >Pet Type</label >
                <select onChange={handlePetTypeChange}>
                    <option selected value="-1">Select Pet Type</option>
                    {generatePetTypeList()}
                </select>
                <label for="breed">Breed</label >
                <input id='breed' value={breed} onChange={handleBreedChange}/>
                <label for="gender">Gender</label >
                <select id="gender"  onChange={handleGenderChange}>
                    <option selected value="-1">Select Gender</option>
                    {generateGenderList()}
                </select>
                <label for="weight">Weight</label >
                <input id='weight' value={weight} onChange={handleWeightChange}/>
                <button class="btn btn-primary" type="button" onClick={handleFormSubmit}>Register</button>
        </section>
   )
}
