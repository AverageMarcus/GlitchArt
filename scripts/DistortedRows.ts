import {Canvas} from './lib/Canvas';
import {GlitchPicture} from './lib/GlitchPicture';
import {randomBetween, flatternArrays} from './lib/Utils';

export const distortedRowsGlitch = async (canvasSelector: string, imageURL: string) => {
  const canvas = new Canvas(canvasSelector);
  const picture = new GlitchPicture(await canvas.getDataUri(imageURL));

  setInterval(() => {
    const rows = picture.get3DArray();

    const distortHeight = randomBetween(10, 50);
    const distortMid = Math.floor(distortHeight / 2);
    const distortOuter = Math.floor(distortHeight / 4);

    const direction = randomBetween(0, 2);

    let startRow = randomBetween(0, rows.length - distortHeight+1);
    for (let i = 0; i < distortOuter; i++){
      startRow++;
      if (direction) {
        rows[startRow] = rows[startRow].concat(rows[startRow].splice(0,  i*2+1));
      } else {
        rows[startRow] = rows[startRow].splice(rows[startRow].length - i*2,  rows[startRow].length).concat(rows[startRow]);
      }
    }
    for (let i = 0; i < distortMid; i++) {
      startRow++;

      if (direction) {
        rows[startRow] = rows[startRow].concat(rows[startRow].splice(0,  distortMid));
      } else {
        rows[startRow] = rows[startRow].splice(rows[startRow].length - distortMid,  rows[startRow].length).concat(rows[startRow]);
      }
    }
    for (let i = 0; i < distortOuter; i++) {
      startRow++;

      if (direction) {
        rows[startRow] = rows[startRow].concat(rows[startRow].splice(0,  distortMid - i*2));
      } else {
        rows[startRow] = rows[startRow].splice(rows[startRow].length - distortMid + i*2,  rows[startRow].length).concat(rows[startRow]);
      }
    }

    const imageData = picture.createImageData(flatternArrays(rows));
    canvas.update(imageData);
  }, 300);

};