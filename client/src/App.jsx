import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [trips, setTrips] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getTrips = async () => {
    const tripsDataFromServer = await axios.get(`http://localhost:4001/trips?keywords=${searchText}`);
    setTrips(tripsDataFromServer.data.data);
  };

  useEffect(() => {
    getTrips();
  }, [searchText]);

  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="App">
      <h1>เที่ยวไหนดี</h1>
      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <div className="trip">
        {trips.map((item, index) => {
          return (
            <div className="trip-list" key={index}>
              <div className="trip-image">
                <img src={item.photos[0]} />
              </div>
              <div className="trip-content">
                <h2>{item.title}</h2>
                <p>{truncateText(item.description, 100)}</p>
                <a href={item.url} target="_blank">อ่านต่อ</a>
                <p>หมวด {item.tags.join(" ")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
