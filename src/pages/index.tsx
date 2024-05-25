import React, { useEffect, useState } from "react";
import ImgContainer from "./img-container";
import Filters from "./filters";

export default function Index() {
  let [img, setImg] = useState<string>("");

  return (
    <div className="container">
      <ImgContainer />
      <Filters />
    </div>
  );
}
