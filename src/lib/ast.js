import esrecurse from 'esrecurse';
import { parse } from 'acorn';

export function compareCode(answers, code) {

  const codeAST = babel.transform(code, { stage: 0 }).ast.program.body;

  return answers.some((answer) => {

    return equal(
      codeAST,
      babel.transform(answer, { stage: 0 }).ast.program.body,
      { ignore: ['start', 'end', 'column', 'line', 'loc', 'raw', 'rawValue'] })
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

  esrecurse.visit(getAST(code), {

    FunctionDeclaration(node) {

      if (node.id.name === id) {

        foundFn = true;
        this.visitChildren(node);
      }
    },
    CallExpression(node) {

      if (foundFn) {

        if (node.callee.name === id ||
            node.callee.type === 'MemberExpression' &&
              node.callee.object.name === id) {

          isRecur = true;
        } else {

          this.visitChildren(node);
        }
      }
    }
  });

  return isRecur;
}
