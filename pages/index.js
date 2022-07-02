import { useEffect, useState } from "react";
import InputRange from "../components/InputRange";
import {
  convert,
  getAverageEigen,
  getCI,
  getCR,
  getEigen,
  getHPP,
  getLamdaMax,
  getSumEigen,
  getSumRate,
} from "./services";

export default function Home() {
  const kriteria = ["Tanggung Jawab", "Jujur", "Disiplin"];
  const alternatif = ["Paiman", "Paijo", "Paino"];

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
    setHPP(getHPP(kriteria));
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

  function handleChange(e, el) {
    setRate({
      ...rate,
      [el[0]]: { ...rate[el[0]], [el[1]]: e.target.value },
    });
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
    tempCI = getCI(kriteria.length, tempLamdaMax);
    tempCR = getCR(kriteria.length, tempCI);

    setRateResult(tempRateResult);
    setSumRate(tempSumRate);
    setEigen(tempEigen);
    setSumEigen(tempSumEigen);
    setAverageEigen(tempAverageEigen);
    setLamdaMax(tempLamdaMax);
    setCI(tempCI);
    setCR(tempCR);
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
