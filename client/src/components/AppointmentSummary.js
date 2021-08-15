import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETAPPOINTMENTBYID } from '../../utils/queries';
import './summary.css';

export default function AppointmentSummary(){
 const { loading, appointmentData} = useQuery (QUERY_GETAPPOINTMENTBYID , {
     variables: {
        appointmentID
     }
 } );
 
    return(
        <div>
      
           <h1 className="appointmentHeader">Your appointment has been successfully created </h1>
           <div classname="summary "><h2 className='summary-form-input'>Appointment Summary</h2></div>
            <div className="date"><h3>Date:</h3></div>
            <div className="time"><h3>Time:</h3></div>
            <div classname="summary "><h2 className='summary-form-input'>Services: List of service(s) including price</h2></div>
            <div className="totalPrice"><h3>Total Price:</h3></div>
            <div><button className='payButton' type="button">Pay Online</button></div>
            <div><button className='cancelButton' type="button">Cancel</button></div>
        
            </div>
          )
}

export default AppointmentSummary ;
