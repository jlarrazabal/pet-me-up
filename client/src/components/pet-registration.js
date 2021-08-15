import React from 'react';

class PetRegistration extends React.Component {
    render() {
        const html = `
            <h1>Register your Pet</h1>
            <span>Name</span>
            <input id='petname'/>
            <span>Birthday</span>
            <input id='bday'/>
            <span>Pet Type</span>
            <select>
                <option>Select Your Pet </option>
                <option id='dog' value='dog'></option>
                <option id='cat' value='cat'></option>
                <option id='bird' value='bird'></option>
                <option id='turtle' value='turtle'></option>
            </select>
            <span>Breed</span>
            <input id='breed'/>
            <span>Gender</span>
            <input id='gender'/>
            <span>Weight</span>
            <input id='weight'/>
        `;
        return html; 
    }
   }
export default PetRegistration;

