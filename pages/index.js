import { useState } from "react";

export default function Home() {
  const index = 3;
  const [rate, setRate] = useState({ c1c2: 50, c1c3: 50, c2c3: 50 });
  const [r1, setR1] = useState({ v1: 1, v2: 1 });
  const [r2, setR2] = useState({ v1: 1, v2: 1 });
  const [r3, setR3] = useState({ v1: 1, v2: 1 });
  const [tableS1, setTableS1] = useState([[]]);

  function handleChange(e) {
    setRate({
      ...rate,
      [e.target.name]: e.target.value,
    });
  }

  function hc1(e) {
    setR1({
      v1: convert(e.target.value),
      v2: 1 / convert(e.target.value),
    });
    handleChange(e);
  }

  function hc2(e) {
    setR2({
      v1: convert(e.target.value),
      v2: 1 / convert(e.target.value),
    });
    handleChange(e);
  }

  function hc3(e) {
    setR3({
      v1: convert(e.target.value),
      v2: 1 / convert(e.target.value),
    });
    handleChange(e);
  }

  function convert(value) {
    switch (value) {
      case "0":
        return 9;
        break;
      case "6.25":
        return 8;
        break;
      case "12.5":
        return 7;
        break;
      case "18.75":
        return 6;
        break;
      case "25":
        return 5;
        break;
      case "31.25":
        return 4;
        break;
      case "37.5":
        return 3;
        break;
      case "43.75":
        return 2;
        break;
      case "50":
        return 1;
        break;
      case "56.25":
        return 1 / 2;
        break;
      case "62.5":
        return 1 / 3;
        break;
      case "68.75":
        return 1 / 4;
        break;
      case "75":
        return 1 / 5;
        break;
      case "81.25":
        return 1 / 6;
        break;
      case "87.5":
        return 1 / 7;
        break;
      case "93.75":
        return 1 / 8;
        break;
      case "100":
        return 1 / 9;
        break;
    }
  }

  function handleProses1() {
    var temp = [[], [], []];
    for (var i = 0; i < index; i++) {
      for (var j = 0; j < index; j++) {
        if (i == j) {
          temp[i][j] = 1;
        } else if (j > i) {
          if (j == 1 && i == 0) {
            temp[i][j] = r1.v1;
          } else if (j == 2 && i == 0) {
            temp[i][j] = r2.v1;
          } else if (j == 2 && i == 1) {
            temp[i][j] = r3.v1;
          }
        } else if (j < i) {
          if (i == 1 && j == 0) {
            temp[i][j] = r1.v2;
          } else if (i == 2 && j == 0) {
            temp[i][j] = r2.v2;
          } else if (i == 2 && j == 1) {
            temp[i][j] = r3.v2;
          }
        }
      }
    }
    setTableS1(temp);
  }

  console.log(tableS1);

  return (
    <div className="w-full flex flex-col items-center py-20">
      <div className="step-1 max-w-7xl w-full">
        <h1 className="text-center text-3xl font-semibold mb-10">
          Perbandingan Kriteria
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Criteria</th>
                <th>Rate</th>
                <th>Criteria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>C1</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="c1c2"
                    value={rate.c1c2}
                    onChange={hc1}
                    step="6.25"
                    className="cursor-pointer form-range appearance-none w-full rounded-md h-3 p-0 bg-gray-300 focus:outline-none focus:ring-0 focus:shadow-none"
                  />
                  <div className="w-full flex justify-between text-xs px-2">
                    <span>9</span>
                    <span>7</span>
                    <span>5</span>
                    <span>3</span>
                    <span>1</span>
                    <span>3</span>
                    <span>5</span>
                    <span>7</span>
                    <span>9</span>
                  </div>
                </td>
                <td>C2</td>
              </tr>
              <tr>
                <th>2</th>
                <td>C1</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="c1c3"
                    value={rate.c1c3}
                    onChange={hc2}
                    step="6.25"
                    className="cursor-pointer form-range appearance-none w-full rounded-md h-3 p-0 bg-gray-300 focus:outline-none focus:ring-0 focus:shadow-none"
                  />
                  <div className="w-full flex justify-between text-xs px-2">
                    <span>9</span>
                    <span>7</span>
                    <span>5</span>
                    <span>3</span>
                    <span>1</span>
                    <span>3</span>
                    <span>5</span>
                    <span>7</span>
                    <span>9</span>
                  </div>
                </td>
                <td>C3</td>
              </tr>
              <tr>
                <th>3</th>
                <td>C2</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="c2c3"
                    value={rate.c2c3}
                    onChange={hc3}
                    step="6.25"
                    className="cursor-pointer form-range appearance-none w-full rounded-md h-3 p-0 bg-gray-300 focus:outline-none focus:ring-0 focus:shadow-none"
                  />
                  <div className="w-full flex justify-between text-xs px-2">
                    <span>9</span>
                    <span>7</span>
                    <span>5</span>
                    <span>3</span>
                    <span>1</span>
                    <span>3</span>
                    <span>5</span>
                    <span>7</span>
                    <span>9</span>
                  </div>
                </td>
                <td>C3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          <button className="btn btn-primary" onClick={handleProses1}>
            Proses
          </button>
        </div>
      </div>
      <div className="step-1 max-w-7xl w-full mt-16">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Criteria</th>
                <th>C1</th>
                <th>C2</th>
                <th>C3</th>
              </tr>
            </thead>
            <tbody>
              {tableS1.map((el, idx) => {
                return (
                  <tr key={idx}>
                    <th>C {idx + 1}</th>
                    {el.map((e, i) => {
                      return <td key={idx}>{e}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
