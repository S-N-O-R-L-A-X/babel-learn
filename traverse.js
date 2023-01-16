const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse");

const code = 'let a = 2 * 3;'
const ast = babelParser.parse(code, {})

traverse.default(ast, {
    enter(path) {
        console.log(path.type);
    }
});

/*
Program
VariableDeclaration
VariableDeclarator
Identifier
BinaryExpression
NumericLiteral
NumericLiteral
*/