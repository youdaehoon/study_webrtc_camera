import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index: React.FC = () => {
  const [nav, setNav] = useState<Navigator>();
  const [loc, setLoc] = useState<Location>();

  var target_url =
    "https://study-webrtc-camera-ic0b1ln19-youdaehoon.vercel.app/guide/1";
  const x =
    "kakaotalk://web/openExternal?url=" + encodeURIComponent(target_url);
  console.log(x);

  const route = useRouter();
  const { id } = route.query;
  console.log(id);

  useEffect(() => {
    if (navigator) {
      setNav(navigator);
    }
    if (location) {
      setLoc(location);
    }
  }, []);
  return (
    <div>
      {loc ? (
        <a
          href={
            "kakaotalk://web/openExternal?url=" +
            encodeURIComponent(location.origin)
          }
        >
          외부링크
        </a>
      ) : null}
      {loc ? (
        <input disabled={true} value={location.origin + route.asPath} />
      ) : null}
      <button
        onClick={() => nav?.clipboard.writeText(location.origin + route.asPath)}
      >
        url 복사
      </button>
    </div>
  );
};

export default Index;
