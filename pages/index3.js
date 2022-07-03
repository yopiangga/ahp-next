import { useEffect, useState } from "react";
import InputRange from "../components/InputRange";

export default function Home() {
  const kriteria = ["Tanggung Jawab", "Jujur", "Disiplin"];
  const alternatif = ["Paiman", "Paijo", "Paino"];
  const RI = [
    0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51, 1.48, 1.56, 1.57,
    1.39,
  ];
  const [HPP, setHPP] = useState([]);

  const [rate, setRate] = useState([[]]);
  const [rateResult, setRateResult] = useState([[]]);
  const [sumRate, setSumRate] = useState([]);
  const [eigen, setEigen] = useState([[]]);
  const [sumEigen, setSumEigen] = useState([]);
  const [averageEigen, setAverageEigen] = useState([]);
  const [lamdaMax, setLamdaMax] = useState(0);
  const [CI, setCI] = useState(0);
  const [CR, setCR] = useState(0);

  useEffect(() => {
    init();
    getHPP();
  }, []);

  function init() {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < kriteria.length; i++) {
      temp1.push(0);
      temp2.push([0]);
    }

    setRate(temp2);
    setRateResult(temp2);
    setSumRate(temp1);
    setEigen(temp2);
    setSumEigen(temp1);
    setAverageEigen(temp1);
  }

  function getPermutasi(n, r) {
    var nFak = 1;
    var nrFak = 1;

    for (let i = 1; i <= n; i++) {
      nFak = nFak * i;
    }

    for (let i = 1; i <= n - r; i++) {
      nrFak = nrFak * i;
    }

    return nFak / nrFak;
  }

  function getHPP() {
    const p = getPermutasi(kriteria.length, 2);
    var hp = [];
    var hpI = [];

    for (let i = 0; i < p / 2; i++) {
      for (let j = i; j < p / 2; j++) {
        if (j > i && kriteria[j] != null) {
          hp.push([kriteria[i], kriteria[j]]);
          hpI.push([i, j]);
        }
      }
    }
    setHPP(hpI);
  }

  function handleChange(e, el) {
    setRate({
      ...rate,
      [el[0]]: { ...rate[el[0]], [el[1]]: e.target.value },
    });

    console.log(HPP);
    console.log(rate);
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
    var temp = [];
    var tempRate;
    var tempRateResult;
    var tempSumRate;
    var tempEigen;
    var tempSumEigen;
    var tempAverageEigen;
    var tempLamdaMax;
    var tempCI;
    var tempCR;

    for (let i = 0; i < kriteria.length; i++) {
      temp.push([]);
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        if (j == i) {
          temp[i][j] = 1;
        } else if (j > i) {
          temp[i][j] = convert(rate[i][j]);
        }
      }
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        if (j < i) {
          temp[i][j] = 1 / convert(rate[j][i]);
        }
      }
    }

    // tempRate = temp;
    tempRateResult = temp;
    tempSumRate = getSumRate(temp);
    tempEigen = getEigen(temp);
    tempSumEigen = getSumEigen(tempEigen);
    tempAverageEigen = getAverageEigen(tempSumEigen);
    tempLamdaMax = getLamdaMax(tempSumRate, tempAverageEigen);
    tempCI = getCI(tempLamdaMax);
    tempCR = getCR(tempCI);

    setRateResult(tempRateResult);
    setSumRate(tempSumRate);
    setEigen(tempEigen);
    setSumEigen(tempSumEigen);
    setAverageEigen(tempAverageEigen);
    setLamdaMax(tempLamdaMax);
    setCI(tempCI);
    setCR(tempCR);
  }

  function getSumRate(data) {
    var sum = [];

    for (let i = 0; i < kriteria.length; i++) {
      sum.push(0);
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        sum[j] = sum[j] + data[i][j];
      }
    }

    return sum;
  }

  function getEigen(data) {
    var temp = [];
    var sum = [];

    for (let i = 0; i < kriteria.length; i++) {
      sum.push(0);
      temp.push([]);
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        sum[j] = sum[j] + data[i][j];
      }
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        temp[i][j] = data[i][j] / sum[j];
      }
    }

    return temp;
  }

  function getSumEigen(data) {
    var sum = [];

    for (let i = 0; i < kriteria.length; i++) {
      sum.push(0);
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        sum[i] = sum[i] + data[i][j];
      }
    }
    return sum;
  }

  function getAverageEigen(data) {
    var average = [];

    for (let i = 0; i < kriteria.length; i++) {
      average.push(0);
    }

    for (let i = 0; i < kriteria.length; i++) {
      average[i] = data[i] / kriteria.length;
    }

    return average;
  }

  function getLamdaMax(sumRate, averageEigen) {
    var lamda = 0;
    for (let i = 0; i < kriteria.length; i++) {
      lamda = lamda + sumRate[i] * averageEigen[i];
    }

    return lamda;
  }

  function getCI(lamda) {
    var temp;

    temp = (lamda - kriteria.length) / (kriteria.length - 1);

    return temp;
  }

  function getCR(ci) {
    var temp;

    temp = ci / RI[kriteria.length - 1];
    return temp;
  }

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
                <th>Kriteria</th>
                <th>Rate Nilai</th>
                <th>Kriteria</th>
              </tr>
            </thead>
            <tbody>
              {HPP.map((el, idx) => {
                return (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{kriteria[el[0]]}</td>
                    <td>
                      <InputRange
                        value={rate[el[0]][el[1]] ?? 50}
                        onChange={(e) => handleChange(e, el)}
                      />
                    </td>
                    <td>{kriteria[el[1]]}</td>
                  </tr>
                );
              })}
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
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr>
                <th>Kriteria</th>
                {kriteria.map((el, idx) => {
                  return <th key={idx}>{el}</th>;
                })}
                <th colspan={kriteria.length}>Nilai Eigen</th>
                <th>Jumlah Eigen</th>
                <th>Rata rata</th>
              </tr>
            </thead>
            <tbody>
              {kriteria.map((el, idx) => {
                return (
                  <tr key={idx}>
                    <th>{el}</th>
                    {rateResult[idx]?.map((e, i) => {
                      return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                    })}
                    {eigen[idx]?.map((e, i) => {
                      return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                    })}
                    <td>{parseFloat(sumEigen[idx]?.toFixed(3)) ?? "-"}</td>
                    <td>{parseFloat(averageEigen[idx]?.toFixed(3)) ?? "-"}</td>
                  </tr>
                );
              })}
              <tr>
                <th>Jumlah</th>
                {sumRate.map((el, idx) => {
                  return <td>{parseFloat(sumRate[idx]?.toFixed(3)) ?? "-"}</td>;
                })}
              </tr>
              <tr>
                <th>Lamda Max</th>
                <td>{parseFloat(lamdaMax?.toFixed(3)) ?? "-"}</td>
              </tr>
              <tr>
                <th>CI</th>
                <td>{parseFloat(CI?.toFixed(3)) ?? "-"}</td>
              </tr>
              <tr>
                <th>CR</th>
                <td>{parseFloat(CR?.toFixed(3)) ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
