import arr, { a, add as add2 } from "./20.modules"
// 或者
import * as data from "./20.modules"
console.log(data);//{ a: 1, add: [Function: add], default: [ 1 ] }


console.log(arr); // [ 1 ]

const add = () => { }

// 动态导入
if (a === 1) {
    import("./20.modules").then(res => {
        console.log(res) // a: 1, add: [Function: add], default: [ 1 ] }
    })
}