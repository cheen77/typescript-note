# 1.基础类型

```
npm install typescript -g

//ts直接运行
npm i @types/node --save-dev （node环境支持的依赖必装）
npm i ts-node --g

//运行
ts-node xxx.ts


//查看ts版本
tsc -v
//实时生产一个js对应文件
tsc -w
//生成tsconfig.json文件
tsc -init
```

`JavaScript `的类型分为两种：`原始数据类型`（[Primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)）和`对象类型`（Object types）。

原始数据类型包括：`布尔值`、`数值`、`字符串`、`null`、`undefined`  以及 ES6 中的新类型  [`Symbol`](http://es6.ruanyifeng.com/#docs/symbol)  和 ES10 中的新类型  [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

## 1.1 布尔值

```typescript
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
```

## 1.2 数值

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 1.3 字符串

```typescript
let myName: string = "Tom";
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}. I'll be ${
  myAge + 1
} years old next month.`;
```

## 1.4 空值

```typescript
// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

function alertName(): void {
  alert("My name is Tom");
}
```

## 1.5 Null 和 Undefined

```typescript
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
```

# 2.任意类型

任意值（Any）用来表示允许赋值为任意类型。

1.没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型

```typescript
let anys: any = 123;
anys = "123";
anys = true;
```

2.声明变量的时候没有指定任意类型默认为 `any`

```typescript
let anys;
anys = "123";
```

3.弊端如果使用 `any` 就失去了 `TS` 类型检测的作用

4.TypeScript 3.0 中引入的 `unknown` 类型也被认为是 `top type `，但它更安全。与 `any` 一样，所有类型都可以分配给 `unknown`
`unknow `类型比`any`更加严格当你要使用`any `的时候可以尝试使用` unknow`

```typescript
//unknown 可以定义任何类型的值
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = null; // OK
value = undefined; // OK
value = Symbol("type"); // OK

//这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let names: unknown = "123";
let names2: string = names;

//这样就没问题 any类型是可以的
let _names: any = "123";
let _names2: string = _names;

//unknown可赋值对象只有unknown 和 any
let bbb: unknown = "123";
let aaa: any = "456";

aaa = bbb;
```

区别 2

```typescript
// 如果是any类型在对象没有这个属性的时候还在获取是不会报错的
let obj: any = { b: 1 };
obj.a;

// 如果是unknow 是不能调用属性和方法
let obj: unknown = { b: 1, ccc: (): number => 213 };
obj.b;
obj.ccc();
```

# 3. object、Object 以及{}

## 3.1 Object

`Object` 类型是所有 `Object` 类的实例的类型。 由以下两个接口来定义：

- `Object `接口定义了 `Object.prototype` 原型对象上的属性；
- `ObjectConstructor` 接口定义了 `Object` 类的属性。

这个类型是跟原型链有关的原型链顶层就是 `Object`，所以值类型和引用类型最终都指向 `Object`，所以他包含所有类型。

```typescript
//1.Object
let a: Object = 1;
let a1: Object = "aaa";
let a2: Object = null;
let a3: Object = undefined;
let a4: Object = [];
let a5: Object = {};
let a6: Object = () => {};
```

## 3.2 object

object 代表所有非原始类型的类型，例如 数组 对象 函数等，常用于泛型约束

```typescript
let o: object = {}; //正确
let o1: object = []; //正确
let o2: object = () => 123; //正确
let b: object = "123"; //错误
let c: object = 123; //错误
```

## 3.3 {}

看起来很别扭的一个东西 你可以把他理解成 new Object 就和我们的第一个 Object 基本一样 包含所有类型

tips 字面量模式是不能修改值的

```typescript
let b1: {} = { name: 1 }; //正确
let b2: {} = () => 123; //正确
let b3: {} = 123; //正确
```

# 4.对象的类型——接口

在` TypeScript` 中，我们使用接口（`Interfaces`）来定义对象的类型。

```typescript
// 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
interface Person {
  name: string;
  age: number;
}
//约束了 tom 的形状必须和接口 Person 一致。
let tom: Person = {
  name: "Tom",
  age: 25,
};
```

```typescript
//interface  重名 合并
//interface  任意key
//interface  ? readonly
//interface  接口继承
//interface  定义函数类型
//不能多属性 也不能少属性

// 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
interface Person {
  name: string;
  age: number;
}

//interface  重名 合并
interface Person {
  sex: string;
}

//约束了 tom 的形状必须和接口 Person 一致。
let tom: Person = {
  name: "Tom",
  age: 25,
  sex: "男",
};

//================================================================================

//任意属性 [propName: string]
interface Person2 {
  name: string;
  age: number;
  [propName: string]: any;
}

let Jack: Person2 = {
  name: "Tom",
  age: 25,
  a: 1,
  b: 2,
};

interface Person3 {
  name: string;
  age: number;
  // 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集，这里定义为string,那么上面的属性都必须是string
  [propName: string]: string;
}

interface Person3_ {
  name: string;
  age: number;
  // 可以使用联合类型解决
  [propName: string]: string | number;
}

//================================================================================

// ? readonly

interface Person4 {
  name: string;
  age?: number;
  readonly id: number;
  readonly cb: () => boolean;
}

let Davaid: Person4 = {
  name: "Davaid",
  id: 1,
  cb: () => {
    return true;
  },
};

// 如果我希望 你可以 通过  Davaid.cb() 访问  但是不能 修改 Davaid.cb = () => {return false}，可以通过readonly属性
Davaid.cb();

Davaid.cb = () => {
  return false;
};

// readonly应用场景：不希望随便修改的值：比如函数 、 id 等

//================================================================================

//继承  和重名类似效果
interface A {
  name: string;
}

interface B extends A {
  age: number;
}

let boy: B = {
  name: "Tom",
  age: 25,
};

// ================================================================================

//定义函数类型

interface Fn {
  (name: string): number[];
}

const fn: Fn = (name: string) => {
  return [1, 2, 3];
};

// 如果没有返回值
interface Fn2 {
  (name: string): void;
}

const fn2: Fn2 = (name: string) => {};
```

# 5.数组类型

在`TypeScript` 中，数组类型有多种定义方式，比较灵活。

## 「类型 + 方括号」表示法

```typescript
let arr: number[] = [1, 4, 2, 3, 5];
```

## 数组泛型

```typescript
let arr2: : Array<number> = [1, 4, 2, 3, 5];
```

## 用接口表示数组

```typescript
interface NumberArray {
  [index: number]: number;
}
//只要索引的类型是数字时，那么值的类型必须是数字。
let arr3: NumberArray = [1, 1, 2, 3, 5];
```

## 多维数组

```typescript
let data: number[][] = [
  [1, 2],
  [3, 4],
];
```

## arguments 类数组

类数组（Array-like Object）不是数组类型，比如 arguments：

```typescript
function sum(...args: number[]) {
  console.log(args); // [ 111, 222, 333 ]
  console.log(arguments); //类数组 [Arguments] { '0': 111, '1': 222, '2': 333 }
  let arr: number[] = arguments; //错误的arguments 是类数组不能这样定义
}
sum(111, 222, 333);
```

事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```typescript
function sum() {
  console.log(args); // [ 111, 222, 333 ]
  console.log(arguments); //类数组 [Arguments] { '0': 111, '1': 222, '2': 333 }
  let arr: IArguments = arguments; //错误的arguments 是类数组不能这样定义
}
```

其中 `IArguments` 是 TypeScript 中定义好了的类型，它实际上就是：

```typescript
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

## any 在数组中的应用

```typescript
let list: any[] = ["xxx", 25, { a: 111 }];
```

# 6.函数的类型

## 1.函数定义类型和返回值 | 箭头函数定义类型和返回值

```typescript
const add = (x: number, y: number): number => {
  return x + y;
};
// function add(x: number, y: number): number {
//     return x + y;
// }
console.log(add(1, 1)); // 2
```

## 2.函数默认的参数 | 函数可选参数

```typescript
const add2 = (x: number = 10, y: number = 20): number => {
  return x + y;
};
console.log(add2()); // 30
console.log(add2(2, 3)); // 5

// 注意 默认值和函数可选参数 不能一起用
// const add3 = (x: number = 10, y?: number = 20): number => {
//     return x + y;
// };

const add4 = (x: number = 10, y?: number): number => {
  return x + y;
};
console.log(add4(4)); // 4
```

## 3. 参数是一个对象如何定义

```typescript
interface User {
  name: string;
  age: number;
}
const user = (user: User): User => {
  return user;
};
console.log(user({ name: "zhangsan", age: 18 }));
```

## 4. 函数 this 类型

```typescript
interface Obj {
  users: string[];
  addUser: (this: Obj, name: string) => void;
}

// ts可以定义this的类型,在js中无法使用,必须是第一个参数定义this的类型,传参的时候会忽略第一个this参数 ,注意这里不能使用箭头函数去指定this
let obj: Obj = {
  users: ["zhangsan"],
  addUser: function (this: Obj, name: string) {
    this.users.push(name);
  },
};

obj.addUser("lisi");
```

## 5.函数重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

- 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
- 如果参数类型不同，则参数类型应设置为 any。
- 参数数量不同你可以将不同的参数设置为可选。

```typescript
/**
 * 举例:
 *      比如有一个需求: numArr: [ 1,2,3,4,5,6,7,8,9,10  ]
 *         我希望有一个函数 func(x:number | string)  实现 传入
 *           x输入一个数字 就 push到数组末尾
 *           x输入一个字符串 就 push到数组头部
 *         那么我们就可以使用函数重载实现
 */

let numArr: (string | number)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // (string | number)[] or Array<string | number>
function func(x: number): (string | number)[];
function func(x: string): (string | number)[];
function func(x: number | string): (string | number)[] {
  console.log("typeof x", typeof x);

  if (typeof x === "number") {
    numArr.unshift(x);
    return numArr;
  } else if (typeof x === "string") {
    numArr.push(x);
    return numArr;
  }
}

console.log(func("lisa")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,lisa]
console.log(func(7777)); //[7777,1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

# 7.联合类型 | 交叉类型 | 类型断言

## 1.联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```typescript
// 比如 电话号既可能是一个字符串，也可能是一个数字：
let phone: string | number = "028-888888";

// 比如 后端返回枚举 1 代表 true  0 代表 false,然后后端又改需求 可以传boolean类型
let f = function (type: number | boolean): boolean {
  // 0 false => !0 true => !!0 => false
  //   1 true => !1 false => !!1 true
  //  true   !!true => true
  return !!type;
};

console.log(f(1)); //true
console.log(f(0)); //false
console.log(f(true)); //true
console.log(f(false)); //false
```

## 2.交叉类型

多种类型的集合，联合对象将具有所联合类型的所有成员

```typescript
// 类似于interface中的 extends 和重名  , 使用  &

interface Person {
  name: string;
  age: number;
}

interface Man {
  sex: string;
}

let man: Person & Man = {
  name: "zhangsan",
  age: 18,
  sex: "男",
};
```

## 3.类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 1.语法

```
值 as 类型
```

或

```
<类型>值
```

在 `tsx 语法`（React 的 jsx 语法的 ts 版）中必须使用前者，即  `值 as 类型`。

形如 `<Foo>` 的语法在 tsx 中表示的是一个 `ReactNode`，在 ts 中除了表示类型断言之外，也可能是表示一个[泛型](https://ts.xcatliu.com/advanced/generics.html)。

故建议大家在使用类型断言时，统一使用 `值 as 类型` 这样的语法

**需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误。**

### 2.用途

#### 将一个联合类型断言为其中一个类型

```typescript
// 将一个联合类型断言为其中一个类型
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

// 获取共有属性时正常
function getName(animal: Cat | Fish) {
  return animal.name;
}

// 但如果我们希望获取Fish 的swim()  那么我们需要将联合类型断言为其中Fish类型

interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish) === "function") {
    return true;
  }
  return false;
}
```

#### 将一个父类断言为更加具体的子类

当类之间有继承关系时，类型断言也是很常见的：

```typescript
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}
```

#### 将任何一个类型断言为 any

```typescript
//如果window上有一个foo属性,ts下可能会报错
(window as any).foo = 1;
```

### 3. as const

在 TypeScript 中，`as const` 是一种**类型断言**，用于将一个表达式的值转换为**不可变的常量类型**（literal type）

这样做可以让 TypeScript 更加精确地推断出表达式的类型。

#### 作用

- 1. **将值变为字面量类型**：
     默认情况下，TypeScript 会将某些值（如字符串、数字、数组）推断为更通用的类型。例如，一个字符串字面量 `"hello"` 会被推断为 `string`，而不是具体的 `"hello"`。使用 `as const` 可以告诉 TypeScript 不要推断为通用类型，而是保留字面量类型。
- 2. **使对象的所有属性变为只读**：
     对于对象或数组，`as const` 不仅会将其值变为字面量类型，还会将所有属性或元素标记为 `readonly`，从而防止修改。

**示例 1：字面量类型**

```typescript
let message = "hello world";
message = "hello world 111";
let message2 = "hello world" as const;
message2 = "hello world 222"; //error:不能将类型“"hello world 222"”分配给类型“"hello world"”
```

**示例 2：数组类型**

```typescript
const colors = ["red", "green", "blue"]; // 推断为 string[] 类型
const colorsLiteral = ["red", "green", "blue"] as const; // 推断为 readonly ["red", "green", "blue"]

