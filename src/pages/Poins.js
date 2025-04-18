import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase-config"; // Adjust the path as needed
import { db } from "../firebase-config"; // Adjust the path as needed
import { doc, setDoc } from "firebase/firestore";

const fetchImagesDirectly = async () => {
  const images = [];
  // Loop through the known image filenames
  for (let i = 6; i <= 100; i++) {
    const fileName = i.toString().padStart(3, "0") + ".jpg"; // 006.jpg, 007.jpg, ...
    const fileRef = ref(storage, `catalogs/poins/${fileName}`); // Construct the file path
    try {
      const url = await getDownloadURL(fileRef);
      images.push({ name: fileName, url });
    } catch (error) {
      console.error(`Failed to fetch URL for ${fileName}:`, error);
      // Optional: Handle missing files or log errors if needed
    }
  }
  return images;
};

const ImageCatalogue = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState("");

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImagesDirectly(); // Use the direct fetching function
      setImages(fetchedImages);
    };
    loadImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "imageDetails", selectedImage.name), { 
        name: selectedImage.name, 
        url: selectedImage.url, 
        details 
      });
      console.log("Details saved successfully.");
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by page number"
        onChange={(e) => {
          const pageNumber = parseInt(e.target.value);
          const imageElement = document.getElementById(`image-${pageNumber}`);
          if (imageElement) {
            imageElement.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      {images.map((image, index) => (
        <div
          key={index}
          id={`image-${index + 1}`}
          style={{ marginBottom: "20px", cursor: "pointer" }}
          onClick={() => handleImageClick(image)}
        >
          <img
            src={image.url}
            alt={image.name}
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
          <p>Page {index + 1}</p>
        </div>
      ))}
      {modalVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.name}
            style={{ width: "100%", maxHeight: "300px" }}
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter details here..."
            style={{ width: "100%", marginTop: "10px" }}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setModalVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

import { usePoins } from "../contexts/PoinsContext";

const Poins = () => {
  const { poinsState: { models } } = usePoins();

  const [position, setPosition] = useState({ top: 100, left: 0 });
  const [tableData, setTableData] = useState([['Data 1', 'Data 2', 'Data 3']]);
  const [isPositionLocked, setIsPositionLocked] = useState(false); 
  const [isSubmitted, setIsSubmiited] = useState(false);
  const [canMove, setCanMove] = useState(false);
  const { upgrade, setUpgrade } = useUpgrade();

  const handleClick = (event) => {
    if(isPositionLocked || !canMove) return;

    const rect = event.target.getBoundingClientRect();
    const top = event.clientY - rect.top;
    const left = event.clientX - rect.left;

    setPosition({ top, left });
  };

  const addRow = () => {
    const newRow = [`Data ${tableData.length * 3 + 1}`, `Data ${tableData.length * 3 + 2}`, `Data ${tableData.length * 3 + 3}`];
    setTableData([...tableData, newRow]);
  };

  const lockPosition = () => {
    setIsPositionLocked(true); // Lock the position when the button is clicked
  };

  const handleSubmit = () =>{
    setIsSubmiited(true);
  }

  const handleCellEdit = (rowIndex, cellIndex, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][cellIndex] = value; // Update the specific cell
    setTableData(updatedData);
  };

  const toggleMovement = (event) => {
    event.stopPropagation();
    setCanMove(!canMove); // Toggle the canMove state
  };

  return (
    <main>
          <div
      onClick={handleClick}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        border: '1px solid black',
      }}
    >
      <p>Click anywhere to set the starting point!</p>
      <button
            onClick={toggleMovement}
            style={{
              marginTop: '10px',
              marginLeft: '10px',
              backgroundColor: canMove ? 'red' : 'blue',
              color: 'white',
            }}
          >
            {canMove ? 'Disable Movement' : 'Enable Movement'}
          </button>

      
        <div
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          border: '1px solid blue',
          padding: '10px',
          backgroundColor: 'lightgray',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the table from propagating
      >
          <table>
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
              </tr>
            </thead>
            <tbody>
            {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellEdit(rowIndex, cellIndex, e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
            {!isSubmitted && (
                <button onClick={addRow} style={{ marginTop: '10px' }}>
                + Add Row
                </button>)
            }
          {!isPositionLocked && (
            <button
              onClick={lockPosition}
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Lock Position
            </button>
          )}
          {!isSubmitted &&(<button
            onClick={handleSubmit}
            style={{
              marginTop: '10px',
              marginLeft: isSubmitted ? '0px' : '10px',
              backgroundColor: 'green',
              color: 'white',
            }}
          >
            Submit
          </button>)}
        </div>
      
    </div>
    </main>
  );
};

export default Poins;
