import { useEffect, useState } from "react";
import { database } from "../config";

const useFirestore = (collection) => {
  const [setDocs] = useState([]);

  useEffect(() => {
    const unsub = database.ref(collection).on("value", (snapshot) => {
      const data = snapshot.val();
      setDocs(data);

      return () => unsub();
    });
  }, [collection, setDocs]);
};

export default useFirestore;
