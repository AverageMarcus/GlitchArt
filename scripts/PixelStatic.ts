import {Canvas} from './lib/Canvas';
import {GlitchPicture} from './lib/GlitchPicture';
import {flatternArrays} from './lib/Utils';

export const pixelStaticGlitch = async (canvasSelector: string, imageURL: string) => {
  const canvas = new Canvas(canvasSelector);
  const picture = new GlitchPicture(await canvas.getDataUri(imageURL));

  setInterval(() => {
    const pixelArray = picture.get1DPixelArray();

    const from = [];
    for (let i = 0; i < pixelArray.length / 20; i++) {
      // Randomly pick some pixels
      from.push(Math.floor(Math.random() * pixelArray.length) + 0);
    }

    for (let i = 0; i < from.length / 2; i++) {
      // Swap some pixels around
      [pixelArray[from[i]], pixelArray[from[from.length-1-i]]] = [pixelArray[from[from.length-1-i]], pixelArray[from[i]]];
    }

    const imageData = picture.createImageData(flatternArrays(pixelArray));
    canvas.update(imageData);
  }, 300);

};

export const monochromePixelStaticGlitch = async (canvasSelector: string, imageURL: string) => {
  const canvas = new Canvas(canvasSelector);
  const picture = new GlitchPicture(await canvas.getDataUri(imageURL));

  setInterval(() => {
    const pixelArray = picture.get1DPixelArray();

    const from = [];
    for (let i = 0; i < pixelArray.length / 20; i++) {
      // Randomly pick some pixels
      from.push(Math.floor(Math.random() * pixelArray.length) + 0);
    }

    for (let i = 0; i < from.length / 2; i++) {
      pixelArray[from[i]] = [0,0,0,255];
      pixelArray[from[from.length-1-i]] = [255,255,255,255];
    }

    const imageData = picture.createImageData(flatternArrays(pixelArray));
    canvas.update(imageData);
  }, 300);

};
