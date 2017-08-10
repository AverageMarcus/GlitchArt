export const randomBetween = (from, to) => {
  return Math.floor(Math.random() * to) + from;
}

export const flatternArrays = (arr: Array<any>): Array<any> => {
  if (arr && Array.isArray(arr[0])) {
    return flatternArrays([].concat(...arr));
  }

  return arr;
}

export const chunkArray = (arr: Array<any>, chunkSize) => {
  const resultArray = [];
  let temp = [];
  arr.forEach((byte, i) => {
    temp.push(byte);

    if (temp.length === chunkSize) {
      resultArray.push(temp);
      temp = [];
    }
  });
  return resultArray;
}