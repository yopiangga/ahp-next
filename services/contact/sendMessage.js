import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export default async function sendMessage(fullname, email, textMessage) {
  const result = await addDoc(collection(db, "messages"), {
    time: Date.now().toString(),
    fullname: fullname,
    email: email,
    textMessage: textMessage,
  });

  return result;
}

// export sendMessage;
