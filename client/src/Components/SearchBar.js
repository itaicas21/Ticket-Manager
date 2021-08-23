import React from "react";

export default function SearchBar(props) {
  return (
    <>
      <input id="searchInput" onChange={props.handleSearchChange} />
    </>
  );
}
