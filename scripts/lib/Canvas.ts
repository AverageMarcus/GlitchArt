export class Canvas {
  private canvas: HTMLCanvasElement;

  constructor(selector: string) {
    this.canvas = <HTMLCanvasElement>document.querySelector(selector);
  }

  public async getDataUri(url: string): Promise<ImageData> {
    return new Promise<ImageData>((resolve, reject) => {
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
      image.onload = () => {
          this.canvas.width = image.naturalWidth;
          this.canvas.height = image.naturalHeight;
          this.canvas.getContext('2d').drawImage(image, 0, 0);
          var pixel = this.canvas.getContext('2d').getImageData(0, 0, this.canvas.width, this.canvas.height);
          return resolve(pixel);
      };
    });
  }

  public update(data: ImageData) {
    this.canvas.getContext('2d').putImageData(data, 0, 0);
  }

  public clear() {
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}