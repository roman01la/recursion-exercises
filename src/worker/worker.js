importScripts('browser.min.js');

import equal from 'deep-equal';

let equalResult;

const assert = {

  equal(a, b) {

    equalResult = equal(a, b);
  }
};

onmessage = (event) => {

  execute(event.data)
    .then((result) => postMessage(JSON.stringify({ type: 'result', data: result })))
    .catch((error) => postMessage(JSON.stringify({ type: 'error', data: error.message })));
};

function transform(code) {

  return babel.transform(code, { stage: 0 }).code;
}

function execute(code) {

  return new Promise((resolve, reject) => {

    try {
      eval(transform(code));
      const result = equalResult;
      equalResult = undefined;
      resolve(result);
    } catch (err) {
      equalResult = undefined;
      reject(err);
    }
  });
}
