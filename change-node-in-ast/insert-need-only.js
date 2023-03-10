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


const ast = babelParser.parse(code);
traverse.default(ast, {
    FunctionDeclaration(path) {
        path.node.body.body.unshift(types.assignmentExpression("=", types.identifier("obj"), types.objectExpression([])))
        // path.node.body.body.push(types.returnStatement(types.objectExpression([types.objectProperty(types.stringLiteral("ret"), path.node.argument), types.objectProperty(types.stringLiteral("obj"), types.identifier("obj"))])));
        path.node.body.body.push(types.returnStatement(types.objectExpression([])));

    },
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
