//`Weak` 在英语的意思就是`弱`的意思，`weakSet` 和 `weakMap` 的`键`都是弱引用，不会被计入垃圾回收

//weakMap 的key 只能是引用类型


// 演示垃圾回收计数
let obj: any = { name: '小满zs' } //计数 1
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
 * 首先obj引用了这个对象 + 1，aahph也引用了 + 1，wmap也引用了，但是不会  + 1，应为他是弱引用，不会计入垃圾回收，因此 obj 和 aahph 释放了该引用 weakMap 也会随着消失的，但是有个问题你会发现控制台能输出，值是取不到的，应为V8的GC回收是需要一定时间的，你可以延长到500ms看一看，并且为了避免这个问题不允许读取键值，也不允许遍历，同理weakSet 也一样
 */