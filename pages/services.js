export default function init() {}

export function getPermutasi(n, r) {
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

export function getHPP(kriteria) {
  const p = getPermutasi(kriteria?.length, 2);
  var hpI = [];

  for (let i = 0; i < p / 2; i++) {
    for (let j = i; j < p / 2; j++) {
      if (j > i && kriteria[j] != null) {
        hpI.push([i, j]);
      }
    }
  }
  return hpI;
}

export function convert(value) {
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

export function getSumRate(data) {
  var sum = [];

  for (let i = 0; i < data.length; i++) {
    sum.push(0);
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      sum[j] = sum[j] + data[i][j];
    }
  }

  return sum;
}

export function getEigen(data) {
  var temp = [];
  var sum = [];

  for (let i = 0; i < data.length; i++) {
    sum.push(0);
    temp.push([]);
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      sum[j] = sum[j] + data[i][j];
    }
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      temp[i][j] = data[i][j] / sum[j];
    }
  }

  return temp;
}

export function getSumEigen(data) {
  var sum = [];

  for (let i = 0; i < data.length; i++) {
    sum.push(0);
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      sum[i] = sum[i] + data[i][j];
    }
  }
  return sum;
}

export function getAverageEigen(data) {
  var average = [];

  for (let i = 0; i < data.length; i++) {
    average.push(0);
  }

  for (let i = 0; i < data.length; i++) {
    average[i] = data[i] / data.length;
  }

  return average;
}

export function getLamdaMax(sumRate, averageEigen) {
  var lamda = 0;
  for (let i = 0; i < sumRate.length; i++) {
    lamda = lamda + sumRate[i] * averageEigen[i];
  }

  return lamda;
}

export function getCI(n, lamda) {
  var temp;

  temp = (lamda - n) / (n - 1);

  return temp;
}

export function getCR(n, ci) {
  const RI = [
    0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51, 1.48, 1.56, 1.57,
    1.39,
  ];
  var temp;

  temp = ci / RI[n - 1];
  return temp;
}

export function getScore(nK, nA, avgEigen) {
  var temp = [];
  for (let i = 0; i < nA; i++) {
    temp.push(0);
  }

  for (let i = 0; i < nA; i++) {
    for (let j = 0; j < nK; j++) {
      temp[i] = temp[i] + avgEigen[0][j] * avgEigen[j + 1][i];
    }
  }
  return temp;
}

export function selectionSort(arr, alternatif) {
  var temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push({ title: alternatif[i], skor: arr[i] });
  }

  for (let n = 0; n < temp.length; n++) {
    let max = n;

    for (let j = n + 1; j < temp.length; j++) {
      if (temp[j].skor > temp[max].skor) {
        max = j;
      }
    }

    if (max !== n) {
      let current = temp[n];
      temp[n] = temp[max];
      temp[max] = current;
    }
  }

  return temp;
}
