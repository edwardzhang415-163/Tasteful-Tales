import { doc, addDoc, collection, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseSetup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseSetup";

export async function uploadImageData(uri) {
  try {
    // fetch local image from the uri
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Error Happened with Status: " + response.status);
    }
    const blob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = ref(storage, `images/${imageName}`)
    const uploadResult = await uploadBytesResumable(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL
  } catch (error) {
    console.log("Error in fetching the image: ", error);
  }
}

export async function writePostToDB(data, image, collectionName) {
  try {
    const imageUri = await uploadImageData(image);
    const docRef = await addDoc(collection(db, collectionName), { ...data, image: imageUri, createdDate: new Date() });
    return docRef
  } catch (err) {
    console.error("Write post to database: ", err);
  }
}

export async function writeEventToDB(data) {
  try {
    const docRef = await addDoc(collection(db, "events"), data);
    return docRef
  } catch (err) {
    console.error("Write event to database: ", err);
  }
}

export async function updateEventToDB(eventId, data) {
  try {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, data);
    console.log('Event updated successfully');
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }
}


export async function deleteEventFromDB(eventId) {
  try {
    const eventDoc = doc(db, 'events', eventId);
    await deleteDoc(eventDoc);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
}



