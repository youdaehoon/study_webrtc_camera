import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const [nav, setNav] = useState<Navigator>();
  const [loc, setLoc] = useState<Location>();

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

export default index;
