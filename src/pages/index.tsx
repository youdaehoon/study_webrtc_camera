import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { ref, uploadBytes } from "@firebase/storage";
import { storage } from "@/firebase";
import Head from "next/head";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [showNav, setShowNav] = useState<boolean>(true);
  const [showErr, setShowErr] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");

  const refContainer = useRef<HTMLDivElement>(null);

  const [orientaion, setOrientation] = useState<OrientationType>();

  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof screen !== "undefined" && screen.orientation) {
      lock(screen);
    }
  }, []);

  useEffect(() => {
    function handleOrientationChange() {
      if (typeof screen.orientation !== "undefined") {
        setOrientation(screen.orientation.type);
      }
    }

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  function handleTakePhoto(dataUri: string) {
    // Do stuff with the photo...
    console.log("takePhoto");
    setUrl(dataUri);

    // handleSubmit(dataUri);
  }

  const lock = async (screen: Screen) => {
    try {
      await screen.orientation.lock("portrait");
      alert("스크린 회전방지");
    } catch (e) {
      console.log(e);

      alert("실패");
    }
  };

  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const handleSubmit = async (dataURI: string) => {
    if (title === "") {
      alert("이름입력안함");
      if (refInput.current) refInput.current.focus();
      return;
    }
    if (dataURI) {
      let blob = dataURItoBlob(dataURI);
      const file = new File([blob], "test");
      const storageRef = ref(storage, `${title}.png`);
      try {
        const uploadTask = await uploadBytes(storageRef, file);
        alert("완료");
        setUrl("");
      } catch (e) {
        alert("error");
      }
    }
  };
  return (
    <div ref={refContainer}>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.documentElement) {
                document.documentElement.requestFullscreen();
              }
            `,
          }}
        />
      </Head>
      {showErr ? (
        <>
          <span>{errMsg}</span>
          <button onClick={() => setShowErr(false)}>에러 끄기</button>
        </>
      ) : (
        <div>
          {url === "" ? (
            <div>
              <div style={{ position: "absolute", zIndex: "2" }}>
                v4
                {orientaion}
                <h1>web rtc camera</h1>
              </div>

              <Camera
                isDisplayStartCameraError={true}
                isMaxResolution={true}
                onTakePhoto={(dataUri) => {
                  handleTakePhoto(dataUri);
                }}
                idealFacingMode="environment"
              />
              <br />
            </div>
          ) : (
            <div>
              <div className={styles.image_container}>
                <img className={styles.image} src={url} alt="preview" />
              </div>

              <div className={styles.layout}>
                <h2>사진을 확인하세요</h2>
                <div className={`${styles.layout_container} `}>
                  <div
                    className={`${styles.layout_nav}  ${
                      showNav ? styles.show : styles.hide
                    }`}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className={styles.layout_nav_grip}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowNav((prev) => !prev);
                      }}
                    >
                      <input
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          outline: "none",
                          width: "8rem",
                          border: "none",
                          backgroundColor: "tomato",
                        }}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="저장이름 입력"
                        ref={refInput}
                      ></input>
                    </div>
                    <button onClick={() => handleSubmit(url)}>전송</button>
                    <button onClick={() => setUrl("")}>다시찍기</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
