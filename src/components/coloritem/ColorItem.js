import React from "react";
import "./ColorItem.css";

export default function ColorItem({ color, onClick }) {
  return (
    <div className="item-color" onClick={() => onClick(color)}>
      <img
        className="image-color"
        src={require(`../../images/${color.image}`)}
        alt={color.name}
      />
    </div>
  );
}