colors.unshift("pink"); // 推断为 string[] 类型
colorsLiteral.unshift("pink"); // 错误 , 推断为 readonly ["red", "green", "blue"]
```

**示例 3：对象类型**

```typescript
const user = {
  name: "Alice",
  age: 25,
}; // 推断为 { name: string; age: number }

const userLiteral = {
  name: "Alice",
  age: 25,
} as const; // 推断为 { readonly name: "Alice"; readonly age: 25 }
```

#### 实际应用

**1. 用于联合类型**

`as const` 可以让 TypeScript 精确推断联合类型，尤其是在枚举和状态机等场景中。

```typescript
const STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
  PENDING: "pending",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];
// Status 推断为 "success" | "failure" | "pending"
```

**2. 用于 Redux 等需要状态的地方**

在状态管理中，我们通常需要用到具体的常量值：

```typescript
const action = {
  type: "INCREMENT",
  payload: 1,
} as const;

// action.type 推断为 "INCREMENT" 字面量类型
```

通过 `as const`，我们可以确保 `action.type` 被推断为 `"INCREMENT"`，而不是广泛的 `string` 类型，从而提高类型安全性。

#### 总结

- **as const** 将变量的类型推断为字面量类型（literal type）。
- **对象或数组** 使用 `as const` 后，它们的属性或元素会变为 `readonly`，从而不可修改。
- 它在需要更严格的类型推断（如状态管理、常量定义等场景）中非常有用。

# 8.内置对象

JavaScript  中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在  [TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020)  中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

## 1.ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有：

`Boolean`、`Error`、`Date`、`RegExp` 等。

我们可以在 TypeScript 中将变量定义为这些类型：

```typescript
let b8: Boolean = new Boolean(1);
console.log(b8); //[Boolean: true]
let n8: Number = new Number(true);
console.log(n8); //[Number: 1]
let s8: String = new String("哈哈哈");
// console.log(s8);/[String: '哈哈哈']
let d8: Date = new Date();
console.log(d8); //2024-10-15T09:15:53.395Z
let r8: RegExp = /^1/;
console.log(r8); ///^1/
let e8: Error = new Error("error!");
console.log(e8); //Error: error!
```

更多的内置对象，可以查看 [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。

## 2.DOM

```typescript
// HTML(标签名)Element
let div1: HTMLDivElement = document.querySelector("div");
let canvas1: HTMLCanvasElement = document.querySelector("canvas");

// h5语义化标签归类到 HTMLElement
let article1: HTMLElement = document.querySelector("article");
let section1: HTMLElement = document.querySelector("section");

// 或者  as  Element
let div2 = document.querySelector("div") as Element;

// 集合
let divs2: NodeList = document.querySelectorAll("div");
//or
let divs1: NodeListOf<HTMLDivElement> = document.querySelectorAll("div ");

// 多个dom节点
let divs3: NodeListOf<HTMLDivElement | HTMLCanvasElement> =
  document.querySelectorAll("div ,canvas");

let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener("click", function (e: MouseEvent) {
  // Do something
});
```

## 3.BOM

```typescript
let local: Storage = localStorage;
let lo: Location = location;
let promise: Promise<number> = new Promise((resolve) => resolve(1));
promise.then((res) => console.log(res));

let cookie: string = document.cookie;
```

## 用 TypeScript 写 Node.js

`Node.js` 不是内置对象的一部分，如果想用 `TypeScript` 写` Node.js`，则需要引入第三方声明文件：

```
npm install @types/node --save-dev
```

# 9. 类

## 1.概念

虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

## 2.class 的基本用法 interface 定义类 类型约束 implements 和 继承

```typescript
/**
 * 1.1 implements
 */

interface Options {
  el: string | HTMLElement;
}

interface VueCls {
  options: Options; //定义需要通过构造函数传入的参数
  init(): void; //定义需要实现的init方法
}

// interface后通过implements来约束Vue类
class Vue implements VueCls {
  options: Options; //在类中定义需要传入的参数
  constructor(options: Options) {
    this.options = options; //赋值
    this.init(); //初始调用
  }
  init(): void {
    //定义需要实现的init方法
  }
}

let vue = new Vue({
  el: "#app",
});

// 这样我们就实现了一个implements约束Vue类
```

## 3.class 的修饰符 readonly private protected public

### readonly

`readonly`只读属性关键字，只允许出现在`属性声明`或`索引签名`或`构造函数中`。

```typescript
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal("Jack");
console.log(a.name); // Jack
a.name = "Tom";

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果  `readonly`  和其他访问修饰符同时存在的话，需要写在其后面。

```typescript
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

### public private 和 protected

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，只能在类中访问
- `protected` 修饰的属性或方法是受保护的，子类和类中可以访问

```typescript
// public
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let jack = new Animal("Jack");
console.log(jack.name); // Jack
jack.name = "Tom";
console.log(jack.name); // Tom
```

```typescript
// private
class Animal2 {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let jack2 = new Animal2("Jack");
console.log(jack2.name); //私有name,只能类中访问
jack2.name = "Tom";
```

如果是用 protected 修饰，则允许在子类中访问：

```typescript
// protected
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
```

当构造函数修饰为 private 时，该类不允许被继承或者实例化：

```typescript
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name); // 错误: 父级构造函数修饰为 private,不能被继承
  }
}

let a = new Animal("Jack"); // 错误: 父级构造函数修饰为 private,不能被实例化
```

当构造函数修饰为 protected 时，该类只允许被继承：

```typescript
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal("Jack"); // 报错:该类只能被继承
```

### 参数属性

修饰符和 `readonly` 还可以使用在构造函数参数中，等同于类中定义该属性同时给该`属性赋值`，使代码更简洁。

```typescript
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

## 4.super 原理

### 原理

原型链继承： `TypeScript `通过原型链的机制让子类继承父类的属性和方法。`super` 允许子类显式调用父类的构造函数和方法。
在` JavaScript` 中，每个对象都有一个内部的` [[Prototype]] 属性`指向它的父类，继承关系就是通过这个机制实现的。

调用父类构造函数： 当你在子类中调用 `super()`，`JavaScript/TypeScript` 的内部机制会：

查找父类的构造函数。
调用父类的构造函数并传入参数。
如果父类的构造函数有返回值，`super()` 会返回那个值。

访问父类方法：
使用 `super.method()`，`JavaScript` 会从子类的原型链向上查找，找到父类的 method 方法并执行它。

```typescript
class Parent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    console.log(`Hello from ${this.name}`);
  }
}

class Child extends Parent {
  constructor(name: string) {
    // 调用父类构造函数
    super(name);
  }
  greet() {
    console.log("This is the child speaking");
    // 调用父类的 greet 方法
    super.greet();
  }
}

const child = new Child("Alice");
child.greet();
```

```typescript
// 假设编译后的 JavaScript 代码，super 在 JavaScript 内部通过对父类的原型对象的引用来实现：
function Parent(name) {
  this.name = name;
}

Parent.prototype.greet = function () {
  console.log(`Hello from ${this.name}`);
};

function Child(name) {
  // .call作用于函数,相当于是将this指向Child,然后把name传给Parent函数,这样this.name就是子集传入的name
  Parent.call(this, name); // 相当于 super(name)
}

Child.prototype = Object.create(Parent.prototype); // 继承父类的原型链
Child.prototype.constructor = Child; //修复 Child 构造函数的 constructor 属性指向。

Child.prototype.greet = function () {
  console.log("This is the child speaking");
  Parent.prototype.greet.call(this); // 相当于 super.greet()
};

const child = new Child("Alice");
child.greet();
```

### .call()

在 JavaScript 中，`.call()` 是 `Function` 对象的一个方法，它可以用来调用一个函数，并且显式地指定 `this` 的值和参数。

#### **call() 的作用：**

1. **改变函数执行时的 this 指向**：通过 `call()`，你可以在调用一个函数时，显式指定该函数内部的 `this` 指向某个特定的对象。
2. **传递参数**：`call()` 方法允许你逐个传递参数，而不是通过数组传递参数（这是 `apply()` 的区别）。

#### **call() 方法的语法：**

```javascript
functionName.call(thisArg, arg1, arg2, ...)
```

- **functionName**：你要调用的函数。
- **thisArg**：指定函数执行时的 `this` 值。它可以是任何值（对象、数组、原始类型等）。如果你传递 `null` 或 `undefined`，那么 `this` 将默认指向全局对象（在严格模式下则为 `undefined`）。
- **arg1, arg2, ...**：这些是你想要传递给函数的参数，可以逐个传递。

#### **例子：**

```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = {
  name: "Alice",
};

// 使用 call 改变 this 的指向
greet.call(person); // 输出: Hello, Alice
```

在这个例子中，`greet.call(person)` 调用了 `greet` 函数，同时将函数的 `this` 指向了 `person` 对象，因此在函数中 `this.name` 实际上访问的是 `person.name`。

## 5.静态方法 static

使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```typescript
class Animal4 {
  public constructor() {}
  static printName() {
    console.log("Animal4");
  }
}
console.log(Animal4.printName); //Animal4
```

## 6.get set

使用 `getter` 和 `setter` 可以改变属性的赋值和读取行为：

注意 get set 的函数 可以通过属性访问的方式调用,且 get set 函数名必须相同

```typescript
class Animal5 {
  constructor(name: string) {
    this.name = name; // name()可以通过属性访问的方式调用  this.name  === > this.name()
  }
  get name() {
    return "Jack";
  }
  set name(value) {
    console.log("setter: " + value);
  }
}
let val = new Animal5("Kitty"); // setter: Kitty
console.log(val.name); //getter    Jack
val.name = "Tom"; // setter: Tom
```

## 7.抽象类 abstract

什么是抽象类？
首先，抽象类是不允许被实例化的
其次，抽象类中的抽象方法必须被子类实现

什么是抽象方法?
所定义的方法,都只能描述不能进行一个实现

```typescript
abstract class BaseClass {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract init(name: string): void;

  getName() {
    return this.name;
  }
}

// 抽象类不能实例化
// new BaseClass()

// 用途: 顶层设计,作为基类,供派生类继承

class A extends BaseClass {
  constructor() {
    super("Tom");
  }
  init(name: string): void {}

  setName(name: string) {
    this.name = name; //super父类实例化后能够拿到所有属性和方法
  }
}

const v = new A();
v.setName("Jack");

console.log(v.getName()); //Jack
```

# 10.元组类型

如果需要一个固定大小的不同类型值的集合，我们需要使用元组。

```typescript
let array: [number, string, undefined] = [1, "ddd", undefined];

array[0].length; // 报错 类型“number”上不存在属性“length”。
array[1].length;

// 越界元素
array.push(null); //报错 类型“null”的参数不能赋给类型“string | number | undefined”的参数

// 对于越界的元素他的类型被限制为 联合类型
array.push("哈哈哈");

// 元组类型还可以支持自定义名称和变为可选的
let array1: [x: number, y?: boolean] = [1];

// 应用场景 例如定义excel返回的数据

let excel: [string, string, number, string][] = [
  ["title", "name", 1, "123"],
  ["title", "name", 1, "123"],
  ["title", "name", 1, "123"],
  ["title", "name", 1, "123"],
  ["title", "name", 1, "123"],
];

let array3: readonly [number, string, undefined] = [1, "ddd", undefined];
type firstType = (typeof array3)[0];
```

# 11 枚举类型

在 `javaScript` 中是没有枚举的概念的` TS` 帮我们定义了枚举`Enum`这个类型

## 1.数字枚举

```typescript
//1.数字枚举
// 默认从0往上
enum Color {
  Red,
  Green,
  BLue,
}

// 增长枚举
enum Color2 {
  Red = 1,
  Green,
  BLue,
}
```

## 2.字符串枚举

```typescript
// 2.字符串枚举

enum Color3 {
  Red = "red",
  Green = "green",
  BLue = "blue",
}
```

## 3.异构枚举

