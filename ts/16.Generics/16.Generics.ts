// 泛型

// 1.泛型函数

function chen(a: number, b: number): Array<number> {
    return [a, b];
}
chen(1, 2)
function chen1(a: string, b: string): Array<string> {
    return [a, b];
}
chen1('独孤', '求败')

// 这俩函数功能一样，如果写多个函数显然是一个不好的选择，我们可以：

function chen3<T>(a: T, b: T): Array<T> {
    return [a, b];
}
// chen3<number>(1, 2) //这是全称，但是没必要，因为ts会类型推断为number
chen3(1, 2)
chen3("ggg", "bbb")

// 1.1可以定义多个泛型
function chen4<T, K>(a: T, b: K): Array<T | K> {
    return [a, b];
}

// 1.2可以定义泛型默认值
function chen5<T = number, K = string>(a: T, b: K): Array<T | K> {
    return [a, b];
}
chen5(false, 1)

//2. type interface 泛型
type MMM<T> = string | T
let mmm: MMM<boolean> = true

interface CHEN<T> {
    msg: T
}
let cchen: CHEN<string> = {
    msg: 'chen'
}

//  接口的时候特别爱用，  封装一个axios理解

const axios = {

    get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText))
                    }
                }
            }
            xhr.send(null)
        })

    }

}

//axios.get('./data.json').then(res => { }) 
// 当我们res. 的时候，发现没有推断 ，我们希望返回的res能够给我们进行自动类型推断，如何实现呢 ？ 

// 首先需要定义类型
interface JsonData {
    msg: string
    code: number
    data: any
}

axios.get<JsonData>('./data.json').then(res => {
    console.log(res.data);
})

// 注意运行的时候 node环境没有XMLHttpRequest，需要编译程js   tsc 然后下载live server 插件在本地起一个服务通过浏览器打开html文件




// 泛型约束 extends
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
function addN<T extends number>(a: T, b: T) {
    return a + b
}

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity("ggg");

// 多个类型参数之间也可以互相约束：
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
// 我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。


//  结合 keyof 实现 Obj1. 智能提示
let Obj1 = {
    name: "Tom",
    age: 16
}

type Key = keyof typeof Obj1 //type Key = "name" | "age"
type Value = (typeof Obj1)[keyof typeof Obj1]; //type Value = string | number

// 实现 Obj1. 智能提示、

// 首先定义了T类型并使用extends关键字继承object类型的子类型
// 然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型
// 最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型
function Ob<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

Ob(Obj1, "name")


//keyof
// 实现一个将interface中全部变可选  就是Partial的实现原理
interface Ddata {
    name: string
    age: number
    sex: string
}

type Ddata1 = Partial<Ddata>

// for in    for(let key in obj)
type MyPartial<T extends object> = {
    [key in keyof T]?: T[key]

}

type Ddata2 = MyPartial<Ddata> 