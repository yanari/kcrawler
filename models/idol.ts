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
  #bloodType: string;

  constructor(name: string, imageUrl: string) {
    this.name = name;
    this.imageUrl = imageUrl;
  }

  // get height() {
  //   return this.#height;
  // }

  get zodiac() {
    return this.#zodiac;
  }

  get bloodType() {
    return this.#bloodType;
  }

  set height(height: string) {
    const regex = new RegExp(/(.*?)cm/i);
    this.#height = Number.parseInt(regex.exec(height)[1]);
  }

  set zodiac(zodiac: string) {
    this.#zodiac = zodiac;
  }

  set bloodType(bloodType: string) {
    this.#bloodType = bloodType;
  }

  toString() {
    return `Idol: ${this.name}, ${this.#height}cm ${this.zodiac}, Blood Type: ${this.bloodType}`;
  }
}
