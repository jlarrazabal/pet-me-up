import React, { useState, useEffect } from 'react';
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
const [date, setDate] = useState(`${year}-${month>=10?month:`0${month}`}-${day>=10?day:`0${day}`}`);
const [time, setTime] = useState(null);
const [timeFormated, setTimeFormated] = useState(null);
const [disableTimeBtn, setDisableTimeBtn] = useState(false);
const [services, setServices] = useState([]);
// const [servicesPrices, setServicesPrices] = useState([0]);
const [disableServiceBtn, setDisableServiceBtn] = useState(false);
const [blockedTimeBtn, setBlockedTimeBtn] = useState(timeBtnInitialState);
const [appointmentSet, setAppointmentSet] = useState(false);
const [createAppointment, {error}] = useMutation(CREATE_APPOINTMENT);

const timeBlocks = [9,10,11,12,13,14,15,16,17,18,19,20];

const petData = useQuery(QUERY_GETPET, {
  variables: {petID: petID}
});
const pet = (petData && petData.data?.getPet) || null;
console.log("Pet Info", pet);

const appointmentByDate = useQuery(QUERY_APPOINTMENTS_BY_DATE,{
  variables: {date: date}
});
const appointments = (appointmentByDate && appointmentByDate.data?.getAllAppointmentsByDate) || [];

useEffect(()=> {
  if(appointments && !appointmentSet) {
    console.log("Appointments Data:", appointments);
    setAppointmentSet(true);
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
}, [appointments,date]);

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
    case 11:
      return "08:00 PM";
    default:
      return null;
  }
}

useEffect(()=> {
  setTimeFormated(selectTime(parseInt(time)));
  // console.log(timeFormated);
}, [time]);

const servicesData = useQuery(QUERY_GET_SERVICES);
const servicesArray = (servicesData && servicesData.data?.getServices) || [];

if(appointmentByDate.loading || servicesData.loading || petData.loading) {
 return <div>...Loading</div>;
}

//Handlers
const handleDateChange = (e) => {
  setDate(e.target.value);
}

const handleTimeChange = (e) => {
  // console.log("Time:", e.target.value);
  setTime(e.target.value);
  // setDisableTimeBtn(true);
}

const handleBookAppointment = async (e) => {

    const servicesInput = services.map(service => {
    return {
      _id: service._id,
      name: service.name,
      description: service.description,
      price: service.price
    }
  });

  const petInput = {
    _id: pet._id,
    petName: pet.petName,
    birthday: pet.birthday,
    petType: {
      _id: pet.petType._id,
      petTypeName: pet.petType.petTypeName
    },
    breed: pet.breed,
    gender: pet.gender,
    weight: parseFloat(pet.weight),
    owner: pet.owner
  };

  try {
    const newAppointment = await createAppointment({
      variables: {
        input: {
          date: date,
          time: parseInt(time),
          services: servicesInput,
          pet: petInput
        }
      }
    });

    console.log("New Appointment Info:", newAppointment);

    if(error) {
      console.log(error);
    }
    history.push(`/appointment-summary/${newAppointment.data.createAppointment._id}`);
  } catch (err) {
    console.log(err);
  }
}

const handleReset = (e) => {
  e.preventDefault();
  setDate(`${year}-${month>=10?month:`0${month}`}-${day>=10?day:`0${day}`}`);
  setTime(null);
  setDisableTimeBtn(false);
  setServices([]);
  setDisableServiceBtn(false);
}

const handleServiceChange = (serviceID) => {
  if(services.find(service => service._id === serviceID)) {
    setServices(services.filter(service => service._id !== serviceID));
  } else {
    const service = servicesArray.find(service => service._id === serviceID);
    setServices([...services, service]);
  }
}

return (
  <div className="container container-fluid d-flex p-2 bd-highlight">
    <div className="container container-fluid center">
      <h3 className="pet-appointment">{pet.petName}'s Appointment</h3>
      <div className="left">
        <ul>
          {/*<li>Owner: {`${pet.owner.firstName} ${pet.owner.lastName}`}</li>*/}
          <li>Date: {date}</li>
          <li>Time: {timeFormated}</li>
          <li>Services:<ul>{services.map(service => {return <li key={service._id} className="service-li">{service.name} - ${service.price}</li>})}<li>{services.length ===0?null:`Total: $${services.reduce((total, item) => {return total + item.price;},0)}`}</li></ul></li>
        </ul>
      </div>
    </div>
      <div className="container container-fluid center" id="select-date">
        <h3 for="date">Select a Date</h3>
        <input type="date" id="date" name="date" value={date} onChange={handleDateChange}></input>
      </div>
      <div className="container container-fluid center" id="select-time">
        <h3>Select Time</h3>
        {timeBlocks.map((time, index) => {
          return <button className="btn btn-lg btn-info" disabled={disableTimeBtn || blockedTimeBtn[index].blocked} onClick={handleTimeChange} value={index} key={`timeBlock-${index}`}>{selectTime(index)}</button>
        })}
      </div>
      <div className="container container-fluid center" id="select-service">
        <h3>Select Service(s)</h3>
        {servicesArray.map((service) => {
          return (
              <button className="btn btn-lg btn-info" disabled={disableServiceBtn} onClick={() => handleServiceChange(service._id)} value={service} key={service._id}>{service.name}</button>
          );
        })}
      </div>
      <div className="container container-fluid center" id="action-btns">
        <h3>Actions</h3>
        <button className="btn btn-lg btn-primary" onClick={handleBookAppointment}>Book</button>
        <button className="btn btn-lg btn-danger" onClick={handleReset}>Reset</button>
      </div>
  </div>
);
}
