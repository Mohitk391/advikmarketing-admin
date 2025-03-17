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

  return (
    <main>
      <header>
        <span>Poins</span>
        <Link to="/">Go to Homepage</Link>
      </header>

      <ImageCatalogue />
    </main>
  );
};

export default Poins;
