import equal from '../index';
import { parse } from 'babylon';
import { suite, test } from 'mocha';

function compare(a, b, opts) {

  equal(
    parse(a).program.body,
    parse(b).program.body,
    Object.assign({ ignore: ['start', 'end', 'loc', 'column', 'line', 'raw', 'rawValue'] }, opts));
}

suite('equal', () => {

  test('whitespace', () => compare(
    '\tvar   a=0;\n \t a    +=4;\n\n',
    'var a = 0; a += 4;'));

  suite('dereferencing', () => {

    test('identifier to literal', () => compare(
      'a.b;',
      'a["b"];'));

    test('literal to identifier', () => compare(
      'a["b"];',
      'a.b;'));
  });

  test.skip('variable lists', () => compare(
    'var a; var b;',
    'var a, b;'));

  test('variable binding', () => {
    compare(
      '(function(a, b) { console.log(a + b); })(1, 3);',
      `(function(__UNBOUND0__, __UNBOUND1__) {
  console.log(__UNBOUND0__ + __UNBOUND1__);
}) (1,3);`,
      { varPattern: /__UNBOUND\d+__/ }
    );
  });

  test('string binding', () => {

    compare(
      'a["something"];"something2";"something";',
      'a["__STR1__"]; "__STR2__"; "__STR1__";',
      { stringPattern: /__STR\d+__/ }
    );
  });

  test('string binding with object dereferencing', () => {
    compare(
      'a.b;',
      'a["_s1_"];',
      { stringPattern: /_s\d_/ }
    );
  });

  test('variable binding and string binding', () => {
    compare(
      'a["b"];',
      '_v1_["_s1_"];',
      { stringPattern: /_s\d_/, varPattern: /_v\d_/ }
    );
  });

  test('custom comparator', () => {
    const vals = [3, 4];
    const threeOrFour = (actual, expected) => {
      if (actual.type !== 'Literal' || expected.type !== 'Literal') {
        return;
      }

      if (vals.indexOf(actual.value) > -1 && vals.indexOf(expected.value) > -1) {

        return true;
      }
    };

    compare(
      'a.b + 3',
      'a["b"] + 4',
      { comparators: [threeOrFour] }
    );
  });

  suite('expected failures', () => {

    function noMatch(args, expectedCode) {

      try {

        compare(...args);
      } catch(err) {

        if (!(err instanceof equal.Error)) {

          throw new Error(`Expected a equal error, but caught a generic error: "${err.message}".`);
        }

        if (err.code === expectedCode) {

          return;
        }

        throw new Error(`Expected error with code "${expectedCode}", but received error with code "${err.code}".`);
      }

      throw new Error('Expected an error, but no error was thrown.');
    }

    test('unmatched statements', () => {
      noMatch(['', 'var x = 0;'], 3);
      noMatch(['var x = 0;', ''], 3);
    });

    test('name change', () => noMatch([
      '(function(a) {});',
      '(function(b) {});'], 3));

    test('value change', () => noMatch([
      'var a = 3;',
      'var a = 4;'], 3));

    test('dereferencing', () => noMatch([
      'a.b;',
      'a["b "];'], 3));

    test('double variable binding', () => {
      noMatch([
        '(function(a, b) { console.log(a); });',
        '(function(__UNBOUND0__, __UNBOUND1__) { console.log(__UNBOUND1__); });',
        { varPattern: /__UNBOUND\d+__/ }
        ],
        2
      );
    });

    test('double string binding', () => {
      noMatch([
        'var a = "one", b = "two", c = "three";',
        'var a = "_s1_", b = "_s2_", c = "_s1_";',
        { stringPattern: /_s\d_/ },
        ],
        2
      );
    });

    test('double string binding (through object dereference)', () => {
      noMatch([
        'a.a; a.b; a.c;',
        'a["_s1_"]; a["_s2_"]; a["_s1_"];',
        { stringPattern: /_s\d/ },
        ],
        2
      );
    });

    test('extra statements', () => noMatch(['a;', ''], 3));

    test('unmatched member expression', () => noMatch([
      'a.b;',
      '3;'], 3));
  });
});
