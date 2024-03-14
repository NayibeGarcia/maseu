import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";

export interface ServicesType {
  id?: string;
  title: string;
  description: string;
  image: string;
  top: boolean;
  active: boolean;
}

export const saveServices = async () => {
  try {
    await addDoc(collection(db, "services"), {
      title: "Linea de aguas",
      description:
        "Nuestro serivicio se encuentra direccionado en la extracción, conducción, elevación y tratamiento de aguas:",
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllServices = async (): Promise<ServicesType[]> => {
  try {
    const q = query(collection(db, "services"));

    const querySnapshot = await getDocs(q);

    const quotesData = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ServicesType)
    );

    return quotesData;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

export const getAllServicesTop = async (): Promise<ServicesType[]> => {
  try {
    const q = query(collection(db, "services"), where("top", "==", true));

    const querySnapshot = await getDocs(q);

    const quotesData = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ServicesType)
    );

    return quotesData;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

const UpLoadImage = async (file: File, id: string) => {
  const storageRef = ref(storage, `servicios/${id}`);

  try {
    await uploadBytes(storageRef, file);
  } catch (error) {
    console.error("Error al cargar la imagen", error);
  }
};

export const saveData = async (service: ServicesType, file?: File | null) => {
  try {
    const docRef = await addDoc(collection(db, "services"), {
      ...service,
    });
    await fetch("/api/send/new", {
      method: "POST",
      body: JSON.stringify({
        description: service.description,
        title: service.title,
        top: service.top,
        active: service.active,
      }),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateServices = async (
  documentId: string,
  newData: Partial<ServicesType>,
) => {
  try {
    const docRef = doc(db, "services", documentId); // Replace 'your_collection_name' with your actual collection name

    // Update the document with the new data
    await updateDoc(docRef, newData);

    await fetch("/api/send/update", {
      method: "POST",
      body: JSON.stringify({
        description: newData.description,
        title: newData.title,
        top: newData.top,
        active: newData.active,
      }),
    });

    console.info("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
