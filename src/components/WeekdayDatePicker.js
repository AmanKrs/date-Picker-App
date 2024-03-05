import React, { useState, useEffect } from "react";
import "./datepicker.css";
export default function WeekdayDatePicker({ predefineRangeprop }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [weekendRange, setWeekendRange] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);

  const validate = (dateString) => {
    const day = new Date(dateString).getDay();
    if (day === 0 || day === 6) {
      return false;
    }
    return true;
  };

  const handleStartChange = (e) => {
    // console.log(e.target.value);
    if (!validate(e.target.value)) {
      e.target.value = "";
      setErrorMsg(true);
      setStartDate(e.target.value);
    } else {
      setErrorMsg(false);
      setStartDate(e.target.value);
    }
  };

  const handleEndChange = (e) => {
    // console.log(e.target.value);
    if (!validate(e.target.value)) {
      e.target.value = "";
      setErrorMsg(true);
      setEndDate(e.target.value);
    } else {
      setErrorMsg(false);
      setEndDate(e.target.value);
    }
  };

  const getWeekend = (startDate, endDate) => {
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    const weekendDateArray = [];
    let currentDate = firstDate;
    while (currentDate <= lastDate) {
      // console.log("getting inside function itreation");
      if (!validate(currentDate)) {
        // console.log("getting inside function itreation of if");
        weekendDateArray.push(
          new Date(currentDate).toISOString().split("T")[0]
        );
        currentDate.setDate(currentDate.getDate() + 1);
      } else {
        // console.log("not working");
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    // console.log(weekendDateArray);
    setWeekendRange(weekendDateArray);
    return weekendDateArray;
  };

  const handlePreDefineRange = (predefineRange) => {
    const todayDate = new Date();
    const predefinedFirstDate = new Date(todayDate);
    // console.log(predefineRange);
    predefinedFirstDate.setDate(
      predefinedFirstDate.getDate() - predefineRange + 1
    );
    // console.log(predefinedFirstDate);
    setStartDate(predefinedFirstDate.toISOString().split("T")[0]);
    setEndDate(todayDate.toISOString().split("T")[0]);
  };
  // console.log(weekendRange)

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setWeekendRange(null);
  };
  useEffect(() => {
    if (startDate && endDate) {
      getWeekend(startDate, endDate);
    }
    setDateRange([startDate, endDate]);
  }, [startDate, endDate]);

  return (
    <div className="main-container">
      <h1>WeekdayDatePicker</h1>
      <div className="datepickercontainer">
        <div className="datepicker">
          <label>Start Date</label>
          <input type="date" onChange={handleStartChange} max={endDate} />
        </div>
        <div className="datepicker">
          <label>End Date</label>
          <input type="date" onChange={handleEndChange} min={startDate} />
        </div>
        <div className="datepicker">
          <label>Predefine Range</label>
          <select
            onChange={(e) => {
              handlePreDefineRange(e.target.value);
            }}
          >
            <option value={null}></option>
            <option value={7}>7</option>
            <option value={30}>30</option>
            {/* <option value={predefineRangeprop}>{predefineRangeprop}</option> */}
            {/* if user want to use predefine props */}
          </select>
        </div>
        <div className="datepicker">
          <button onClick={handleClear}>clear</button>
        </div>
      </div>
      {errorMsg ? (
        <>
          <p style={{ color: "red" }}>Selected day can't be weekend</p>
        </>
      ) : (
        <></>
      )}

      {startDate && (
        <>
          <h4>Seleted Date Range</h4>
          <p>
            <b>{dateRange?.[0]}</b>
            &nbsp; to &nbsp;
            <b>{dateRange?.[1]}</b>
          </p>
        </>
      )}
      {weekendRange && (
        <>
          <h4> Weekend list in seleted Date Range</h4>
          {weekendRange?.map((weekendDate, idx) => {
            return (
              <div key={idx}>
                <ul>
                  <li>
                    <em>{weekendDate}</em>
                  </li>
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
