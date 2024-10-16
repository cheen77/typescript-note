//1.数字枚举
// 默认从0往上
enum Color {
    Red,
    Green,
    BLue
}

// 增长枚举
enum Color2 {
    Red = 1,
    Green,
    BLue
}


// 2.字符串枚举

enum Color3 {
    Red = 'red',
    Green = 'green',
    BLue = 'blue'
}


// 3.异构枚举 
// 枚举可以混合字符串和数字成员
enum Types {
    No = "No",
    Yes = 1,
}


// 4.接口枚举
// 定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds
// 声明对象的时候要遵循这个规则

enum Types {
    yyds,
    dddd
}
interface A_ {
    red: Types.yyds
}

let obj1: A_ = {
    red: Types.yyds
}


// 5.const枚举
// 常数枚举是使用 const enum 定义的枚举类型：


const enum Types2 {
    No = "No",
    Yes = 1,
}


// 6.反向映射
// 它包含了正向映射（ name -> value）和反向映射（ value -> name）
// 要注意的是 不会为字符串枚举成员生成反向映射。

enum Types3 {
    success
}

let success: number = Types3.success

let key: string = Types3[success]

console.log(`key--------${key}`, `value--------${success}`);  // key--------success value--------0
