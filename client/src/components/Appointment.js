import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { QUERY_GETPETS } from '../../utils/queries';
import { QUERY_GETUSER } from '../../utils/queries';


export default function Dashboard() {
//Ask to Fulton/Nelio
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [disableTimeBtn, setDisableTimeBtn] = useState(false);

const { loading, userData } = useQuery(QUERY_GETUSER);
const user = userData?.user || [];

//Handlers
const handleDateChange = (e) => {
  setDate({value: e.target.value});
}

const handleTimeChange = (e) => {
  setTime({value: e.target.value});
  setDisableTimeBtn(true);
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
    {}
    </div>
    <div id="action-btns">
      <button onClick={handleTimeChange} value={19}>7:00 PM</button>
      <button onClick={handleTimeChange} value={20}>8:00 PM</button>
    </div>
  </form>
);
}