```typescript
// 3.异构枚举
// 枚举可以混合字符串和数字成员
enum Types {
  No = "No",
  Yes = 1,
}
```

## 4.接口枚举

```typescript
// 4.接口枚举
// 定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds
// 声明对象的时候要遵循这个规则

enum Types {
  yyds,
  dddd,
}
interface A_ {
  red: Types.yyds;
}

let obj1: A_ = {
  red: Types.yyds,
};
```

## 5.const 枚举

```typescript
const enum Types2 {
  No = "No",
  Yes = 1,
}
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const 枚举

## 6.反向映射

它包含了正向映射（ name -> value）和反向映射（ value -> name）

要注意的是 不会为`字符串枚举成员`生成反向映射。

```typescript
enum Types3 {
  success,
}

let success: number = Types3.success;
let key: string = Types3[success];
console.log(`key--------${key}`, `value--------${success}`); // key--------success value--------0
```

# 12.类型推论|类型别名

## 1.类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

## 2.类型别名

`type` 关键字（可以给一个类型定义一个名字）多用于复合类型

## 1. 定义类型别名

```typescript
type str = string;

let s: str = "aaa";

console.log(s);
```

## 2. 定义函数别名

```typescript
type str = () => string;

let s: str = () => "aaa";

console.log(s);
```

## 3. 定义联合类型别名

```typescript
type str = string | number;

let s: str = 123;

let s2: str = "123";

console.log(s, s2);
```

## 4. 定义值的别名

```typescript
type value = boolean | 0 | "213";

let s: value = true;
//变量s的值  只能是上面value定义的值
```

## 5.type 和 interface 区别

- 1.interface 可以继承 type 只能通过 & 交叉类型合并
- 2.type 可以定义 联合类型 和 可以使用一些操作符 interface 不行
- 3.interface 遇到重名的会合并 type 不行

## 6.type 高级用法

type 中 extends 是包含的意思
左边的值 会作为 右边类型的子类型

1.  any unknow
2.  Object
3.  Number String ...
4.  number string ....
5.  never

```typescript
type a1 = 1 extends number ? 1 : 0; //1

type a2 = 1 extends Number ? 1 : 0; //1

type a3 = 1 extends Object ? 1 : 0; //1

type a4 = 1 extends any ? 1 : 0; //1

type a5 = 1 extends unknow ? 1 : 0; //1

type a6 = 1 extends never ? 1 : 0; //0
```

# 13. never 类型

## 定义

`TypeScript` 将使用` never` 类型来表示不应该存在的状态

```typescript
// 返回never的函数必须存在无法达到的终点
type CC = string & number; //never
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
  throw new Error(message);
}

// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
  while (true) {}
}
```

## never 与 void 的差异

```typescript
//void类型只是没有返回值 但本身不会出错
function Void(): void {
  console.log();
}

//只会抛出异常没有返回值
function Never(): never {
  throw new Error("aaa");
}
```

差异 2

当我们鼠标移上去的时候会发现 只有 void 和 number never 在联合类型中会被直接移除

```typescript
type A = void | number | never;
```

## 场景

```typescript
type KUN = "唱" | "跳" | "rap";

function IKun(value: KUN) {
  switch (value) {
    case "唱":
      break;
    case "跳":
      break;
    case "rap":
      break;
    default:
      //是用于场景兜底逻辑
      const error: never = value;
      return error;
  }
}
```

# 14.symbol 类型 上

自 `ECMAScript 2015` 起，`symbol` 成为了一种新的原生类型，就像 `number` 和` string` 一样。

`symbol`类型的值是通过`Symbol`构造函数创建的。

可以传递参做为唯一标识 只支持 `string` 和 `number` 类型的参数

```typescript
let sym1 = Symbol(1);
let sym2 = Symbol("key"); // 可选的字符串key
```

## 应用

```typescript
let like1: symbol = Symbol(1); //唯一的
let like2: symbol = Symbol(1); //唯一的

console.log(like1 === like2); //false 因为symbol是唯一的，会分配不同的引用地址

// for Symbol for全局symbol有没有注册过这个key，  如果又直接拿来用，没有的话就会创建一个
console.log(Symbol.for("22") === Symbol.for("22")); //true

// 用途 解决对象中key重复的问题
let Ikun = {
  name: "KUNKUN",
  [like1]: "唱", // symbol类型通过 [name]去定义key
  [like2]: "跳",
};

console.log(Ikun); //{ name: 'KUNKUN', [Symbol(1)]: '唱', [Symbol(1)]: '跳' }

// 1 for in 遍历 不能读到symbol的key
for (const key in Ikun) {
  console.log(key); //  name
}
// 2 Object.keys 遍历 不能读到symbol的key
Object.keys(Ikun);
console.log(Object.keys(Ikun)); //[ 'name' ]
// 3 getOwnPropertyNames  不能读到symbol的key
console.log(Object.getOwnPropertyNames(Ikun)); //[ 'name' ]
// // 4 JSON.stringfy  不能读到symbol
console.log(JSON.stringify(Ikun)); //{"name":"KUNKUN"}

// 如何获取

// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(Ikun);
console.log(Object.getOwnPropertySymbols(Ikun)); //[ Symbol(1), Symbol(1) ]
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(Ikun);
console.log(Reflect.ownKeys(Ikun)); //[ 'name', Symbol(1), Symbol(1) ]
```

# 15. symbol 下

## 1.生成器

也叫`Generator `函数,`Generator` 函数是`ES6` 提供的一种异步编程解决方案，语法行为与传统函数完全不同

```typescript
// 生成器  Generator 函数
function* gen() {
  yield Promise.resolve("Tom"); //同步或异步
  yield "Jack"; //同步或异步
  yield "Lucy";
}

const person = gen();
// person.next()// 调用next方法 返回对象   调用顺序于yield顺序相同，调用完之后，返回一个对象，对象中有value和done两个属性
//返回对象中value为yield的值 , done为true表示函数执行完毕
console.log(person.next()); //{ value: Promise { 'Tom' }, done: false }
console.log(person.next()); //{ value: 'Jack', done: false }
console.log(person.next()); //{ value: 'Lucy', done: false }
console.log(person.next()); //{ value: undefined, done: true }
```

## 2.迭代器 (遍历器) Iterable

### set map

```typescript
// set
let set: Set<number> = new Set([1, 1, 2, 2, 3, 3]); //天然去重 ，返回对象
console.log(set); // {1,2,3}

// map
let map: Map<number[], string> = new Map();
let Arr = [1, 2, 3];
map.set(Arr, "哈哈哈"); //当key如果是引入类型时候，可以考虑map , 而对象的key一定是字符串
console.log(map.get(Arr)); // 哈哈哈
```

### 伪数组

```typescript
function args() {
  console.log(arguments); // 伪数组
}
let doms = document.querySelectorAll("div"); // 伪数组
```

### 如何遍历 set map 伪数组？

当我们打印 `[] `或者 `document.querySelectorAll("div")` 都会发现 其 `[[Prototype]]`上都有 `Symbol(Symbol.iterator)`的方法
那么我们就可以使用迭代器 (遍历器)。

#### 原理

```typescript
const forE = (value: any) => {
  let iterator = value[Symbol.iterator](); //[Symbol.iterator]() 调用方法
  let next: any = { done: false };
  while (!next.done) {
    next = iterator.next();
    if (!next.done) {
      console.log(next.value);
    }
  }
};

forE(map); //  [ [ 1, 2, 3 ], '哈哈哈' ]
forE(set); // 1 2 3
forE(Arr); // 1 2 3
```

#### 语法糖 for of

```typescript
// 效果和上面的原理是一样的
for (let iterator of map) {
  console.log(iterator); //[ [ 1, 2, 3 ], '哈哈哈' ]
}

for (let iterator of set) {
  console.log(iterator); // 1 2 3
}

for (let iterator of Arr) {
  console.log(iterator); // 1 2 3
}
```

#### for of 不支持 对象

```typescript
//2.6 for of 对象不能使用 ,当你打印 {} 发现他上面没有[[Prototype]] 更没有Symbol(Symbol.iterator)的
let Obj = { name: "Tom", age: 18 };

for (let iterator of Obj) {
  // 报错：类型“{ name: string; age: number; }”必须具有返回迭代器的 "[Symbol.iterator]()" 方法
}
```

魔改对象 使其支持 for of ？

```typescript
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
            done: true,
          };
        } else {
          return {
            value: this.current++,
            done: false,
          };
        }
      },
    };
  },
};
console.log([...Aobj]);

for (let val of Aobj) {
  console.log(val);
}
```

#### 原生 for in 和 es6 新增 for of

- `for of` 遍历的是数组的元素，而 `for in` 遍历的是数组的索引
- `for in` 遍历的是对象的键，而 `for of` 不能遍历对象
- `for in` 遍历对象，会遍历原型上的属性，而 `for of `只能遍历数组内元素，不包括原型属性，添加属性

```typescript
let nameArr: any = ["Tom", "Jack", "Lucy"];
nameArr.foo = "JJ";
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
  name: "Tom",
  age: 18,
};

/**
 * 区别2: for in 遍历的是对象的键，而for of 不能遍历对象
 */

for (const key in nameObj) {
  console.log(key); // name age
}

// for (const key of nameObj) { //报错}
```

```typescript
/**
 * 区别3：for in 遍历对象，会遍历原型上的属性，而for of 只能遍历数组内元素，不包括原型属性，添加属性
 */
// 使用for in会遍历数组所有的可枚举属性，包括原型，
// 如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用hasOwnProperty()方法可以判断某属性是不是该对象的实例属性

let AArr = [1, 2, 3];
// @ts-ignore
Array.prototype.a = 123;

for (let index in AArr) {
  let res = AArr[index];
  console.log(res); //1 2 3 123
}

for (let index in AArr) {
  if (AArr.hasOwnProperty(index)) {
    let res = AArr[index];
    console.log(res); // 1 2 3
  }
}

// for of遍历的是数组元素值，而且for of遍历的只是数组内的元素，不包括原型属性和索引
for (let value of AArr) {
  console.log(value); //1 2 3
}
```

#### 数组解构

数组解构 数组...展开运算 原理也是去调用 Symbol.iterator

```typescript
let [w, y, z] = Arr;
let copy = [...Arr];
console.log(w, y, z);
```

# 16 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。也叫 动态类型

## 1.泛型函数

```typescript
function chen(a: number, b: number): Array<number> {
  return [a, b];
}
chen(1, 2);
function chen1(a: string, b: string): Array<string> {
  return [a, b];
}
chen1("独孤", "求败");

// 这俩函数功能一样，如果写多个函数显然是一个不好的选择，我们可以：

function chen3<T>(a: T, b: T): Array<T> {
  return [a, b];
}
// chen3<number>(1, 2) //这是全称，但是没必要，因为ts会类型推断为number
chen3(1, 2);
chen3("ggg", "bbb");

// 可以定义多个泛型
function chen4<T, K>(a: T, b: K): Array<T | K> {
  return [a, b];
}

chen4("ggg", 111);
```

## 2.接口泛型和 类型别名的泛型

```typescript
type MMM<T> = string | T;
let mmm: MMM<boolean> = true;

interface CHEN<T> {
  msg: T;
}
let cchen: CHEN<string> = {
  msg: "chen",
};
```

## 3.类的泛型

```typescript
class C<T> {
  value!: T;
  add!: (x: T, y: T) => T;
}

let foo = new C<number>();

foo.value = 0;
foo.add = function (x, y) {
  return x + y;
};
```

## 4.数组的泛型

数组类型有一种表示方法是`Array<T>` ，这就是泛型的写法，`Array`是 TypeScript 原生的一个类型接口，`T`是它的类型参数。

```typescript
interface Array<Type> {
  length: number;

  pop(): Type | undefined;

  push(...items: Type[]): number;

  // ...
}
```

## 5.泛型约束 extends

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```typescript
function addN<T extends number>(a: T, b: T) {
  return a + b;
}
```

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("ggg");
```

多个类型参数之间也可以互相约束

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
// 我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
```

```typescript
//  结合 keyof 实现 Obj1. 智能提示
let Obj1 = {
  name: "Tom",
  age: 16,
};

type Key = keyof typeof Obj1;

// 实现 Obj1. 智能提示、

// 首先定义了T类型并使用extends关键字继承object类型的子类型
// 然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型
// 最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型
function Ob<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

Ob(Obj1, "name");
```

## 6.keyof

keyof T 表示类型 T 上所有键的联合类型

### 1.如何获取对象的属性

```typescript
let Obj1 = {
  name: "Tom",
  age: 16,
};

type Key = keyof typeof Obj1; //type Key = "name" | "age"

