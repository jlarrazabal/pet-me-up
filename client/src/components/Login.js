import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import './Login.css';


function UserLogin(){
  const [emailLogin, setEmailLogin] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'emailLogin') {
      setEmailLogin(inputValue);
    } else {
      setPasswordLogin(inputValue);
    }
  };

  // if (inputType === 'emailRegister'){
  //   setEmailRegister(inputValue);
  // }else if (inputType === 'FirstName') {
  //   setFirstName(inputValue);
  // }else if (inputType === 'LastName') {
  //   setlastName(inputValue);
  // } else {
  //   setPasswordRegister(inputValue);
  // }


  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    // if (!validateEmailLogin(emailLogin) || !passwordLogin) {
    //   setErrorMessage('Email or password is invalid');
    //   // We want to exit out of this code block if something is wrong so that the user can correct it
    //   return;
    //   // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
    // }
    // if (!checkPasswordLogin(passwordLogin)) {
    //   setErrorMessage(
    //     `Choose a more secure password for the account`
    //   );
    //   return;
    // }

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setPasswordLogin('');
    setPasswordRegister('');
    setEmailLogin('');
    setEmailRegister('');
    setFirstName('');
    setLastName('');
  };
  return(
    <div>
     <form>
       <h1 className="header">login </h1>
       <div classname=" "><h3>Email</h3><input className="credential-form-input" value={emailLogin} name="email" onchange={handleInputChange} type="emailLogin" placeholder="email"></input></div>
        <div className="form"><h3>Password</h3><input className="credential-form-input"  value={passwordLogin} name="passwordLogin" onChange={handleInputChange} type="password" placeholder="password"></input></div>
      </form>
      <form>
     <h1> Register</h1>
     <div className="form"><h3>First Name</h3><input className="credential-form-input" value={firstName} name="firstName" onchange={handleInputChange} type="firstName"placeholder="First Name" ></input></div>
     <div className="form"><h3>Last Name</h3><input className="credential-form-input" value={lastName} name="firstLast" onchange={handleInputChange} type="firstLast" placeholder="Last Name"></input></div>
     <div className="form"><h3>Email</h3><input className="credential-form-input" value={emailRegister} name="emailRegister" onchange={handleInputChange} type="firstLast" placeholder="email"></input></div>
     <div className="form"><h3>Password</h3><input className="credential-form-input" value={passwordRegister} name="passwordRegister" onchange={handleInputChange} type="passwordRegister" placeholder="password"></input></div>
     <button type="button" onClick={handleFormSubmit}>Submit</button>
     </form>
     {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
     </div>
  );
}

export default  UserLogin;



    

  
