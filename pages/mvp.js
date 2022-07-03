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
  getScore,
  getSumEigen,
  getSumRate,
  selectionSort,
} from "./services";

export default function Home() {
  const kriteria = ["Tanggung Jawab", "Jujur", "Disiplin"];
  const alternatif = ["Paiman", "Paijo", "Paino"];

  const [HPKriteria, setHPKriteria] = useState([]);
  const [HPAlternatif, setHPAlternatif] = useState([]);

  const [rate, setRate] = useState([[[]]]);
  const [rateResult, setRateResult] = useState([[[]]]);
  const [sumRate, setSumRate] = useState([[]]);
  const [eigen, setEigen] = useState([[[]]]);
  const [sumEigen, setSumEigen] = useState([[]]);
  const [averageEigen, setAverageEigen] = useState([[]]);
  const [lamdaMax, setLamdaMax] = useState([0]);
  const [CI, setCI] = useState([0]);
  const [CR, setCR] = useState([0]);
  const [rank, setRank] = useState([0]);

  useEffect(() => {
    init();
    setHPKriteria(getHPP(kriteria));
    setHPAlternatif(getHPP(alternatif));
  }, []);

  function init() {
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];
    var temp4 = [];
    for (let i = 0; i < kriteria.length + 1; i++) {
      temp1.push(0);
      temp2.push([0]);
    }
    for (let i = 0; i < kriteria.length + 1; i++) {
      temp3.push(temp2);
    }

    for (let i = 0; i < alternatif.length; i++) {
      temp4.push(0);
    }

    setRate(temp3);
    setRateResult(temp3);
    setSumRate(temp2);
    setEigen(temp3);
    setSumEigen(temp2);
    setAverageEigen(temp2);
    setRank(temp4);
  }

  function handleChange(id, e, el) {
    setRate({
      ...rate,
      [id]: {
        ...rate[id],
        [el[0]]: { ...rate[id][el[0]], [el[1]]: e.target.value },
      },
    });
  }

  function handleProses1() {
    var temp = [];
    var tempRateResult;
    var tempSumRate;
    var tempEigen;
    var tempSumEigen;
    var tempAverageEigen;
    var tempLamdaMax;
    var tempCI;
    var tempCR;

    var arrayRateResult = [];
    var arraySumRate = [];
    var arrayEigen = [];
    var arraySumEigen = [];
    var arrayAverageEigen = [];
    var arrayLamdaMax = [];
    var arrayCI = [];
    var arrayCR = [];

    var skor = [];

    for (let i = 0; i < kriteria.length; i++) {
      temp.push([]);
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        if (j == i) {
          temp[i][j] = 1;
        } else if (j > i) {
          temp[i][j] = convert(rate[0][i][j]);
        }
      }
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        if (j < i) {
          temp[i][j] = 1 / convert(rate[0][j][i]);
        }
      }
    }

    tempRateResult = temp;
    tempSumRate = getSumRate(temp);
    tempEigen = getEigen(temp);
    tempSumEigen = getSumEigen(tempEigen);
    tempAverageEigen = getAverageEigen(tempSumEigen);
    tempLamdaMax = getLamdaMax(tempSumRate, tempAverageEigen);
    tempCI = getCI(kriteria.length, tempLamdaMax);
    tempCR = getCR(kriteria.length, tempCI);

    arrayRateResult.push(temp);
    arraySumRate.push(tempSumRate);
    arrayEigen.push(tempEigen);
    arraySumEigen.push(tempSumEigen);
    arrayAverageEigen.push(tempAverageEigen);
    arrayLamdaMax.push(tempLamdaMax);
    arrayCI.push(tempCI);
    arrayCR.push(tempCR);

    for (let x = 0; x < alternatif.length; x++) {
      temp = [];
      for (let i = 0; i < alternatif.length; i++) {
        temp.push([]);
      }

      for (let i = 0; i < alternatif.length; i++) {
        for (let j = 0; j < alternatif.length; j++) {
          if (j == i) {
            temp[i][j] = 1;
          } else if (j > i) {
            temp[i][j] = convert(rate[x + 1][i][j]);
          }
        }
      }

      for (let i = 0; i < alternatif.length; i++) {
        for (let j = 0; j < alternatif.length; j++) {
          if (j < i) {
            temp[i][j] = 1 / convert(rate[x + 1][j][i]);
          }
        }
      }

      tempRateResult = temp;
      tempSumRate = getSumRate(temp);
      tempEigen = getEigen(temp);
      tempSumEigen = getSumEigen(tempEigen);
      tempAverageEigen = getAverageEigen(tempSumEigen);
      tempLamdaMax = getLamdaMax(tempSumRate, tempAverageEigen);
      tempCI = getCI(kriteria.length, tempLamdaMax);
      tempCR = getCR(kriteria.length, tempCI);

      arrayRateResult.push(temp);
      arraySumRate.push(tempSumRate);
      arrayEigen.push(tempEigen);
      arraySumEigen.push(tempSumEigen);
      arrayAverageEigen.push(tempAverageEigen);
      arrayLamdaMax.push(tempLamdaMax);
      arrayCI.push(tempCI);
      arrayCR.push(tempCR);
    }

    skor = getScore(kriteria.length, alternatif.length, arrayAverageEigen);

    setRateResult(arrayRateResult);
    setSumRate(arraySumRate);
    setEigen(arrayEigen);
    setSumEigen(arraySumEigen);
    setAverageEigen(arrayAverageEigen);
    setLamdaMax(arrayLamdaMax);
    setCI(arrayCI);
    setCR(arrayCR);
    setRank(selectionSort(skor, alternatif));
  }

  return (
    <div className="w-full flex flex-col items-center py-20">
      <div className="step-1 max-w-7xl w-full">
        <div className="">
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
                {HPKriteria.map((el, idx) => {
                  return (
                    <tr key={idx}>
                      <th>{idx + 1}</th>
                      <td>{kriteria[el[0]]}</td>
                      <td>
                        <InputRange
                          value={rate[0][el[0]][el[1]] ?? 50}
                          onChange={(e) => handleChange(0, e, el)}
                        />
                      </td>
                      <td>{kriteria[el[1]]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {kriteria.map((el, idx) => {
          return (
            <div className="mt-8">
              <h1 className="text-center text-3xl font-semibold mb-10">
                Perbandingan {el}
              </h1>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Alternatif Kriteria</th>
                      <th>Rate Nilai</th>
                      <th>Alternatif Kriteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HPAlternatif.map((el, id) => {
                      return (
                        <tr key={id}>
                          <th>{id + 1}</th>
                          <td>{alternatif[el[0]]}</td>
                          <td>
                            <InputRange
                              value={rate[idx + 1][el[0]][el[1]] ?? 50}
                              onChange={(e) => handleChange(idx + 1, e, el)}
                            />
                          </td>
                          <td>{alternatif[el[1]]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        <div className="flex justify-center mt-8">
          <button className="btn btn-primary" onClick={handleProses1}>
            Proses
          </button>
        </div>
      </div>
      <div className="step-1 max-w-7xl w-full mt-16 ">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr>
                <th>Kriteria</th>
                {kriteria.map((el, idx) => {
                  return <th key={idx}>{el}</th>;
                })}
                <th colSpan={kriteria.length}>Nilai Eigen</th>
                <th>Jumlah Eigen</th>
                <th>Rata rata</th>
              </tr>
            </thead>
            <tbody>
              {kriteria.map((el, idx) => {
                return (
                  <tr key={idx}>
                    <th>{el}</th>
                    {rateResult[0][idx]?.map((e, i) => {
                      return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                    })}
                    {eigen[0][idx]?.map((e, i) => {
                      return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                    })}
                    <td>{parseFloat(sumEigen[0][idx]?.toFixed(3)) ?? "-"}</td>
                    <td>
                      {parseFloat(averageEigen[0][idx]?.toFixed(3)) ?? "-"}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th>Jumlah</th>
                {sumRate[0].map((e, idx) => {
                  return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                })}
              </tr>
              <tr>
                <th>Lamda Max</th>
                <td>{parseFloat(lamdaMax[0]?.toFixed(3)) ?? "-"}</td>
              </tr>
              <tr>
                <th>CI</th>
                <td>{parseFloat(CI[0]?.toFixed(3)) ?? "-"}</td>
              </tr>
              <tr>
                <th>CR</th>
                <td>{parseFloat(CR[0]?.toFixed(3)) ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {kriteria.map((element, index) => {
        return (
          <div className="step-1 max-w-7xl w-full mt-16 ">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-center">
                <thead>
                  <tr>
                    <th>{element}</th>
                    {alternatif.map((el, idx) => {
                      return <th key={idx}>{el}</th>;
                    })}
                    <th colSpan={alternatif.length}>Nilai Eigen</th>
                    <th>Jumlah Eigen</th>
                    <th>Rata rata</th>
                  </tr>
                </thead>
                <tbody>
                  {alternatif.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <th>{el}</th>
                        {rateResult[index + 1]?.[idx]?.map((e, i) => {
                          return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                        })}
                        {eigen[index + 1]?.[idx]?.map((e, i) => {
                          return (
                            <td key={"eigen-kriteria" + idx}>
                              {parseFloat(e?.toFixed(3)) ?? "-"}
                            </td>
                          );
                        })}
                        <td>
                          {parseFloat(sumEigen[index + 1]?.[idx]?.toFixed(3)) ??
                            "-"}
                        </td>
                        <td>
                          {parseFloat(
                            averageEigen[index + 1]?.[idx]?.toFixed(3)
                          ) ?? "-"}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th>Jumlah</th>
                    {sumRate[index + 1]?.map((e, idx) => {
                      return <td>{parseFloat(e?.toFixed(3)) ?? "-"}</td>;
                    })}
                  </tr>
                  <tr>
                    <th>Lamda Max</th>
                    <td>
                      {parseFloat(lamdaMax[index + 1]?.toFixed(3)) ?? "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>CI</th>
                    <td>{parseFloat(CI[index + 1]?.toFixed(3)) ?? "-"}</td>
                  </tr>
                  <tr>
                    <th>CR</th>
                    <td>{parseFloat(CR[index + 1]?.toFixed(3)) ?? "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <div className="step-1 max-w-7xl w-full mt-16">
        <h1 className="text-center text-3xl font-semibold my-10">
          Result Rank
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Alternatif Kriteria</th>
                <th>Skor</th>
              </tr>
            </thead>
            <tbody>
              {rank.map((el, idx) => {
                return (
                  <tr key={"rank" + idx}>
                    <th>{idx + 1}</th>
                    <td>{el?.title}</td>
                    <td>{parseFloat(el?.skor?.toFixed(3)) ?? "-"}</td>
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