interface Iobj {
  name: string;
  age: number;
}
type Key = keyof Iobj; //type Key = "name" | "age"

// keyof 用于 interface Obj {}
// keyof typeof用于 具体的 const  Obj = {}
```

### 2.如何获取对象的属性值类型

```typescript
let Obj1 = {
  name: "Tom",
  age: 16,
};

type Value = (typeof Obj1)[keyof typeof Obj1]; //type Value = string | number
```

### 3.实现一个 Partial

Partial 就是将属性全部变成可选

```typescript
interface Ddata {
  name: string;
  age: number;
  sex: string;
}

type Ddata1 = Partial<Ddata>;

// for in    for(let key in obj)
type MyPartial<T extends object> = {
  [key in keyof T]?: T[key];
};

type Ddata2 = MyPartial<Ddata>;
```

# 17 泛型工具

泛型工具是 `typescript ` 内置的,可以直接使用

## 1.Partial

```typescript
// 1.Partial 所有属性 可选
interface Person {
  name: string;
  age: number;
  sex: string;
}

// Partial<T>
type PartialPerson = Partial<Person>;
// 原理
type CoustomPartial<T> = {
  [key in keyof T]?: T[key];
};
type PartialPerson1 = CoustomPartial<Person>;
```

## 2.Required

```typescript
// 2. Required 所有属性 必选

interface Person1 {
  name?: string;
  age?: number;
  sex?: string;
}
// Required<T>
type RequiredPerson = Required<Person1>;

// 原理  -? 代表去掉问号
type CoustomRequired<T> = {
  [key in keyof T]-?: T[key];
};
type RequiredPerson1 = CoustomRequired<Person1>;
```

## 3.Pick

```typescript
// 3. Pick 提取部分属性
// 如果我们只想用age这个属性，但是又不想重新写interface，就可以使用Pick提取部分属性
interface Person2 {
  name: string;
  age: number;
  sex: string;
}
// Pick<T,K>
type pick = Pick<Person2, "age">;

// 也支持联合类型
type pick1 = Pick<Person2, "age" | "sex">;
// 原理
type CoustomPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type pick2 = CoustomPick<Person2, "age" | "sex">;
```

## 4.Exclude

```typescript
// 4. Exclude 排除部分属性   非interface用

type ExcludePerson1 = Exclude<"name" | "age" | "sex", "age" | "sex">;

// 原理
type CoustomExclude<T, K> = T extends K ? never : T;
// 为什么是never  ？
//never 在联合类型中会被排除掉
type test2 = "a" | "b" | never; //type test2 = "a" | "b"
// T: 'name' | 'age' | 'sex'    K:'age'
// 一个一个来:
// 'name' extends 'age' ? never : 'name' => 'name'
// 'age' extends 'age' ? never : 'age' => never
// 'sex' extends 'age' ? never : 'sex' => 'sex'
// 最后剩下  'name' | 'sex' | never  => 'name' | 'sex'
type ExcludePerson2 = CoustomExclude<"name" | "age" | "sex", "age">;
```

## 5.Omit

```typescript
// 5. Omit 排除部分属性 并且返回新的类型 interface用
interface One {
  name: string;
  age: number;
  sex: string;
}
type one = Omit<One, "age">;
// 原理
// 需要先Exclude 去除不要的属性
// 再用Pick 提取剩下的属性

type CoustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type one1 = CoustomOmit<One, "age" | "sex">;
```

## 6.Record

```typescript
// 6.Record  约束对象的key 和 value

// type _key = 'name' | 'age' | 'sex' //key不能少
// type _value = string | number//value 随便取

// let zhangsan: Record<_key, _value> = {
//     name: '张三',
//     age: 19,
//     sex: '男'
// }

// let zhangsan2: Record<_key, Record<_key, _value>> = {
//     name: {
//         name: '张三',
//         age: 19,
//         sex: '男'
//     },
//     age: {
//         name: '张三',
//         age: 19,
//         sex: '男'
//     },
//     sex: {
//         name: '张三',
//         age: 19,
//         sex: '男'
//     },
// }

interface Foo {
  a: string;
}
interface Bar {
  b: string;
}

// 我想把Foo和Bar两个类型的 key 合并到一起，并给它们重新指定成 number 类型，可以使用Record这样实现：
type FooBar = Record<keyof Foo | keyof Bar, number>;

//原理
// 对象的key 只能是string number symbol
type Objkey = keyof any; //type Oky = string | number | symbol
type CoustomRecord<T extends Objkey, K> = {
  [key in T]: K;
};
```

## 7.ReturnType<Fn>

```typescript
//7. ReturnType<Fn> 获取函数类型的返回值

const Fn = () => [1, "fff", false];

type FnReturnType = ReturnType<typeof Fn>; //type FnReturnType = (string | number | boolean)[]

// 原理: 返回值是动态的 需要用 infer推断返回值
type CoustomReturnType<Fn extends Function> = Fn extends (
  ...args: any[]
) => infer Res
  ? Res
  : never;
```

## 8.Extract

恰好与 Exclude 相反，提取出 T 中 U 类型的部分

```typescript
// 8.Extract
// 恰好与Exclude相反，提取出T中U类型的部分
// 原理
type CoustomExtract<T, U> = T extends U ? T : never;

type ExtractPerson = Extract<"name" | "age" | "sex", "age" | "like">;
```

# 18.tsconfig.json 配置文件

## 1.生成 tsconfig.json

生成`tsconfig.json` 文件
这个文件是通过 `tsc --init` 命令生成的

配置详解

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}

// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

# 19.namespace 命名空间

我们在工作中无法避免`全局变量`造成的污染，`TypeScript`提供了`namespace `避免这个问题出现

## 1.命名空间的用法 嵌套 抽离 导出 简化 合并

namespace 所有的变量以及方法必须导出才能访问，嵌套时内层 namespace 也需要导出

```typescript
// 1.命名空间的用法 嵌套 抽离 导出 简化 合并
export namespace Test {
  export interface A {
    name: string;
    age: number;
  }
  export namespace ChildTest {
    export const add = () => [1, 2];
  }
}

{
  let tom: Test.A = {
    name: "Tom",
    age: 15,
  };
  console.log(Test.ChildTest.add()); // [1,2]
}

//========

import { Test } from "./19.namespace";

import add = Test.ChildTest.add; //抽离

{
  let tom: Test.A = {
    name: "Tom",
    age: 15,
  };
  console.log(add()); // [1,2]
}
```

## 2.命名空间的案例

```typescript
// 跨端的项目 h5 android ios 小程序 等
namespace ios {}
namespace android {}
namespace h5 {}
namespace miniprogram {}
```

# 20.理解模块化

前端模块化规范是有非常多的.

在 es6 模块化规范之前有

## 1.CommonJS -> Node.js

```javascript
// 导入
require("xxx");
require("../xxx.js");
// 导出
exports.xxxxxx = function () {};
module.exports = xxxxx;
```

## 2.AMD -> requireJs

```javascript
// 定义
define("module", ["dep1", "dep2"], function(d1, d2) {...});
// 加载模块
require(["module", "../app"], function(module, app) {...});
```

## 3.CMD -> seaJs

```javascript
define(function (require, exports, module) {
  var a = require("./a");
  a.doSomething();

  var b = require("./b");
  b.doSomething();
});
```

## 4.UMD -> UMD 是 AMD 和 CommonJS 的糅合

```javascript
(function (window, factory) {
  // 检测是不是 Nodejs 环境
  if (typeof module === "object" && typeof module.exports === "objects") {
    module.exports = factory();
  }
  // 检测是不是 AMD 规范
  else if (typeof define === "function" && define.amd) {
    define(factory);
  }
  // 使用浏览器环境
  else {
    window.eventUtil = factory();
  }
})(this, function () {
  //module ...
});
```

`es6 模块`化规范出来之后上面这些模块化规范就用的比较少了,基本上只是`nodejs`在使用 `CommonJS `规范

现在主要使用 import export

```typescript
//20.modules.ts:
// // 1.默认导出  导出的东西可以是任意类型
export default [1];

export const a = 1;

export const add = (a: number, b: number) => a + b;

// 也可以
// const a = 1
// const add = (a: number, b: number) => a + b
// export {
//     a,
//     add
// }

//index.ts:
import arr, { a, add as add2 } from "./20.modules";
// 或者
import * as data from "./20.modules";
console.log(data); //{ a: 1, add: [Function: add], default: [ 1 ] }

console.log(arr); // [ 1 ]

const add = () => {};

// 动态导入
if (a === 1) {
  import("./20.modules").then((res) => {
    console.log(res); // a: 1, add: [Function: add], default: [ 1 ] }
  });
}
```

# 21.声明文件 d.ts

声明文件 `declare`

## 一个例子感受

`express` 是用`js`写的， `axios` 是用 `ts` 写的

```typescript
//生成package.json
npm init -y
pnpm i express axios
```

你会发现 express 没有 d.ts 声明文件

```typescript
import axios from "axios";
import express from "express"; //无法找到模块“express”的声明文件。
//尝试使用 `npm i --save-dev @types/express` (如果存在)，
// 或者添加一个包含 `declare module 'express';` 的新声明(.d.ts)文件

// @types开头是规范
```

手动编写一个`express.d.ts`文件

```typescript
declare module "express" {
  interface Router {
    get(path: string, cb: (req: any, res: any) => void): void;
  }

  interface App {
    use(path: string, router: any): void;
    listen(port: number, cb?: () => void): void;
  }

  interface Express {
    (): App;
    Router(): Router;
  }
  const express: Express;
  export default express;
}
```

`21.declare.ts `文件：

```typescript
import axios from "axios";
import express from "express"; //无法找到模块“express”的声明文件。
//尝试使用 `npm i --save-dev @types/express` (如果存在)，
// 或者添加一个包含 `declare module 'express';` 的新声明(.d.ts)文件
// @types开头是规范

// 但是有一个问题，如果遇到冷门库，恰好没有写ts的声明文件，那么只能自己写declare module 'xxx'

// 这里我们以declare module 'express'为例子 新建一个express.d.ts声明文件

const app = express();

const router = express.Router();

app.use("/api", router);

router.get("/api", (res: any, req: any) => {
  res.json({
    code: 200,
  });
});

app.listen(9001, () => {
  console.log(`server is running at 9001`);
});
```

# 22.Mixins 混入

`TypeScript` 混入 `Mixins `,其实 `vue `也有` mixins` 这个东西 你可以把他看作为`合并`

```typescript
//Mixins可以理解成合并
// 1，对象混入 合并 Am对象 Am对象 合并到一起
// 2.类的混入 A类 B类 合并到一起

//1.对象混入

interface Am {
  name: string;
}

interface Bm {
  age: number;
}

let am: Am = { name: "a" };
let bm: Bm = { age: 12 };

//1. 扩展运算符  浅拷贝 返回新的类型 let cm: {age: number; name: string;}

let cm = { ...am, ...bm }; //{ name: 'a', age: 12 }

//2.es6  Object.assign  浅拷贝  返回交叉类型 let dm: Am & Bm
let dm = Object.assign({}, am, bm); //{ name: 'a', age: 12 }

//2.类混入

class Html {
  render() {
    console.log("render");
  }
}

class Logger {
  log(log: string) {
    console.log(log);
  }
}

class App {
  run() {}
}
// 如果我们希望 App作为基类，将Html,Logger类混入到App类中

type Constructor<T = {}> = new (...args: any[]) => T;
function MixinsPlugins<T extends Constructor<App>>(base: T) {
  // 返回一个类
  return class extends base {
    private Logger;
    private Html;

    constructor(...args: any[]) {
      super(...args);
      this.Logger = new Logger();
      this.Html = new Html();
    }

    run(): void {
      this.log("run");
    }

    log(log: string): void {
      this.Logger.log(log);
    }

    render(): void {
      this.Html.render();
    }
  };
}

const mixins = MixinsPlugins(App); //返回的类就是App混入Html和Logger

const app = new mixins();

app.run(); //run
app.render(); //render
```

# 23. 装饰器

在` OOP (面向对象编程)`中，装饰器模式是一种允许动态地往一个对象上添加自定义行为，而又不影响该对象所属的类的其他实例的一种设计模式。

## 1.类装饰器 ClassDecorator

`ClassDecorator`接收参数:

- target 类的构造函数

```typescript
// target :返回Http构造函数
const Base: ClassDecorator = (target) => {
  console.log(target); //[class Http]
  target.prototype._baseUrl = "http://api.apiopen.top/";
  target.prototype._getName = () => {
    console.log("Tom");
  };
};

