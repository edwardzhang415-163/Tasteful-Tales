import { doc, addDoc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseSetup";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseSetup";

async function uploadImageData(uri) {
  try {
    // fetch the image from the uri
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Error Happened with Status: " + response.status);
    }
    const blob = await response.blob();
    // upload the image to the storage
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = ref(storage, `images/${imageName}`)
    const uploadResult = await uploadBytesResumable(imageRef, blob);
    console.log("Image uploaded successfully: ", uploadResult);
  } catch (error) { 
    console.log("Error in fetching the image: ", error);
  }
}

export async function writePostToDB(data, imageUri, collectionName) {
  try {
    console.log(process.env.EXPO_PUBLIC_API_apiKey);
    const docRef = await addDoc(collection(db, collectionName), {text: 'test'});
    await uploadImageData(imageUri);
    return docRef
  } catch (err) {
    console.error("Write post to database: ", err);
  }
}


