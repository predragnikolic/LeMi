import * as ts from 'typescript';

const transformerProgram = (program: ts.Program, config): ts.TransformerFactory<ts.SourceFile> => {
  let factory = ts.factory
  const typeChecker = program.getTypeChecker();

  // Create array of found symbols
  const foundSymbols: ts.Symbol[] = [];
  const isReactive = (symbol: ts.Symbol) => foundSymbols.includes(symbol)

  function NodeDotValue(name: string) {
    return factory.createPropertyAccessExpression(
      factory.createIdentifier(name),
      factory.createIdentifier("value")
    )
  }

  function createArrowFn(node: ts.Expression): ts.Node {
    return factory.createArrowFunction(
      undefined,
      undefined,
      [],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      node
    )
  }
  const transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        let symbol = typeChecker.getSymbolAtLocation(node)
        // transform
        // var x = 0
        // to
        // var x = Ref(0)
        if (ts.isVariableDeclaration(node) && isVarDeclaration(node.parent.flags)) {
          const relatedSymbol = (node as any).symbol as ts.Symbol;
          foundSymbols.push(relatedSymbol)
          const refFn = factory.createCallExpression(
            factory.createIdentifier("Ref"),
            undefined,
            node.initializer ? [node.initializer] : undefined
          )
          const newVar = factory.createVariableDeclaration(
            node.name,
            undefined,
            undefined,
            refFn
          )
          return newVar
        }

        // [open.value ? 'open' : 'closed'],
        // [() => open.value ? 'open' : 'closed]',
        // this is required because how I implemented the front LeMi lib
        if (ts.isConditionalExpression(node) && ts.isArrayLiteralExpression(node.parent)) {
          let newNode: ts.ConditionalExpression | null = null
          if (ts.isIdentifier(node.condition)) newNode = factory.createConditionalExpression(NodeDotValue(node.condition.getText()), node.questionToken, node.whenTrue, node.colonToken, node.whenFalse)
          return createArrowFn(newNode ?? node)
        }

        // [open.value && 'true']
        // [() => open.value && 'true']
        // this is required because how I implemented the front LeMi lib
        if (ts.isBinaryExpression(node) && ts.isArrayLiteralExpression(node.parent)) {
          let newNode: ts.BinaryExpression | null = null
          if (ts.isIdentifier(node.left)) newNode = factory.createBinaryExpression(NodeDotValue(node.left.getText()), node.operatorToken, node.right)

          return createArrowFn(newNode ?? node)
        }

        if (ts.isIdentifier(node) && symbol && isReactive(symbol)) {
          // !count
          // !count.value
          if (ts.isPrefixUnaryExpression(node.parent)) {
            return NodeDotValue(symbol.name)
          }
          // count++
          // count.value++
          if (ts.isPostfixUnaryExpression(node.parent)) {
            return NodeDotValue(symbol.name)
          }

          // { people.value = [...people, 1] } }
          // { people.value = [...people.value, 1] } }
          if (ts.isSpreadElement(node.parent)) {
            return NodeDotValue(symbol.name)
          }

          // onClick={() => x = x + 1}
          // onClick={() => x.value = x.value + 1}
          if (ts.isBinaryExpression(node.parent)) {
            return NodeDotValue(symbol.name)
          }
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor);
    };
  };

  return transformerFactory
}
function isVarDeclaration(flags: ts.NodeFlags): Boolean {
  return !(flags & ts.NodeFlags.Let) && !(flags & ts.NodeFlags.Const)
}


export default transformerProgram;
