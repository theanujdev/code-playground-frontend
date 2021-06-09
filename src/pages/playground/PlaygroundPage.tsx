import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import XTerminal from "../../components/xTerminal";
import FileEditor from "../../components/fileEditor";
import FileExplorer from "../../components/fileExplorer";
import { FC, useContext, useEffect, useState } from "react";
// import { UserContext } from "../../utils/UserContext";
// import { IEditorState } from "../../utils/types";
import Panel from "../../components/panel";
import WebRender from "../../components/webRender";
// import { Socket } from "socket.io-client";
// import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styles from "./PlaygroundPage.module.css";
import { AppContext } from "../../components/context";
import socketClient from "socket.io-client";
// interface IProps {
//   io: Socket<DefaultEventsMap, DefaultEventsMap>;
// }

const PlaygroundPage: FC = () => {
  const { username, editorState, setEditorState, setCode, io } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = socketClient("http://localhost:4000");
    io.current = socket;
    // console.log("Play Loaded");/
    // io.current.on("pong", (data) => {
    //   console.log(data);
    // });
    // io.current.emit("ping");
    io.current.emit("initial_data", username);
    // io.current.on("connect", () => {
    //   console.log("connected to server ws");
    // });
    io.current.on("get_data", (data) => {
      // console.log("got data", data);
      setEditorState(data.editorState);
      setCode(data.code);
      setLoading(false);
    });
    // console.log()
    // setEditorState({
    //   files: ["j.html", "k.css", "t.js"],
    //   tabs: ["j.html"],
    //   activeTab: "j.html",
    // });
    // setCode({
    //   "j.html": "",
    //   "t.js": "",
    // });

    // console.log(code["j.html"]);
    // io.emit("username", username);

    // fetch("http://localhost:4000/")
    //   .then((res) => res.text())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    return () => {
      io.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("esch", editorState);
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
        "Loading"
      ) : (
        <ReflexContainer orientation="horizontal">
          <ReflexElement className="top-pane">
            <ReflexContainer orientation="vertical">
              <ReflexElement className="left-pane" minSize={50}>
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
          <ReflexElement
            className="bottom-pane"
            flex={0.4}
            minSize={35}
            maxSize={10500}
          >
            <XTerminal />
          </ReflexElement>
        </ReflexContainer>
      )}
    </>
  );
};

export default PlaygroundPage;
