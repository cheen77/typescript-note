let like1: symbol = Symbol(1)//唯一的
let like2: symbol = Symbol(1)//唯一的

console.log(like1 === like2) //false 因为symbol是唯一的，会分配不同的引用地址

// for Symbol for全局symbol有没有注册过这个key，  如果又直接拿来用，没有的话就会创建一个
console.log(Symbol.for("22") === Symbol.for("22")); //true


// 用途 解决对象中key重复的问题
let Ikun = {
    name: "KUNKUN",
    [like1]: "唱", // symbol类型通过 [name]去定义key
    [like2]: "跳"
}

console.log(Ikun); //{ name: 'KUNKUN', [Symbol(1)]: '唱', [Symbol(1)]: '跳' }

// 1 for in 遍历 不能读到symbol的key
for (const key in Ikun) {
    console.log(key) //  name
}
// 2 Object.keys 遍历 不能读到symbol的key
Object.keys(Ikun)
console.log(Object.keys(Ikun)) //[ 'name' ]
// 3 getOwnPropertyNames  不能读到symbol的key
console.log(Object.getOwnPropertyNames(Ikun))  //[ 'name' ]
// // 4 JSON.stringfy  不能读到symbol
console.log(JSON.stringify(Ikun)) //{"name":"KUNKUN"}


// 如何获取


// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(Ikun)
console.log(Object.getOwnPropertySymbols(Ikun)) //[ Symbol(1), Symbol(1) ]
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(Ikun)
console.log(Reflect.ownKeys(Ikun)) //[ 'name', Symbol(1), Symbol(1) ]
