import React from "react";
export default function Ticket(props) {
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
    <div
      className={`ticket ${props.ticket.done === true ? "done" : ""}`}
    >
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
    </div>
  );
}
