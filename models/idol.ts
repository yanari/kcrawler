export enum Stat {
  StageName = 'Stage Name',
  ZodiacSign = 'Zodiac Sign',
  Height = 'Height',
}

export class Idol {
  _name: string;
  _height: string;
  _zodiacSign: string;

  private returnStatFromTag(stat: Stat, tag: HTMLSpanElement) {
    if (this.hasStat(stat, tag)) {
      return tag.nextSibling.textContent.trim();
    }
  }
  
  static fromSpanElement(spanElement: HTMLSpanElement) : Idol {
    return spanElement as unknown as Idol;
  }

  public hasStat(stat: Stat, tag: HTMLSpanElement) {
    return tag.textContent.match(stat);
  }

  setName(tag: HTMLSpanElement) {
    this._name = this.returnStatFromTag(Stat.StageName, tag);
  }

  setZodiacSign(tag: HTMLSpanElement) {
    this._zodiacSign = this.returnStatFromTag(Stat.ZodiacSign, tag);
  }

  setHeight(tag: HTMLSpanElement) {
    this._height = this.returnStatFromTag(Stat.Height, tag);
  }
}