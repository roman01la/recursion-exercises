import Firebase from 'firebase';
import dbConfig from './config/db';

const db = new Firebase(dbConfig.url);

db.authWithCustomToken(dbConfig.token, (err) => err ? console.error(err) : null);

const answers = db.child('answers');

export function createEntry(id, code) {

  answers.child(id).push(code);
}

export function onEntries(id, cb) {

  if (typeof id === 'function') {

    answers.on('value', (data) => id(null, data.val()), id);
  } else {

    answers.child(id).on('value', (data) => cb(null, data.val()), cb);
  }
}
