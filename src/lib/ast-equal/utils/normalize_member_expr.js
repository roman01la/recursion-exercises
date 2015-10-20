export default function normalizeMemberExpr(node) {

  if (node.type !== 'MemberExpression' || node.property.type !== 'Identifier') {

    return;
  }

  node.computed = true;

  const name = node.property.name;

  node.property = {
    type: 'Literal',
    value: name
  };
}
