import equal from '../index';
import { parse } from 'acorn';
import { suite, test } from 'mocha';
import assert from 'assert';

function compare(a, b, opts) {

  return equal(
    parse(a, { ecmaVersion: 6 }).body,
    parse(b, { ecmaVersion: 6 }).body,
    Object.assign({ ignore: ['start', 'end', 'loc', 'column', 'line', 'raw', 'rawValue'] }, opts));
}

suite('equal', () => {

  test('whitespace', () => assert.ok(compare(
    '\tvar   a=0;\n \t a    +=4;\n\n',
    'var a = 0; a += 4;')));

  suite('dereferencing', () => {

    test('identifier to literal', () => assert.ok(compare(
      'a.b;',
      'a["b"];')));

    test('literal to identifier', () => assert.ok(compare(
      'a["b"];',
      'a.b;')));
  });

  test('variable binding', () => {
    assert.ok(compare(
      '(function(a, b) { console.log(a + b); })(1, 3);',
      `(function(__UNBOUND0__, __UNBOUND1__) {
  console.log(__UNBOUND0__ + __UNBOUND1__);
}) (1,3);`,
      { varPattern: /__UNBOUND\d+__/ }
    ));
  });

  test('string binding', () => {

    assert.ok(compare(
      'a["something"];"something2";"something";',
      'a["__STR1__"]; "__STR2__"; "__STR1__";',
      { stringPattern: /__STR\d+__/ }
    ));
  });

  test('string binding with object dereferencing', () => {
    assert.ok(compare(
      'a.b;',
      'a["_s1_"];',
      { stringPattern: /_s\d_/ }
    ));
  });

  test('variable binding and string binding', () => {
    assert.ok(compare(
      'a["b"];',
      '_v1_["_s1_"];',
      { stringPattern: /_s\d_/, varPattern: /_v\d_/ }
    ));
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

    assert.ok(compare(
      'a.b + 3',
      'a["b"] + 4',
      { comparators: [threeOrFour] }
    ));
  });

  suite('expected failures', () => {

    test('unmatched statements', () => {
      assert.ok(compare('', 'var x = 0;') === false);
      assert.ok(compare('var x = 0;', '') === false);
    });

    test('name change', () => assert.ok(compare(
      '(function(a) {});',
      '(function(b) {});') === false));

    test('value change', () => assert.ok(compare(
      'var a = 3;',
      'var a = 4;') === false));

    test('dereferencing', () => assert.ok(compare(
      'a.b;',
      'a["b "];') === false));

    test('double variable binding', () => {
      assert.ok(compare(
        '(function(a, b) { console.log(a); });',
        '(function(__UNBOUND0__, __UNBOUND1__) { console.log(__UNBOUND1__); });',
        { varPattern: /__UNBOUND\d+__/ }
      ) === false);
    });

    test('double string binding', () => {
      assert.ok(compare(
        'var a = "one", b = "two", c = "three";',
        'var a = "_s1_", b = "_s2_", c = "_s1_";',
        { stringPattern: /_s\d_/ }
      ) === false);
    });

    test('double string binding (through object dereference)', () => {
      assert.ok(compare(
        'a.a; a.b; a.c;',
        'a["_s1_"]; a["_s2_"]; a["_s1_"];',
        { stringPattern: /_s\d/ }
      ) === false);
    });

    test('extra statements', () => assert.ok(compare('a;', '') === false));

    test('unmatched member expression', () => assert.ok(compare(
      'a.b;',
      '3;') === false));
  });
});
