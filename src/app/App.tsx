import { useContext, useEffect, useState } from "react";
import HomePage from "../pages/home";
import PlaygroundPage from "../pages/playground";
import { AppContext } from "../components/context";
import "./App.css";

const App: React.FC = () => {
  const { username, setUsername } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // let data;
    fetch("http://localhost:4000", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("app>", json);
        // case 1 : cookie sent and got name
        if ("username" in json) {
          // console.log("Gotcha", json.username);
          setUsername(json.username);
        }
        setLoading(false);
        // case 2 : new user, do nothing (automatically dircts to home page and post username)
      })
      .catch((err) => {
        alert("Error : " + err.message);
      });

    return () => {
      // io.offAny();
      // io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{loading ? "Loading" : username ? <PlaygroundPage /> : <HomePage />}</>
  );
};

export default App;
