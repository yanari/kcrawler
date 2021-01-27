export enum Stat {
  BloodType = 'Blood Type',
  Zodiac = 'Zodiac',
  Height = 'Height',
}

export interface Infos {
  zodiac: string,
  bloodType: string,
  height: string,
}

export class Idol {
  name: string;
  imageUrl: string;
  #zodiac: string;
  #height: number;
  private _bloodType: string;

  constructor(name: string, imageUrl: string) {
    this.name = name;
    this.imageUrl = imageUrl;
  }

  get zodiac() {
    return this.#zodiac;
  }

  get bloodType() {
    return this._bloodType;
  }

  set height(height: string) {
    const regex = new RegExp(/(.*?)cm/i);
    this.#height = height !== '-' ? Number.parseInt(regex.exec(height)[1]) : null;
  }

  set zodiac(zodiac: string) {
    this.#zodiac = zodiac;
  }

  set bloodType(bloodType: string) {
    this._bloodType = bloodType;
  }

  fromJSON() {
    return {
      name: this.name,
      imageUrl: this.imageUrl,
      zodiac: this.zodiac,
      bloodType: this.bloodType,
      height: this.#height,
    };
  }
}
