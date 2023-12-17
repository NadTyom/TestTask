import React, { useState } from "react";
import "./TableRow.css";

export default function TableRow({ index, item, onDelete, updateData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (
      !isNaN(editedItem.width) &&
      !isNaN(editedItem.height) &&
      !isNaN(editedItem.count) &&
      editedItem.width > 0 &&
      editedItem.height > 0 &&
      editedItem.count >= 0
    ) {
      updateData(index, editedItem);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "width" || name === "height" || name === "count") {
      if (/^\d*$/.test(value) || value === 0) {
        setEditedItem((prev) => ({
          ...prev,
          [name]: value === "" ? "" : parseFloat(value),
        }));
      }
    } else {
      setEditedItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <table>
        <tbody key={index}>
          <tr>
            {isEditing ? (
              <>
                <td>
                  <input
                    type="text"
                    name="width"
                    max={3630}
                    value={editedItem.width}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="height"
                    max={1830}
                    value={editedItem.height}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="count"
                    value={editedItem.count}
                    onChange={handleChange}
                  />
                </td>
              </>
            ) : (
              <>
                <td>{item.width + " ՄՄ"}</td>
                <td>{item.height + " ՄՄ"}</td>
                <td>{item.count + " հատ"}</td>
              </>
            )}
            <td>
              <button className="remove-btn" onClick={() => onDelete(index)}>
                Ջնջել
              </button>
              {isEditing ? (
                <button className="save-btn" onClick={handleSave}>
                  Պահպանել
                </button>
              ) : (
                <button className="modify-btn" onClick={handleEdit}>
                  Փոփոխել
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
