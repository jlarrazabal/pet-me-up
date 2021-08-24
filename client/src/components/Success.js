import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory, useParams } from "react-router-dom";
import { QUERY_GETAPPOINTMENTBYID } from '../utils/queries';
import './Success.css'

export default function Success() {
    const {appointmentID} = useParams();
    const history = useHistory();
    const handleClick = (e) => {
      history.push(`/dashboard`);
    };

    return (
        <div className="flex-box">
          <div className="confirmation">
            <h1 className="appointmentTitle">Your appointment is confirmed!</h1>
            <h3>Confirmation Code: {appointmentID}</h3>
            <button className='btn btn-lg btn-primary success-page-btn' type="button" onClick={handleClick}>Go to your Dashboard</button>
          </div>
        </div>
    );
}
