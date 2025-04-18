import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

const storage = getStorage();
const firestore = getFirestore();

// Fetch all image URLs from Firebase Storage
export const fetchAllImagesPoins = async () => {
  const imageRef = ref(storage, "catalogs/poins");
  const imageList = await listAll(imageRef);

  const imageUrls = await Promise.all(
    imageList.items.map(async (item) => ({
      name: item.name,
      url: await getDownloadURL(item),
    }))
  );

  return imageUrls;
};

export const fetchAllImagesUpgrade = async () => {
    const imageRef = ref(storage, "catalogs/upgrade");
    const imageList = await listAll(imageRef);
  
    const imageUrls = await Promise.all(
      imageList.items.map(async (item) => {
        const nameWithoutExtension = item.name.replace(".jpg", ""); // Remove ".jpg"

        // Optional: Ensure the name is stripped to the desired format (e.g., "01" or "001")
        const formattedName = nameWithoutExtension.startsWith("0")
          ? nameWithoutExtension.slice(1) // Remove leading zero if required
          : nameWithoutExtension;
    
        return {
          name: (Number(formattedName)-5).toString(), // 
        url: await getDownloadURL(item),
      }})
    );
  
    return imageUrls;
  };

// Fetch existing data from Firestore
export const fetchFirestoreDataPoins = async () => {
  const collectionRef = collection(firestore, "advikmarketing", "poins", "pages");
  const snapshot = await getDocs(collectionRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const fetchFirestoreDataUpgrade = async () => {
    const collectionRef = collection(firestore, "advikmarketing", "upgrade", "pages");
    const snapshot = await getDocs(collectionRef);
  
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return data;
  };

// Save new data to Firestore
export const saveDataToFirestorePoins = async (pageId, models) => {
  const docRef = doc(firestore, "advikmarketing", "poins", "pages", pageId);
  await setDoc(docRef, { models }, { merge: true });
};

export const saveDataToFirestoreUpgrade = async (pageId, models) => {
    const docRef = doc(firestore, "advikmarketing", "upgrade", "pages", pageId);
    await setDoc(docRef, { models }, { merge: true });
  };
