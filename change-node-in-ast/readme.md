### create new object expression

```js
types.objectExpression([types.objectProperty(types.stringLiteral("ret"), path.node.argument), types.objectProperty(types.stringLiteral("obj"), types.identifier("obj"))])
```

#### create a new empty object
```js
types.assignmentExpression("=", types.identifier("obj"), types.objectExpression([]))
```
