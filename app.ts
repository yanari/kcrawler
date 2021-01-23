const Nightmare = require('nightmare');

const nightmare = Nightmare({show: true});

const parse = () => {
  const children = document.querySelector('.entry-content').children;
  const idols = Array.from(children).map((child) => {
    return child.textContent;
  });
  return idols;
};

nightmare
  .goto('https://kprofiles.com/loona-members-profile/')
  .evaluate(parse)
  .end()
  .then(console.log)
  .catch((err) => console.log('Failed:', err));