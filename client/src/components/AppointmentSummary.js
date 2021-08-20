import React,{useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GETAPPOINTMENTBYID,QUERY_GET_SERVICES  } from '../utils/queries';
import { DELETE_APPOINTMENT } from '../utils/mutations';
import './AppointmentSummary.css';


export default function AppointmentSummary(){
const {appointmentID} = useParams();
// const [date, setDate] = useState('');
// const [time, setTime] = useState("");

const [paymentID, setPaymentID] = useState("");

 const { loading, data} = useQuery (QUERY_GETAPPOINTMENTBYID , {
     variables: {
        appointmentID:appointmentID
     }
 } );
 const [deleteAppointment, {error}] = useMutation(DELETE_APPOINTMENT);
 const servicesData = useQuery(QUERY_GET_SERVICES);
 const services = (servicesData && servicesData.data?.getServices) || [];
  
 //event handlers
 const handleServicePayment = (e)=>{
   setPaymentID({value: e.target.value});
   e.preventDefault();
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
      
           <h1 className="appointmentHeader">Your appointment has been successfully created </h1>
           <div classname="summary "><h2 className='summary-form-input'>Appointment Summary</h2></div>
            <div className="date"><h3>Date:{data?.date}</h3></div>
            <div {service.map(service =>)}>
            <div className="time"><h3>Time:{data?.time}</h3></div>
            </div>
            <div classname="summary "><h3 className='summary-form-input'>List of Services</h3></div>
            <ul>{services.map(service => {return (<li>Service name:{service.name}, Service price:{service.name}</li>)})}</ul>
            <div className="totalPrice"><h3>Total Price: ${services.reduce((total, item) => {return total + item.price},0)}</h3></div>
            <div><button onClick={handleServicePayment} className="btn btn-lg btn-primary" type="button">Pay Online</button></div>
            <div><button onClick={cancelAppointment} className="btn btn-lg btn-danger" type="button">Cancel</button></div>
           </div>
          )
};

