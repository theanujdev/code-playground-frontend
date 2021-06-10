import { useContext, useEffect, useState } from "react";
import HomePage from "../pages/home";
import PlaygroundPage from "../pages/playground";
import { AppContext } from "../components/context";
import { SERVER_URL } from "../config";
import Loader from "../components/loader";
import "./App.css";

const App: React.FC = () => {
  const { username, setUsername } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(SERVER_URL + "/api/login", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        // case 1 : cookie sent and got name
        setUsername(json.username);
        setLoading(false);
        // case 2 : new user, do nothing, automatically directs to home page and post username
      })
      .catch((err) => {
        setLoading(false);
        alert("Error : " + err.message);
      });
  }, [setUsername]);

  return (
    <>{loading ? <Loader /> : username ? <PlaygroundPage /> : <HomePage />}</>
  );
};

export default App;
