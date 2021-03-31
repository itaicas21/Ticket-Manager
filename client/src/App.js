import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./Components/Ticket";
import SerachBar from "./Components/SerachBar";
import Tickets from "./Components/Tickets";

function App() {
  const [tickets, setTickets] = useState([]);
  function getRequestedTickets(searchInput) {
    if (!searchInput) {
      axios
        .get("/api/tickets")
        .then(({ data }) => {
          setTickets(data);
          console.log("Got Tickets Successfully");
        })
        .catch(() => {
          console.log("DaFUQ?");
        });
      return;
    }
    axios
      .get("/api/tickets/", { params: { searchText: searchInput } })
      .then(({ data }) => {
        setTickets(data);
        console.log("Got Tickets Successfully");
      })
      .catch(() => {
        console.log("DaFUQ?");
      });
    return;
  }
  useEffect(() => {
    getRequestedTickets();
  }, []);

  return (
    <>
      <SerachBar getRequestedTickets={getRequestedTickets} />
      <Tickets tickets={tickets} />
    </>
  );
}

export default App;
