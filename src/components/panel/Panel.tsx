// @ts-nocheck
import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AppContext } from "../context";
import styles from "./Panel.module.css";

const Panel = () => {
  const { setUsername, setEditorState, setCode, io } = useContext(AppContext);
  const handleReset = () => {
    const isConfirm = window.confirm("Confirm to reset playground?");
    if (isConfirm) {
      // reset operations
      setUsername(undefined);
      setEditorState(undefined);
      setCode(undefined);
      io.current = undefined;
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
