import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export default async function getVisitCount() {
  const result = await getDocs(collection(db, "visits"));
  const now = Date.now();
  var allCount = 0;
  var daily = 0;
  result.forEach((doc) => {
    if (parseFloat(doc.data().time) >= now - parseFloat(60 * 60 * 24 * 1000))
      daily = daily + 1;

    allCount = allCount + 1;
  });
  return { all: allCount, daily: daily };
}
