import Editor from "@monaco-editor/react";
import styles from "./FileEditor.module.css";
import { FC, useRef, useContext } from "react";
import EditorBar from "../editorBar";
import { AppContext } from "../context";

const FileEditor: FC = () => {
  const { username, editorState, code, setCode, io } = useContext(AppContext);
  const editorRef = useRef();

  function handleEditorChange(value: string | undefined, e: any) {
    if (editorState.activeTab) {
      const args: any = {};
      args[editorState.activeTab] = value;
      setCode((prev) => ({ ...prev, ...args }));
      // emit code to backend
      io.current?.emit("code_update", username, editorState.activeTab, value);
    }
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  return (
    <div className={styles.container}>
      <EditorBar />
      <div className={styles.editor__wrapper}>
        <Editor
          theme="vs-dark"
          height="100%"
          value={code[editorState.activeTab]}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default FileEditor;
