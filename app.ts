// const Nightmare = require('nightmare');
import axios from 'axios';
import pino from 'pino';
import { JSDOM } from 'jsdom';

import { Idol, Stat, Infos } from './models/idol';

const logger = pino({prettyPrint: {colorize: true}});

const parseStats = (table: string[][], idol: Idol) => {
  const infos : Infos = {
    zodiac: null,
    bloodType: null,
    height: null,
  };

  const { bloodType, height, zodiac } = table.map((tableRow) => {
    return tableRow.reduce((acc, cur, i, arr) => {
      if (cur.match(Stat.Zodiac)) infos.zodiac = arr[i + 1];
      if (cur.match(Stat.Height)) infos.height = arr[i + 1];
      if (cur.match(Stat.BloodType)) infos.bloodType = arr[i + 1];
      return acc;
    }, infos);
  })[0];

  return {
    bloodType,
    height,
    zodiac,
  };
};

const parseMember = (text: string) => {
  const { document } = new JSDOM(text).window;

  const member = document.querySelector('.member-img');

  const infoTable = document.querySelectorAll('tr');

  const name = member.querySelector('.member-name').textContent;

  const imageUrl = member.querySelector('img').src;

  const tableRow = Array.from(infoTable).map(el => {
    return Array.from(el.cells);
  });

  const table = Array.from(tableRow).map(el => {
    return el.map(el => el.textContent.trim());
  });

  return {
    name,
    imageUrl,
    table,
  };
};

const parseGroupPage = (document: Document) => {
  const body = document.querySelector('.member-container');
  const members = body.querySelectorAll('.member');

  return Array.from(members);
};

const parse = async (data: string) => {
  const { document } = new JSDOM(data).window;
  
  const allMembers = parseGroupPage(document);

  const stats = allMembers.map((element: Element) => {
    
    const { name, imageUrl, table } = parseMember(element.innerHTML);
    
    const idol = new Idol(name, imageUrl);

    const { bloodType, height, zodiac, } = parseStats(table, idol);

    idol.height = height;
    idol.bloodType = bloodType;
    idol.zodiac = zodiac;

    return idol.toString();
  });

  logger.info(stats);
};

(async () => {
  const response = await axios.get('https://www.makestar.co/artists/924');
  parse(response.data);
})();