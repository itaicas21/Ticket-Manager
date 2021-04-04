import React from "react";
import Ticket from "./Ticket";
export default function Tickets(props) {
  if (props.tickets.length > 0) {
    return props.tickets.map((ticket) => {
      return (
        <Ticket
          key={ticket._id}
          ticket={ticket}
          setHiddenTickets={props.setHiddenTickets}
        />
      );
    });
  }
  return null;
}
