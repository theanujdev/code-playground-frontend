import React, { useEffect, useRef, useContext } from "react";
import { Terminal, ITerminalOptions } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { ITerminalColor } from "../../utils/types";
import styles from "./XTerminal.module.css";
import "xterm/css/xterm.css";
import { AppContext } from "../context";
import debounce from "../../utils/debounce";

let term: Terminal;
let fitAddon: FitAddon;

const XTerminal: React.FC = () => {
  const { username, io } = useContext(AppContext);
  const validCommmands = ["ls", "cat", "whoami"];

  const promptValue = `${
    ITerminalColor.Cyan + username + ITerminalColor.Purple
  }@ProdexOne${ITerminalColor.Reset} $ `;

  const TerminalOptions: ITerminalOptions = {
    fontFamily: "Consolas",
    fontWeight: "100",
    fontSize: 18,
    cursorBlink: true,
    cursorStyle: "bar",
    theme: { background: "#002B36" },
  };
  const command = useRef<string>("");
  // const Size = useRef<number>();
  let terminalEl = useRef() as React.MutableRefObject<HTMLInputElement>; //  as React.MutableRefObject<HTMLInputElement>
  function prompt() {
    term.write(promptValue);
  }
  // init func

  const initTerminal = () => {
    term = new Terminal(TerminalOptions);
    fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalEl.current);
    // setInterval(() => {
    //   console.log("DS");
    //   fitAddon.fit();
    // }, 3000);
    fitAddon.fit();
    term.writeln(
      "Welcome to " +
        ITerminalColor.Green +
        "code playground" +
        ITerminalColor.Reset +
        ". This is " +
        ITerminalColor.Red +
        "experimental" +
        ITerminalColor.Reset +
        "."
    );
    term.writeln("Type some keys and commands to play around.\n");
    prompt();

    // term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    // term.onResize((e) => console.log("Resize : ", e));
    term.onKey((e) => {
      // console.log(e);

      switch (e.domEvent.key) {
        case "Enter":
          term.writeln("");
          if (!command.current) return prompt();
          //send data
          io.current?.emit("command", command.current);

          command.current = "";

          break;
        case "Backspace":
          if (command.current) {
            term.write("\b \b");
            command.current = command.current.slice(0, -1);
          }
          break;
        default:
          command.current += e.key;
          // console.log(command);
          // term.write(e.key);
          if (validCommmands.includes(command.current)) {
            term.write(
              "\b \b".repeat(command.current.length - 1) +
                ITerminalColor.Cyan +
                command.current +
                ITerminalColor.Reset
            );
          } else {
            term.write(e.key);
          }
      }
    });

    //   var printable = !ev!!.altKey && !ev!!.ctrlKey && !ev!!.metaKey;
  };

  // const [height, setHeight] = useState();
  const tref = useRef() as React.MutableRefObject<HTMLDivElement>;
  // const fnd = (fn, time) => {
  //   let tm;
  //   clearTimeout(tm);
  //   tm = setTimeout(() => {
  //     fn();
  //   }, time);
  // };
  useEffect(() => {
    initTerminal();
    // @ts-ignore
    io?.current.on("command_response", (res) => {
      term.writeln(res);
      prompt();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const observeEl = tref.current;

    const resizeObserver = new ResizeObserver(
      debounce(
        () => {
          if (tref.current) fitAddon.fit();
          // console.log("el", observeEl, "----", tref.current);
        },
        500,
        null
      )
    );
    resizeObserver.observe(observeEl);

    return () => {
      resizeObserver.unobserve(observeEl);
      console.log("unobs");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  // console.log(fitAddon);
  // fitAddon?.fit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dimensions]);

  return (
    <div className={styles.terminal__container}>
      <div className={styles.terminal__bar}>
        <div className="t-left">Terminal Session of {username}</div>

        <div className="t-right">🚀</div>
      </div>
      <div className={styles.terminal__wrapper} ref={tref}>
        <div className={styles.terminal} ref={terminalEl}></div>
      </div>
    </div>
  );
};

export default XTerminal;
