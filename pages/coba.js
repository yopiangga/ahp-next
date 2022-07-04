import { useState } from "react";

export default function Coba() {
  const [a, setA] = useState(["A", "B", "C"]);

  console.log(a);

  function handleChange(e) {
    var temp = [...a];
    temp[0] = "F";
    setA(temp);
  }

  return (
    <div>
      <input value={a} onChange={handleChange} />
      {/* <button >Change</button> */}
    </div>
  );
}
