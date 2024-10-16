let array: [number, string, undefined] = [1, "ddd", undefined]


array[0].length // 报错 类型“number”上不存在属性“length”。
array[1].length




// 越界元素
array.push(null) //报错 类型“null”的参数不能赋给类型“string | number | undefined”的参数

// 对于越界的元素他的类型被限制为 联合类型
array.push("哈哈哈")


// 元组类型还可以支持自定义名称和变为可选的
let array1: [x: number, y?: boolean] = [1]


// 应用场景 例如定义excel返回的数据

let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]



let array3: readonly [number, string, undefined] = [1, "ddd", undefined]

type firstType = typeof array3[0]
