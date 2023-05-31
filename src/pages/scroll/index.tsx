import React, { useEffect, useRef, useState } from "react";

import styles from "@/styles/ScrollContainer.module.css";

const index = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [full, setFull] = useState<{
    width: null | number;
    height: null | number;
  }>({ width: null, height: null });
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const updateDimensions = () => {
        setWidth(element.offsetWidth);
        setHeight(element.offsetHeight);
        setFull({ width: window.innerWidth, height: window.innerHeight });
      };

      updateDimensions();

      window.addEventListener("resize", updateDimensions);

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, []);

  useEffect(() => {}, [ref.current]);
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "auto",
          top: "50%",
        }}
      >
        {`width: ${full.width} height: ${full.height} `}
      </div>
      <div className={styles.scrollContainer}>
        <div
          className={styles.scrollItem}
          style={{ backgroundColor: "tomato", height: full.height + "px" }}
        >
          Item 1
        </div>
        <div
          ref={ref ? ref : null}
          className={styles.scrollItem}
          style={{
            height: full.height + "px",
            backgroundColor: "firebrick",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span> Item 2</span>
          {ref.current && <span>{`width :${width} height:${height}`}</span>}
        </div>
        <div
          className={styles.scrollItem}
          style={{ height: full.height + "px" }}
        >
          Item 3
        </div>
      </div>
    </>
  );
};

export default index;
