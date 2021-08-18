import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETAPPOINTMENTBYID } from '../../utils/queries';
import './summary.css';

export default function AppointmentSummary() {
    const { loading, appointmentData } = useQuery(QUERY_GETAPPOINTMENTBYID, {
        variables: {
            appointmentID
        }
    });

    return (
        <div>
            <h1 className="appointmentTitle">Your appointment is confirmed! </h1>

            <div classname="Details "><h2 className='summary-form-input'>Appointment Details</h2></div>

            <div className="date"><h3>Date:</h3>
            </div>
            <div className="time"><h3>Time:</h3></div>
            <div classname="summary "><h2 className='summary-form-input'>Services: List of service(s) including price</h2></div>
            <div className="totalPrice"><h3>Total Price:</h3></div>

            <div><button className='Dashboard' type="button">Dashboard</button></div>
        </div>


    )
}

export default Success;
