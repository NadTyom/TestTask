import React, { useState, useCallback } from "react";
import BaseColors from "./BaseColors";
import "./App.css";
import ColorItem from "./components/coloritem/ColorItem";
import ColorItemInfo from "./components/coloriteminfo/ColorItemInfo";
import CuttingCalc from "./components/cuttingcalc/CuttingCalc";
import TableRow from "./components/tablerow/TableRow";
import DashBoard from "./components/dashboard/DashBoard";

const App = () => {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState(BaseColors);
  const [selectedColor, setSelectedColor] = useState(BaseColors[0]);

  const colorClick = useCallback((color) => {
    setColors((prevColors) => [
      color,
      ...prevColors.filter((c) => c !== color),
    ]);
    setSelectedColor(color);
  }, []);

  const addNewData = useCallback((d) => {
    setData((prevData) => [...prevData, d]);
  }, []);

  const updateData = (index, updatedItem) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedItem;
      return newData;
    });
  };

  const RemoveBtn = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="calc-container">
      <h1>Կտրման հաշվիչ</h1>
      <div className="col-material">
        <h2>Նյութի ընտրություն</h2>
        <div className="select-colors">
          {colors.map((color, key) => (
            <ColorItem
              key={key}
              color={color}
              onClick={() => colorClick(color)}
            />
          ))}
        </div>
        <ColorItemInfo selectedColor={selectedColor} />
      </div>
      <div className="data-section">
        <CuttingCalc addNewData={addNewData} />
        {data.map((item, index) => {
          return (
            <TableRow
              item={item}
              key={index}
              index={index}
              onDelete={RemoveBtn}
              updateData={updateData}
            />
          );
        })}
      </div>
      <DashBoard selectedColor={selectedColor} data={data} />
    </div>
  );
};

export default App;
