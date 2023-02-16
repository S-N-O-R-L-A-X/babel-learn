const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse");
const types = require('@babel/types');
const template = require('@babel/template')

const get_branches = [];

function square(n) {
    if (n > 2)
        return n * n;
};

// 定义try/catch语句模板
let objTemplate = `
obj.left=LEFT;
obj.right=RIGHT;
`;

// 创建模板
const temp = template.default(objTemplate);


const ast = babelParser.parse(square.toString());
traverse.default(ast, {
    IfStatement(path) {
        // 给模版增加key，添加console.log打印信息
        /* istanbul ignore next */
        get_branches.push(path.node);
        let tempArguments = {
            LEFT: types.identifier(path.node.test.left.name || path.node.test.left.value),
            RIGHT: types.NumericLiteral(path.node.test.right.name || path.node.test.right.value),
        };

        // 通过temp创建所需语句的AST节点
        const newNode = temp(tempArguments);

        path.insertBefore(newNode);
    }
});

console.log(get_branches);