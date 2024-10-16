
// 类型别名
type str = string;
const str: str = 'zhangsan';

type Kobe = {
    name: string;
}







// =================== type 与  interface

/**
 * 1.interface 遇到重名的会合并 type 不行
 */
type Age = {
    age: number;
}
//type 重名会报错，不会自动合并
type Age = {
    age1: number;
}

// interface 重名不会报错，会自动合并
interface _Age {
    age: number;
}
// 重名会报错
interface _Age {
    age1: number;
}

/**
 * 2.type 可以定义 联合类型 和 可以使用一些操作符 interface不行
 */

type S = string | number

interface SS {
    name: string | number //只能在interface中定义 不能在外面定义
}

type value = boolean | 0 | '213' //定义值的别名

/**
 * 3.interface可以继承  type 只能通过 & 交叉类型合并
 */

interface AA {
    name: str
}

interface BB extends AA {
    age: number
}

type _AA = {
    name: string
}

type _BB = _AA & {
    age: number
}

// =================== type 与  interface  


let kobe: Kobe = { name: 'kobe' };
let kobe1: Kobe & Age = { name: 'kobe', age: 30 };
let kobe2: Kobe | Age = { age: 30 };

let kobe3: Age = { age: 30 };





//type高级用法

// type 中 extends 是包含的意思
// 左边的值 会作为 右边类型的子类型
// 1. any unknow
// 2. Object
// 3. Number String ...
// 4. number string ....
// 5. never

type a1 = 1 extends number ? 1 : 0 //1

type a2 = 1 extends Number ? 1 : 0 //1

type a3 = 1 extends Object ? 1 : 0 //1

type a4 = 1 extends any ? 1 : 0 //1

type a5 = 1 extends unknow ? 1 : 0 //1

type a6 = 1 extends never ? 1 : 0 //0




