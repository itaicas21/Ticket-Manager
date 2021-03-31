import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./Components/Ticket";
import SearchBar from "./Components/SearchBar";
import Tickets from "./Components/Tickets";

function App() {
  const [tickets, setTickets] = useState([]);

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
      setTickets(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/tickets`)
      .then(({ data }) => {
        setTickets(data);
        console.log("Got Tickets Successfully");
      })
      .catch(() => {
        console.log("DaFUQ?");
      });
  }, []);

  return (
    <>
      <SearchBar handleSearchChange={handleSearchChange} />
      <Tickets tickets={tickets} />
    </>
  );
}

export default App;
