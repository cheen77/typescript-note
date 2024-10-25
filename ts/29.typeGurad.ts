// 类型守卫

// 1.类型收缩 | 类型收窄

// typeof 是有缺陷的 比如说 数组 对象  null 返回的都是object ,函数返回function
// typeof 对于复杂类型和自定义类型的判断是有限的。
const isString = (str: any) => typeof str === "string"


console.log(typeof null); //object
console.log(typeof undefined);//undefined
console.log(typeof function () { });//function
console.log(typeof [1, 2, 3]);//object

// 使用 instanceof 类型守卫可以检查一个对象是否是特定类的实例
// 作用：instanceof 操作符用于检查一个对象是否是某个类的实例。它通过检查对象的原型链来确定对象是否由指定的类创建。

const isArr = (arr: any) => arr instanceof Array
console.log([1] instanceof Array); //true

// instanceof 操作符主要用于检查对象是否是特定类的实例，它无法检查基本类型
// console.log(1 instanceof String);


// 此外，它也无法检查对象是通过字面量创建的，因为字面量对象没有显式的构造函数。
class Person_ {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

const person_ = new Person_("Alice");
console.log(person_ instanceof Person_); // 输出: true

const obj_ = {};
console.log(obj_ instanceof Person_); // 输出: false



// 2.类型谓词 | 自定义守卫

// 实现一个函数支持任意类型
// 如果是对象，就检查里面的属性，
// 如果里面的属性是number就取两位，如果是string就去除左右空格
// 如果是函数就执行





const isNumber = (num: any) => typeof num === 'number'

const isFn = (fn: any) => typeof fn === 'function'

const isObj = (obj: any) => ({}).toString.call(obj) === '[object Object]' // Object.prototype.toString.call(obj)判断是否是对象

const fn3 = (data: any) => {
    let value;
    if (isObj(data)) {
        Object.keys(data).forEach(key => {
            value = data[key]
            if (isString(value)) {
                data[key] = value.trim()
            }
            if (isNumber(value)) {
                data[key] = value.toFixed(2)
            }
            if (isFn(value)) {
                value()
            }
        })
    }
}
const obj3 = {
    a: 100.22222,
    b: ' test  ',
    c: function () {
        console.log(this.a);
        return this.a;
    }
}
fn3(obj3)