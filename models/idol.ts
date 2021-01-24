export enum Stat {
  StageName = 'Stage Name',
  ZodiacSign = 'Zodiac Sign',
  Height = 'Height',
}

export class Idol {
  #_name: string;
  #_height: string;
  #_zodiacSign: string;

  private returnStatFromTag(tag: HTMLSpanElement) : string {
    return tag.nextSibling.textContent.trim();
  }
  
  // static fromSpanElement(spanElement: HTMLSpanElement) : Idol {
  //   return spanElement as unknown as Idol;
  // }

  static hasStat(stat: Stat, tag: HTMLSpanElement) : boolean {
    return !!tag.textContent.match(stat);
  }

  public static hasName(tag: HTMLSpanElement) : boolean {
    return this.hasStat(Stat.StageName, tag);
  }

  public static hasZodiacSign(tag: HTMLSpanElement) : boolean {
    return this.hasStat(Stat.ZodiacSign, tag);
  }

  public static hasHeight(tag: HTMLSpanElement) : boolean {
    return this.hasStat(Stat.Height, tag);
  }

  get name() {
    return this.#_name;
  }

  get height() {
    return this.#_height;
  }

  get zodiacSign() {
    return this.#_zodiacSign;
  }

  setName(tag: HTMLSpanElement) {
    if (Idol.hasStat(Stat.StageName, tag)) {
      this.#_name = this.returnStatFromTag(tag);
    }
  }

  setZodiacSign(tag: HTMLSpanElement) {
    if (Idol.hasStat(Stat.ZodiacSign, tag)) {
      this.#_zodiacSign = this.returnStatFromTag(tag);
    }
  }

  setHeight(tag: HTMLSpanElement) {
    if (Idol.hasStat(Stat.Height, tag)) {
      this.#_height = this.returnStatFromTag(tag);
    }
  }

  toString() {
    return `${this.#_name}: ${this.#_zodiacSign} ${this.#_height ? `(${this.#_height})` : ''}`;
  }
}