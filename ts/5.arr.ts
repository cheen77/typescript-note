//「类型 + 方括号」表示法
let arr: number[] = [1, 4, 2, 3, 5];

//数组泛型
let arr2: Array<number> = [1, 4, 2, 3, 5];


//用接口表示数组


interface NumberArray {
    [index: number]: number;
}
//只要索引的类型是数字时，那么值的类型必须是数字。
let arr3: NumberArray = [1, 1, 2, 3, 5];

//多维数组
let data: number[][] = [
    [1, 2],
    [3, 4],
];

//arguments类数组
// 类数组（Array-like Object）不是数组类型，比如 arguments：
function sum(...args: number[]) {
    console.log(args); // [ 111, 222, 333 ]
    console.log(arguments) //类数组 [Arguments] { '0': 111, '1': 222, '2': 333 }
    let arr: number[] = arguments//错误的arguments 是类数组不能这样定义
}
sum(111, 222, 333)

// arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

interface Args {
    [index: number]: number;
    length: number;
    callee: Function;
}
function sum2(...args: number[]) {
    console.log(args); // [ 111, 222, 333 ]
    console.log(arguments) //类数组 [Arguments] { '0': 111, '1': 222, '2': 333 }
    let arr2: Args = arguments//错误的arguments 是类数组不能这样定义


}
sum2(111, 222, 333)

// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：

function sum3(...args: any) {
    console.log(args); // [ 111, 222, 333 ]
    console.log(arguments) //类数组 [Arguments] { '0': 111, '1': 222, '2': 333 }
    let arr2: IArguments = arguments//错误的arguments 是类数组不能这样定义

}
// 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：

interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}