import React from 'react';
import ReactDOM from 'react-dom';


export default function login(){
    return(
      <div>
       <form>
         <h1 className="header">login </h1>
         <div classname=" "><h3>Email</h3><input className="credential-form-input" placeholder="email"></input></div>
          <div className="form"><h3>Password</h3><input className="credential-form-input" placeholder="password"></input></div>
        </form>
        <form>
       <h1> Register</h1>
       <div className="form"><h3>First Name</h3><input className="credential-form-input" placeholder="First Name" ></input></div>
       <div className="form"><h3>Last Name</h3><input className="credential-form-input" placeholder="Last Name"></input></div>
       <div className="form"><h3>Email</h3><input className="credential-form-input" placeholder="email"></input></div>
       <div className="form"><h3>Password</h3><input className="credential-form-input" placeholder="password"></input></div>
       </form>
       </div>
    ); 
  }