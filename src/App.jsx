import { useState } from "react";
import axios from "axios";

import "./App.css";

/* data fetching */
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const loadDataWithFetch = async () => {
    setLoading(true);

    // Verzögerung von 2 Sekunden erzwingen
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("https://randomuser.me/api");
    const tofu = await response.json();
    console.log(tofu);
    setUser(tofu.results[0]);
    setLoading(false);
  };

  const loadDataWithAxios = async () => {
    setLoading(true);
    const response = await axios.get("https://randomuser.me/api");

    // add unnecessary delay for fun :D
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await delay(5000);

    console.log(response);
    setUser(response.data.results[0]);
    setLoading(false);
  };

  return (
    <>
      <button onClick={loadDataWithFetch}>load data with fetch</button>
      <button onClick={loadDataWithAxios}>load data with axios</button>
      {loading && <span className="loader"></span>}
      <div>{user?.email}</div>
      <div>{user?.gender}</div>
    </>
  );
}

export default App;
