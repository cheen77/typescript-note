// // 协变   不能少 可以多 ， 多赋给少

// // 主类型
// interface Laomo {
//     name: string
//     age: number
// }
// // 子类型
// interface Gao {
//     name: string
//     age: number
//     sex: string
// }

// let laomo: Laomo = {
//     name: "老墨我想吃鱼了",
//     age: 33,
// }

// let gaoqiqiang: Gao = {
//     name: "老墨我不想吃鱼",
//     age: 33,
//     sex: "女"
// }

// laomo = gaoqiqiang


// // 逆变  逆变一般发生于函数的参数上面  不能多，可以少，  少赋给多

// let fna = (params: Laomo) => {

// }

// let fnb = (params: Gao) => {

// }

// fna = fnb //错误

// fnb = fna //正确


// // 双向协变   fna = fnb    fnb = fna  都正确  但是不安全，ts2.0之后需要开启配置项中  "strictFunctionTypes": false,











// 协变 和 逆变
// 类型安全  保证属性成员始终可用
// 给: 子类型  =>  接收： 主类型



// 协变
// 主类型(大类型)
interface Fans {
    call: string
}
// 子类型(小类型)
interface Ikun extends Fans {
    sing: string
    dance: string
    basketball: string
}
// 子类型(小类型)
interface SuperIkun extends Ikun {
    rap: string
}


let fans: Fans = {
    call: ""
}

let ikun: Ikun = fans  //报错，因为不能将主类型赋值给子类型,会造成成员在主类型中缺失


let ikun1: Ikun = {
    call: "",
    sing: "",
    dance: "",
    basketball: ""
}

let fans1: Ikun = ikun1 // 正确  子类型赋值给主类型 属性成员一定存在



// 逆变
type Transform = (x: Ikun) => Ikun
type SubTransform = (x: Ikun) => SuperIkun

// const subTransform: SubTransform = (x) => {
//     return x
// }
// //报错    给的是x Transform 中Ikun 大类型      收  x 是SubTransform的SuperIkun 小类型导致报错,一定是 给的是小类型 收的是大类型
// const transform: Transform = subTransform

