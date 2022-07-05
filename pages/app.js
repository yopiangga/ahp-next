import { useEffect, useState } from "react";
import InputRange from "../components/InputRange";
import { TitleComp } from "../components/TitleComp";
import Head from "next/head";

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
} from "../services/servicesApp";
import { Navbar } from "../components/Navbar";

export default function Application() {
  const [countKriteria, setCountKriteria] = useState(1);
  const [countAlternatifKriteria, setCountAlternatifKriteria] = useState(1);

  const [kriteria, setKriteria] = useState([]);
  const [alternatif, setAlternatif] = useState([]);

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

  const [proses, setProses] = useState(0);

  useEffect(() => {
    init();
  }, []);

  function handleMulai(e) {
    setProses(1);
    e.preventDefault();
    var tempKriteria = [];
    var tempAlternatifKriteria = [];

    for (let i = 0; i < countKriteria; i++) {
      tempKriteria.push("");
    }

    for (let i = 0; i < countAlternatifKriteria; i++) {
      tempAlternatifKriteria.push("");
    }

    setKriteria(tempKriteria);
    setAlternatif(tempAlternatifKriteria);
  }

  function handlePelabelan(e) {
    e.preventDefault();
    setProses(2);
    init();
  }

  function init() {
    setHPKriteria(getHPP(kriteria));
    setHPAlternatif(getHPP(alternatif));

    var temp1 = [];
    var temp2 = [];
    var temp3 = [];
    var temp4 = [];

    var r = [];
    for (let i = 0; i < kriteria?.length + 1; i++) {
      temp1.push(0);
      temp2.push([0]);
    }
    for (let i = 0; i < alternatif?.length + 1; i++) {
      temp3.push(temp2);
    }

    for (let i = 0; i < alternatif?.length + 1; i++) {
      r.push([]);
      for (let j = 0; j < kriteria?.length + 1; j++) {
        r[i].push([]);
        for (let k = 0; k < kriteria?.length + 1; k++) {
          r[i][j].push(0);
        }
      }
    }

    for (let i = 0; i < alternatif?.length + 1; i++) {
      for (let j = 0; j < kriteria?.length + 1; j++) {
        for (let k = 0; k < kriteria?.length + 1; k++) {
          r[i][j][k] = 50;
        }
      }
    }

    setRate(r);

    for (let i = 0; i < alternatif?.length; i++) {
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

  function handleChangeLabellingKriteria(index, e) {
    var temp = [...kriteria];
    temp[index] = e.target.value;
    setKriteria(temp);
  }

  function handleChangeLabellingAlternatif(index, e) {
    var temp = [...alternatif];
    temp[index] = e.target.value;
    setAlternatif(temp);
  }

  function handleProses1() {
    setProses(3);
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

    for (let i = 0; i < kriteria?.length; i++) {
      temp.push([]);
    }

    for (let i = 0; i < kriteria?.length; i++) {
      for (let j = 0; j < kriteria?.length; j++) {
        if (j == i) {
          temp[i][j] = 1;
        } else if (j > i) {
          temp[i][j] = convert(rate[0][i][j].toString());
        }
      }
    }

    for (let i = 0; i < kriteria?.length; i++) {
      for (let j = 0; j < kriteria?.length; j++) {
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
      <Head>
        <title>FlaRank | Pendukung Keputusan</title>
      </Head>
      <Navbar />
      <div className="w-full flex justify-center items-center py-20 bg-gray-900 text-white min-h-screen">
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4 mt-20">
          <h1 className="text-4xl font-bold ">Analytical Hierarchy Process</h1>
          <p className="mt-6">
            Hitung rangking dari alternatif kriteria yang anda miliki dengan
            berbagai pertimbangan kriteria yang ada. Tentukan terlebih dahulu
            jumlah kriteria dan alternatif-nya sebelum memulai perhitungan{" "}
          </p>
          <form className="mt-6" onSubmit={handleMulai}>
            <div className="flex flex-wrap gap-2 justify-center">
              <input
                type="number"
                min={1}
                placeholder="Jumlah Kriteria"
                value={countKriteria}
                onChange={(e) => {
                  setCountKriteria(e.target.value);
                }}
                className="input input-bordered input-primary w-full max-w-xs bg-white text-gray-900"
              />
              <input
                type="number"
                min={1}
                placeholder="Jumlah Alternatif"
                value={countAlternatifKriteria}
                onChange={(e) => {
                  setCountAlternatifKriteria(e.target.value);
                }}
                className="input input-bordered input-primary w-full max-w-xs bg-white text-gray-900"
              />
            </div>

            <button className="btn btn-primary mt-4" type="submit">
              Mulai
            </button>
          </form>
        </div>
      </div>
      <div
        className={proses < 1 ? "hidden" : "w-full flex justify-center py-20 "}
      >
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Pelabelan"
            desc="Lakukan penamaan atau pelabelan pada kriteria dan alternatif yang akan anda gunakan untuk perhitungan."
          />
          <form className="mt-4" onSubmit={handlePelabelan}>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex flex-col gap-2 items-center">
                <h3>Kriteria</h3>
                {kriteria.map((el, idx) => {
                  return (
                    <input
                      key={"labelKriteria" + idx}
                      type="text"
                      placeholder="Nama kriteria"
                      value={el}
                      onChange={(e) => {
                        handleChangeLabellingKriteria(idx, e);
                      }}
                      className="input input-bordered input-primary w-full max-w-xs"
                    />
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h3>Alternatif</h3>
                {alternatif.map((el, idx) => {
                  return (
                    <input
                      key={"labelALternatif" + idx}
                      type="text"
                      placeholder="Nama Alternatif"
                      value={el}
                      onChange={(e) => {
                        handleChangeLabellingAlternatif(idx, e);
                      }}
                      className="input input-bordered input-primary w-full max-w-xs"
                    />
                  );
                })}
              </div>
            </div>

            <button className="btn btn-primary mt-4" type="submit">
              Simpan
            </button>
          </form>
        </div>
      </div>

      <div
        className={proses < 2 ? "hidden" : "w-full flex justify-center py-20 "}
      >
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Kriteria"
            desc="Tentukan nilai perbandingan masing-masing kriteria berdasarkan data yang telah anda miliki."
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
                {HPKriteria?.map((el, idx) => {
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
      <div
        className={proses < 2 ? "hidden" : "w-full flex justify-center py-20 "}
      >
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Alternatif"
            desc="Tentukan nilai perbandingan masing-masing alternatif berdasarkan data yang telah anda miliki."
          />
          {kriteria?.map((el, idx) => {
            return (
              <div key={"alternatif" + idx} className="mt-16">
                <h1 className="text-center text-2xl font-medium mb-8">
                  Perbandingan <span className="text-primary">{el}</span>
                </h1>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Alternatif</th>
                        <th>Rate Nilai</th>
                        <th>Alternatif</th>
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
      <div
        className={proses < 3 ? "hidden" : "w-full flex justify-center py-20"}
      >
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Hasil Perhitungan"
            desc="Tabel berisikan nilai-nilai perhitungan sesuai dengan data nilai yang anda masukkan pada form perbandingan kriteria dan alternatif."
          />

          <div className="overflow-x-auto mt-16">
            <table className="table table-zebra w-full text-center">
              <thead>
                <tr>
                  <th className="text-primary">Kriteria</th>
                  {kriteria?.map((el, idx) => {
                    return <th key={idx}>{el}</th>;
                  })}
                  <th colSpan={kriteria?.length}>Nilai Eigen</th>
                  <th>Jumlah Eigen</th>
                  <th>Rata rata</th>
                </tr>
              </thead>
              <tbody>
                {kriteria?.map((el, idx) => {
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

          {kriteria?.map((element, index) => {
            return (
              <div
                key={"resultAlternatif" + index}
                className="overflow-x-auto mt-16"
              >
                <table className="table table-zebra w-full text-center">
                  <thead>
                    <tr>
                      <th className="text-primary">{element}</th>
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

      <div
        className={proses < 3 ? "hidden" : "w-full flex justify-center py-20"}
      >
        <div className="max-w-7xl w-11/12 text-center lg:w-3/4">
          <TitleComp
            title="Hasil Perangkingan"
            desc="Perangkingan didapat dari besarnya nilai skor masing masing alternatif yang dijadikan bahan perhitungan."
          />

          <div className="overflow-x-auto mt-16">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Alternatif</th>
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
