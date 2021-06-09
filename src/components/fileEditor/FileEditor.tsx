// @ts-nocheck
import Editor from "@monaco-editor/react";
import styles from "./FileEditor.module.css";
import { FC, useRef, useEffect, useContext } from "react";
import EditorBar from "../editorBar";
import { AppContext } from "../context";

const FileEditor: FC = () => {
  const { username, editorState, code, setCode, io } = useContext(AppContext);
  const editorRef = useRef(null);

  function handleEditorChange(value, e) {
    // if (value === "") return;
    // console.log("muevent", e);
    if (editorState.activeTab) {
      // console.log("4", editorState.activeTab, "v>>", value);
      const args = {};
      args[editorState.activeTab] = value;
      setCode((prev) => ({ ...prev, ...args }));
      io.current?.emit("code_update", username, editorState.activeTab, value);
      console.log("emit editor change");
    }
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // function showValue() {
  //   console.log(editorRef.current.value);
  // }

  useEffect(() => {
    // console.log("editor state rerender");
    // console.log("state>", editorState);
    // editorRef.setValue(code[editorState.activeTab]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState]);

  // function handleEditorWillMount(monaco) {
  //   console.log("beforeMount: the monaco instance:", monaco);
  // }

  return (
    <div className={styles.container}>
      <EditorBar />
      <div className={styles.editor__wrapper}>
        <Editor
          theme="vs-dark"
          height="100%"
          defaultLanguage="javascript"
          // defaultValue="type js..."
          value={code[editorState.activeTab]}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          // beforeMount={handleEditorWillMount}
          // onValidate={handleEditorValidation}
        />
      </div>
    </div>
  );
};

export default FileEditor;
