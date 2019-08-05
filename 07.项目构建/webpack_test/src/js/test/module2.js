function sum(...args) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

// 默认暴露
export default sum;