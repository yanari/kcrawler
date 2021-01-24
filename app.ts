// const Nightmare = require('nightmare');
import axios from 'axios';
import { JSDOM } from 'jsdom';

import { Idol, Stat } from './models/idol';


const parse = (data: string) => {
  const { document } = new JSDOM(data).window;
  const body = document.querySelector('.entry-content');
  const anchors = body.querySelectorAll('a');

  const allAnchors = Array.from(anchors).filter(span => {
    return span.href.match('profile-facts');
  }) as unknown as Array<string>;

  return allAnchors;
};

(async () => {
  const response = await axios.get('https://kprofiles.com/loona-members-profile/');
  console.dir(parse(response.data));
})();