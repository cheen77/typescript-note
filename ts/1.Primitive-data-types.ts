// 1.布尔值
let isDone: boolean = false;
console.log(isDone);

// 注意，使用构造函数 Boolean 创造的对象不是布尔值：
let createdByNewBoolean: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.


// 事实上 new Boolean() 返回的是一个 Boolean 对象：

let createdByNewBoolean1: Boolean = new Boolean(1);
// 直接调用 Boolean 也可以返回一个 boolean 类型：

let createdByBoolean: boolean = Boolean(1);
// 在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。
// 其他基本类型（除了 null 和 undefined）一样，不再赘述。



// 2.数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;



// 3.字符串
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old next month.`;



// 3.空值

// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

function alertName(): void {
    alert('My name is Tom');
}




// 4.Null 和 Undefined

// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：


let u: undefined = undefined;
let n: null = null;
// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

//TIPS 注意：如果你配置了tsconfig.json 开启了严格模式会报错 ,需要在tsconfig中关闭严格模式

// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u1: undefined;
let num1: number = u1;

// 而 void 类型的变量不能赋值给 number 类型的变量：
let u2: void;
let num2: number = u2;

// Type 'void' is not assignable to type 'number'.


