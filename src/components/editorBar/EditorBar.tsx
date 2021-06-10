import { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { AppContext } from "../context";
import styles from "./EditorBar.module.css";

const EditorBar = () => {
  const { editorState, setEditorState } = useContext(AppContext);
  const handleCloseTab = () => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const filename = (e.target as HTMLDivElement).parentElement!.innerText;
    if (e.isTrusted) {
      const args: any = {};
      args.tabs = [...editorState.tabs.filter((tab) => tab !== filename)];
      if (!editorState.activeTab) {
        args.activeTab = args.tabs[0] === undefined ? "" : args.tabs[0];
      }
      setEditorState((prev) => ({ ...prev, ...args }));
    }
  };

  const handleTabClick = () => (e: React.MouseEvent<HTMLDivElement>) => {
    const filename = (e.target as HTMLDivElement).innerText;
    if (e.isTrusted) {
      setEditorState((prev) => ({ ...prev, activeTab: filename }));
    }
  };

  return (
    <div className={styles.editor__bar}>
      {editorState.tabs.map((tabname, index) => {
        return (
          <div
            className={
              styles.tab__wrapper +
              " " +
              (editorState.activeTab === tabname ? styles.active : "")
            }
            onClick={handleTabClick}
            key={index}
          >
            <div className={styles.file__title} key={index}>
              {tabname}
            </div>
            <div className={styles.closeIcon} onClick={handleCloseTab}>
              <GrFormClose />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EditorBar;
