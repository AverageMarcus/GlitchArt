import {chunkArray} from './Utils';

export class GlitchPicture {
  private imageData: ImageData;
  private originalByteArray: Uint8ClampedArray;
  private byteArray: Uint8ClampedArray;

  constructor(data: ImageData) {
    this.imageData = data;
    this.originalByteArray = this.imageData.data.map(byte => byte);
    this.byteArray = this.imageData.data;
  }

  public get3DArray(): Array<Array<Array<Uint8ClampedArray>>> {
    return chunkArray(this.get1DPixelArray(), this.imageData.width);
  }

  public get1DPixelArray(): any {
    return chunkArray(Array.from(this.originalByteArray), 4);
  }



  public getOriginalClone(): Uint8ClampedArray {
    return this.originalByteArray.map(byte => byte);
  }

  public createImageData(byteArray: any[]): ImageData {
    this.imageData.data.forEach((bytes, i) => this.imageData.data[i] = byteArray[i]);
    return this.imageData;
  }
}