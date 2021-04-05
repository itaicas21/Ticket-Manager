import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./Components/SearchBar";
import Tickets from "./Components/Tickets";
import HiddenTickets from "./Components/HiddenTickets";
function App() {
  const [tickets, setTickets] = useState([]);
  const [renderedTickets, setRenderedTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  let cancelToken;

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();

    try {
      const results = await axios.get(
        `/api/tickets?searchText=${searchTerm}`,
        { cancelToken: cancelToken.token }
      );
      setRenderedTickets(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  function restore() {
    setRenderedTickets(tickets);
    setHiddenTickets([]);
  }

  useEffect(() => {
    axios
      .get(`/api/tickets`)
      .then(({ data }) => {
        setTickets(data);
        console.log("Got Tickets Successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setRenderedTickets(tickets);
  }, [tickets]);

  useEffect(() => {
    const newRenderedTickets = renderedTickets.filter(
      (renderedTicket) =>
        hiddenTickets.every(
          (hiddenTicket) => hiddenTicket !== renderedTicket._id
        )
    );
    console.log("After Filter ", newRenderedTickets);
    setRenderedTickets(newRenderedTickets);
  }, [hiddenTickets]);

  return (
    <>
      <h1 className="pageTitle">Ticket Manager</h1>
      <SearchBar handleSearchChange={handleSearchChange} />
      <HiddenTickets
        tickets={tickets}
        hiddenTickets={hiddenTickets}
        restore={restore}
      />
      <Tickets
        tickets={renderedTickets}
        setHiddenTickets={setHiddenTickets}
      />
    </>
  );
}

export default App;
