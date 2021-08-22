import React,{useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GETAPPOINTMENTBYID,QUERY_GET_SERVICES  } from '../utils/queries';
import { DELETE_APPOINTMENT, APPOINTMENT_CHECKOUT } from '../utils/mutations';
import './AppointmentSummary.css';


export default function AppointmentSummary(){
const {appointmentID} = useParams();
// const appointmentID = "611dae335fe7331ad485d0a1",
// const [date, setDate] = useState('');
// const [time, setTime] = useState("");

const [paymentID, setPaymentID] = useState("");

 const { loading, data} = useQuery (QUERY_GETAPPOINTMENTBYID , {
     variables: {
        appointmentID:appointmentID
     }
 } );

 console.log(data);

 const [deleteAppointment, {error}] = useMutation(DELETE_APPOINTMENT);
 const [checkOut] = useMutation(APPOINTMENT_CHECKOUT);
 const servicesData = useQuery(QUERY_GET_SERVICES);
 const services = (servicesData && servicesData.data?.getServices) || [];

 //event handlers
 const handleServicePayment = async (e)=>{
   const result = await checkOut({
     variables: {
       appointmentID
     }
   });
   window.location.assign(result.data.checkOut);
 }

 const cancelAppointment = async (e)=>{
   e.preventDefault();
   const appointment = await deleteAppointment({
      appoitmentID: appointmentID
   });
   console.log(appointment);
}
    return(
        <div>
            <div id="appointmentsummary">
              <h1 className="appointmentHeader">Your appointment has been successfully created </h1>
              {/*<div classname="summary "><h2 className='summary-form-input'>Appointment Summary</h2></div>*/}
              {/*<div className="date"><h3>Date:{data?.date}</h3></div>*/}
              {/*<div className="time"><h3>Time:{data?.time}</h3></div>*/}
              <h2 className='summary-form-input'>Services Summary</h2>
              <ul>{services.map(service => {return (<li>{service.name} - ${service.price}</li>)})}</ul>
              <h3>Total Price: ${services.reduce((total, item) => {return total + item.price},0)}</h3>
              <button onClick={handleServicePayment} id="Button1" className="btn btn-lg btn-primary summary-page-btn" type="button">Pay Online</button>
              <button onClick={cancelAppointment} id="Button2" className="btn btn-lg btn-danger summary-page-btn" type="button">Cancel</button>
            </div>
         </div>
          )
};