@Base //编译阶段自己调用，不需要我们手动调用  相当于调用Base(Http)
class Http {
  //......
}

const http = new Http() as any;
http._getName(); //Tom
console.log(http._baseUrl); // http://api.apiopen.top/
```

面试题：类装饰器读到类的构造函数，有什么作用？

- 可以实现在不破坏 Http 类的结构，在构造函数的原型上增加属性和方法，实现 AOP 面向切面编程

## 2.装饰器工厂

实际上就是借助高阶函数来实现,外层函数接收额外需要传入的参数，内层函数接收 target

```typescript
/**
 * 如果我们还希望给@Base("str")传参，比如传一个str，那么就需要用到装饰器工厂
 */

// 需要借助高阶函数实现，也就是函数中返回函数 ,外层函数接受额外的参数
const Base2 = (str: string) => {
  const fn: ClassDecorator = (target) => {
    console.log(target); //[class Http]
    target.prototype._baseUrl = str;
  };
  return fn;
};

@Base2("str")
class Http2 {
  //......
}

const http2 = new Http2() as any;
console.log(http2._baseUrl); //str
```

## 3.方法装饰器 MethodDecorator

`MethodDecorator`接收参数

- target 返回原型对象
- propertyKey 返回方法名字
- descriptor 返回描述符

```typescript
// 3.方法装饰器 MethodDecorator
// 三个参数   target 返回原型对象, propertyKey 返回方法名字, descriptor 返回描述符

const Get = (url: string) => {
  const fn: MethodDecorator = (
    target,
    propertyKey,
    descriptor: PropertyDescriptor
  ) => {
    console.log(target); //原型对象{}
    console.log(propertyKey); //方法名称getData
    console.log(descriptor); //描述符{value: [Function: getData],writable: true,enumerable: false,configurable: true}

    // 取出元数据
    const key = Reflect.getMetadata("key", target);

    axios.get(url).then((res) => {
      const fnc = descriptor.value; //拿到对应的getData方法
      fnc(key ? res.data[key] : res.data); //相当于给getData(res.data)赋值
    });
  };
  return fn;
};

class Http3 {
  //......
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getData(res: any) {
    console.log(res.data.result);
    /**
         * {
                code: 200,       
                message: '成功!',
                result: {        
                    total: 14782,
                    list: [
                    [Object], [Object],
                    [Object], [Object],
                    [Object], [Object],
                    [Object], [Object],
                    [Object], [Object]
                    ]
                }
            }
         */
  }
}
new Http3();
```

## 4.参数装饰器 ParameterDecorator

`ParameterDecorator`接收参数

- target 返回原型对象
- propertyKey 返回方法名字
- parameterIndex 返回参数所在的位置

```typescript
// 三个参数 target, propertyKey, parameterIndex
// npm i reflect-metadata
//  reflect-metadata 元数据的反射
//我们使用@Result()参数装饰器将方法装饰器返回到方法的参数，进行结构
const Result = () => {
  const fn: ParameterDecorator = (target, propertyKey, parameterIndex) => {
    console.log(target); //原型对象{}
    console.log(propertyKey); //方法名称getData
    console.log(parameterIndex); //参数所在的位置 0
    //   因为接口返回是 res.data.result  ,第二个值填result ，因为后续取元数据会res.data[key]取
    Reflect.defineMetadata("key", "result", target); // 在代码运行时为 target 添加元数据
  };

  return fn;
};

class Http4 {
  //......
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getData(@Result() res: any) {
    console.log(res);
  }
}
new Http4();
```

## 5.属性装饰器 PropertyDecorator

`PropertyDecorator`接收参数

- target 返回原型对象
- propertyKey 返回属性名

```typescript
// 5.属性装饰器 PropertyDecorator
//两个参数 target  原型对象{} , propertyKey    属性名name

const Name: PropertyDecorator = (target, propertyKey) => {
  console.log(target);
  console.log(propertyKey);
};

class Http5 {
  @Name
  name: string;
  constructor() {
    this.name = "Tom";
  }
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getData(res: any) {}
}

new Http5();
```

# 24. webpack 构建 ts+vue3 项目

## 1.生成配置文件

```typescript
//生成项目配置文件
npm init -y

// 生成tsconfig.json文件
tsc -init
```

## 2.创建`.gitignore`文件

```
node_modules
```

## 3.创建`index.html`文件

## 4.创建 `src`目录

- main.ts
- App.vue
- index.d.ts

## 5.修改`tsconfig.json`文件

添加一段代码：
目的是 ts 校验 src 目录下

```json
  "include": ["src/**/*"]
```

## 6.创建`webpack.config.js`文件

安装 `webpack` 依赖包

```
npm i  webpack webpack-cli -D

npm install webpack-dev-server -D
```

## 7.添加`package.json`中`scripts`命令

```json
    "dev": "webpack-dev-server",
    "build": "webpack"
```

## 8.编写`webpack.config.js` 配置文件测试打包

```javascript
const { Configuration } = require("webpack");
const path = require("path");
/**
 * @type {Configuration}
 */
const config = {
  mode: "development", //开发模式
  entry: "./src/main.ts", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录
    filename: "bundle.js", //打包之后的文件名
  },
};

// webpack是基于node环境,遵循commonJs规范
module.exports = config;
```

`main.ts`加一段测试代码

```
let a = 2
```

```
npm run build
```

## 9.支持 typescript

记住: `文件相关`的问题用`loader依赖`解决

```typescript
npm install ts-loader -D
npm install typescript -D
```

添加代码到`webpack.config.js`中 config

```javascript
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
```

## 10.支持 vue

### 1.解析 html 文件

```javascript
npm install vue
npm install html-webpack-plugin -D
```

inde.html

```html
<!-- 挂载点 html与webpack关联需要html-webpack-plugin -->
<div id="app"></div>
```

`App.vue` 写一些测试代码，发现`npm run dev`报错

```vue
<template>
  <div>123</div>
</template>

<script setup></script>
```

### 2.解析 vue 文件

此时我们需要安装`vue-loader`解析 vue 文件

```javascript
npm install vue-loader -D
```

添加 loader 到`webpack.config.js`中 config

```javascript

module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: "ts-loader", //使用ts-loader处理ts文件
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
```

然后运行 `npm run dev`发现还是会报错` ERROR in ./src/App.vue`,它不认识.vue 结尾文件声明

### 3.添加声明

index.d.ts

```typescript
// 让ts认识.vue
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

### 4.添加插件`VueLoaderPlugin`支持 vue3

发现还是报错，`vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.`
让你使用`VueLoaderPlugin`支持 `vue3`

添加 `const { VueLoaderPlugin } = require('vue-loader')` 到 `webpack.config.js`中

```Javascript
const { VueLoaderPlugin } = require('vue-loader')

  plugins: [
    //webpack的插件都是类 需要new
    new VueLoaderPlugin(),
    new HtmlWepackPlugin({
      template: "./src/index.html",
    }),
  ],
```

此时我们`npm run dev`就可以正常运行了
App.vue

```
<template>
    <div>{{ x }}</div>
    <button @click="add">+</button>
</template>

<script setup>
import { ref } from "vue";
let x = ref(0)
const add = () => {
    x.value++
}
</script>
```

### 5.支持 vue 文件中的 ts

如果我们加一个 lang = "ts"，
发现又报错了`VM314 App.vue:3 Uncaught ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization`

那是因为在 `webpack.config.js`中

```javascript
  module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: "ts-loader", //使用ts-loader处理ts文件
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
```

我们只配置了 ts 文件的 ts 解析，但是 vue 文件中的 ts 我们并没有解析，可以增加一个 options 配置项

```javascript
  module: {
    rules: [
          {
        test: /\.ts$/, //以ts结尾文件
        use: {
          loader: "ts-loader", //使用ts-loader处理ts文件
          options: {
            appendTsSuffixTo: [/\.vue$/], //ts-loader库中查阅
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
```

### 6.支持 css less sass

#### 1.css

安装依赖

```javascript
npm install css-loader style-loader  -D
```

`webpack.config.js`

```javascript
module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: {
          loader: "ts-loader", //使用ts-loader处理ts文件
          options: {
            appendTsSuffixTo: [/\.vue$/], //ts-loader库中查阅
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //规则 从右向左解析 先解析css-loader 再将解析结果交给 style-loader通过js动态插入到标签
      },
    ],
  },
```

#### 2.less /sass

安装依赖

```javascript
npm install css-loader style-loader less less-loader sass sass-loader -D
```

`webpack.config.js`

```javascript
  module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: {
          loader: "ts-loader", //使用ts-loader处理ts文件
          options: {
            appendTsSuffixTo: [/\.vue$/], //ts-loader库中查阅
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //规则 从右向左解析 先解析css-loader 再将解析结果交给 style-loader通过js动态插入到标签
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
```

`App.vue`

```vue
<template>
  <div>{{ x }}</div>
  <button @click="add">+</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
let x = ref<number>(0);
const add = () => {
  x.value++;
};
</script>

<!-- <style>
body {
    background-color: pink;
}
</style> -->

<!-- <style lang="less">
@red: pink;

html,
body {
    background-color: @red;
}
</style> -->

<style lang="scss">
$red: pink;

html,
body {
  background-color: $red;
}
</style>
```

## 11.打包后 js 分包

### 1.目前问题

当我们安装第三方库，比如 `element-plus`、`dayjs`、`axios`等，目前打包后会默认放到配置项设置的`bundle.js`文件中，js 文件会特别臃肿，体积也会特别大，此时我们需要采用`webpack`的分包，将第三方的依赖拆分出来。

我们以 axios 为例子

```
npm install axios
```

### 2.配置`webpack.config.js`

```javascript
const config = {
  mode: "development", //开发模式
  entry: "./src/main.ts", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录
    filename: "[chunkhash].js", //打包之后的文件名
    clean: true, //清空打包的结果
  },
  //分包
  optimization: {
    splitChunks: {
      cacheGroups: {
        axios: {
          name: "axios",
          test: /[\\/]node_modules[\\/]axios[\\/]/,
          chunks: "all",
        },
        commons: {
          //拆分公共依赖
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: {
          loader: "ts-loader", //使用ts-loader处理ts文件
          options: {
            appendTsSuffixTo: [/\.vue$/], //ts-loader库中查阅
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //规则 从右向左解析 先解析css-loader 再将解析结果交给 style-loader通过js动态插入到标签
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    //webpack的插件都是类 需要new
    new HtmlWepackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
  stats: "errors-only", //控制台 报错显示
};
```

## 3.css 文件单独提取

当前我们打包以后，其实`css`是通过`js`动态插入标签的，但是这样效率会比较低，我们希望通过`link`标签导入`css文件`，如果用 webpack 做到呢？

安装依赖

```
npm install mini-css-extract-plugin -D
```

配置`webpack.config.js`

```javascript
const { Configuration } = require("webpack");
const path = require("path");

const HtmlWepackPlugin = require("html-webpack-plugin"); //插件 实现html文件和webpack的关联
const { VueLoaderPlugin } = require("vue-loader"); //vue3

const MimiCssExtractPlugin = require("mini-css-extract-plugin"); //css文件抽离
// 注解 有代码提示
/**
 * @type {Configuration}
 */
const config = {
  mode: "development", //开发模式
  entry: "./src/main.ts", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录
    filename: "[chunkhash].js", //打包之后的文件名
    clean: true, //清空打包的结果
  },
  //分包
  optimization: {
    splitChunks: {
      cacheGroups: {
        axios: {
          name: "axios",
          test: /[\\/]node_modules[\\/]axios[\\/]/,
          chunks: "all",
        },
        commons: {
          //拆分公共依赖
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: {
          loader: "ts-loader", //使用ts-loader处理ts文件
          options: {
            appendTsSuffixTo: [/\.vue$/], //ts-loader库中查阅
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"], //规则 从右向左解析 先解析css-loader 再将解析结果交给 style-loader通过js动态插入到标签
      // },
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", "less-loader"],
      // },
      // {
      //   test: /\.sass$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      {
        test: /\.css$/, //不需要style-loader了，因为我们要提取css文件
        use: [MimiCssExtractPlugin.loader, "css-loader"], //规则 从右向左解析 先解析css-loader 再将解析结果交给 style-loader通过js动态插入到标签
      },
      {
        test: /\.less$/,
        use: [MimiCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [MimiCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    //webpack的插件都是类 需要new
    new HtmlWepackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),

    new MimiCssExtractPlugin(),
  ],
  stats: "errors-only", //控制台 报错显示
};

// webpack是基于node环境,遵循commonJs规范
module.exports = config;
```

此时就大功告成了，我们打包以后，css 文件已经单独抽离出来了，并且已经通过`link`标签引入了。

