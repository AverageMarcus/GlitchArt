import {Canvas} from './lib/Canvas';
import {GlitchPicture} from './lib/GlitchPicture';
import {randomBetween, flatternArrays} from './lib/Utils';

export const rowSwappingGlitch = async (canvasSelector: string, imageURL: string) => {
  const canvas = new Canvas(canvasSelector);
  const picture = new GlitchPicture(await canvas.getDataUri(imageURL));

  setInterval(() => {
    const rows = picture.get3DArray();

    // Shuffle rows
    for (let i = 0; i < 10; i++) {
      const start = randomBetween(0, rows.length);
      const offset = randomBetween(0, rows.length);

      [rows[start], rows[offset]] = [rows[offset], rows[start]];
    }

    const imageData = picture.createImageData(flatternArrays(rows));
    canvas.update(imageData);
  }, 300);

};