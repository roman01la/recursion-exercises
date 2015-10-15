importScripts('browser.min.js', 'equal.js');

const assert = { equal: deepEqual };

onmessage = function(event) {

  execute(event.data)
    .then(function(result) { postMessage(JSON.stringify({ type: 'result', data: result })); })
    .catch(function(error) { postMessage(JSON.stringify({ type: 'error', data: error.message })); });
};

function transform(code) {

  return babel.transform(code, { stage: 0 }).code;
}

function execute(code) {

  return new Promise(function(resolve) { resolve(eval(transform(code))); });
}
