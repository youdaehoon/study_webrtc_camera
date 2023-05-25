import { Inter } from "next/font/google";
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

  const [myScreen, setScreen] = useState<Screen>();

  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleOrientationChange() {
      alert("화면회전감지");
      if (typeof screen.orientation !== "undefined") {
        setScreen(screen);
      }
    }

    if (screen) {
      setScreen(screen);
      alert("스크린객체 있음");
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
    <div>
      <Head>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
      </Head>
      {url === "" ? (
        <div>
          v2
          {myScreen?.orientation.type}
          <h1>web rtc camera</h1>
          <Camera
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
            <div
              className={`${styles.layout_container} ${
                showNav ? styles.show : styles.hide
              }`}
            >
              <input
                style={{ position: "absolute", bottom: "5rem" }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="저장이름 입력"
                ref={refInput}
              ></input>
              <div className={`${styles.layout_nav}  `}>
                <div
                  className={styles.layout_nav_grip}
                  onClick={() => setShowNav((prev) => !prev)}
                ></div>
                <button onClick={() => handleSubmit(url)}>전송</button>
                <button onClick={() => setUrl("")}>다시찍기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
