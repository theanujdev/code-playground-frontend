import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import styles from "./WebRender.module.css";

const WebRender = () => {
  const { code } = useContext(AppContext);
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${code["index.html"] || ""}</body>
          <style>${code["style.css"] || ""}</style>
          <script>${code["app.js"] || ""}</script>
        </html>
      `);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.web__bar}>Preview</div>
      <div className={styles.web__wrapper}>
        <iframe
          srcDoc={srcDoc}
          className={styles.iframe}
          title="webApp"
          src=""
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default WebRender;
