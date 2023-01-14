const babelParser = require('@babel/parser');
const code = 'function greet(input) {return input ?? "Hello world";}';
console.log(babelParser.parse(code, {}));

/*
Node {
  type: 'File',
  start: 0,
  end: 54,
  loc: SourceLocation {
    start: Position { line: 1, column: 0, index: 0 },
    end: Position { line: 1, column: 54, index: 54 },
    filename: undefined,
    identifierName: undefined
  },
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 54,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    sourceType: 'script',
    interpreter: null,
    body: [ [Node] ],
    directives: []
  },
  comments: []
}
*/