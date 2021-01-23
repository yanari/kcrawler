// const Nightmare = require('nightmare');
import axios from 'axios';
import { JSDOM } from 'jsdom';

import { Idol } from './models/idol';


const parse = (data: string) => {
  const { document } = new JSDOM(data).window;
  const body = document.querySelector('.entry-content');
  const spans = body.querySelectorAll('span');

  const members = Array.from(spans).filter(span => {
    if (span.textContent.match('Stage Name')) return spans;
  }).map(el => new Idol(el.nextSibling.textContent.trim()));
  return members;

  // const stageNameRegex = new RegExp(/Stage Name:<\/span>(.*?)</i);
  // const stageName = stageNameRegex.exec(body)[1].trim();
  // return stageName;
};

(async () => {
  const response = await axios.get('https://kprofiles.com/loona-members-profile/');
  console.log(parse(response.data));
})();