

//1.函数定义类型和返回值 | 箭头函数定义类型和返回值

const add = (x: number, y: number): number => {


    return x + y;
};
// function add(x: number, y: number): number {
//     return x + y;
// }
console.log(add(1, 1)); // 2

//=========================================================================================
//2.函数默认的参数  | 函数可选参数

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

//=========================================================================================
// 3. 参数是一个对象如何定义

interface User {
    name: string;
    age: number;
}
const user = (user: User): User => {
    return user
};
console.log(user({ name: 'zhangsan', age: 18 }));
//=========================================================================================

//4. 函数this类型

interface Obj {
    users: string[]
    addUser: (this: Obj, name: string) => void
}

// ts可以定义this的类型,在js中无法使用,必须是第一个参数定义this的类型,传参的时候会忽略第一个this参数 ,注意这里不能使用箭头函数去指定this
let obj: Obj = {
    users: ['zhangsan'],
    addUser: function (this: Obj, name: string) {
        this.users.push(name)
    }
}

obj.addUser("lisi")
//=========================================================================================
//5.函数重载

// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

/**
 * 举例:
 *      比如有一个需求: numArr: [ 1,2,3,4,5,6,7,8,9,10  ]
 *         我希望有一个函数 func(x:number | string)  实现 传入  
 *           x输入一个数字 就 push到数组末尾
 *           x输入一个字符串 就 push到数组头部
 *         那么我们就可以使用函数重载实现
 */

/**
 *          重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
            如果参数类型不同，则参数类型应设置为 any。
            参数数量不同你可以将不同的参数设置为可选。
 */

let numArr: (string | number)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // (string | number)[]  or Array<string | number>
function func(x: number): (string | number)[]
function func(x: string): (string | number)[]
function func(x: number | string): (string | number)[] {
    console.log("typeof x", typeof x);

    if (typeof x === "number") {
        numArr.unshift(x)
        return numArr

    } else if (typeof x === "string") {
        numArr.push(x)
        return numArr
    }
}

console.log(func("lisa"));// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,lisa]
console.log(func(7777)); //[7777,1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
