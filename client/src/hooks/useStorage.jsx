import { useState, useEffect } from "react";
import { storage, database, timestamp } from "../config";

const useStorage = (files) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storeFile = async () => {
      const storeImagesArray = [];
      if (files) {
        files.map((file) => {
          const storageRef = storage.ref("images-" + file.name);
          storeImagesArray.push(storageRef);
          storageRef.put(file).on(
            "state_changed",
            (snap) => {
              let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
              setProgress(percentage);
            },
            (error) => {
              setError(error);
            },
            async () => {
              await storageRef.getDownloadURL().then((urls) => {
                setUrls((prevState) => [...prevState, urls]);
              });
            }
          );
        });

        await Promise.all(storeImagesArray)
          .then(() => setSuccess("All images have been uploaded successfully"))
          .catch((error) => setError(error));
      }
    };
    storeFile();
  }, [files]);

  return { progress, urls, error, success, setSuccess };
};

export default useStorage;
