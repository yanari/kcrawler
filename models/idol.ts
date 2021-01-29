export enum Stat {
  BloodType = 'Blood Type',
  Zodiac = 'Zodiac',
  Height = 'Height',
  Birthday = 'Birthday',
}

export interface Infos {
  zodiac: string,
  bloodType: string,
  height: string,
  birthday: any,
}

interface Birthday {
  month: string,
  year: number,
}

export class Idol {
  private _name: string;
  private _imageUrl: string;
  private _zodiac: string;
  private _height: number;
  private _bloodType: string;
  private _birthday: Birthday;

  constructor(name: string, imageUrl: string) {
    this._name = name;
    this._imageUrl = imageUrl;
  }

  get name() {
    return this._name;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get zodiac() {
    return this._zodiac;
  }

  get bloodType() {
    return this._bloodType;
  }

  set height(height: string) {
    const regex = new RegExp(/(.*?)cm/i);
    this._height = height !== '-' ? Number.parseInt(regex.exec(height)[1]) : null;
  }

  set birthday(birthday: string) {
    if (birthday !== '-') {
      const [month, rest] = birthday.split('.');
      const birthdayMonth = month;
      const [_, year] = rest.split(',');
      const birthdayYear = Number.parseInt(year.trim());

      this._birthday = {
        month: birthdayMonth,
        year: birthdayYear,
      };
    }
  }

  set zodiac(zodiac: string) {
    this._zodiac = zodiac;
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
      height: this._height,
      birthday: this._birthday,
    };
  }
}
