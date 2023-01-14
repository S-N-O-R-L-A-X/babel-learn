const babel = require("@babel/core");
const code2 = 'function greet(input) {return input ?? "Hello world";}';

result2 = babel.parseSync(code2);
console.log(result2);