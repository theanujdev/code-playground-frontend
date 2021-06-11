import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import XTerminal from "../../components/xTerminal";
import FileEditor from "../../components/fileEditor";
import FileExplorer from "../../components/fileExplorer";
import { FC, useContext, useEffect, useState } from "react";
import Panel from "../../components/panel";
import WebRender from "../../components/webRender";
import { AppContext } from "../../components/context";
import socketClient from "socket.io-client";
import { SOCKET_URL } from "../../config";
import Loader from "../../components/loader";
import styles from "./PlaygroundPage.module.css";
import "react-reflex/styles.css";

const PlaygroundPage: FC = () => {
  const { username, editorState, setEditorState, setCode, io } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = socketClient(SOCKET_URL);
    io.current = socket;
    io.current.emit("initial_data", username);
    io.current.on("get_data", (data) => {
      setEditorState(data.editorState);
      setCode(data.code);
      setLoading(false);
    });
    return () => {
      io.current?.disconnect();
    };
  }, [io, setCode, setEditorState, username]);

  useEffect(() => {
    if (editorState) {
      io.current?.emit(
        "tab_change",
        username,
        editorState.tabs,
        editorState.activeTab
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState?.activeTab, editorState?.tabs]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ReflexContainer orientation="horizontal">
          <ReflexElement className="top-pane">
            <ReflexContainer orientation="vertical">
              <ReflexElement className="left-pane" flex={0.26} minSize={50}>
                <div className={styles.container}>
                  <Panel />
                  <FileExplorer />
                </div>
              </ReflexElement>
              <ReflexSplitter propagate={true} />
              <ReflexElement className="middle-pane">
                <FileEditor />
              </ReflexElement>
              <ReflexSplitter propagate={true} />
              <ReflexElement className="right-pane">
                <WebRender />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter propagate={true} />
          <ReflexElement className="bottom-pane" flex={0.4} minSize={35}>
            <XTerminal />
          </ReflexElement>
        </ReflexContainer>
      )}
    </>
  );
};

export default PlaygroundPage;
