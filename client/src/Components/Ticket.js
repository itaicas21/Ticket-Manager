import React from "react";

export default function Ticket(props) {
  return (
    <div className="ticket">
      <span>{props.ticket.title}</span>
    </div>
  );
}
