import React, { useEffect, useRef, useContext } from "react";
import { Terminal, ITerminalOptions } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { ITerminalColor } from "../../utils/types";
import { AppContext } from "../context";
import debounce from "../../utils/debounce";
import styles from "./XTerminal.module.css";
import "xterm/css/xterm.css";

const XTerminal: React.FC = () => {
  const { username, io } = useContext(AppContext);
  const validCommmands = ["ls", "cat", "whoami", "clear", "ping"];
  const command = useRef<string>("");
  const terminalEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const terminalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  let term: Terminal;
  let fitAddon: FitAddon;

  const TerminalOptions: ITerminalOptions = {
    fontFamily: "Consolas",
    fontWeight: "100",
    fontSize: 18,
    cursorBlink: true,
    cursorStyle: "bar",
    theme: { background: "#002B36" },
  };

  const promptValue = `${
    ITerminalColor.Cyan + username + ITerminalColor.Purple
  }@ProdexOne${ITerminalColor.Reset} $ `;

  function prompt() {
    term.write(promptValue);
  }

  const initTerminal = () => {
    term = new Terminal(TerminalOptions);
    fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalEl.current);
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
    term.writeln("Type commands ping, ls, cat, clear, etc. to play around.\n");
    prompt();

    term.onKey((e) => {
      switch (e.domEvent.key) {
        case "Enter":
          term.writeln("");
          if (!command.current) return prompt();
          if (command.current === "clear") {
            command.current = "";
            term.clear();
            prompt();
            return;
          }
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
  };

  useEffect(() => {
    initTerminal();
    io?.current!.on("command_response", (res) => {
      term.writeln(res);
      prompt();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observeEl = terminalRef.current;
    const resizeObserver = new ResizeObserver(
      debounce(
        () => {
          if (terminalRef.current) fitAddon.fit();
        },
        500,
        null
      )
    );

    resizeObserver.observe(observeEl);

    return () => {
      resizeObserver.unobserve(observeEl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.terminal__container}>
      <div className={styles.terminal__bar}>
        <div className="t-left">
          Terminal Session of <span>@{username}</span>
        </div>
        <div className="t-right">🚀</div>
      </div>
      <div className={styles.terminal__wrapper} ref={terminalRef}>
        <div className={styles.terminal} ref={terminalEl}></div>
      </div>
    </div>
  );
};

export default XTerminal;
