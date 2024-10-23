// 13个方法



/**
 * 1.Reflect.get(target, name, receiver)
 *     Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
 */

let myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
}

console.log(Reflect.get(myObject, "foo"));// 1

// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。

let myReceiverObject = {
    foo: 4,
    bar: 4,
};

console.log(Reflect.get(myObject, 'baz', myReceiverObject)); // 8



/**
 * 2.Reflect.set(target, name, value, receiver)
 *    Reflect.set方法设置target对象的name属性等于value。 返回布尔值
 */

let myObject2 = {
    foo: 0,
    set bar(value: number) {
        this.foo = value;
    },
}
console.log(myObject2.foo);//0
Reflect.set(myObject2, 'foo', 111)
console.log(myObject2.foo);///111
Reflect.set(myObject2, 'bar', 222)
console.log(myObject2.foo);///222

// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
let myReceiverObject2 = {
    foo: 1,
};

Reflect.set(myObject2, 'bar', 999, myReceiverObject2);
console.log(myReceiverObject2.foo); //999
console.log(myObject2.foo);//222

// 注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，
// 后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。

let p = {
    a: 'a'
};

let Pobj = new Proxy(p, {
    set(target, key, value, receiver) {
        console.log('set');// set
        return Reflect.set(target, key, value, receiver)

    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');// defineProperty
        return Reflect.defineProperty(target, key, attribute);

    }
});
Pobj.a = 'A';

// 如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。

let Pobj1 = new Proxy(p, {
    set(target, key, value) {
        console.log('set');// set
        return Reflect.set(target, key, value)

    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');// 不打印
        return Reflect.defineProperty(target, key, attribute);

    }
});
Pobj1.a = 'A';

/**
 * 3.Reflect.has(obj, name)
 *   Reflect.has方法对应name in obj里面的in运算符。返回布尔值
 */

let has_obj = {
    name: 'lucy'
}

// 旧写法
console.log("name" in has_obj); //true

// 新写法
Reflect.has(has_obj, 'name') // true

/**
 * 4.Reflect.deleteProperty(obj, name)
 *   Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。返回布尔值
 */

interface DeleteObj {
    name?: string
    age?: number
}

let delete_obj: DeleteObj = {
    name: 'lucy',
    age: 19,
}

// 旧写法
console.log(delete delete_obj.age); //true

// 新写法
console.log(Reflect.deleteProperty(delete_obj, "name")); //true

// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。


/**
 * 5.Reflect.construct(target, args)
 *   Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
 */
class Greeting {
    name: string
    constructor(name: string) {
        this.name = name
    }
}
// 使用 new 的写法
const greet = new Greeting('张三');
// 使用 Reflect.construct 的写法
const greet1 = Reflect.construct(Greeting, ['李四'])
console.log(greet.name);//张三
console.log(greet1.name);//李四


/**
 * 6.Reflect.getPrototypeOf(obj)
 *  Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
 */

// 旧写法
console.log(Object.getPrototypeOf(greet) === Greeting.prototype);//true

// 新写法
console.log(Reflect.getPrototypeOf(greet) === Greeting.prototype);//true


/**
 * 7.Reflect.setPrototypeOf(obj, newProto)
 *  Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），
 *  对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
 */


Reflect.setPrototypeOf(greet, { a: 1 })
// @ts-ignore
console.log(greet.a); //1



const myObj = {} as any;
// console.log(myObj.length); //报错 ，类型“{}”上不存在属性“length”。
// 将myObj的原型设置为Array.prototype，即：
Reflect.setPrototypeOf(myObj, Array.prototype);
console.log(myObj.length); //0


/**
 * 8.Reflect.apply(func, thisArg, args)
 *   Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
 */


const ages = [11, 33, 12, 54, 18, 96];
const youngest = Math.min.apply(Math, ages);
const youngest2 = Reflect.apply(Math.min, Math, ages);
console.log(youngest, youngest2, Math.min(...ages));

/**
 * 9.Reflect.defineProperty(target, propertyKey, attributes)
 *  Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。
 *  未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
 */

function MyDate() {

}

// 旧写法
Object.defineProperty(MyDate, 'now', {
    value: 1
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
    value: 1
});
//@ts-ignore
console.log(MyDate.now); //1

/**
 * 10.Reflect.getOwnPropertyDescriptor(target, propertyKey)
 *  Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
 */

let myOwnObject = {};
Object.defineProperty(myOwnObject, 'hidden', {
    value: true,
    enumerable: false,
});

// 旧写法
let theDescriptor = Object.getOwnPropertyDescriptor(myOwnObject, 'hidden');

// 新写法
let theDescriptor2 = Reflect.getOwnPropertyDescriptor(myOwnObject, 'hidden');
console.log(theDescriptor); // {value: true,writable: false,enumerable: false,configurable: false}

/**
 * 11.Reflect.isExtensible (target)
 *  Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
 *  “对象可扩展”指的是一个对象是否可以添加新的属性或方法
 */


// 旧写法
console.log(Object.isExtensible(myOwnObject));// true

// 新写法
console.log(Reflect.isExtensible(myOwnObject));// true

/**
 * 12.Reflect.preventExtensions(target)
 *  Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
 */

let myPreventObject = {};

// 旧写法
console.log(Object.preventExtensions(myPreventObject));// Object {}

// 新写法
console.log(Reflect.preventExtensions(myPreventObject));// true

/**
 * 13.Reflect.ownKeys(target)
 *  Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
 */

let myKeysObject = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4,
    1: 2
};
//@ts-ignore
Object.prototype.aaa = 1

// 旧写法
// console.log(Object.getOwnPropertyNames(myKeysObject));// [1,'foo', 'bar']

// console.log(Object.getOwnPropertySymbols(myKeysObject));//[Symbol(baz), Symbol(bing)]

// 新写法  但是只能获取到对象本身的属性，不包括原型上的属性
console.log(Reflect.ownKeys(myKeysObject));// [1,'foo', 'bar', Symbol(baz), Symbol(bing)]


