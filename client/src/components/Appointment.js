import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { QUERY_APPOINTMENTS_BY_DATE, QUERY_GET_SERVICES } from '../utils/queries';


export default function Appointment() {

const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [disableTimeBtn, setDisableTimeBtn] = useState(false);
const [services, setServices] = useState([]);
const [disableServiceBtn, setDisableServiceBtn] = useState(false);

const { loading1, appointmentData } = useQuery(QUERY_APPOINTMENTS_BY_DATE);
const appointments = appointmentData?.appointment || [];

const { loading2, servicesData } = useQuery(QUERY_GET_SERVICES);
const servicesArray = servicesData?.service || [];

//Handlers
const handleDateChange = (e) => {
  e.preventDefault();
  setDate({value: e.target.value});
}

const handleTimeChange = (e) => {
  e.preventDefault();
  setTime({value: e.target.value});
  setDisableTimeBtn(true);
}

const handleBookAppointment = (e) => {
  e.preventDefault();
}

const handleReset = (e) => {
  e.preventDefault();
}

const handleServiceChange = (e) => {
  e.preventDefault();
  setServices([...services,e.target.value]);
  setDisableServiceBtn(true);
}

return (
  <form>
    <div id="select-date">
      <label for="date">Select a date:</label>
      <input type="date" id="date" name="date" value={date} onChange={handleDateChange}></input>
    </div>
    <div id="select-time">
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={9}>9:00 AM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={10}>10:00 AM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={11}>11:00 AM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={12}>12:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={13}>1:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={14}>2:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={15}>3:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={16}>4:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={17}>5:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={18}>6:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={19}>7:00 PM</button>
      <button className="btn btn-lg btn-primary" disabled={disableTimeBtn} onClick={handleTimeChange} value={20}>8:00 PM</button>
    </div>
    <div id="select-service">
    {servicesArray.map((service) => {
      return (
          <button className="btn btn-lg btn-primary" disabled={disableServiceBtn} onClick={handleServiceChange} value={service}>{service.name}</button>
      );
    })}
    </div>
    <div id="action-btns">
      <button className="btn btn-lg btn-primary" onClick={handleBookAppointment}>Book Appointment</button>
      <button className="btn btn-lg btn-primary" onClick={handleReset}>Reset</button>
    </div>
  </form>
);
}
