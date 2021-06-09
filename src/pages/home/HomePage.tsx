import { useContext, useState } from "react";
import { AppContext } from "../../components/context";
// import { UserContext } from "../../utils/UserContext";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const { setUsername } = useContext(AppContext);
  const [name, setName] = useState<string>("");
  // const user = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // case 1 : send name, if created setUsername & receive cookie. if not no cookie set

    fetch("http://localhost:4000", {
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
        if (json.msg === "created user") {
          setUsername(name);
          // setUsername("");
        } else if (json.msg === "cookie set") {
          setUsername(name);
        } else {
          throw new Error("Something went wrong");
        }
        // case 2 : new user, do nothing (automatically dircts to home page and post username)
      })
      .catch((err) => {
        alert("Error : " + err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Welcome to Code & Terminal Playground 🚀
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          // value={username}
          onChange={(e) => setName(e.target.value)}
          // ref={user}
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
