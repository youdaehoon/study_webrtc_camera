import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRef } from "react";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleTakePhoto(dataUri: string) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }
  return (
    <div>
      <h1>web rtc camera</h1>
      <br />
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
        idealFacingMode="environment"
      />
    </div>
  );
}
