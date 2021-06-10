import { useState } from "react";
import styles from "./WebRender.module.css";

const WebRender = () => {
  const [src] = useState("<h3>Web Render</h3>");

  return (
    <div className={styles.container}>
      <div className={styles.web__bar}>Preview</div>
      <div className={styles.web__wrapper}>
        <iframe
          srcDoc={src}
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
