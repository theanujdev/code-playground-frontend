import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { SERVER_URL } from "../../config";
import { AppContext } from "../context";
import styles from "./Panel.module.css";

const Panel = () => {
  const { setUsername, setEditorState, setCode, io } = useContext(AppContext);
  const handleReset = () => {
    const confirm = window.confirm("Confirm to reset playground?");
    if (confirm) {
      // reset operations
      setUsername(undefined!);
      setEditorState(undefined!);
      setCode(undefined!);
      io.current = undefined;

      fetch(SERVER_URL + "/api/logout", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.msg !== "logout") {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          alert("Error : " + err.message);
        });
    }
  };

  return (
    <div className={styles.panel}>
      <div className="reset" onClick={handleReset}>
        <AiOutlineHome />
      </div>
    </div>
  );
};

export default Panel;
