import React from "react";
import "./TableInfo.css";

export default function TableInfo({ totalCost, totalBoards, totalPieces }) {
  return (
    <div className="table-info">
      <span>Կտրման պարամետրեր:</span>
      <p>Ընդհանուր արժեքը:{totalCost}</p>
      <p>Տախտակների քանակը: {totalBoards}</p>
      <p>Ընդհանուր կտրվածք: {totalPieces}</p>
    </div>
  );
}
