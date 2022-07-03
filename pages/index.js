import { useEffect, useState } from "react";
import InputRange from "../components/InputRange";
import { TitleComp } from "../components/TitleComp";
import init, {
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

  const [proses, setProses] = useState(false);

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

    var r = [];
    for (let i = 0; i < kriteria.length + 1; i++) {
      temp1.push(0);
      temp2.push([0]);
    }
    for (let i = 0; i < alternatif.length + 1; i++) {
      temp3.push(temp2);
    }

    for (let i = 0; i < alternatif.length + 1; i++) {
      r.push([]);
      for (let j = 0; j < kriteria.length + 1; j++) {
        r[i].push([]);
        for (let k = 0; k < kriteria.length + 1; k++) {
          r[i][j].push(0);
        }
      }
    }

    for (let i = 0; i < alternatif.length + 1; i++) {
      for (let j = 0; j < kriteria.length + 1; j++) {
        for (let k = 0; k < kriteria.length + 1; k++) {
          r[i][j][k] = 50;
        }
      }
    }

    setRate(r);

    for (let i = 0; i < alternatif.length; i++) {
      temp4.push(0);
    }

    // setRate(temp3);
    setRateResult(r);
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
    setProses(true);
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
          temp[i][j] = convert(rate[0][i][j].toString());
        }
      }
    }

    for (let i = 0; i < kriteria.length; i++) {
      for (let j = 0; j < kriteria.length; j++) {
        if (j < i) {
          temp[i][j] = 1 / convert(rate[0][j][i].toString());
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
            temp[i][j] = convert(rate[x + 1][i][j].toString());
          }
        }
      }

      for (let i = 0; i < alternatif.length; i++) {
        for (let j = 0; j < alternatif.length; j++) {
          if (j < i) {
            temp[i][j] = 1 / convert(rate[x + 1][j][i].toString());
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
    <div className="w-full scrollbar-hide">
      <div className="w-full flex justify-center fixed bg-white z-50 shadow-md shadow-gray-900/5">
        <div className="max-w-7xl w-11/12 lg:w-full">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Homepage</a>
                  </li>
                  <li>
                    <a>Portfolio</a>
                  </li>
                  <li>
                    <a>About</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-center">
              <a className="btn btn-ghost normal-case text-xl">FlaRank</a>
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-20 bg-gray-900 text-white">
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4 mt-20">
          <h1 className="text-4xl font-bold ">Analitical Hierarchy Process</h1>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            tortor pretium viverra suspendisse.{" "}
          </p>
          <button className="btn btn-primary mt-4">Start</button>
        </div>
      </div>
      <div className="w-full flex justify-center py-20 ">
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Kriteria"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse."
          />
          <div className="overflow-x-auto mt-10">
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
                    <tr key={"col-input" + idx}>
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
      </div>
      <div className="w-full flex justify-center py-20 ">
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Alternatif Kriteria"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse."
          />
          {kriteria.map((el, idx) => {
            return (
              <div key={"alternatif" + idx} className="mt-16">
                <h1 className="text-center text-2xl font-medium mb-8">
                  Perbandingan {el}
                </h1>
                <div className="overflow-x-auto scrollbar-hide">
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
      </div>
      <div className={proses ? "w-full flex justify-center py-20" : "hidden"}>
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Hasil Perhitungan"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse."
          />

          <div className="overflow-x-auto mt-16">
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
                        return (
                          <td key={"resultRate" + idx}>
                            {parseFloat(e?.toFixed(3)) ?? "-"}
                          </td>
                        );
                      })}
                      {eigen[0][idx]?.map((e, i) => {
                        return (
                          <td key={"resultEigen" + idx}>
                            {parseFloat(e?.toFixed(3)) ?? "-"}
                          </td>
                        );
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
                    return (
                      <td key={"resultSumRate" + idx}>
                        {parseFloat(e?.toFixed(3)) ?? "-"}
                      </td>
                    );
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

          {kriteria.map((element, index) => {
            return (
              <div
                key={"resultAlternatif" + index}
                className="overflow-x-auto mt-16"
              >
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
                            return (
                              <td key={"resultRateAlternatif" + idx}>
                                {parseFloat(e?.toFixed(3)) ?? "-"}
                              </td>
                            );
                          })}
                          {eigen[index + 1]?.[idx]?.map((e, i) => {
                            return (
                              <td key={"resultEigenAlternatif" + idx}>
                                {parseFloat(e?.toFixed(3)) ?? "-"}
                              </td>
                            );
                          })}
                          <td>
                            {parseFloat(
                              sumEigen[index + 1]?.[idx]?.toFixed(3)
                            ) ?? "-"}
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
                        return (
                          <td key={"resultSumRateAlternatif" + idx}>
                            {parseFloat(e?.toFixed(3)) ?? "-"}
                          </td>
                        );
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
            );
          })}
        </div>
      </div>

      <div className={proses ? "w-full flex justify-center py-20" : "hidden"}>
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Hasil Perangkingan"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse."
          />

          <div className="overflow-x-auto mt-16">
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
                    <tr key={"resultRank" + idx}>
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
    </div>
  );
}
