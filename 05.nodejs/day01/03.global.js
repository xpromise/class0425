
/*
  global上的内容：
    setInterval / clearInterval
    setTimeout / clearTimeout
    setImmediate / clearImmediate  立即执行函数
    Buffer
    process 进程
      process.nextTick 立即执行函数
    console
 */
// console.log(global);

setTimeout(() => {
  console.log('setTimeout()');
}, 10);

setImmediate(() => {
  console.log('setImmediate()');
});

process.nextTick(() => {
  console.log('process.nextTick()');
});

/*
  https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
  nodejs中事件轮询机制：
    nodejs中的事件轮询借助libuv库使用。
    6个阶段：
      1. timers 计时并执行定时器的回调函数
      2. pending
      3. idea、prepare
      4. poll 轮询
        有一个回调队列，里面放置需要执行的回调函数。（绝大部分回调函数都在这）
        轮询回调队列
          不为空：依次取出，同步执行。直到全部执行完了~
          为空：
            如果之前设置过setImmediate或者定时器到点了，就会去下一个check阶段
            如果没有，就在当前阶段停留，直到新的回调函数被添加进来
      5. check 用来执行setImmediate设置的回调函数
      6. close

      process.nextTick 优先级最高。 能在任意阶段，优先执行
 */