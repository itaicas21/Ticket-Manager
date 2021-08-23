// import { set } from "mongoose";
import axios from "axios";
import React, { useState } from "react";
export default function Ticket(props) {
  const [done, setDone] = useState(props.ticket.done);
  const formatDate = new Date(props.ticket.creationTime);
  let labels = null;
  if (props.ticket.labels) {
    labels = props.ticket.labels.map((label) => {
      return (
        <span key={label} className="label">
          {label}
        </span>
      );
    });
  }
  return (
    <div className={`ticket ${done === true ? "done" : ""}`}>
      <span className="title">{props.ticket.title}</span>
      <div>{labels}</div>
      <div className="content">{props.ticket.content}</div>
      <div className="author"> by {props.ticket.userEmail}</div>
      <div className="date">{`${formatDate.toLocaleDateString()} ${formatDate.toLocaleTimeString()}`}</div>
      <button
        onClick={() => {
          props.setHiddenTickets((prevState) => {
            console.log("Previous state ", prevState);
            const newState = prevState.slice();
            newState.push(props.ticket._id);
            console.log("New state after change ", newState);
            return newState;
          });
        }}
        className="hideTicketButton"
      >
        Hide
      </button>
      <div>
        Done{" "}
        <input
          type="checkbox"
          value={!done}
          checked={done}
          onChange={() => {
            axios
              .patch(
                `/api/tickets/${props.ticket._id}/${
                  done ? "undone" : "done"
                }`
              )
              .then((data) => {
                console.log(data);
                setDone((prevState) => !prevState);
                //Dont know if implementation is best because the done button is not disabled
              });
          }}
        ></input>
      </div>
    </div>
  );
}
