import React, { useEffect } from "react";
import "./Cut.css";

function Cut({ width, height, realWidth, realHeight }) {
  useEffect(() => {
    console.log("Width:", width);
    console.log("Height:", height);
  }, [width, height]);
  return (
    <div className="cut" style={{ width: `${width}`, height: `${height}` }}>
      <p className="width-info ">{realWidth}Մմ</p>
      <p className="height-info">{realHeight}Մմ</p>
    </div>
  );
}

export default Cut;
