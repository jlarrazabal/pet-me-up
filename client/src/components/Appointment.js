import React, { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_APPOINTMENTS_BY_DATE, QUERY_GET_SERVICES, QUERY_GETPET } from '../utils/queries';
import { CREATE_APPOINTMENT } from '../utils/mutations';
import './Appointment.css';

export default function Appointment() {
const timeBtnInitialState = [
  {
    timeBlock: 9,
    blocked: false
  },
  {
    timeBlock: 10,
    blocked: false
  },
  {
    timeBlock: 11,
    blocked: false
  },
  {
    timeBlock: 12,
    blocked: false
  },
  {
    timeBlock: 13,
    blocked: false
  },
  {
    timeBlock: 14,
    blocked: false
  },
  {
    timeBlock: 15,
    blocked: false
  },
  {
    timeBlock: 16,
    blocked: false
  },
  {
    timeBlock: 17,
    blocked: false
  },
  {
    timeBlock: 18,
    blocked: false
  },
  {
    timeBlock: 19,
    blocked: false
  },
  {
    timeBlock: 20,
    blocked: false
  }
];

const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();
let history = useHistory();
const {petID} = useParams();
const [date, setDate] = useState(`${year}-${month}-${day}`);
const [time, setTime] = useState("");
const [disableTimeBtn, setDisableTimeBtn] = useState(false);
const [services, setServices] = useState([]);
const [disableServiceBtn, setDisableServiceBtn] = useState(false);
const [blockedTimeBtn, setBlockedTimeBtn] = useState(timeBtnInitialState);

const timeBlocks = [9,10,11,12,13,14,15,16,17,18,19,20];

const { loading1, appointmentData } = useQuery(QUERY_APPOINTMENTS_BY_DATE,{
  variables: {date: date}
});
const appointments = appointmentData?.appointment || [];

const { loading2, servicesData } = useQuery(QUERY_GET_SERVICES);
const servicesArray = servicesData?.service || [];

const {loading3, petData} = useQuery(QUERY_GETPET, {
  variables: {petID: petID}
});
const pet = petData?.pet || [];

 const [createAppointment, {error}] = useMutation(CREATE_APPOINTMENT);

 if(loading1 || loading2 || loading3) {
   return <div>...Loading</div>;
 }

 if(appointments) {
   setBlockedTimeBtn(blockedTimeBtn.map(timeSlot => {
       if(appointments.includes(timeSlot.timeBlock)){
         timeSlot.blocked = true;
         return timeSlot;
       } else {
         return timeSlot;
       }
     })
   );
 }

//Handlers
const handleDateChange = (e) => {
  setDate({value: e.target.value});
}

const handleTimeChange = (e) => {
  e.preventDefault();
  setTime({value: e.target.value});
  setDisableTimeBtn(true);
}

const handleBookAppointment = async (e) => {
  e.preventDefault();
  try {
    const newAppointment = await createAppointment({
      date: date,
      time: time,
      services: services,
      pet: pet[0]
    });

    if(error) {
      console.log(error);
    }
    history.push(`/appointment-summary/${newAppointment._id}`);
  } catch (err) {
    console.log(err);
  }
}

const handleReset = (e) => {
  e.preventDefault();
  setDate("");
  setTime("");
  setDisableTimeBtn(false);
  setServices([]);
  setDisableServiceBtn(false);
}

const handleServiceChange = (e) => {
  e.preventDefault();
  setServices([...services,e.target.value]);
  setDisableServiceBtn(true);
}

const selectTime = (index) => {
    switch(index) {
    case 0:
      return "09:00 AM";
    case 1:
      return "10:00 AM";
    case 2:
      return "11:00 AM";
    case 3:
      return "12:00 PM";
    case 4:
      return "01:00 PM";
    case 5:
      return "02:00 PM";
    case 6:
      return "03:00 PM";
    case 7:
      return "04:00 PM";
    case 8:
      return "05:00 PM";
    case 9:
      return "06:00 PM";
    case 10:
      return "07:00 PM";
    default:
      return "08:00 PM";
  }
}

return (
  <form>
    <div id="select-date">
      <label for="date">Select a date:</label>
      <input type="date" id="date" name="date" value={date} onChange={handleDateChange}></input>
    </div>
    <div id="select-time">
      {timeBlocks.map((time, index) => {
        return <button className="btn btn-lg btn-primary" disabled={disableTimeBtn || blockedTimeBtn[index].blocked} onClick={handleTimeChange} value={index} key={`timeBlock-${index}`}>{selectTime(index)}</button>
      })}
    </div>
    <div id="select-service">
    {servicesArray.map((service) => {
      return (
          <button className="btn btn-lg btn-primary" disabled={disableServiceBtn} onClick={handleServiceChange} value={service}>{service.name} key={service._id}</button>
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
