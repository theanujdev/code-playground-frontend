import { FC, useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AppContext } from "../context";
import styles from "./FileExplorer.module.css";

const FileExplorer: FC = () => {
  const { username, editorState, setEditorState, code, setCode, io } =
    useContext(AppContext);

  const handleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    const filename = (e.target as HTMLDivElement).innerText;
    if (e.isTrusted) {
      const args: any = { activeTab: filename };
      if (!editorState.tabs.includes(filename)) {
        args.tabs = [...editorState.tabs, filename];
      }
      setEditorState((prev) => ({ ...prev, ...args }));
    }
  };

  const handlDeleteFile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const filename = (e.target as HTMLDivElement).parentElement!.innerText;
    if (e.isTrusted && window.confirm(`Delete file ${filename}?`) === true) {
      const args: any = {};
      args.tabs = [...editorState.tabs.filter((tab) => tab !== filename)];
      args.files = [...editorState.files.filter((file) => file !== filename)];
      args.activeTab = args.tabs[0] === undefined ? "" : args.tabs[0];
      const newCode = code;
      delete newCode[filename];
      console.log("nc>", newCode, filename);
      setCode({ ...newCode });
      setEditorState((prev) => ({ ...prev, ...args }));
      io.current?.emit("delete_file", username, filename);
    }
  };

  const handleFileCreate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.isTrusted) {
      const filename = prompt("Enter filename");
      if (!filename) return;
      const args: any = {};
      args.tabs = [...editorState.tabs, filename];
      args.files = [...editorState.files, filename];
      args.activeTab = filename;
      const newCode = code;
      newCode[filename] = "";
      setCode({ ...newCode });
      setEditorState((prev) => ({ ...prev, ...args }));
      io.current?.emit("create_file", username, filename);
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
