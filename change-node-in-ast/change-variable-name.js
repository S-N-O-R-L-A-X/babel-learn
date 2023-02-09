const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse");
const type = require('@babel/types');
const generator = require('@babel/generator');

const code = 'if (a===2) {a+=1};';

const ast = babelParser.parse(code, {})
traverse.default(ast, {
    enter(path) {
        if (type.isIdentifier(path.node, { name: "a" })) {
            path.node.name = "b";
        }
    }
});

console.log(generator.default(ast, {}, code));