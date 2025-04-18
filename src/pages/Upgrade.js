import { Link } from "react-router-dom";
import { useUpgrade } from "../contexts/UpgradeContext"
import { useState } from "react";
import "./styles.css";

const handleTableEdit = (imageName, newModels) => {
  setEditingData((prev) => ({
    ...prev,
    [imageName]: newModels,
  }));
  setDataChanged(true);
};

const handleSave = async () => {
  const savePromises = Object.keys(editingData).map((imageName) =>
    saveDataToFirestore(imageName, editingData[imageName])
  );

  await Promise.all(savePromises);
  alert("Data saved successfully!");

  setDataChanged(false);
};

const TableOverlay = ({ imageName, models, onTableEdit }) => {
  const [localModels, setLocalModels] = useState(models);

  const handleValueChange = (rowIndex, key, value) => {
    const updatedModels = [...localModels];
    updatedModels[rowIndex][key] = value;
    setLocalModels(updatedModels);
    onTableEdit(imageName, updatedModels);
  };

  const addRow = () => {
    setLocalModels((prev) => [...prev, { size: "", packing: "", rate: "" }]);
  };

  return (
    <table border="1" style={{ borderCollapse: "collapse", width: "50%", textAlign: "center" }}>
    <thead>
      <tr>
        <th>Size</th>
        <th>Packing</th>
        <th>Rate</th>
      </tr>
    </thead>
    <tbody>
      {models.size.map((_, index) => (
        <tr key={index}>
          <td>{models.size[index]}</td>
          <td>{models.packing[index]}</td>
          <td>{models.rate[index]}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

const Upgrade = ()=>{
  const {upgradeState : {pages}} = useUpgrade();

  return (
<div className="App">
Hello World
{
  pages.map((page, index) => {
    console.log(page);
    return (
    <div >
      <div className="image-container">
        <div  className="image-item">
          <img src={page.pageUrl} />
          <TableOverlay
            imageName={page.imageUrl}
            models={page.models || []}
            onTableEdit={handleTableEdit}
          />
        </div>
      </div>
    </div>    
    )
})
}
</div>
  );
}

export default Upgrade




