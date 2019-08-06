
const fs = require('fs');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { join } = require('path');

const entry = './src/app.js';

function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    })
  })
}

async function resolveModule(filePath) {
  // 1. 读取文件
  const code = await readFile(filePath);
  // console.log(code);
  // 2. 将代码解析成AST 抽象语法树
  const ast = parse(code, {
    sourceType: 'module', // 使用的是ES6模块化
  });
  // console.log(ast.program.body[1]);

  // console.log(ast.program.body); // 所有内容

  const dependencies = [];
  // 3. 解析特定语法 import
  traverse(ast, {
    ImportDefaultSpecifier(path) {
      // 得到变量名 和 文件路径
      // 得到变量名
      // const name = path.parent.specifiers[0].local.name;
      // 文件路径
      // console.log(path.parent.source.value); // ./math --> ./src/math
      const filepath = '.\\' + join('src', path.parent.source.value) + '.js';
      // console.log(filepath);
      // dependencies.push({ [name]: filepath })
      dependencies.push(filepath);
      // console.log(path.node);
    },
    /*ExpressionStatement(path) {
      console.log(path.node)
    }*/
  });

  return {
    dependencies,
    body: ast.program.body
  }
}

resolveModule(entry)
  .then(async ({ dependencies, body }) => {
    // console.log(dependencies, body);

    let math = [];

    for (var i = 0; i < dependencies.length; i++) {
      var filepath = dependencies[i]
      math = await resolveModule(filepath)
    }

    const resultAST = math.body.concat(body);

    const ast = {
      type: 'Program',
      body: resultAST
    };

    // 将AST转换代码输出出去
    const { code } = generate(ast);
    console.log(code);

    // 将code输出成文件
    fs.writeFile('./build/bundle.js', code, (err) => {
      console.log(err)
    });

  });
