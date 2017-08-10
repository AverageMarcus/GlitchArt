import {Canvas} from './lib/Canvas';
import {GlitchPicture} from './lib/GlitchPicture';
import {randomBetween, flatternArrays, chunkArray} from './lib/Utils';
import {convolute} from './lib/Convolute';

export const vhsTrackingGlitch = async function(canvasSelector: string, imageURL: string) {
  const canvas = new Canvas(canvasSelector);
  const pictureData = await canvas.getDataUri(imageURL);
  const picture = new GlitchPicture(pictureData);

  const original = picture.get3DArray();
  const trackingHeight = randomBetween(5, 30);
  let startPosition = randomBetween(0, original.length - trackingHeight - 1);

  this.update = () => {

    let byteArray: any = picture.getOriginalClone();
    // Soften/sharpen image
    byteArray = convolute(byteArray, pictureData.width, pictureData.height,  [ 1/9, 1, 1/9, 1/8, 1/9, 1/9, 1/9, -1, 1/9 ]);

    const rows = chunkArray(chunkArray(byteArray, 4), pictureData.width);

    // Add scanlines
    for (let i = startPosition; i < startPosition + trackingHeight; i++) {
      rows[i].forEach((pixel, p) => {
        rows[i][p][3] = <any>5;
      });
      const length = randomBetween(0, 200);
      let pos = randomBetween(0, rows[i].length - length);
      const end = pos + length;
      for (; pos < end; pos++) {
        [rows[i][pos][1], rows[i][pos][2]] = [rows[i][pos][2], rows[i][pos][1]];
        rows[i][pos][3] = <any>200;
      }
    }

    // Add distortion
    const distortHeight = trackingHeight + 10;
    const distortMid = trackingHeight;
    const distortOuter = 5;

    const direction = randomBetween(0, 2);

    let startRow = startPosition - 6;
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
    canvas.clear();
    canvas.update(imageData);

    startPosition++
    if (startPosition + trackingHeight + 11 > rows.length) {
      startPosition = 5;
    }
  };

  this.update();

};