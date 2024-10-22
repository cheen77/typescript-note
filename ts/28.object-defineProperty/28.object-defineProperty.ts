// Object.defineProperty

//1.Object.defineProperty(obj, prop, descriptor)
//     obj 对象   prop 属性   descriptor描述符  =》 value 值


//@ts-ignore
Object.prototype.sex = "male"

// 2.使用
let object = {}
let newObj = Object.defineProperty(object, "name", {
    value: "zhangsan",
})
console.log(newObj === object); // true



// 3.默认不允许修改属性,删除属性,枚举属性

let object2: any = {}
Object.defineProperty(object2, "name", {
    value: "zhangsan",
})
console.log(object2); // {name: "zhangsan"}


object2.name = "lisi" // {name: "zhangsan"}

delete object2.name   // {name: "zhangsan"}

for (const key in object2) {
    console.log(key, object2[key]); //无答应
}

console.log("1", Object.keys(object2)); //[]
console.log("2", Object.getOwnPropertyNames(object2)); //['name']

/**
 * 面试： Object.keys和Object.getOwnPropertyNames区别
 *     1.Object.keys()  只返回可枚举的属性
 *     2.Object.getOwnPropertyNames()  返回所有属性，包括不可枚举的，但是原型上继承而来的属性拿不到
 */


// 4.描述符   =》 数据描述符  存取描述符

// 4.1 数据描述符
// value  与属性绑定的值
// configurable 是否可 删除
// enumerable 属性是否可枚举
// writable  属性是否可修改

// configurable 是否可 删除
let object3: any = {}
Object.defineProperty(object3, "name", {
    value: "zhangsan",
    // configurable: true
    writable: true
})

// delete object3.name//{}
object3.name = "Tom" // {name: "zhangsan"}
console.log(object3);


// writable  属性是否可修改
let object4: any = {}
Object.defineProperty(object4, "name", {
    value: "zhangsan",
    writable: true
})

object4.name = "Tom" // {name: "zhangsan"}
console.log(object4);

let object5: any = {}
Object.defineProperty(object5, "name", {
    value: "zhangsan",
    configurable: true,
    writable: true,
    enumerable: true
})

object5.name = "Tom" // {name: "zhangsan"}
console.log(object5);

for (const key in object5) {
    console.log("3", key, object5[key]); //name Tom  ,  sex male =>原型上继承Object的属性
}

// 4.2 存取描述符 
// get
// set

// 与typescript中类的get set很类似
// 注意  value/writable  和 get/set 不能同时存在

let object6: any = {}
Object.defineProperty(object6, "name", {
    // value: "zhangsan",
    get() {
        console.log("getter", "zhangsan");
        return "zhangsan"
    },
    set(newvalue) {
        console.log("setter", newvalue);
    }
})

object6.name = "Tom" // setter Tom
console.log(object6.name); // getter zhangsan


// 5.设计初衷

const res = {
    a: 1,//不可修改
    b: 2, //不可枚举
    c: 3
}

//   我们定义的对象中属性是无差异的，没办法定制化属性的行为，如果有对属性一些定制化要求，我们可以使用 Object.defineProperty

//  架构师：数据从后端返回，前端可能会出现对一些重要属性数据不小心的操作，这是很危险的行为 ，做一个数据的规范化