# 25.实战 TS 编写发布订阅模式

`发布订阅模式`是一种常见的设计模式。

## 1.通过 Map<订阅名称,[callbackList]>去写发布订阅模式

```typescript
// 实现on emit once off 订阅中心Map<事件名称,[Function]订阅者集合>
interface BaseEventBus {
  events: Map<string, Function[]>; //订阅中心Map
  once: (event: string, callback: Function) => void; //订阅一次
  on: (event: string, callback: Function) => void; //订阅
  emit: (event: string, ...args: any[]) => void; //派发
  off: (event: string, callback: Function) => void; //删除监听器
}

class EventBus implements BaseEventBus {
  events: Map<string, Function[]>;
  constructor() {
    this.events = new Map();
  }

  on(event: string, callback: Function): void {
    // 证明存过了
    if (this.events.has(event)) {
      const callbackList = this.events.get(event);
      callbackList && callbackList.push(callback);
    } else {
      // 第一次存
      this.events.set(event, [callback]);
    }
  }
  // 参数不确定，可能有多个：...args: any[]
  emit(event: string, ...args: any[]): void {
    const callbackList = this.events.get(event);
    callbackList && callbackList.forEach((fn) => fn(...args));
  }

  off(event: string, callback: Function): void {
    const callbackList = this.events.get(event);
    callbackList && callbackList.splice(callbackList.indexOf(callback), 1);
  }
  once(event: string, callback: Function): void {
    //1.创建一个自定义函数，通过on触发，触发完后立马通过off回收掉
    const cb = (...args: any[]) => {
      callback(...args);
      this.off(event, cb);
    };
    this.on(event, cb);
  }
}

const bus = new EventBus();

const fnc = (a: number, b: boolean) => {
  console.log(a, b);
};
// 1.具体结构

// 有一个问题： 我的callback数组在on的订阅中心中，每次都会push进去，所以会有重复的callback，当off一次只会删除一个，
// bus.on("message", fnc) // 1 false

// bus.on("message", fnc)// 1 false

// bus.off("message", fnc)  //发现还会打印一次  1 false

// console.log(bus);

// on可以监听多个，所以说callback用数组存

bus.once("message", fnc); // 2 false
bus.emit("message", 2, false);
bus.emit("message", 3, false);
bus.emit("message", 4, false);

// 然后需要把 message 和对应的callback 放入订阅中心map中
```

## 2.通过对象+set 去写发布订阅模式

```typescript
/**
 * 方式二，我不通过数组去存callback，而是通过set存callback函数(...args: any[]) => void>，这样天然去重
 */

interface _BaseEventBus {
  events: Record<string, Set<(...args: any[]) => void>>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
  once: (event: string, callback: (...args: any[]) => void) => void;
}

class _EventBus implements _BaseEventBus {
  events: Record<string, Set<(...args: any[]) => void>> = {};

  on(event: string, callback: (...args: any[]) => void): void {
    // //  证明存过了
    // if (this.events[event]) {
    //     this.events[event].add(callback)
    // } else {
    //     // 如果没有该事件，则创建一个
    //     this.events[event] = new Set()
    // }

    // 简化写法,等价于上面
    (this.events[event] ??= new Set()).add(callback);
  }

  emit(event: string, ...args: any[]): void {
    // const callbackList = this.events[event]
    // callbackList && callbackList.forEach(fn => fn(...args))

    //   简化写法
    this.events[event]?.forEach((fn) => fn(...args));
  }
  off(event: string, callback: (...args: any[]) => void): void {
    this.events[event]?.delete(callback);
  }
  once(event: string, callback: (...args: any[]) => void): void {
    //1.创建一个自定义函数，通过on触发，触发完后立马通过off回收掉
    const cb = (...args: any[]) => {
      callback(...args);
      this.off(event, cb);
    };
    this.on(event, cb);
  }
}

const eventbus = new _EventBus();

const fnn = (a: number, b: boolean) => {
  console.log(a, b);
};
// eventbus.on('message', fnn)//只打印一次 1, false
// eventbus.on('message', fnn)

// eventbus.off('message', fnn)

eventbus.once("message", fnn); //只打印555, false  一次

eventbus.emit("message", 555, false);
eventbus.emit("message", 2, false);
eventbus.emit("message", 3, false);
```

## 差别

第一种写法，我们的 callback 是直接 push 到数组，并没有去重，而第二种方式 callback 是用 set 存，天然去重

# 26.weakMap，weakSet，set，map

在` es5` 的时候常用的` Array` `object `，在` es6` 又新增了两个类型，`Set` 和 `Map`，类似于`数组`和`对象`。

## 1.set

### 定义

`set `是由一组无序且唯一(即不能重复)的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组

### 属性

size：返回集合所包含的元素个数

### 操作方法

- add(value)：添加某个值，返回 Set 结构本身。

- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

- has(value)：返回一个布尔值，表示该值是否为 Set 的成员。

- clear()：清除所有成员，无返回值。

- size: 返回 set 数据结构的数据长度

### 实例

```typescript
// set 是一个元素唯一且无序的集合

let set: Set<any> = new Set([1, 2, 3, 4, 5, 5, () => {}, () => {}]);
console.log(set.size); // 7

const cb = () => {};
let set1: Set<any> = new Set([1, 2, 3, 4, 5, 5, cb, cb]);
console.log(set1.size); // 6

//天然去重，按照内存引用地址来进行唯一性判断，如果引用类型的内存引用地址相同，也可以去重

/**
 * 面试：为什么会出现上面的差别呢？ 为什么第一个() => { }, () => { }就打印 7  而第二个cb, cb就打印6呢？
 *   在 JavaScript 中，Set 数据结构是用来存储唯一值的集合，即使是引用类型的值（如对象或函数），也会根据它们的内存引用地址来进行唯一性判断。
 *   这意味着，如果两个回调函数引用同一个函数，即使它们是引用类型，也会被认为是重复的，而不会被添加多次。
 */

// 操作
set.add(6);
console.log(set); //{  1, 2, 3, 4, 5,  [Function (anonymous)], [Function (anonymous)] ,6 }
console.log(set.has(7)); // 返回布尔值，false
console.log(set.delete(6)); //返回布尔值，true
// console.log(set.clear());// 清空，无返回值

// set中有iterator方法，可以支持遍历    for of  forEach

for (const iterator of set) {
  console.log(iterator); // 1  2  3  4  5  [Function (anonymous)]  [Function (anonymous)]
}

set.forEach((iterator) => {
  console.log(iterator); // 1  2  3  4  5  [Function (anonymous)]  [Function (anonymous)]
});

// 数组去重
let arr = [...new Set([1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5])];

console.log(arr); //[ 1, 2, 3, 4, 5 ]
```

### 遍历

`set`中有 `iterator` 方法，可以支持遍历 `for of` ,`forEach`

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

```typescript
for (const iterator of set) {
  console.log(iterator); // 1  2  3  4  5  [Function (anonymous)]  [Function (anonymous)]
}

set.forEach((iterator) => {
  console.log(iterator); // 1  2  3  4  5  [Function (anonymous)]  [Function (anonymous)]
});
```

### 数组去重

```typescript
let arr = [...new Set([1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5])];
console.log(arr); //[ 1, 2, 3, 4, 5 ]
```

### 理解 set 去重

在 `es6` 中，`Set` 数据结构是用来存储唯一值的集合，即使是引用类型的值（如对象或函数），也会根据它们的`内存引用地址`来进行`唯一性判断`。
这意味着，如果两个回调函数引用同一个函数，即使它们是引用类型，也会被认为是重复的，而不会被添加多次。

## 2.map

### 定义

类似于对象，也是`键值对的集合`，但是`键`的范围不限于`字符串`，`数字`，`symbol`，`各种类型的值（包括对象）`都可以当作键，是一种更完善的 Hash 结构实现。如果你需要`键值对`的数据结构，Map 比 Object 更合适

### 属性

size：返回集合所包含的元素个数

### 操作方法

- set(key,value)：添加某个键值,返回 Map 结构本身。

- get(key)：获取某个值,返回一个对应 key 的值。

- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

- has(value)：返回一个布尔值，表示该值是否为 Map 的成员。

- clear()：清除所有成员，无返回值。

- size: 返回 set 数据结构的数据长度

```typescript
//map的key可以是引用类型
let obj = { name: "chen" };
let map: Map<object, any> = new Map();
map.set(obj, "chen");
console.log(map); //{ { name: 'chen' } => 'chen' }

console.log(map.get(obj)); //chen
console.log(map.size); //1

console.log(map.has(obj)); //true

console.log(map.delete(obj)); //true

map.clear();
```

### 遍历

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

```typescript
for (const iterator of map) {
  console.log(iterator); // [ { name: 'chen' }, 'chen' ]
}

map.forEach((value, key) => {
  console.log(key, value); //{ name: 'chen' } chen
});
```

## 3.weakSet 和 weakMap

### 理解

`Weak` 在英语的意思就是`弱`的意思，`weakSet` 和 `weakMap` 的`键`都是弱引用，不会被计入垃圾回收

`weakSet` 和 `weakMap` 的`key`都只能存放`引用类型`，不能存放基本类型，所以 `weakSet` 和 `weakMap` 都是弱引用，不会被计入垃圾回收。

```typescript
//`Weak` 在英语的意思就是`弱`的意思，`weakSet` 和 `weakMap` 的`键`都是弱引用，不会被计入垃圾回收

//weakMap 的key 只能是引用类型

// 演示垃圾回收计数
let obj: any = { name: "2222" }; //计数 1
let aahph: any = obj; //2
let wmap: WeakMap<object, string> = new WeakMap();

wmap.set(obj, "111111"); //2 他的键是弱引用不会计数的

obj = null; // -1
aahph = null; //-1
//v8 GC 不稳定 最少200ms

setTimeout(() => {
  console.log(wmap);
}, 500);

let weakSet = new WeakSet([obj]);
/**
 * 首先obj引用了这个对象 + 1，aahph也引用了 + 1，wmap也引用了，但是不会  + 1，应为他是弱引用，不会计入垃圾回收，因此 obj 和 aahph 释放了该引用 weakMap 也会随着消失的，但是有个问题你会发现控制台能输出，值是取不到的，应为V8的GC回收是需要一定时间的，你可以延长到500ms看一看，并且为了避免这个问题不允许读取键值，也不允许遍历，同理weakSet 也一样
 */
```

### 使用场景

#### 1.额外数据的处理

```typescript
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
```

现在，john 这个对象应该被垃圾回收，但它仍在内存中，因为它是` visitsCountMap` 中的一个键。
当我们移除用户时，我们需要清理` visitsCountMap`，否则它将在内存中无限增大。在复杂的架构中，这种清理会成为一项繁重的任务。
我们可以通过使用` WeakMap` 来避免这样的问题：

```typescript
// 📁 visitsCount.js
let visitsCountMap2 = new WeakMap(); // weakmap: user => visits count

// 递增用户来访次数
function countUser2(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

#### 2.缓存

```typescript
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
let obj = {
  /* 假设我们有个对象 */
};

let result1 = process(obj); // 计算完成

// ……稍后，来自代码的另外一个地方……
let result2 = process(obj); // 取自缓存的被记忆的结果

// ……稍后，我们不再需要这个对象时：
obj = null;

alert(cache.size); // 1（啊！该对象依然在 cache 中，并占据着内存！）
```

对于多次调用同一个对象，它只需在第一次调用时计算出结果，之后的调用可以直接从 `cache` 中获取。这样做的缺点是，当我们不再需要这个对象的时候需要清理 `cache`。
如果我们用 `WeakMap `替代` Map`，便不会存在这个问题。当对象被垃圾回收时，对应缓存的结果也会被自动从内存中清除。

```typescript
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
let obj = {
  /* some object */
};

let result1 = process(obj);
let result2 = process(obj);

// ……稍后，我们不再需要这个对象时：
obj = null;

