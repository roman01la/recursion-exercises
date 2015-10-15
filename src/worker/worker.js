importScripts('browser.min.js');

const assert = { equal: require('deep-equal') };

onmessage = (event) => {

  execute(event.data)
    .then((result) => postMessage(JSON.stringify({ type: 'result', data: result })))
    .catch((error) => postMessage(JSON.stringify({ type: 'error', data: error.message })));
};

function transform(code) {

  return babel.transform(code, { stage: 0 }).code;
}

function execute(code) {

  return new Promise((resolve) => resolve(eval(transform(code))));
}
