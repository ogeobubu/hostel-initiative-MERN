import { useEffect, useState } from "react";
import { database } from "../config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = database.ref(collection).on("value", (snapshot) => {
      let documents = [];
      const data = snapshot.val();
      setDocs(data);

      return () => unsub();
    });
  }, [collection]);
};

export default useFirestore;
