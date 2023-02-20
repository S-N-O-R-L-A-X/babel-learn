const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse");
const types = require('@babel/types');
const template = require('@babel/template');
const generator = require('@babel/generator');

function square(n) {
    if (n > 2)
        n = n + 1;
    if (n < 4) {
        return n * n;
    }
};

// 定义try/catch语句模板
let objTemplate = `
obj.IDX.left=LEFT;
obj.IDX.right=RIGHT;
`;

// 创建模板
const temp = template.default(objTemplate);

let cnt = 0;
const ast = babelParser.parse(square.toString());
traverse.default(ast, {
    IfStatement(path) {
        console.log(path);
        // 给模版增加key，添加console.log打印信息
        /* istanbul ignore next */

        let tempArguments = {
            IDX: String(cnt),
            LEFT: types.identifier(path.node.test.left.name || path.node.test.left.value),
            RIGHT: types.NumericLiteral(path.node.test.right.name || path.node.test.right.value),
        };

        ++cnt;
        // 通过temp创建所需语句的AST节点
        const newNode = temp(tempArguments);

        // const newNode = template.default(`obj.left=${types.identifier(path.node.test.left.name || path.node.test.left.value)};
        // obj.right==${types.identifier(path.node.test.left.name || path.node.test.left.value)};`)
        path.insertBefore(newNode);
    }
});

console.log(generator.default(ast).code);