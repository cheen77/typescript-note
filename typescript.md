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

```typescript

```

## 4.super 原理

```typescript

```

## 5.静态方法 static

```typescript

```

## 6.get set

```typescript

```

## 7.抽象类 abstract

```typescript

```
