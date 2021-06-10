import { createContext, FC, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface IEditorState {
  files: string[];
  tabs: string[];
  activeTab: string;
}

interface IAppContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  editorState: IEditorState;
  setEditorState: React.Dispatch<React.SetStateAction<IEditorState>>;
  code: { [key: string]: any };
  setCode: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  io: React.MutableRefObject<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

const Context: FC = ({ children }) => {
  const [username, setUsername] = useState<string>();
  const [editorState, setEditorState] = useState<IEditorState>();
  const [code, setCode] = useState<{ [key: string]: any }>();
  const io = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  return (
    <AppContext.Provider
      value={
        {
          username,
          setUsername,
          editorState,
          setEditorState,
          code,
          setCode,
          io,
        } as IAppContext
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
