const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse");
const types = require('@babel/types');
const generator = require('@babel/generator');
const template = require('@babel/template')


// 定义try/catch语句模板
let objTemplate = `
    obj.left=LEFT;
    obj.right=RIGHT;
`;

// 创建模板
const temp = template.default(objTemplate);

const code = `function square(n) {
  if(n>2)
    return n * n;
}`;
const outer = "const obj={};\n" + code;

const ast = babelParser.parse(outer);
traverse.default(ast, {
    ReturnStatement(path) {
        path.node.argument = types.objectExpression([types.objectProperty(types.stringLiteral("ret"), path.node.argument), types.objectProperty(types.stringLiteral("obj"), types.identifier("obj"))]);
    },
    IfStatement(path) {
        // 给模版增加key，添加console.log打印信息
        let tempArgumentObj = {
            LEFT: types.identifier(path.node.test.left.name || path.node.test.left.value),
            RIGHT: types.numericLiteral(path.node.test.right.name || path.node.test.right.value),
        };

        // 通过temp创建try语句的AST节点
        const newNode = temp(tempArgumentObj);

        path.insertBefore(newNode);
    }
});

console.log(generator.default(ast).code);
