import React from 'react';

class PetRegistration extends React.Component {
    state = {
        listitems: ["Dog", "Cat", "Bird", "Fish", "Rodent", "Reptile"]
    };

    render() {
        return (
            <div>
                <h1>Register your Pet</h1>
                <span>Name</span>
                <input id='petname' />
                <span>Birthday</span>
                <input id='bday' />
                <span>Pet Type</span>
                {this.createSelect()}
                <span>Breed</span>
                <input id='breed' />
                <span>Gender</span>
                <input id='gender' />
                <span>Weight</span>
                <input id='weight' />
            </div>
        )
    }

    createSelect(){
        const html =  
        <select id="pets">
        <option value=''> Please Select One </option>
        {this.state.listitems.map(listitem => (
            <option value={listitem} key={listitem}>
                {listitem}
            </option>
        ))}
    </select>;
    return html;
    }
}
export default PetRegistration;

