class Labtop {
  public brand: string;
  public model: string;
  protected _cpu: string;
  private _gpu: string;
  private _architecture: string;
  // typescript 컴파일 이후에도 존재하는 비공개 필드
  #ram: number;
  
  constructor(brand: string, model: string, cpu: string, gpu: string, architecture: string) {
    this.brand = brand;
    this.model = model;
    this._cpu = cpu;
    this._gpu = gpu;
    this._architecture = architecture;
  }

  get cpu(): string {
    return this._cpu;
  }
  get gpu(): string {
    return this._gpu;
  }
  get architecture(): string {
    return this._architecture;
  }
  get ram(): number {
    return this.#ram;
  }
}

class MacBook extends Labtop {
  getFullInfo(): string {
    return `${this.brand} ${this.model} ${this.cpu} ${this.gpu} ${this.architecture}`;
  }
  calcRam(): number {
    return this.ram + 10;
  }
}







