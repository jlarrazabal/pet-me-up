import React from 'react';
import {CREATE_USER} from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function Welcome(props) {
  const [addUser, {error}] = useMutation(CREATE_USER);
  async function saveOwner(data){
    try {
      const newOwner = await addUser({firstname: data.firstname, lastname: data.lastname, email:data.email});
  
      console.log("Owner was saved!", newOwner);
  
      if(error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }
  saveOwner(props.auth);
  return (
    <section className="section auth">
      <div className="container">
        <h1>Welcome {props.auth.firstname}!</h1>
        <p>You have successfully registered a new account.</p>
        <p>We've sent you a email. Please click on the confirmation link to verify your account.</p>
      </div>
    </section>
  )
}