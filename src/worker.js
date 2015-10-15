let worker;

export function execute(code) {

  return new Promise((resolve, reject) => {

    worker.onmessage = (event) => {

        const { type, data } = JSON.parse(event.data);

        if (type === 'result') { return resolve(data); }
        if (type === 'error') { return reject(data); }
    };

    worker.postMessage(code);
  });
}

export function init() {

  worker = new Worker('/public/scripts/worker.js');
}
