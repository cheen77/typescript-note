// infer就是推导泛型参数

// infer声明只能出现在extends子语句中
// infer 后面跟一个变量名

//获取promise返回的参数

interface User {
    name: string
    age: number
}



// type PromiseType = Promise<User>

// type GetPromiseTyoe<T> = T extends Promise<infer U> ? U : T

// type T = GetPromiseTyoe<PromiseType>  //推断 T为User类型



// 嵌套的情况,就infer递归

type PromiseType = Promise<Promise<Promise<User>>>

type GetPromiseTyoe<T> = T extends Promise<infer U> ? GetPromiseTyoe<U> : T

type T = GetPromiseTyoe<PromiseType> //推断 T为User类型






//infer协变
// 产生协变会返回联合类型

const kunkun: User = {
    name: 'kunkun',
    age: 18
}

type GetKunKun<T> = T extends { name: infer U, age: infer U } ? U : T

type Y = GetKunKun<typeof kunkun>

//infer逆变
// 出现在函数的参数上
// 产生逆变会返回参数的交叉类型

type IFn<T> = T extends {
    a: (x: infer U) => void
    b: (x: infer U) => void
} ? U : never

type W = IFn<{ a: (x: number) => void, b: (x: string) => void }>  // never
type U = IFn<{ a: (x: string) => void, b: (x: string) => void }>  // string





// 类型提取

// 1.写一个泛型工具,用于提取头部元素"a"
type Arr = ['a', 'b', 'c']
type GetFirst<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never
type P = GetFirst<Arr> // "a"

// 2.写一个泛型工具,提取尾部元素"c"

type GetLast<T extends any[]> = T extends [...any[], infer Last,] ? Last : []
type P1 = GetLast<Arr> // "c"

// 3.写一个泛型工具,剔除第一个元素 Shift
type ShiftFirst<T extends any[]> = T extends [unknown, ...infer Rest] ? Rest : []
type P2 = ShiftFirst<Arr> // ["b", "c"]

// 4.写一个泛型工具,剔除最后一个元素 Pop
type PopLast<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : []
type P3 = PopLast<Arr>// ["a", "b"]




//infer递归

// type Arr = [1, 2, 3, 4]  变成  type Arr = [4,3,2,1]

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Reverse<Rest>, First] : []