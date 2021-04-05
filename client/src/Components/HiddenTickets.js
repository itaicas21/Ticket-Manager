import React from "react";

export default function HiddenTickets(props) {
  return (
    <div className="hideTicketsSection">
      {`Showing ${props.tickets.length} (`}
      <span id="hideTicketsCounter">
        {props.hiddenTickets.length}
      </span>
      <span>
        {" "}
        hidden{" "}
        {props.hiddenTickets.length !== 1
          ? "tickets"
          : "ticket"} -{" "}
      </span>
      <span
        onClick={() => {
          props.restore();
        }}
        id="restoreHideTickets"
      >
        Restore Hidden Tickets{")"}
      </span>
    </div>
  );
}
