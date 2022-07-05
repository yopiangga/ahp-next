import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export default async function sendSubscribe(email) {
  const result = await addDoc(collection(db, "subscribe"), {
    time: Date.now().toString(),
    email: email,
  });

  return result;
}
