import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./DashBoard.css";
import Cut from "../cut/Cut";
import TableInfo from "../tableinfo/TableInfo";

function DashBoard({ selectedColor, data }) {
  const [boardInfo, setBoardInfo] = useState({
    totalBoards: 0,
    totalPieces: 0,
    totalCost: 0,
  });
  const backgroundImage = selectedColor.image
    ? `url(${require(`../../images/${selectedColor.image}`)})`
    : "none";

  const calculateCuts = () => {
    let cuts = [];
    let currentColumnCuts = [];
    let currentColumnHeight = 0;
    let currentBoardWidth = 0;

    data.forEach((item) => {
      for (let i = 0; i < item.count; i++) {
        const widthPercentage = (item.width / 3630) * 100;
        const heightPercentage = (item.height / 1830) * 100;

        const cutWidth = parseFloat(widthPercentage);
        const cutHeight = parseFloat(heightPercentage);
        const cut = {
          id: uuidv4(),
          width: `${cutWidth}%`,
          height: `${cutHeight}%`,
          count: 1,
          realWidth: item.width,
          realHeight: item.height,
          colorId: selectedColor.id,
          price: selectedColor.price,
        };

        if (
          currentColumnHeight + cutHeight > 1830 ||
          currentBoardWidth + cutWidth > 110
        ) {
          cuts.push([...currentColumnCuts]);
          currentColumnCuts = [cut];
          currentColumnHeight = cutHeight;
          currentBoardWidth = cutWidth;
        } else {
          currentColumnCuts.push(cut);
          currentColumnHeight += cutHeight;
          currentBoardWidth += cutWidth;
        }
      }
    });

    if (currentColumnCuts.length > 0) {
      cuts.push([...currentColumnCuts]);
    }

    return cuts;
  };

  const [columns, setColumns] = useState(calculateCuts());

  useEffect(() => {
    setColumns(calculateCuts());
    const calculateBoardInfo = (cuts) => {
      let totalBoards = cuts.length;
      let totalPieces = 0;
      let totalCost = 0;

      cuts.forEach((columnCuts) => {
        columnCuts.forEach((cut) => {
          totalPieces += cut.count;
          totalCost += cut.count * cut.price;
        });
      });

      return { totalBoards, totalPieces, totalCost };
    };

    const cuts = calculateCuts();
    const updatedBoardInfo = calculateBoardInfo(cuts);

    setBoardInfo(updatedBoardInfo);
  }, [data, selectedColor]);

  return (
    <div className="dashboard-container">
      <TableInfo
        totalBoards={boardInfo.totalBoards}
        totalPieces={boardInfo.totalPieces}
        totalCost={boardInfo.totalCost}
      />

      {columns.map((columnCuts, columnIndex) => (
        <div
          key={columnIndex}
          className="cut-dashboard"
          style={{
            backgroundImage,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {columnCuts.map((cut, cutIndex) => (
            <Cut
              key={cutIndex}
              width={cut.width}
              height={cut.height}
              count={cut.count}
              realWidth={cut.realWidth}
              realHeight={cut.realHeight}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default DashBoard;
