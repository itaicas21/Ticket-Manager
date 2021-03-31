import React from "react";

export default function SerachBar(props) {
  return (
    <div className="serachBar">
      <input
        onChange={(e) => {
          props.getRequestedTickets(e.target.value);
        }}
      />
    </div>
  );
}
