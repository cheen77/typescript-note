// set 是一个元素唯一且无序的集合

let set: Set<any> = new Set([1, 2, 3, 4, 5, 5, () => { }, () => { }])
console.log(set.size); // 7

const cb = () => { }
let set1: Set<any> = new Set([1, 2, 3, 4, 5, 5, cb, cb])
console.log(set1.size); // 6


//天然去重，按照内存引用地址来进行唯一性判断，如果引用类型的内存引用地址相同，也可以去重

/**
 * 面试：为什么会出现上面的差别呢？ 为什么第一个() => { }, () => { }就打印 7  而第二个cb, cb就打印6呢？ 
 *   在 JavaScript 中，Set 数据结构是用来存储唯一值的集合，即使是引用类型的值（如对象或函数），也会根据它们的内存引用地址来进行唯一性判断。
 *   这意味着，如果两个回调函数引用同一个函数，即使它们是引用类型，也会被认为是重复的，而不会被添加多次。
 */


// 操作
set.add(6)
console.log(set);//{  1, 2, 3, 4, 5,  [Function (anonymous)], [Function (anonymous)] ,6 }
console.log(set.has(7));// 返回布尔值，false
console.log(set.delete(6)); //返回布尔值，true
// console.log(set.clear());// 清空，无返回值


// set中有iterator方法，可以支持遍历    for of  forEach

for (const iterator of set) {
    console.log(iterator); // 1  2  3  4  5  [Function (anonymous)]  [Function (anonymous)]
}

set.forEach((iterator) => {
    console.log(iterator);// 1  2  3  4  5  [Function (anonymous)]  [Function (anonymous)]
})

// 数组去重
let arr = [...new Set([1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5])]

console.log(arr); //[ 1, 2, 3, 4, 5 ]