export const convolute = (byteArray: any[], width: number, height: number, weights: any[]) => {
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side/2);
  const result = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sy = y;
      const sx = x;
      const dstOff = (y*width+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      let r=0, g=0, b=0, a=0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = sy + cy - halfSide;
          const scx = sx + cx - halfSide;
          if (scy >= 0 && scy < height && scx >= 0 && scx < width) {
            const srcOff = (scy * width + scx) * 4;
            const wt = weights[cy * side + cx];
            r += byteArray[srcOff] * wt;
            g += byteArray[srcOff + 1] * wt;
            b += byteArray[srcOff + 2] * wt;
            a += byteArray[srcOff + 3] * wt;
          }
        }
      }
      result[dstOff] = r;
      result[dstOff + 1] = g;
      result[dstOff + 2] = b;
      result[dstOff + 3] = a + (255 - a);
    }
  }

  return result;
};