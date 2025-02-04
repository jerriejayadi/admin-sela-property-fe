import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import { nanoid } from "nanoid";
import firebase_app from "../config";

export const uploadFile = async (file: any) => {
  const storage = getStorage(
    firebase_app,
    "gs://learn-firebase-b3cf6.appspot.com"
  );
  try {
    const filename = nanoid();
    const storageRef = ref(
      storage,
      `${filename}.${file.name.split(".").pop()}`
    );
    const metadata = {
      cacheControl: "public, max-age=31536000", // 1 year cache
      contentType: file.type, // Keep the correct MIME type
    };
    const res = await uploadBytes(storageRef, file, metadata);

    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (path: string) => {
  const storage = getStorage(
    firebase_app,
    "gs://learn-firebase-b3cf6.appspot.com"
  );
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (path: string) => {
  const storage = getStorage(
    firebase_app,
    "gs://learn-firebase-b3cf6.appspot.com"
  );
  try {
    const fileRef = ref(storage, path);
    return deleteObject(fileRef);
  } catch (error) {
    throw error;
  }
};
