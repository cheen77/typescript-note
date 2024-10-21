//`Weak` 在英语的意思就是`弱`的意思，`weakSet` 和 `weakMap` 的`键`都是弱引用，不会被计入垃圾回收

//weakMap 的key 只能是引用类型


// 演示垃圾回收计数
let obj: any = { name: '22222' } //计数 1
let aahph: any = obj //2
let wmap: WeakMap<object, string> = new WeakMap()

wmap.set(obj, '111111') //2 他的键是弱引用不会计数的

obj = null // -1
aahph = null;//-1
//v8 GC 不稳定 最少200ms

setTimeout(() => {
    console.log(wmap)
}, 500)

/**
 * 首先obj引用了这个对象 + 1，aahph也引用了 + 1，wmap也引用了，但是不会  + 1，应为他是弱引用，不会计入垃圾回收，
 * 因此 obj 和 aahph 释放了该引用 weakMap 也会随着消失的，
 * 但是有个问题你会发现控制台能输出，值是取不到的，应为V8的GC回收是需要一定时间的，
 * 你可以延长到500ms看一看，并且为了避免这个问题不允许读取键值，也不允许遍历，同理weakSet 也一样
 */


let weakSet = new WeakSet([obj])



//weakMap 使用场景

// 1. 处理一些额外的数据

// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 递增用户来访次数
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits

// 不久之后，john 离开了
john = null;


// 现在，john 这个对象应该被垃圾回收，但它仍在内存中，因为它是 visitsCountMap 中的一个键。

// 当我们移除用户时，我们需要清理 visitsCountMap，否则它将在内存中无限增大。在复杂的架构中，这种清理会成为一项繁重的任务。

// 我们可以通过使用 WeakMap 来避免这样的问题：

// 📁 visitsCount.js
let visitsCountMap2 = new WeakMap(); // weakmap: user => visits count

// 递增用户来访次数
function countUser2(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}



//2 .缓存

// 📁 cache.js
let cache = new Map();

// 计算并记住结果
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculations of the result for */ obj;

        cache.set(obj, result);
    }

    return cache.get(obj);
}

// 现在我们在其它文件中使用 process()

// 📁 main.js
let obj = {/* 假设我们有个对象 */ };

let result1 = process(obj); // 计算完成

// ……稍后，来自代码的另外一个地方……
let result2 = process(obj); // 取自缓存的被记忆的结果

// ……稍后，我们不再需要这个对象时：
obj = null;

alert(cache.size); // 1（啊！该对象依然在 cache 中，并占据着内存！）



// 对于多次调用同一个对象，它只需在第一次调用时计算出结果，之后的调用可以直接从 cache 中获取。这样做的缺点是，当我们不再需要这个对象的时候需要清理 cache。

// 如果我们用 WeakMap 替代 Map，便不会存在这个问题。当对象被垃圾回收时，对应缓存的结果也会被自动从内存中清除。

// 📁 cache.js
let cache = new WeakMap();

// 计算并记结果
function process(obj) {
    if (!cache.has(obj)) {
        let result = /* calculate the result for */ obj;

        cache.set(obj, result);
    }

    return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */ };

let result1 = process(obj);
let result2 = process(obj);

// ……稍后，我们不再需要这个对象时：
obj = null;

// 无法获取 cache.size，因为它是一个 WeakMap，
// 要么是 0，或即将变为 0
// 当 obj 被垃圾回收，缓存的数据也会被清除