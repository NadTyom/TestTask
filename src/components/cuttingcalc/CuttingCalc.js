import React, { useState } from "react";
import "./CuttingCalc.css";

export default function CuttingCalc({ addNewData }) {
  const [typeData, setTypeData] = useState({
    width: "",
    height: "",
    count: "",
  });

  const [error, setError] = useState({
    width: false,
    height: false,
    count: false,
  });

  const addData = (e) => {
    e.preventDefault();

    if (!typeData.width || !typeData.height || !typeData.count) {
      alert("Խնդրում ենք լրացնել բոլոր դաշտերը!");
      return;
    }

    if (!error.width && !error.height && !error.count) {
      addNewData(typeData);
      setTypeData({ width: "", height: "", count: "" });
      setError({ width: false, height: false, count: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "width" || name === "height" || name === "count") {
      const numericValue = parseFloat(value);

      if (isNaN(numericValue) || numericValue <= 0) {
        setError((prev) => ({ ...prev, [name]: true }));
      } else {
        setError((prev) => ({ ...prev, [name]: false }));
        setTypeData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setTypeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form className="Cutting-calc" onSubmit={addData}>
      <div className="cutting-params">
        <div className="param">
          <span>№</span>
          <p>1</p>
        </div>
        <div className={`param ${error.width ? "error" : ""}`}>
          <label htmlFor="width">Լայնություն (ՄՄ)</label>
          <input
            type="number"
            name="width"
            id="width"
            max={3630}
            value={typeData.width}
            onChange={(e) => handleChange(e)}
          />
          {error.width && (
            <p className="error-message">Մուտքագրեք ճիշտ տվյալ</p>
          )}
        </div>
        <div className={`param ${error.height ? "error" : ""}`}>
          <label htmlFor="height">Երկարություն (ՄՄ)</label>
          <input
            type="number"
            name="height"
            id="height"
            max={1830}
            value={typeData.height}
            onChange={(e) => handleChange(e)}
          />
          {error.height && (
            <p className="error-message">Մուտքագրեք ճիշտ տվյալ</p>
          )}
        </div>
        <div className={`param ${error.count ? "error" : ""}`}>
          <label htmlFor="count">Քանակ</label>
          <input
            type="number"
            name="count"
            id="count"
            value={typeData.count}
            onChange={(e) => handleChange(e)}
          />
          {error.count && (
            <p className="error-message">Մուտքագրեք ճիշտ տվյալ</p>
          )}
        </div>
      </div>
      <button className="button">Ավելացնել</button>
    </form>
  );
}
