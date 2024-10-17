// 1.生成器  Generator 函数
function* gen() {
    yield Promise.resolve("Tom")  //同步或异步
    yield "Jack"  //同步或异步
    yield "Lucy"
}

const person = gen()
// person.next()// 调用next方法 返回对象   调用顺序于yield顺序相同，调用完之后，返回一个对象，对象中有value和done两个属性
//返回对象中value为yield的值 , done为true表示函数执行完毕
console.log(person.next()); //{ value: Promise { 'Tom' }, done: false }
console.log(person.next()); //{ value: 'Jack', done: false }
console.log(person.next()); //{ value: 'Lucy', done: false }   
console.log(person.next()); //{ value: undefined, done: true }  


// 2.迭代器 (遍历器) Iterable

// 2.1set map


// set
let set: Set<number> = new Set([1, 1, 2, 2, 3, 3]) //天然去重 ，返回对象
console.log(set); // {1,2,3}

// 2.2map
let map: Map<number[], string> = new Map()
let Arr = [1, 2, 3]
map.set(Arr, "哈哈哈") //当key如果是引入类型时候，可以考虑map , 而对象的key一定是字符串
console.log(map.get(Arr)); // 哈哈哈

// 2.3伪数组
function args() {
    console.log(arguments);// 伪数组
}

// let doms = document.querySelectorAll("div")//NodeList  伪数组  



// 那么有没有一种方式支持去遍历这么多种数据类型呢？   ----迭代器

// 当我们打印 `[] `或者 `document.querySelectorAll("div")` 都会发现 其 `[[Prototype]]`上都有`Symbol(Symbol.iterator)`的方法
// 那么我们就可以使用迭代器(遍历器)。

// 2.4原理
const forE = (value: any) => {
    let iterator = value[Symbol.iterator]() //[Symbol.iterator]() 调用方法
    let next: any = { done: false }
    while (!next.done) {
        next = iterator.next()
        if (!next.done) {
            console.log(next.value);
        }
    }
}

forE(map) //  [ [ 1, 2, 3 ], '哈哈哈' ] 
forE(set) // 1 2 3
forE(Arr) // 1 2 3

//2.5迭代器的语法糖  for of

// 效果和上面的原理是一样的
for (let iterator of map) {
    console.log(iterator);//[ [ 1, 2, 3 ], '哈哈哈' ] 
}

for (let iterator of set) {
    console.log(iterator);// 1 2 3
}

for (let iterator of Arr) {
    console.log(iterator);// 1 2 3
}

//2.6 for of 对象不能使用 ,当你打印 {} 发现他上面没有[[Prototype]] 更没有Symbol(Symbol.iterator)的
let Obj = { name: "Tom", age: 18 }

// for (let iterator of Obj) { // 报错：类型“{ name: string; age: number; }”必须具有返回迭代器的 "[Symbol.iterator]()" 方法
// }

// 2.7 数组解构

//数组解构  数组...展开运算 原理也是去调用Symbol.iterator
let [w, y, z] = Arr
let copy = [...Arr]
console.log(w, y, z);


// 2.8  魔改对象 使其支持 for of ？

const Aobj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        return {
            max: this.max,
            current: this.current,
            next() {
                if (this.current == this.max) {
                    return {
                        value: undefined,
                        done: true
                    }
                } else {
                    return {
                        value: this.current++,
                        done: false
                    }
                }
            }
        }
    }
}
console.log([...Aobj])

for (let val of Aobj) {
    console.log(val);

}



// for of  for in


let nameArr: any = ['Tom', 'Jack', 'Lucy']
nameArr.foo = 'JJ'
/**
 * 区别1: for of 遍历的是数组的元素，而for in 遍历的是数组的索引
 */
for (const key in nameArr) {
    console.log(key); // 0 1 2 foo
}

for (const key of nameArr) {
    console.log(key); // Tom Jack Lucy     ,  不会返回foo属性
}

let nameObj = {
    name: 'Tom',
    age: 18
}

/**
 * 区别2: for in 遍历的是对象的键，而for of 不能遍历对象
 */

for (const key in nameObj) {
    console.log(key); // name age
}

// for (const key of nameObj) { //报错}


/**
 * 区别3：for in 遍历对象，会遍历原型上的属性，而for of 只能遍历数组内元素，不包括原型属性，添加属性
 */

// 使用for in会遍历数组所有的可枚举属性，包括原型，
// 如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用hasOwnProperty()方法可以判断某属性是不是该对象的实例属性

let AArr = [1, 2, 3]
// @ts-ignore
Array.prototype.a = 123

for (let index in AArr) {
    let res = AArr[index]
    console.log(res) //1 2 3 123
}


for (let index in AArr) {
    if (AArr.hasOwnProperty(index)) {
        let res = AArr[index]
        console.log(res) // 1 2 3
    }
}

// for of遍历的是数组元素值，而且for of遍历的只是数组内的元素，不包括原型属性和索引
for (let value of AArr) {
    console.log(value)//1 2 3
}
