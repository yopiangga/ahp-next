import { useState } from "react";

export default function Coba() {
  const [data, setData] = useState([
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33],
  ]);

  console.log(data);

  function handleClick1() {
    setData({ ...data, [1]: [41, 42, 43] });
  }

  function handleClick2() {
    setData({ ...data, [1]: { ...data[1] } });
  }

  return (
    <div>
      <button onClick={handleClick1}>Test1</button>
      <button onClick={handleClick2}>Test2</button>
    </div>
  );
}
