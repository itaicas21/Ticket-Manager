import React from "react";

export default function SearchBar(props) {
  return (
    <div className="searchBar">
      <input onChange={props.handleSearchChange} />
    </div>
  );
}
