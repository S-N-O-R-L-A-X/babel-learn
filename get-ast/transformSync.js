const babel = require("@babel/core");

const code = 'function greet(input) {return input ?? "Hello world";}';
result = babel.transformSync(code, { ast: true });

console.log(result.ast);

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
    sourceType: 'module',
    interpreter: null,
    body: [ [Node] ],
    directives: [],
    leadingComments: undefined,
    innerComments: undefined,
    trailingComments: undefined
  },
  comments: [],
  leadingComments: undefined,
  innerComments: undefined,
  trailingComments: undefined
}
*/
