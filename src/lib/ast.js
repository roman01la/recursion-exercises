import esrecurse from 'esrecurse';
import { parse } from 'acorn';
import equal from './ast-equal';

export function compareCode(answers, code) {

  const codeAST = getAST(code).body;

  return answers.some((answer) => {

    return equal(
      codeAST,
      getAST(answer).body,
      { ignore: ['start', 'end', 'column', 'line', 'loc', 'raw', 'rawValue', 'name'] })
  });
}

export function getAST(code) {

  return parse(code, {
    ecmaVersion: 6,
    locations: false
  });
}

export function checkRecur(code, id) {

  let foundFn = false;
  let isRecur = false;

  function checkDeclaration(node) {

    if (node.id.name === id) {

      foundFn = true;
      return this.visitChildren(node);
    }

    if (foundFn) {

      id = node.id.name;
      return this.visitChildren(node);
    }
  }

  esrecurse.visit(getAST(code), {

    FunctionDeclaration: checkDeclaration,
    VariableDeclarator: checkDeclaration,
    CallExpression(node) {

      if (foundFn) {

        if (node.callee.name === id ||
            node.callee.type === 'MemberExpression' &&
              node.callee.object.name === id) {

          isRecur = true;
        } else {

          return this.visitChildren(node);
        }
      }
    }
  });

  return isRecur;
}
