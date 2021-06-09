import styles from "./WebRender.module.css";

const WebRender = () => {
  return (
    <div className={styles.container}>
      <div className={styles.web__bar}>Preview</div>
      <div className={styles.web__wrapper}>
        <iframe
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
