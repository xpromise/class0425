function fibonacci(num) {
  /*if (num < 3) {
    return 1;
  } else {
    //       num - 2 +   num - 1
    // num - 3 + num - 4 + num - 2 + num - 3
    return fibonacci(num - 1) + fibonacci(num - 2);
  }*/

  return num < 3 ? 1 : fibonacci(num - 1) + fibonacci(num - 2);

  /*// 第一个数
  var a = 1;
  // 第二个数
  var b = 1;
  // 要求的第三个数
  var c = 0;

  for (var i = 2; i < num; i++) {
    // 第一个数 + 第二个数 = 第三个数
    c = a + b;
    // a变成了第二个数。（下次遍历的第一个数）
    a = b;
    // b变成了第三个数。（下次遍历的第二个数）
    b = c;
  }

  return c;*/
}
// 分线程接收主线程发送干活的消息
var onmessage = function (event) {
  // 主线程发送过来的数据
  console.log('分线程接收主线程的消息：', event.data);

  var result = fibonacci(event.data);

  // 分线程干完活了，要将结果发送给主线程
  postMessage(result);
};
