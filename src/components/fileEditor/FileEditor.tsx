import Editor from "@monaco-editor/react";
import styles from "./FileEditor.module.css";
import { FC, useRef, useContext, useEffect, useState } from "react";
import EditorBar from "../editorBar";
import { AppContext } from "../context";

const FileEditor: FC = () => {
  const { username, editorState, code, setCode, io } = useContext(AppContext);
  const editorRef = useRef();
  const monacoRef = useRef();
  const [lang, setLang] = useState("text");

  const languages = {
    html: "html",
    css: "css",
    js: "javascript",
    ts: "typescript",
    htm: "html",
    txt: "text",
    json: "json",
    md: "markdown",
    py: "python",
    cpp: "cpp",
    sass: "sass",
    scss: "scss",
    java: "java",
    less: "less",
    xml: "xml",
  };

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
    monacoRef.current = monaco;
  }

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setLang(languages[editorState.activeTab.split(".").pop()] || "text");
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState.activeTab]);

  return (
    <div className={styles.container}>
      <EditorBar />
      <div className={styles.editor__wrapper}>
        <Editor
          theme="vs-dark"
          height="100%"
          language={lang}
          // language={editorState.activeTab.split(".").pop()}
          value={code[editorState.activeTab]}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default FileEditor;
