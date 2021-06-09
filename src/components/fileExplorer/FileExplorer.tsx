// @ts-nocheck
import styles from "./FileExplorer.module.css";
// import { IEditorState } from "../../utils/types";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FC, useContext } from "react";
import { AppContext } from "../context";

const FileExplorer: FC = () => {
  const { username, editorState, setEditorState, code, setCode, io } =
    useContext(AppContext);
  // console.log("FE Page", { editorState, setEditorState, code, setCode });
  const handleActive = (e: React.MouseEventHandler<HTMLDivElement>) => {
    const filename = e.target.innerText;
    if (e.isTrusted) {
      const args = { activeTab: filename };
      if (!editorState.tabs.includes(filename)) {
        args.tabs = [...editorState.tabs, filename];
      }
      setEditorState((prev) => ({ ...prev, ...args }));
    }
  };

  const handlDeleteFile = (e) => {
    e.stopPropagation();
    console.log("del file", e);
    const filename = e.target.parentElement.innerText;
    if (e.isTrusted && window.confirm(`Delete file ${filename}?`) === true) {
      const args = {};
      args.tabs = [...editorState.tabs.filter((tab) => tab !== filename)];
      args.files = [...editorState.files.filter((file) => file !== filename)];
      args.activeTab = args.tabs[0] === undefined ? "" : args.tabs[0];
      const newCode = code;
      delete newCode[filename];
      console.log("nc>", newCode, filename);
      setCode({ ...newCode });
      // console.log(args.tabs, filename);
      // console.log({ ...editorState, ...args });

      setEditorState((prev) => ({ ...prev, ...args }));

      // emit code and editor state to backend
      io.current.emit("delete_file", username, filename);
    }
  };

  const handleFileCreate = (e) => {
    console.log("create file");
    if (e.isTrusted) {
      const filename = prompt("Enter filename");
      console.log("fn>>>", filename, typeof filename);
      if (!filename) return;
      const args = {};
      args.tabs = [...editorState.tabs, filename];
      args.files = [...editorState.files, filename];
      args.activeTab = filename;
      const newCode = code;
      newCode[filename] = "";
      // console.log("nc>", newCode, filename);
      setCode({ ...newCode });
      // console.log(args.tabs, filename);
      // console.log({ ...editorState, ...args });

      setEditorState((prev) => ({ ...prev, ...args }));

      // emit code and editor state to backend
      io.current.emit("create_file", username, filename);
    }
  };
  return (
    <div className={styles.explorer__container}>
      <div className={styles.explorer__bar}>
        <div className={styles.explorer__title}>Files</div>
        <div className={styles.explorer__actions}>
          <div className="file__create" onClick={handleFileCreate}>
            <AiOutlineFileAdd />
          </div>
        </div>
      </div>
      <div className={styles.explorer__files}>
        {editorState.files.map((filename, index) => {
          return (
            <div
              className={
                styles.file__wrapper +
                " " +
                (editorState.activeTab === filename ? styles.activeTab : "")
              }
              key={index}
              onClick={handleActive}
            >
              <div className={styles.file__title} key={index}>
                {filename}
              </div>
              <div className={styles.deleteIcon} onClick={handlDeleteFile}>
                <MdDeleteForever />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileExplorer;
