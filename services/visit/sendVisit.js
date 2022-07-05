import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export default async function sendVisit(ip) {
  const result = await addDoc(collection(db, "visits"), {
    time: Date.now().toString(),
    ip: ip,
  });

  return result;
}
