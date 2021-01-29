import axios from 'axios';
import { JSDOM } from 'jsdom';

import { Idol, Stat, Infos } from '../models/idol';

const parseStats = (table: string[][]) => {
  const infos : Infos = {
    zodiac: null,
    bloodType: null,
    height: null,
    birthday: null,
  };

  const {
    bloodType,
    height,
    zodiac,
    birthday,
  } = table.map((tableRow) => {
    return tableRow.reduce((acc, cur, i, arr) => {
      if (cur.match(Stat.Zodiac)) infos.zodiac = arr[i + 1];
      if (cur.match(Stat.Height)) infos.height = arr[i + 1];
      if (cur.match(Stat.BloodType)) infos.bloodType = arr[i + 1];
      if (cur.match(Stat.Birthday)) infos.birthday = arr[i + 1];
      return acc;
    }, infos);
  })[0];

  return {
    bloodType,
    height,
    zodiac,
    birthday,
  };
};

const parseMember = (text: string) => {
  const { document } = new JSDOM(text).window;

  const member = document.querySelector('.member-img');

  const infoTable = document.querySelectorAll('tr');

  const name = member.querySelector('.member-name').textContent;

  const imageUrl = member.querySelector('img').src;

  const [imageFileUrl] = imageUrl.split('?');

  const tableRow = Array.from(infoTable).map(el => {
    return Array.from(el.cells);
  });

  const table = Array.from(tableRow).map(el => {
    return el.map(el => el.textContent.trim());
  });

  return {
    name,
    imageFileUrl,
    table,
  };
};

const parseGroupPage = (document: Document) => {
  const body = document.querySelector('.member-container');
  const members = body.querySelectorAll('.member');

  return Array.from(members);
};

const parse = (data: string) => {
  const { document } = new JSDOM(data).window;

  // const group = document.querySelector('h3.name').textContent;

  const allMembers = parseGroupPage(document);

  const idolStats = allMembers.map((element: Element) => {
    const { name, imageFileUrl, table } = parseMember(element.innerHTML);

    const idol = new Idol(name, imageFileUrl);

    const {
      bloodType,
      height,
      zodiac,
      birthday,
    } = parseStats(table);

    idol.height = height;
    idol.bloodType = bloodType;
    idol.zodiac = zodiac;
    idol.birthday = birthday;

    return idol.fromJSON();
  });

  return idolStats;
};

const getParser = async (group: string) => {
  const parsedGroup = encodeURIComponent(group);
  const res = await axios.get(`https://www.makestar.co/v1/brands/search?keyword=${parsedGroup}&type=Brand&size=8`);
  const firstMatch = res.data.content[0];
  const idx = firstMatch !== null ? firstMatch.idx : null;
  if (idx !== null) {
    const response = await axios.get(`https://www.makestar.co/artists/${idx}`);

    return parse(response.data);
  }

  return {a: 'a'};
};

export default async  (req, res, next) => {
  console.log(req.body);
  const parser = await getParser(req.body.group);

  res.status(200).json(parser);
};