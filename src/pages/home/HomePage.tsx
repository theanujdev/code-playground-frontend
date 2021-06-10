import React, { useContext, useState } from "react";
import { AppContext } from "../../components/context";
import { SERVER_URL } from "../../config";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const { setUsername } = useContext(AppContext);
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(SERVER_URL + "/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.status >= 400) {
          throw new Error(json.message);
        }
        if (json.msg === "created user" || json.msg === "logged in") {
          setUsername(name);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        alert("Error : " + err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Welcome to Code & Terminal Playground 🚀
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default HomePage;
