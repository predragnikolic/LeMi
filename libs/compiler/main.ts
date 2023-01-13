import * as ts from 'typescript';

const transformerProgram = (program: ts.Program, config): ts.TransformerFactory<ts.SourceFile> => {
  let factory = ts.factory
  const typeChecker = program.getTypeChecker();

  // Create array of found symbols
  const foundSymbols: ts.Symbol[] = [];
  const isReactive = (symbol: ts.Symbol) => foundSymbols.includes(symbol)
  const hasSymbolName = (name: string) => {
    let l = foundSymbols.map(s => s.name)
    return l.includes(name.replaceAll('\n', '').trim())
  }

  const findParent = (node: ts.Node, predicate: (node: ts.Node) => boolean) => {
  if (!node.parent) {
    return undefined;
  }

  if (predicate(node.parent)) {
    return node.parent;
  }

  return findParent(node.parent, predicate);
};


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

  const findReactiveCall = (node: ts.Node) => {
    if (!node.parent) return undefined
    if (ts.isCallExpression(node.parent) && node.parent.expression.getText() === 'React') {
      return node.parent
    };
    return findReactiveCall(node.parent);
  };


  const transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        let symbol = typeChecker.getSymbolAtLocation(node)

        if (ts.isIdentifier(node)) {
          if (hasSymbolName(node.getFullText()) && !isReactive(symbol)) {
            if (symbol && !foundSymbols.includes(symbol)) foundSymbols.push(symbol)
          }
        }

        // transform
        // var x = 0
        // to
        // var x = Ref(0)
        if (ts.isVariableDeclaration(node) && isVarDeclaration(node.parent.flags)) {
          const relatedSymbol = (node as any).symbol as ts.Symbol;

          relatedSymbol && foundSymbols.push(relatedSymbol)
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

        // must be after .value
        if (ts.isIdentifier(node)) {
          if (symbol && isReactive(symbol)) {
            const hasObjectBindingNode = findParent(node, ts.isObjectBindingPattern);
            // fixes     const { Read(x), Read(y), reset } = mouseCoords();
            if (hasObjectBindingNode &&  ts.isVariableDeclaration(hasObjectBindingNode.parent)) {
                return node
            }

            const parameterNode = findParent(node, ts.isParameter)
            if (parameterNode) {
              return node
            }

            //fixes return p(['Count is ', Read(count)]),
            // return { x: Read(x), y: Read(y), reset };
            const hasReturnNode = findParent(node, ts.isReturnStatement);
            // fixes     const { Read(x), Read(y), reset } = mouseCoords();
            if (hasReturnNode) {
                return node
            }

            // let params = {x}
            // prevent {Read(x)}
            // instead: { x: Read(x)}
            if (ts.isShorthandPropertyAssignment(node.parent)) {
              return factory.createPropertyAssignment(node.getText(), factory.createCallExpression(
                factory.createIdentifier("Read"),
                undefined,
                [factory.createIdentifier(node.getText())]
              ))
            }
            // let params = {x: x}
            // prevent: let params = {Read(x): Read(x)}
            // instead:  let params = {x: Read(x)}
            if (ts.isPropertyAssignment(node.parent) && node.parent.name === node) {
              return node
            }

            // prevent:  x: x,
            // instead:  x: Read(x),
            if (ts.isPropertyAssignment(node.parent) && node.parent.initializer === node) {
              return factory.createCallExpression(
                factory.createIdentifier("Read"),
                undefined,
                [factory.createIdentifier(node.getText())]
              )
            }

            return factory.createCallExpression(
              factory.createIdentifier("Read"),
              undefined,
              [factory.createIdentifier(node.getText())]
            )
          }
        }
        // end of must be after .value

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
