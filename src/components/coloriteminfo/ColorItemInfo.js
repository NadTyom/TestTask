import React from "react";
import "./ColorItemInfo.css";
export default function ColorItemInfo({ selectedColor }) {
  return (
    <div className="color-item-info">
      <h3>Ընտրված գույնը։ {selectedColor.name}</h3>
      <p>Արժեքը։ {selectedColor.price}</p>
      <p>Չափսերը։ {selectedColor.width}</p>
    </div>
  );
}