// 无法获取 cache.size，因为它是一个 WeakMap，
// 要么是 0，或即将变为 0
// 当 obj 被垃圾回收，缓存的数据也会被清除
```

# 27.proxy & Reflect

## 1.proxy

### 1.定义

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

proxy 支持对象 数组 函数 set map 的代理

```javascript
const proxy = new Proxy(target, handler);
```

- target：目标对象，可以是任何类型的对象，包括原生数组，函数，甚至 another proxy。
- handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

### 2. handler

Proxy 支持的 13 种拦截操作：

- `get(target, propKey, receiver)`：拦截对象属性的读取，比如 `proxy.foo` 和 `proxy['foo']`。
- `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如 `proxy.foo = v` 或 `proxy['foo'] = v`，返回一个布尔值。
- `has(target, propKey)`：拦截 `propKey in proxy` 的操作，返回一个布尔值。
- `deleteProperty(target, propKey)`：拦截 `delete proxy[propKey]`的操作，返回一个布尔值。
- `ownKeys(target)`：拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in 循环`，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而` Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- `getOwnPropertyDescriptor(target, propKey)`：拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- `defineProperty(target, propKey, propDesc)`：拦截 `Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- `preventExtensions(target)`：拦截` Object.preventExtensions(proxy)`，返回一个布尔值。
- `getPrototypeOf(target)`：拦截` Object.getPrototypeOf(proxy)`，返回一个对象。
- `isExtensible(target)`：拦截` Object.isExtensible(proxy)`，返回一个布尔值。
- `setPrototypeOf(target, proto)`：拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- `apply(target, object, args)`：拦截` Proxy` 实例作为函数调用的操作，比如 `proxy(...args)、proxy.call(object, ...args)`、`proxy.apply(...)`。
- `construct(target, args)`：拦截 `Proxy` 实例作为构造函数调用的操作，比如 `new proxy(...args)`。

[具体案例看这里](https://github.com/tmflsby/notes/blob/master/%E3%80%8AES6%E6%A0%87%E5%87%86%E5%85%A5%E9%97%A8%EF%BC%88%E7%AC%AC3%E7%89%88%EF%BC%89%E3%80%8B%E2%80%94%E2%80%94%E9%98%AE%E4%B8%80%E5%B3%B0/14.Proxy/Proxy.md)

### 3.实现

```typescript
// proxy 代理13个方法 参数一模一样
// Reflect 反射13个方法 参数一模一样
//mobx observable观察者模式  类似于vuex redux
// proxy支持对象 数组 函数 set map

let lucyObj = { name: "lucy", age: 19 };
console.log(lucyObj.age); //19
console.log(Reflect.get(lucyObj, "age", lucyObj)); //19
console.log(Reflect.set(lucyObj, "age", "20", lucyObj)); //true

let proxy = new Proxy(lucyObj, {
  //receiver 可以保证上下文的this正确
  get(target, propKey, receiver) {
    console.log(target); //{ name: 'lucy', age: 19 }
    console.log(propKey); //age
    console.log(receiver); //{ name: 'lucy', age: 19 }
    return Reflect.get(target, propKey, receiver); //Reflect是es6推荐的对对象操作的方法,更加语义化 此处相当于 return target[propKey]
  },
  set(target, propKey, value, receiver) {
    return Reflect.set(target, propKey, value, receiver);
  },
});

console.log(proxy.age); //触发get
```

### 4.简单的 mobx 观察者模式

```typescript
const list: Set<Function> = new Set(); //事件存储器
//订阅函数
const subscribe = (fn: Function) => {
  if (!list.has(fn)) {
    list.add(fn);
  }
};

// 观察函数
const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(target, propKey, value, receiver) {
      const result = Reflect.set(target, propKey, value, receiver);
      list.forEach((fn) => fn());
      return result;
    },
  });
};

const personProxy = observable({ name: "Jack", age: 30 });

subscribe(() => {
  console.log("订阅函数变化", personProxy.name, personProxy.age); //订阅函数 Tom 30   订阅函数变化 Tom 20
});

personProxy.name = "Tom"; //触发set
personProxy.age = 20; //触发set
```

### 5.优势

- 允许在对象操作层面进行拦截和定制，提供了更高级的控制和行为修改能力。
- 支持对对象的读取和设置等操作进行自定义处理，增强了代码的灵活性和可维护性。

## 2.Reflect

### 1.概述

`Reflect` 是 `ES6` 中引入的一个新的内置对象，提供了一组静态方法，这些方法与一些操作符和语句的行为是一致的。Reflect 对象的方法可以被用于代替一些传统的操作，比如属性的获取、设置、删除，函数的调用等，同时也提供了一些元编程的能力。

### 2.设计目的

`Reflect` 对象与 `Proxy `对象一样，也是 `ES6` 为了操作对象而提供的新 API。`Reflect` 对象的设计目的有这样几个。

- 将 `Object` 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty`），放到 `Reflect` 对象上。
- 修改某些 `Object` 方法的返回结果，让其变得更合理。

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

- 让 `Object` 操作都变成函数行为，更加语义化。

```javascript
//某些Object操作是命令式，比如name in obj和delete obj[name]，
// 而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

// 老写法
"assign" in Object; // true
// 新写法
Reflect.has(Object, "assign"); // true

const obj = { name: "tom" };
// 老写法
delete obj[name];
// 新写法
Reflect.deleteProperty(obj, name);
```

- `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应。

```typescript
let proxy = new Proxy(lucyObj, {
  //receiver 可以保证上下文的this正确
  get(target, propKey, receiver) {
    console.log(target); //{ name: 'lucy', age: 19 }
    console.log(propKey); //age
    console.log(receiver); //{ name: 'lucy', age: 19 }
    return Reflect.get(target, propKey, receiver); //Reflect是es6推荐的对对象操作的方法,更加语义化 此处相当于 return target[propKey]
  },
  set(target, propKey, value, receiver) {
    return Reflect.set(target, propKey, value, receiver);
  },
});
```

### 3.静态方法

与大多数全局对象不同 `Reflect` 并非一个构造函数，所以不能通过 `new` 运算符对其进行调用，或者将 `Reflect` 对象作为一个函数来调用。`Reflect` 的所有属性和方法都是`静态`的（就像 Math 对象）。

`Reflect`对象一共有 13 个静态方法。

- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

上面这些方法的作用，大部分与`Object`对象的同名方法的作用都是相同的，而且它与`Proxy`对象的方法是一一对应的。

#### 1.Reflect.get(target, name, receiver)

`Reflect.get` 方法查找并返回 `target` 对象的 `name` 属性，如果没有该属性，则返回 `undefined`。

```typescript
let myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

console.log(Reflect.get(myObject, "foo")); // 1

// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。

let myReceiverObject = {
  foo: 4,
  bar: 4,
};

console.log(Reflect.get(myObject, "baz", myReceiverObject)); // 8
```

#### 2.Reflect.set(target, name, value, receiver)

`Reflect.set `方法设置` target` 对象的` name` 属性等于 `value`。 返回布尔值

```typescript
let myObject2 = {
  foo: 0,
  set bar(value: number) {
    this.foo = value;
  },
};
console.log(myObject2.foo); //0
Reflect.set(myObject2, "foo", 111);
console.log(myObject2.foo); ///111
Reflect.set(myObject2, "bar", 222);
console.log(myObject2.foo); ///222

// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
let myReceiverObject2 = {
  foo: 1,
};

Reflect.set(myObject2, "bar", 999, myReceiverObject2);
console.log(myReceiverObject2.foo); //999
console.log(myObject2.foo); //222

// 注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，
// 后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。

let p = {
  a: "a",
};

let Pobj = new Proxy(p, {
  set(target, key, value, receiver) {
    console.log("set"); // set
    return Reflect.set(target, key, value, receiver);
  },
  defineProperty(target, key, attribute) {
    console.log("defineProperty"); // defineProperty
    return Reflect.defineProperty(target, key, attribute);
  },
});
Pobj.a = "A";

// 如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。

let Pobj1 = new Proxy(p, {
  set(target, key, value) {
    console.log("set"); // set
    return Reflect.set(target, key, value);
  },
  defineProperty(target, key, attribute) {
    console.log("defineProperty"); // 不打印
    return Reflect.defineProperty(target, key, attribute);
  },
});
Pobj1.a = "A";
```

#### 3.Reflect.has(obj, name)

`Reflect.has` 方法对应 `name in obj` 里面的 `in` 运算符。返回布尔值

```typescript
let has_obj = {
  name: "lucy",
};

// 旧写法
console.log("name" in has_obj); //true

// 新写法
Reflect.has(has_obj, "name"); // true
```

#### 4.Reflect.deleteProperty(obj, name)

`Reflect.deleteProperty` 方法等同于` delete obj[name]`，用于删除对象的属性。返回布尔值

```typescript
interface DeleteObj {
  name?: string;
  age?: number;
}

let delete_obj: DeleteObj = {
  name: "lucy",
  age: 19,
};

// 旧写法
console.log(delete delete_obj.age); //true

// 新写法
console.log(Reflect.deleteProperty(delete_obj, "name")); //true

// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。
```

#### 5.Reflect.construct(target, args)

`Reflect.construct` 方法等同于 `new target(...args)`，这提供了一种不使用 `new`，来调用构造函数的方法。

```typescript
class Greeting {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
// 使用 new 的写法
const greet = new Greeting("张三");
// 使用 Reflect.construct 的写法
const greet1 = Reflect.construct(Greeting, ["李四"]);
console.log(greet.name); //张三
console.log(greet1.name); //李四
```

#### 6.Reflect.getPrototypeOf(obj)

`Reflect.getPrototypeOf` 方法用于读取对象的**proto**属性，对应 `Object.getPrototypeOf(obj)`。

```typescript
// 旧写法
console.log(Object.getPrototypeOf(greet) === Greeting.prototype); //true

// 新写法
console.log(Reflect.getPrototypeOf(greet) === Greeting.prototype); //true
```

#### 7.Reflect.setPrototypeOf(obj, newProto)

`Reflect.setPrototypeOf` 方法用于设置目标对象的原型（prototype）， 对应` Object.setPrototypeOf(obj, newProto)`方法。
它返回一个布尔值，表示是否设置成功。

```typescript
Reflect.setPrototypeOf(greet, { a: 1 });
// @ts-ignore
console.log(greet.a); //1

const myObj = {} as any;
// console.log(myObj.length); //报错 ，类型“{}”上不存在属性“length”。
// 将myObj的原型设置为Array.prototype，即：
Reflect.setPrototypeOf(myObj, Array.prototype);
console.log(myObj.length); //0
```

#### 8.Reflect.apply(func, thisArg, args)

`Reflect.apply` 方法等同于` Function.prototype.apply.call(func, thisArg, args)`，用于绑定 `this `对象后执行给定函数。

```typescript
const ages = [11, 33, 12, 54, 18, 96];
const youngest = Math.min.apply(Math, ages);
const youngest2 = Reflect.apply(Math.min, Math, ages);
console.log(youngest, youngest2, Math.min(...ages));
```

#### 9.Reflect.defineProperty(target, propertyKey, attributes)

`Reflect.defineProperty` 方法基本等同于 `Object.defineProperty`，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用 `Reflect.defineProperty` 代替它。

```typescript
function MyDate() {}

// 旧写法
Object.defineProperty(MyDate, "now", {
  value: 1,
});

// 新写法
Reflect.defineProperty(MyDate, "now", {
  value: 1,
});
//@ts-ignore
console.log(MyDate.now); //1
```

#### 10.Reflect.getOwnPropertyDescriptor(target, propertyKey)

`Reflect.getOwnPropertyDescriptor` 基本等同于 `Object.getOwnPropertyDescriptor`，用于得到指定属性的描述对象，将来会替代掉后者。

```typescript
let myOwnObject = {};
Object.defineProperty(myOwnObject, "hidden", {
  value: true,
  enumerable: false,
});

// 旧写法
let theDescriptor = Object.getOwnPropertyDescriptor(myOwnObject, "hidden");

// 新写法
let theDescriptor2 = Reflect.getOwnPropertyDescriptor(myOwnObject, "hidden");
console.log(theDescriptor); // {value: true,writable: false,enumerable: false,configurable: false}
```

#### 11.Reflect.isExtensible (target)

`Reflect.isExtensible` 方法对应 `Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展。
“对象可扩展”指的是一个对象是否可以添加新的属性或方法

```typescript
// 旧写法
console.log(Object.isExtensible(myOwnObject)); // true

// 新写法
console.log(Reflect.isExtensible(myOwnObject)); // true
```

#### 12.Reflect.preventExtensions(target)

`Reflect.preventExtensions` 对应 `Object.preventExtensions `方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

```typescript
let myPreventObject = {};

// 旧写法
console.log(Object.preventExtensions(myPreventObject)); // Object {}

// 新写法
console.log(Reflect.preventExtensions(myPreventObject)); // true
```

#### 13.Reflect.ownKeys(target)

`Reflect.ownKeys `方法用于返回对象的所有属性，基本等同于 `Object.getOwnPropertyNames` 与 `Object.getOwnPropertySymbols` 之和。

```typescript
let myKeysObject = {
  foo: 1,
  bar: 2,
  [Symbol.for("baz")]: 3,
  [Symbol.for("bing")]: 4,
  1: 2,
};
//@ts-ignore
Object.prototype.aaa = 1;

// 旧写法
// console.log(Object.getOwnPropertyNames(myKeysObject));// [1,'foo', 'bar']

// console.log(Object.getOwnPropertySymbols(myKeysObject));//[Symbol(baz), Symbol(bing)]

// 新写法  但是只能获取到对象本身的属性，不包括原型上的属性
console.log(Reflect.ownKeys(myKeysObject)); // [1,'foo', 'bar', Symbol(baz), Symbol(bing)]
```

### 4.优势

- 提供了更统一和一致的 API，使得操作更加可预测和可控。
- 支持一些元编程的能力，使得代码更加易于理解和维护。

## 3.综合特性

- **配合使用**：
  -- `Proxy` 和 `Reflect` 可以结合使用，通过 `Proxy` 拦截器捕获对象的操作，然后通过 `Reflect` 方法进行相应的操作。
- **元编程能力**：
  -- `Proxy` 和 `Reflect` 为 `JavaScript` 提供了强大的元编程能力，使得开发者可以更灵活地操作和定制对象的行为。
- **ES6 增强**：
  -- 这两个特性是 ES6 的重要增强，为 `JavaScript` 的语言特性提供了更多的可能性和便利性。

# 28.Object.defineProperty vs proxy

## 1.Object.defineProperty

### 1.定义

```javascript
//obj要定义属性的对象。
// prop是一个字符串或 Symbol，指定了要定义或修改的属性键。
// descriptor是要定义或修改的属性的描述符。
// 返回值是传入函数的对象，其指定的属性已被添加或修改。
Object.defineProperty(obj, prop, descriptor);
```

### 2.使用

```javascript
let object = {};
let newObj = Object.defineProperty(object, "name", {
  value: "zhangsan",
});
console.log(newObj === object); // true
```

### 3.默认不允许修改属性,删除属性,枚举属性

```javascript
let object2: any = {};
Object.defineProperty(object2, "name", {
  value: "zhangsan",
});
console.log(object2); // {name: "zhangsan"}

object2.name = "lisi"; // {name: "zhangsan"}

delete object2.name; // {name: "zhangsan"}

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
```

### 4.数据描述符 存取描述符

#### 1. 数据描述符

- value 与属性绑定的值
- configurable 是否可 删除
- enumerable 属性是否可枚举
- writable 属性是否可修改

```typescript
// configurable 是否可 删除
let object3: any = {};
Object.defineProperty(object3, "name", {
  value: "zhangsan",
  // configurable: true
  writable: true,
});

// delete object3.name//{}
object3.name = "Tom"; // {name: "zhangsan"}
console.log(object3);

// writable  属性是否可修改
let object4: any = {};
Object.defineProperty(object4, "name", {
  value: "zhangsan",
  writable: true,
});

object4.name = "Tom"; // {name: "zhangsan"}
console.log(object4);

let object5: any = {};
Object.defineProperty(object5, "name", {
  value: "zhangsan",
  configurable: true,
  writable: true,
  enumerable: true,
});

object5.name = "Tom"; // {name: "zhangsan"}
console.log(object5);

for (const key in object5) {
  console.log("3", key, object5[key]); //name Tom  ,  sex male =>原型上继承Object的属性
}
```

#### 2.存取描述符

- get
- set

```typescript
// 与typescript中类的get set很类似
// 注意  value/writable  和 get/set 不能同时存在

let object6: any = {};
Object.defineProperty(object6, "name", {
  // value: "zhangsan",
  get() {
    console.log("getter", "zhangsan");
    return "zhangsan";
  },
  set(newvalue) {
    console.log("setter", newvalue);
  },
});

object6.name = "Tom"; // setter Tom
console.log(object6.name); // getter zhangsan
```

### 5.设计初衷

我们定义的对象中属性是无差异的，没办法定制化属性的行为，如果有对属性一些定制化要求，我们可以使用 Object.defineProperty

架构师：数据从后端返回，前端可能会出现对一些重要属性数据不小心的操作，这是很危险的行为 ，做一个数据的规范化

```typescript
const res = {
  a: 1, //不可修改
  b: 2, //不可枚举
  c: 3,
};
```

具体见项目`obj-data-standardization`下的`obj-data`项目

### 6.vue2 的数据响应原理

#### 1.原理

通过`Object.defineProperty`来拦截数据，将数据转换成 getter/setter 的形式，在访问数据时候调用 getter 函数，在修改数据的时候调用 setter 函数.
然后利用发布-订阅模式，在数据变动的时候触发依赖，也即发布更新给订阅者，订阅者收到消息后进行相应的处理

#### 2.简单实现

##### 1.最简单的对象实现

```typescript
let personObj = { name: "张三", age: 18 };
// 封装一个监听函数变化的函数
function dproptry(obj: any, key: string, value: any) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("获取", key, "为", value, "成功");
      return value;
    },
    set(newvalue) {
      if (newvalue === value) return;
      console.log("设置", key, "为", newvalue, "成功");
      value = newvalue;

      // 触发依赖，解析模板....
    },
  });
}

function observe(obj: any) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  for (const key in obj) {
    // 给对象的每一个属性设置监听
    dproptry(obj, key, obj[key]);
  }
}

observe(personObj);

// 1.对象没有嵌套情况，能够触发get set
console.log("getter", personObj.name); //触发get   zhangsan
personObj.name = "李四"; //触发set
```

##### 2.复杂对象实现

```typescript
let personObj: any = { name: "张三", age: 18, job: { code: "厨师" } };
// 封装一个监听函数变化的函数
function dproptry(obj: any, key: string, value: any) {
  // 如果obj存在嵌套对象value的情况，通过递归去给对象内每一个属性添加监听
  observer(value);

  Object.defineProperty(obj, key, {
    get() {
      console.log("获取", key, "为", value, "成功");
      return value;
    },
    set(newvalue) {
      if (newvalue === value) return;

      // 如果出现赋值为一个对象的情况，需要再次调用observe函数，给这个对象添加监听
      observer(newvalue);

      console.log("设置", key, "为", newvalue, "成功");
      value = newvalue;
      // 触发依赖，解析模板....
    },
  });
}
function observer(obj: any) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  for (const key in obj) {
    // 给对象的每一个属性设置监听
    dproptry(obj, key, obj[key]);
  }
}
observer(personObj);

// 情况一：嵌套对象
// console.log("getter", personObj.job.code); //触发两次 get  获取 job 为 {code: '厨师'} 成功
// personObj.job.code = "司机"  //不加递归是 不触发set ，加了递归会 打印两次 设置 code 为 司机 成功

// 情况二：将原有key的value赋值成对象
// personObj.name = { sname: "李四" } // 会触发set函数，    设置 name 为 {sname: '李四'} 成功
// console.log("getter", personObj.name.sname);////触发两次 get  获取 name  为 { sname: "李四" } 成功
// personObj.name.sname = "王五" //不在set函数加递归是 不触发set ，加了递归会打印 设置 sname 为 王五 成功

// 情况三：对象添加属性，无法get set 劫持     ==>增加$set方法
personObj.sex = "男";
// console.log(personObj.sex); //男   但是不会走get set

// 情况四：对象删除属性，无法get set 劫持   ==> 增加$delete方法
delete personObj.age;

// 情况五： 对数组的 api 无法劫持  ==>重新数组的api
let list = [1, 2, 3];
observer(list);

list.push(444);
console.log(list);
```

#### 3.弊端

- 对对象的添加和删除操作，无法劫持到 =》新增 $set和$delete 方法
- 对数组的 api 无法劫持到 =》重写数组的 api
- 存在深层嵌套关系，性能问题 无脑递归造成

## 2.proxy

### 1.vue3 响应式原理

`vue3` 基于 `ES6` 新增的 `Proxy` 对象实现数据代理以及通过 Reflect 对源数据进行操作，它解决了 `vue2 `中无法追踪数据新增或删除属性的问题。另外。`Proxy `可以直接监听数组，无需像 `vue2` 响应式那样需要重新数组方法进行拦截

### 2.简单实现

```typescript
// vue3 响应式   reactive ref

function reactive<T extends object>(obj: T) {
  return new Proxy(obj, {
    get(target, key) {
      console.log("get", key);
      const result = Reflect.get(target, key) as object;
      return isObject(result) ? reactive(result) : result;
    },
    set(target, key, value) {
      console.log("set", key, value);
      return Reflect.set(target, key, value);
    },
    deleteProperty(target, key) {
      console.log("delete", key);
      return Reflect.deleteProperty(target, key);
    },
  });
}
interface OnePerson {
  name: string;
  age?: number;
  gender?: string;
}

/**
 * 1.解决vue2中对对象的添加和删除操作，无法劫持到

 */
let onePerson = reactive<OnePerson>({ name: "张三", age: 18 });

console.log(onePerson.name); // 张三
onePerson.age = 30;

onePerson.gender = "男"; // set gender 男
delete onePerson.age; // delete age

/**
 * 2.解决vue2中对数组的 api 无法劫持到
 */
let oneArr = reactive<number[]>([1, 2, 3]);

oneArr.push(4); // [1,2,3,4]
/** get push
    get length
    set 3 4
    set length 4
*/
oneArr.pop(); // [1,2,3]
/**
 *  get pop
    get length
    get 3
    delete 3
    set length 3
 */

/**
 * 3.解决vue2中存在深层嵌套关系，性能问题 无脑递归造成  =》懒加载
 */

function isObject<T>(obj: T) {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }
  return true;
}

interface OneUser {
  name: string;
  age: number;
  info: {
    address: string;
    height: number;
  };
}
let oneUser = reactive<OneUser>({
  name: "张三",
  age: 18,
  info: {
    address: "中国",
    height: 180,
  },
});

console.log(oneUser.info.address);
oneUser.info.address = "新加坡";
// get info
// 中国
// get info

// ===》

// get info
// get address
// 中国
// get info
// set address 新加坡

// 发现key也只打印了info这一层，说明proxy还是不能解决嵌套问题，需要用递归（但是proxy是一个懒加载，用到才递归）

// 赋值对象
// @ts-ignore
oneUser.name = { sname: "Tom" }; // set name {sname: 'Tom'}
```

## 3.proxy 与 Object.defineProperty 的区别

- `Proxy` 可以代理整个对象，`Object.defineProperty` 只能代理对象上的属性
- `Proxy` 可以代理数组，`Object.defineProperty` 只能代理数组上的索引
- `Proxy` 可以代理对象上的所有操作，包括 `get`、`set`、`has`、`deleteProperty`、`ownKeys` 等 13 种方法，而 `Object.defineProperty` 只能代理对象上的 `get` 和 `set` 操作
- `Proxy`懒加载，解决嵌套递归的性能问题，而 `Object.defineProperty` 是无脑递归.
- `Proxy`可能存在兼容性问题，老 IE 不支持

# 29.类型守卫

## 1.类型收缩 | 类型收窄

实现传入 any 类型，判断类型

```typescript
// typeof 是有缺陷的 比如说 数组 对象  null 返回的都是object ,函数返回function
// typeof 对于复杂类型和自定义类型的判断是有限的。
const isString = (str: any) => typeof str === "string";

console.log(typeof null); //object
console.log(typeof undefined); //undefined
console.log(typeof function () {}); //function
console.log(typeof [1, 2, 3]); //object

// 使用 instanceof 类型守卫可以检查一个对象是否是特定类的实例
// 作用：instanceof 操作符用于检查一个对象是否是某个类的实例。它通过检查对象的原型链来确定对象是否由指定的类创建。

const isArr = (arr: any) => arr instanceof Array;
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
```

## 2.自定义守卫

```typescript
// 实现一个函数支持任意类型
// 如果是对象，就检查里面的属性，
// 如果里面的属性是number就取两位，如果是string就去除左右空格
// 如果是函数就执行

const isNumber = (num: any) => typeof num === "number";

const isFn = (fn: any) => typeof fn === "function";

const isObj = (obj: any) => ({}.toString.call(obj) === "[object Object]"); // Object.prototype.toString.call(obj)判断是否是对象

const fn3 = (data: any) => {
  let value;
  if (isObj(data)) {
    Object.keys(data).forEach((key) => {
      value = data[key];
      if (isString(value)) {
        data[key] = value.trim();
      }
      if (isNumber(value)) {
        data[key] = value.toFixed(2);
      }
      if (isFn(value)) {
        data[key]();
      }
    });
  }
};
const obj3 = {
  a: 100.22222,
  b: " test  ",
  c: function () {
    console.log(this.a);
    return this.a;
  },
};
fn3(obj3);
```

# xx. infer

`infer`就是推导泛型参数

`infer` 声明只能出现在 `extends` 子语句中

```

```
