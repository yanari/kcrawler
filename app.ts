// const Nightmare = require('nightmare');
import axios from 'axios';
import pino from 'pino';
import { JSDOM } from 'jsdom';

import { Idol, Stat } from './models/idol';

const logger = pino({prettyPrint: {colorize: true}});

const parseStats = async (memberPage: string) => {
  const { document } = new JSDOM(memberPage).window;

  const spans = document.querySelectorAll('span');
  const idol = new Idol();

  const formattedIdol = Array.from(spans).reduce((idol, cur) => {
    if (Idol.hasName(cur)) idol.setName(cur);
    if (Idol.hasHeight(cur)) idol.setHeight(cur);
    if (Idol.hasZodiacSign(cur)) idol.setZodiacSign(cur);
    return idol;
  }, idol);

  return formattedIdol;
};

const parseMember = async (link: string) : Promise<string> => {
  const response = await axios.get(link);
  const { document } = new JSDOM(response.data).window;

  const body = document.querySelector('.herald-entry-content');

  return body.innerHTML;
};

const parseGroupPage = (document: Document) => {
  const body = document.querySelector('.entry-content');
  const anchors = body.querySelectorAll('a');

  const allMembersAnchors = (Array.from(anchors).filter(span => {
    const isLink = span.href.match('profile-facts');
    const isMemberPage = span.innerHTML.match('Show more');
    if (isLink && isMemberPage) return span.href;
  })).map(el => el.toString());

  return allMembersAnchors;
};

const parse = async (data: string) => {
  const { document } = new JSDOM(data).window;
  
  const allMembers = parseGroupPage(document);

  const idols: Array<Idol> = [];

  // const memberPage = allMembers.map(parseMember);
  const stats = allMembers.map(async (member) => {
    const members = await parseMember(member);

    const mappedStats = await parseStats(members);

    logger.info(mappedStats.toString());
  });

  // logger.info(stats.toString());

  // const stats = memberPage.map(async (stat) => {
  //   return await parseStats(await stat)
  // });

  // logger.info(await stats);
};

(async () => {
  const response = await axios.get('https://kprofiles.com/loona-members-profile/');
  parse(response.data);
})();