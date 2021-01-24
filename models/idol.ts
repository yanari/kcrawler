export enum Stat {
  StageName = 'Stage Name',
  ZodiacSign = 'Zodiac Sign',
  Height = 'Height',
}

export class Idol {
  private _name: string;
  private _height: string;
  private _zodiacSign: string;

  private returnStatFromTag(stat: Stat, tag: HTMLSpanElement) {
    if (Idol.hasStat(stat, tag)) {
      return tag.nextSibling.textContent.trim();
    }
  }

  public static hasStat(stat: Stat, tag: HTMLSpanElement) {
    return tag.textContent.match(stat);
  }

  set name(tag: HTMLSpanElement) {
    this._name = this.returnStatFromTag(Stat.StageName, tag);
  }

  set zodiacSign(tag: HTMLSpanElement) {
    this._zodiacSign = this.returnStatFromTag(Stat.ZodiacSign, tag);
  }

  set height(tag: HTMLSpanElement) {
    this._height = this.returnStatFromTag(Stat.Height, tag);
  }

  static fromSpanElement(spanElement: HTMLSpanElement) : Idol {
    return spanElement as unknown as Idol;
  }
}