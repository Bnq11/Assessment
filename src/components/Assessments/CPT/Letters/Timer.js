import React from "react"
import {BsStopwatch} from "react-icons/bs"
import styled from "styled-components";

const TimerWrapper = styled.div`
  margin-top: 40%;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: #2E7105;
  color: #eee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.4);
  padding: 1rem 0;

  .stop-watch {
    font-size: 6rem;
    margin-right: 1rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
  input {
    width: 80px;
    margin-right: 1rem;
    color: #282c34;
    outline: none;
    border: none;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    padding: 0rem 0.5rem;
    border-radius: 5px;
  }
  input:hover {
   
  }
`;

export default function Timer({
  milliseconds,
  seconds,
  minutes,
  changeSeconds,
  changeMinutes,
}) {
  return (
    <TimerWrapper>
      <BsStopwatch className="stop-watch " />
      <div className="d-flex flex-column">
        <label>دقيقة</label>
        <input value={minutes} onChange={changeMinutes} />
      </div>{" "}
      <div className="d-flex flex-column">
        <label>ثانية</label>
        <input value={seconds} onChange={changeSeconds} />
      </div>{" "}
      <div className="d-flex flex-column">
        <label>جزء من الثانية</label>
        <input value={milliseconds} />
      </div>
    </TimerWrapper>
  );
}
