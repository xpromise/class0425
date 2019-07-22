/*
  {
    "name": "test",  //  包名。今后下载使用的包名。 （包名不能有中文，不能与现有包名重复）
    "version": "1.0.0", // 版本号
    "scripts": {   // 运行包的指令
      "start": "",  // npm start  启动包的指令
      "dev": "", // npm run dev 启动包的指令
      "build": "", // npm run build 生产上线使用的代码
      "prod": "", // npm run prod 生产上线使用的代码
      "test": "" // npm run test
    },
    "dependencies": {  // 生产依赖：项目运行时依赖。（只要项目要打开运行时，需要使用的依赖，jquery）

    },
    "devDependencies": { // 开发依赖：项目构建打包时依赖。（babel、browserify...）

    }
  }

  依赖：当前包要想运行，必须基于别的包才能运行。
    当前包使用jquery，必须要引入jquery。jquery就是依赖包
 */