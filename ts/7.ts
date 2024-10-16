//  1. 联合类型   使用  | 

// 比如 电话号既可能是一个字符串，也可能是一个数字：
let phone: string | number = "028-888888";

// 比如 后端返回枚举 1 代表 true  0 代表 false,然后后端又改需求 可以传boolean类型
let f = function (type: number | boolean): boolean {
    // 0 false => !0 true => !!0 => false   
    //   1 true => !1 false => !!1 true
    //  true   !!true => true
    return !!type
}

console.log(f(1)); //true
console.log(f(0)); //false
console.log(f(true)); //true
console.log(f(false)); //false

//=========================================================================================
//  2.交叉类型

// 类似于interface中的 extends 和重名  , 使用  &

interface Person {
    name: string
    age: number
}

interface Man {
    sex: string
}

let man: Person & Man = {
    name: "zhangsan",
    age: 18,
    sex: "男"
}

//=========================================================================================
// 3.类型断言

// 类型断言（Type Assertion）可以用来手动指定一个值的类型。

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
    if (typeof (animal as Fish) === 'function') {
        return true;
    }
    return false;
}

//=========================================================================================
// 4. as const

// // 字面量类型
// let message = "hello world";
// message = "hello world 111";
// let message2 = "hello world" as const;
// message2 = "hello world 222";//error:不能将类型“"hello world 222"”分配给类型“"hello world"”

// // 数组类型
// const colors = ["red", "green", "blue"]; // 推断为 string[] 类型
// const colorsLiteral = ["red", "green", "blue"] as const; // 推断为 readonly ["red", "green", "blue"]

// colors.unshift("pink"); // 推断为 string[] 类型
// colorsLiteral.unshift("pink"); // 错误 , 推断为 readonly ["red", "green", "blue"]

// 对象类型
const user1 = {
    name: "Alice",
    age: 25,
}; // 推断为 { name: string; age: number }

const userLiteral = {
    name: "Alice",
    age: 25,
} as const; // 推断为 { readonly name: "Alice"; readonly age: 25 }

// 实际用途

// 枚举和状态机等场景

const STATUS = {
    SUCCESS: "success",
    FAILURE: "failure",
    PENDING: "pending",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];// Status 推断为 "success" | "failure" | "pending"


/**
 * 
 * 
 * typeof STATUS 会获取 STATUS 的类型，即：

    {
    readonly SUCCESS: "success";
    readonly FAILURE: "failure";
    readonly PENDING: "pending";
    }

    keyof 操作符用于获取 某个类型 的 所有键（属性名），并生成一个联合类型

    keyof typeof STATUS === "SUCCESS" | "FAILURE" | "PENDING";



    在 TypeScript 中，() 和 [] 组合使用的形式是一种索引类型查询,用于从一个对象类型中获取某些属性的类型

    (typeof STATUS)[keyof typeof STATUS] 就是取
    {
    readonly SUCCESS: "success";
    readonly FAILURE: "failure";
    readonly PENDING: "pending";
    }类型中的所有值，也就是 "success" | "failure" | "pending"


    (typeof STATUS)[keyof typeof STATUS] 就是 "success" | "failure" | "pending" 的联合类型，它代表 STATUS 对象中所有可能的值。

    type Status = "success" | "failure" | "pending";
 * 
 */