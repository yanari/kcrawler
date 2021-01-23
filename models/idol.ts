type Stat = 'Stage name' | 'Zodiac Sign' | 'Height';

export class Idol {
  name: string;
  height: number;
  zodiacSign: string;

  constructor(name: string) {
    this.name = name;
  }

  addZodiacSign(tag: HTMLSpanElement) {
    if (tag.textContent.match('Zodiac Sign')) {
      this.zodiacSign = tag.nextSibling.textContent.trim();
    }
  }
}