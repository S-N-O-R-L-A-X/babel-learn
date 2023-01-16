const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse");
const type = require('@babel/types');

const code = 'if (a==2) {a+=1};';

const ast = babelParser.parse(code, {})
traverse.default(ast, {
    enter(path) {
        if (type.isIdentifier(path.node)) {
            console.log(path.node);
        }
    }
});

/*
Node {
  type: 'Identifier',
  start: 4,
  end: 5,
  loc: SourceLocation {
    start: Position { line: 1, column: 4, index: 4 },
    end: Position { line: 1, column: 5, index: 5 },
    filename: undefined,
    identifierName: 'a'
  },
  name: 'a'
}
Node {
  type: 'Identifier',
  start: 11,
  end: 12,
  loc: SourceLocation {
    start: Position { line: 1, column: 11, index: 11 },
    end: Position { line: 1, column: 12, index: 12 },
    filename: undefined,
    identifierName: 'a'
  },
  name: 'a'
}
*/